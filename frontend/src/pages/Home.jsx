import React, { useState } from 'react';
import { Zap, Mail, MessageSquare, MessageCircle } from 'lucide-react';
import EmailForm from '../components/home/EmailForm';
import ReplyDisplay from '../components/home/ReplyDisplay';
import UsageCounter from '../components/home/UsageCounter';
import ExtensionPrompt from '../components/home/ExtensionPrompt';
import { emailService } from '../services/api';

const Home = () => {
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showExtensionPrompt, setShowExtensionPrompt] = useState(false);
  const [error, setError] = useState('');
  const [usageRefreshTrigger, setUsageRefreshTrigger] = useState(0);

  const handleEmailSubmit = async (emailData) => {
    setIsLoading(true);
    setError('');
    setReply('');

    try {
      const response = await emailService.generateReply(emailData);
      setReply(response);
      setUsageRefreshTrigger(prev => prev + 1); // Refresh usage counter
      
      // Show extension prompt after successful API call
      setTimeout(() => {
        setShowExtensionPrompt(true);
      }, 2000);
      
    } catch (error) {
      console.error('Error generating reply:', error);
      setError(error.message || 'Failed to generate reply. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowExtensionPrompt = () => {
    setShowExtensionPrompt(true);
  };

  const handleCloseExtensionPrompt = () => {
    setShowExtensionPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Generate AI-Powered
            <span className="block text-blue-200">Email Replies Instantly</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Supercharge your email productivity with Gemini AI. One click, smart reply.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Instant Generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Multiple Tones</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Gmail Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
            
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Error generating reply
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reply Display */}
            <ReplyDisplay 
              reply={reply} 
              isLoading={isLoading} 
              onShowExtensionPrompt={handleShowExtensionPrompt}
            />
          </div>

          {/* Right Column - Usage Counter */}
          <div className="space-y-6">
            <UsageCounter refreshTrigger={usageRefreshTrigger} />
            
            {/* Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                How it works
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">1</span>
                  </div>
                  <p>Paste the email you want to reply to</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">2</span>
                  </div>
                  <p>Choose your preferred tone (professional, friendly, etc.)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">3</span>
                  </div>
                  <p>Click generate and get your AI-powered reply</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">4</span>
                  </div>
                  <p>Copy and use in your email client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extension Prompt Modal */}
      <ExtensionPrompt 
        isVisible={showExtensionPrompt} 
        onClose={handleCloseExtensionPrompt} 
      />
    </div>
  );
};

export default Home;