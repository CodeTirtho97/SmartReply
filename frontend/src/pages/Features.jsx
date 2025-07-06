import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Settings, Shield, Clock, Star, Download, 
  ChevronRight, Mail, Palette, Crown 
} from 'lucide-react';

const Features = () => {
  const [selectedTone, setSelectedTone] = useState('professional');

  const freeFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: '5 Daily AI Replies',
      description: 'Generate up to 5 smart email replies per day using advanced Gemini AI technology.',
      demo: true
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Tone Selection',
      description: 'Choose from Professional, Casual, Friendly, Formal, and Concise writing styles.',
      demo: true
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Gmail Integration',
      description: 'Seamlessly integrated into Gmail interface with one-click reply generation.',
      demo: false
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Privacy Focused',
      description: 'Your emails stay private. We only process the context needed for AI generation.',
      demo: false
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Instant Generation',
      description: 'Get contextually relevant replies in seconds, not minutes.',
      demo: false
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Free to Use',
      description: 'No subscription required for basic features. Upgrade to Pro for unlimited access.',
      demo: false
    }
  ];

  const tones = [
    { value: 'professional', label: 'Professional', color: 'bg-blue-500', example: 'Thank you for your email. I will review this matter and provide you with a comprehensive response by end of business day.' },
    { value: 'casual', label: 'Casual', color: 'bg-green-500', example: 'Hey! Thanks for reaching out. I\'ll take a look at this and get back to you soon.' },
    { value: 'friendly', label: 'Friendly', color: 'bg-yellow-500', example: 'Hi there! Thanks so much for your message. I\'d be happy to help you with this!' },
    { value: 'formal', label: 'Formal', color: 'bg-purple-500', example: 'Dear Sir/Madam, I acknowledge receipt of your correspondence and will address your inquiry with due diligence.' },
    { value: 'concise', label: 'Concise', color: 'bg-red-500', example: 'Received. Will respond by EOD.' }
  ];

  const handleInstallExtension = () => {
    window.open('https://chrome.google.com/webstore/detail/smartreply-plus/YOUR_EXTENSION_ID', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Powerful Features for Smart Email Replies
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Everything you need to transform your email productivity
            </p>
            <button
              onClick={handleInstallExtension}
              className="bg-white text-blue-600 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>Install Free Extension</span>
            </button>
          </div>
        </div>
      </div>

      {/* Extension Benefits Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            🚀 Chrome Extension: 25 Daily Replies + Custom Writing Styles
          </h2>
          <p className="text-orange-100">
            Get 5x more AI generations plus personalized prompts when you install our Chrome extension
          </p>
        </div>
      </div>

      {/* Free Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get started with these powerful capabilities at no cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:transform hover:scale-105 transition-all duration-200 shadow-lg">
                <div className="text-blue-600 dark:text-blue-400 mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                {feature.demo && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      ✨ Try in live demo below
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tone Selection Demo */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Tone Demo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See how different tones change your AI-generated replies
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tone Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Select Tone:
                </h3>
                <div className="space-y-3">
                  {tones.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => setSelectedTone(tone.value)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedTone === tone.value
                          ? `${tone.color} text-white shadow-lg transform scale-105`
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{tone.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Example Output */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  AI Reply Example:
                </h3>
                <div className="bg-gray-50 dark:bg-gray-600 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Original Email: "Can you help me with the quarterly report?"
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {tones.find(t => t.value === selectedTone)?.example}
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                    <Palette className="w-5 h-5" />
                    <span className="font-medium">Chrome Extension Feature</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Add custom writing styles and prompts to personalize your AI replies even further!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Features Teaser */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">Coming Soon</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Ready for <span className="text-yellow-300">Pro Features</span>?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Unlock unlimited potential with SmartReply+ Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Unlimited Replies</h3>
              <p className="text-purple-100">No daily limits - generate as many AI replies as you need</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Multi-Response Options</h3>
              <p className="text-purple-100">Get 3 different reply variants for every email</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3">Smart Classification</h3>
              <p className="text-purple-100">AI automatically detects email type and adjusts tone</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm inline-block p-6 rounded-2xl mb-6">
              <div className="text-3xl font-bold mb-2">
                $4.99 <span className="text-lg font-normal">USD</span> / 
                ₹299 <span className="text-lg font-normal">INR</span>
              </div>
              <div className="text-purple-200">per month</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pro"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>Explore Pro Features</span>
              </Link>
              <button
                onClick={handleInstallExtension}
                className="border-2 border-white text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Try Free Version</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Installation CTA */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Email Productivity?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Install SmartReply+ and start generating intelligent email replies in seconds
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleInstallExtension}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Install Chrome Extension</span>
            </button>
            <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              View Live Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Free to install • No signup required • 5 daily AI replies included
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;