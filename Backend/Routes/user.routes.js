const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateUser = require("../middleware/authMiddleware");
const userSchema = require('../model/user');
const cloudinary = require('cloudinary').v2;
const User = require("../model/user.js");
const StudyPlan = require('../model/StudyPlan.js');
const Cartificate = require('../model/cartificate.js');
const Feedback = require('../model/Feedback.js')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;
    console.log(name, email, password, referralCode)
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existUser = await userSchema.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    let photoUrl = "empty";

    // Handle photo upload
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

    // Generate unique referral code for new user
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // Create new user
    const newUser = new userSchema({
      name,
      email,
      password: hashPassword,
      photo: photoUrl,
      referralCode: generateReferralCode(),
      rank: 0
    });

    // Handle referral if provided
    if (referralCode) {
      const referrer = await userSchema.findOne({ referralCode });
      if (referrer) {
        // Add referral points to referrer
        referrer.rank += 10;
        // Increment referral count for referrer
        referrer.referral = (referrer.referral || 0) + 1;
        await referrer.save();

        // Link new user to referrer
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

    // if (!user.password) {
    //   console.error("Error: User password is undefined!");
    //   return res.status(500).json({ message: "Server error: No password stored!" });
    // }

    const isMatch = await bcrypt.compare(password, user.password); // ✅ Added `await`
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" }); // ✅ Fixed typo
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' }); // ✅ Fixed typo
    return res.json({ message: "Login successful", token });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/studyPlan', authenticateUser, async (req, res) => {
  try {
    // Get user ID from middleware (extracted from token)
    const userId = req.userId;

    // Find user by ID
    const user = await User.findById(userId).populate('study_plans'); // Populate studyPlan details

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return all study plans
    res.status(200).json(user.study_plans);
  } catch (error) {
    console.error("Error fetching study plans:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/study-material/:id", authenticateUser, async (req, res) => {
  try {
    const studyPlanId = req.params.id;
    console.log("Requested StudyPlan ID:", studyPlanId);


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

router.get('/user-details', authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user but only certificate IDs
    const user = await User.findById(userId)
      .populate('study_plans')
      .select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch full certificate details using IDs
    const certificates = await Cartificate.find({ _id: { $in: user.cartificate } }).select('-__v -_id');

    res.json({
      name: user.name,
      email: user.email,
      photo: user.photo,
      study_plans: user.study_plans,
      rank: user.rank,
      cartificate: certificates, // IDs ki jagah full details bhej rahe hain
      referral: user.referralCode,
      total_referral: user.referral
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post("/update-details", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId; // Get userId from token
    const { name } = req.body;
    let photoUrl;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Handle photo upload if file is provided
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

    // Prepare update object (only include fields provided)
    const updates = {};
    if (name) updates.name = name;
    if (photoUrl) updates.photo = photoUrl; // Only update photo if a new one is uploaded
    // Update userz
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

    res.json({ message: "User details updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

  // Check if the user already has a certificate for this course
  const existingCertificate = await Cartificate.findOne({ userId, courseName });

  if (existingCertificate) {
    return res.status(400).json({ message: "Certificate already exists for this user" });
  }

  // Create and save new certificate
  const newCertificate = new Cartificate({
    userId,   // Ensure userId is stored in the certificate
    userName,
    courseName,
    Date
  });

  await newCertificate.save();

  // Convert rank to number and add to existing rank
  const newRankPoints = parseInt(rank) || 0;
  const currentRank = user.rank || 0;
  const updatedRank = currentRank + newRankPoints;

  // Update user document with certificate ID and accumulated rank
  await User.findByIdAndUpdate(userId, {
    $push: {
      cartificate: newCertificate._id
    },
    rank: updatedRank  // Add new points to existing points
  });

  res.status(201).json({
    message: "Certificate added successfully",
    certificateId: newCertificate._id,
    previousRank: currentRank,
    addedPoints: newRankPoints,
    newTotalRank: updatedRank
  });
});


router.get('/get-user', async (req, res) => {
  try {
    // Get users and sort by rank in descending order
    const users = await User.find({}, 'name photo rank')
      .sort({ rank: -1 })
      .exec();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalCertificates = await Cartificate.countDocuments();

    // Structure the response
    const response = {
      users: users,
      stats: {
        totalUsers,
        totalCertificates
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Error fetching users" });
  }
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



module.exports = router;