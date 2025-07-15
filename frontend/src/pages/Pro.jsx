import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Zap, Shield, Settings, Palette, BarChart3, 
  Clock, Mail, Brain, CheckCircle, X, Crown, Sparkles, Download 
} from 'lucide-react';
import { openChromeExtension } from '../utils/constants';

const Pro = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const proFeatures = [
    {
      id: 'unlimited',
      icon: <Zap className="w-6 h-6" />,
      title: 'Unlimited AI Generations',
      summary: 'No daily limits - generate as many replies as you need',
      description: 'Remove all restrictions and generate unlimited AI-powered email replies. Perfect for professionals, sales teams, and heavy email users.',
      useCase: 'Sales manager handling 50+ client emails daily gets unlimited smart replies instead of being limited to 25.',
      pricing: true
    },
    {
      id: 'multiReply',
      icon: <Mail className="w-6 h-6" />,
      title: 'Multi-Reply Options',
      summary: 'Get 3 different response variants for every email',
      description: 'Choose from Brief, Detailed, and Casual response styles. Preview all options before selecting the perfect reply.',
      useCase: 'Customer support agent gets formal, friendly, and detailed response options for the same inquiry.',
      pricing: false
    },
    {
      id: 'smartClassification',
      icon: <Brain className="w-6 h-6" />,
      title: 'Smart Email Classification',
      summary: 'AI automatically detects email type and adjusts tone',
      description: 'Automatically classify emails as meeting requests, complaints, sales inquiries, or formal business and adjust response tone accordingly.',
      useCase: 'AI detects a complaint email and automatically uses apologetic, solution-focused tone.',
      pricing: false
    },
    {
      id: 'advancedStyles',
      icon: <Palette className="w-6 h-6" />,
      title: 'Advanced Writing Styles',
      summary: 'Custom prompts and industry-specific templates',
      description: 'Create personalized writing styles, save multiple templates, and use industry-specific response patterns.',
      useCase: 'Legal professional saves formal legal language templates, while startup founder uses casual, innovative tone.',
      pricing: false
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Usage Analytics & Insights',
      summary: 'Track productivity gains and response patterns',
      description: 'Detailed analytics showing time saved, response effectiveness, and usage patterns with productivity insights.',
      useCase: 'Marketing manager sees 3.2 hours saved weekly and 95% customer satisfaction on AI-generated responses.',
      pricing: false
    },
    {
      id: 'priority',
      icon: <Shield className="w-6 h-6" />,
      title: 'Priority Support',
      summary: '24/7 dedicated support and feature requests',
      description: 'Get priority customer support, feature request access, and early access to new AI models and capabilities.',
      useCase: 'Enterprise user gets same-day response for integration help and early access to GPT-5 integration.',
      pricing: false
    }
  ];

  const toggleFeature = (featureId) => {
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Crown className="w-12 h-12 text-yellow-300" />
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">Coming Soon</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              SmartReply+ <span className="text-yellow-300">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Supercharge your email productivity with unlimited AI power
            </p>
            
            {/* Pricing */}
            <div className="bg-white/10 backdrop-blur-sm inline-block p-8 rounded-2xl mb-8">
              <div className="text-4xl font-bold mb-2">
                $4.99 <span className="text-lg font-normal">USD</span> / 
                ₹299 <span className="text-lg font-normal">INR</span>
              </div>
              <div className="text-blue-200">per month</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join Waitlist</span>
              </button>
              <button 
                onClick={openChromeExtension}
                className="border-2 border-white text-white text-lg px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Try Free Version</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unlock Premium Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to master email productivity
          </p>
        </div>

        <div className="space-y-4">
          {proFeatures.map((feature) => (
            <div key={feature.id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div 
                className="p-6 cursor-pointer flex items-center justify-between bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => toggleFeature(feature.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.summary}
                    </p>
                  </div>
                  {feature.pricing && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">Pricing Applies</span>
                  )}
                </div>
                <div className="text-gray-400 text-2xl font-bold">
                  {expandedFeature === feature.id ? '−' : '+'}
                </div>
              </div>
              
              {/* Expandable Content - FIXED STRUCTURE */}
              <div className={`transition-all duration-300 overflow-hidden ${expandedFeature === feature.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Feature Details
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Use Case Example
                      </h4>
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-700 dark:text-gray-300">
                          {feature.useCase}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Free vs Pro Comparison
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Version */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Free Version
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">5 AI replies per day</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">5 tone options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Basic Gmail integration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-500">Multi-reply options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-500">Custom writing styles</span>
                </li>
                <li className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-gray-500">Analytics & insights</span>
                </li>
              </ul>
            </div>

            {/* Pro Version */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 shadow-lg border-2 border-yellow-400">
              <div className="text-center mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-2 inline-block">Coming Soon</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Pro Version
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited AI replies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">3 response variants</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Smart email classification</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Custom writing styles</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Usage analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                </li>
              </ul>
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full mt-6 py-3 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Crown className="w-4 h-4" />
                <span>Join Waitlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Installation CTA */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start with the Free Version Today
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Experience SmartReply+ with 25 daily replies using our Chrome extension
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openChromeExtension}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Install Chrome Extension</span>
            </button>
            <Link
              to="/"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Try Web Demo</span>
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Free to install • No signup required • 25 daily AI replies with extension
          </p>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <WaitlistModal onClose={() => setShowWaitlistModal(false)} />
      )}
    </div>
  );
};

// Waitlist Modal Component
const WaitlistModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API endpoint for waitlist
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'pro-page'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        showToast('Successfully joined the waitlist!', 'success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join waitlist');
      }
    } catch (error) {
      showToast(error.message || 'Failed to join waitlist. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.querySelector('.toast-container') || 
      (() => {
        const div = document.createElement('div');
        div.className = 'toast-container';
        document.body.appendChild(div);
        return div;
      })();
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      if (type === 'success') {
        setTimeout(onClose, 1000);
      }
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We'll notify you as soon as SmartReply+ Pro becomes available!
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Join Pro Waitlist</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email address"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">What you'll get:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• Early access notification</li>
              <li>• Exclusive launch discount</li>
              <li>• Priority onboarding</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full py-3 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>Joining...</span>
              </>
            ) : (
              <>
                <Crown className="w-4 h-4" />
                <span>Join Waitlist</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pro;