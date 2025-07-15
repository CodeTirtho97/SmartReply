import React from 'react';
import { Download, X, Zap, Crown, Palette, Settings } from 'lucide-react';
import { openChromeExtension } from '../../utils/constants';

const ExtensionPrompt = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleInstallClick = () => {
  openChromeExtension();
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Download className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Unlock 5x More Replies!
            </h2>
            <p className="text-blue-100">
              Get 25 daily AI replies + custom writing styles
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">25 Daily Replies</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">vs 5 on web version</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Palette className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Custom Writing Styles</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Personalize AI to match your voice</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">One-Click Integration</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Works directly in Gmail</div>
              </div>
            </div>
          </div>

          {/* Demo Section - FIXED DESIGN */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-3">
              <Palette className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Custom Style Demo</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-600 rounded-lg p-3 border-l-4 border-blue-500">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Your Style:</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">"Keep it friendly and use emojis"</div>
              </div>
              <div className="bg-white dark:bg-gray-600 rounded-lg p-3 border-l-4 border-green-500">
                <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">AI Reply:</div>
                <div className="text-sm text-gray-800 dark:text-gray-200">"Thanks for reaching out! 😊 I'll get back to you shortly..."</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleInstallClick}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Install Free Extension</span>
            </button>
            
            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Continue with 5 daily replies
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Free to install • No signup required • Works with any Gmail account
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPrompt;