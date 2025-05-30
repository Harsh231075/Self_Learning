import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

import authenticateUser from '../middleware/authMiddleware.js';
import userSchema from '../model/user.js';
import User from '../model/user.js';
import StudyPlan from '../model/StudyPlan.js';
import Cartificate from '../model/cartificate.js';
import Feedback from '../model/Feedback.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existUser = await userSchema.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let photoUrl = "empty";

    // Upload photo to Cloudinary if provided
    if (req.files && req.files.photo) {
      try {
        const file = req.files.photo;
        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "user_photos",
        });
        photoUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image Upload Error:", uploadError);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    // Generate a random referral code
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Create the new user
    const newUser = new userSchema({
      name,
      email,
      password: hashPassword,
      photo: photoUrl,
      referralCode: generateReferralCode(),
      rank: 0
    });

    // Handle referral logic if referral code is provided
    if (referralCode) {
      const referrer = await userSchema.findOne({ referralCode });
      if (referrer) {
        referrer.rank += 10;
        referrer.referral = (referrer.referral || 0) + 1;
        await referrer.save();
        newUser.referredBy = referrer._id;
      }
    }

    await newUser.save();
    res.status(201).json({
      message: "Signup Successful",
      user: {
        name: newUser.name,
        email: newUser.email,
        photo: newUser.photo,
        referralCode: newUser.referralCode
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Login user and return JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch study plans of the authenticated user
router.get('/studyPlan', authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('study_plans');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.study_plans);
  } catch (error) {
    console.error("Error fetching study plans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch a specific study plan by ID
router.get("/study-material/:id", authenticateUser, async (req, res) => {
  try {
    const studyPlanId = req.params.id;
    const studyPlan = await StudyPlan.findById(studyPlanId);
    if (!studyPlan) {
      return res.status(404).json({ message: "Study Plan not found" });
    }
    res.json(studyPlan);
  } catch (error) {
    console.error("Error fetching Study Plan:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Fetch user profile and certificate data
router.get('/user-details', authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .populate('study_plans')
      .select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const certificates = await Cartificate.find({ _id: { $in: user.cartificate } }).select('-__v -_id');

    res.json({
      name: user.name,
      email: user.email,
      photo: user.photo,
      study_plans: user.study_plans,
      rank: user.rank,
      cartificate: certificates,
      referral: user.referralCode,
      total_referral: user.referral
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile details
router.post("/update-details", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    let photoUrl;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (req.files && req.files.photo) {
      try {
        const file = req.files.photo;
        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "user_photos",
        });
        photoUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Image Upload Error:", uploadError);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    const updates = {};
    if (name) updates.name = name;
    if (photoUrl) updates.photo = photoUrl;

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

    res.json({ message: "User details updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a certificate and update user rank
router.post('/certificate', authenticateUser, async (req, res) => {
  const { userName, courseName, Date, rank } = req.body;

  if (!userName || !courseName || !Date || !rank) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  const userId = req.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingCertificate = await Cartificate.findOne({ userId, courseName });
  if (existingCertificate) {
    return res.status(400).json({ message: "Certificate already exists for this user" });
  }

  const newCertificate = new Cartificate({
    userId,
    userName,
    courseName,
    Date
  });

  await newCertificate.save();

  const newRankPoints = parseInt(rank) || 0;
  const currentRank = user.rank || 0;
  const updatedRank = currentRank + newRankPoints;

  await User.findByIdAndUpdate(userId, {
    $push: { cartificate: newCertificate._id },
    rank: updatedRank
  });

  res.status(201).json({
    message: "Certificate added successfully",
    certificateId: newCertificate._id,
    previousRank: currentRank,
    addedPoints: newRankPoints,
    newTotalRank: updatedRank
  });
});

router.post('/feedback', authenticateUser, async (req, res) => {
  try {
    const { rate, text } = req.body;
    const userId = req.userId;

    const feedback = new Feedback({
      userId,
      rating: rate,
      feedback: text,
      createdAt: new Date()
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully'
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback'
    });
  }
});

// Get top users and system stats
router.get('/get-user', async (req, res) => {
  try {
    const users = await User.find({}, 'name photo rank').sort({ rank: -1 }).exec();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    const totalUsers = await User.countDocuments();
    const totalCertificates = await Cartificate.countDocuments();

    res.status(200).json({
      users,
      stats: {
        totalUsers,
        totalCertificates
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/all-feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name photo') // Get only name and photo from user
      .sort({ createdAt: -1 }); // Sort by newest first

    const formattedFeedbacks = feedbacks.map(feedback => ({
      id: feedback._id,
      rating: feedback.rating,
      feedback: feedback.feedback,
      rate: feedback.rate,
      createdAt: feedback.createdAt,
      user: {
        name: feedback.userId.name,
        photo: feedback.userId.photo
      }
    }));

    res.status(200).json({
      success: true,
      feedbacks: formattedFeedbacks
    });

  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedbacks'
    });
  }
});

export default router;
