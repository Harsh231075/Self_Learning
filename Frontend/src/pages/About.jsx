"use client";
import React, { useState } from 'react';
import Navbar from '../Home/Navbar';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { Brain, Target, Users, Mail, Phone, MapPin } from 'lucide-react';

export default function AboutPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@eduai.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Education Street, Tech City"
    }
  ];


  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Form Data:', formData);

    const templateParams = {
      from_name: e.target.name.value,
      from_email: e.target.email.value,
      message: e.target.message.value,
      to_name: "Harsh Singh Baghel",
      reply_to: e.target.email.value
    };

    // Log template params to verify
    // console.log('Template Params:', templateParams);
    try {
      await emailjs.send(
        'service_s14g1e1',
        'template_7exlhon',
        templateParams,
        '1BKmOHntYXSu7-AUH'
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-90 to-blue-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] -top-20 -left-20 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] -bottom-20 -right-20 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-6 mt-6 text-4xl sm:text-6xl font-bold text-gray-500">
              Revolutionizing Education with AI
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg sm:text-xl bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse  leading-relaxed">
              We're building the future of education where every student receives personalized guidance
              through advanced AI technology, making quality education accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 to-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-3xl sm:text-4xl font-bold text-blue-900">Our Vision & Mission</h2>
              <div className="space-y-6">
                <p className="text-blue-800/80 text-lg">
                  Imagine a world where every student has access to personalized education that adapts to their unique learning style.
                  That's the future we're building at EduAI.
                </p>
                <div className="grid gap-4">
                  {visionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                      <point.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <p className="text-blue-800/70">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl transform rotate-6"></div>
              <img
                src="Photo-ai.jpeg"
                alt="Our Mission"
                className="relative rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-gradient-to-br from-blue-90 to-blue-200 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] -top-40 -right-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-[600px] h-[600px] -bottom-40 -left-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* CEO Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl transform rotate-6 blur-2xl opacity-50"></div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative">
                    <img
                      src="myphoto.jpg"
                      alt="CEO"
                      className="w-full h-[500px] object-cover rounded-2xl shadow-2xl transform transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </motion.div>

              {/* CEO Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-left space-y-6"
              >
                <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-200/20">
                  <span className="text-gray-600/90 text-sm">Leadership</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-gray-600/90">
                  Harsh singh baghel
                </h2>

                <p className="text-xl text-gray-600/90">
                  CEO & Founder
                </p>

                <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-transparent"></div>

                <blockquote className="text-gray-600/90 text-lg sm:text-xl leading-relaxed">
                  "Our mission is to democratize education through AI technology, making personalized learning accessible to everyone, everywhere. We're not just building a platform; we're creating the future of education."
                </blockquote>

                <div className="pt-6 flex flex-wrap gap-4">
                  <div className="bg-gray-500/10 px-6 py-4 rounded-xl">
                    <div className="text-2xl font-bold text-gray-600/90 mb-1">15+</div>
                    <div className="text-gray-600/90 text-sm">Projects Completed</div>
                  </div>
                  <div className="bg-gray-500/10 px-6 py-4 rounded-xl">
                    <div className="text-2xl font-bold text-gray-600/90 mb-1">10+</div>
                    <div className="text-gray-600/90 text-sm">Technologies Learned</div>
                  </div>
                  <div className="bg-gray-500/10 px-6 py-4 rounded-xl">
                    <div className="text-2xl font-bold text-gray-600/90 mb-1">4.2</div>
                    <div className="text-gray-600/90 text-sm">Average Project Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}

      <section className="py-20 bg-gradient-to-br from-blue-100 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-[500px] h-[500px] -top-20 -right-20 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] -bottom-20 -left-20 bg-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-200/20 mb-4"
                >
                  <span className="text-blue-700 text-sm font-medium">Let's Connect</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Get in Touch</h2>
                <p className="text-blue-600/80 text-lg max-w-2xl mx-auto">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              {/* Contact Card */}
              <div className="relative group">
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>

                <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                      <h3 className="text-2xl font-semibold text-blue-900 mb-6">Contact Information</h3>

                      {contactInfo.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
                        >
                          <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <item.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-600 mb-1">{item.label}</p>
                            <p className="text-blue-900 font-medium">{item.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Contact Form */}
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your Email"
                          className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Write your message here..."
                          rows="4"
                          className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>
                    </motion.form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add this at the top of your file with other imports */}



    </div>
  );
}

const visionPoints = [
  {
    icon: Brain,
    text: "Leveraging AI to create personalized learning experiences"
  },
  {
    icon: Target,
    text: "Helping students achieve their career goals through guided learning"
  },
  {
    icon: Users,
    text: "Building a community of lifelong learners"
  }
];