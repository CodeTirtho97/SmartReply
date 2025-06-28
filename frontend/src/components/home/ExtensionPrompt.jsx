import React from 'react';
import { Download, X, Star, Zap, Shield } from 'lucide-react';

const ExtensionPrompt = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleInstallClick = () => {
    // TODO: Replace with actual Chrome extension link when ready
    alert('Chrome extension coming soon! This will redirect to the Chrome Web Store.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="SmartReply+"
              className="w-8 h-8 rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Install SmartReply+
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-gradient-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Get Unlimited Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Install our Chrome extension for unlimited email replies directly in Gmail!
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Unlimited API calls
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  No daily limits or restrictions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  One-click replies in Gmail
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Generate replies directly in your inbox
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Privacy focused
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your emails stay secure and private
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleInstallClick}
              className="w-full bg-gradient-blue text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Install Chrome Extension</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Free to install • Works with any Gmail account
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPrompt;