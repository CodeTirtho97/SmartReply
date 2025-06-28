import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { canMakeApiCall, incrementApiUsage } from '../../utils/storage';

const EmailForm = ({ onSubmit, isLoading }) => {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('professional');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!emailContent.trim()) {
      alert('Please enter the email content to reply to.');
      return;
    }

    if (!canMakeApiCall()) {
      alert('You have reached your daily limit of 5 API calls. Please try again tomorrow or install our Chrome extension for unlimited usage!');
      return;
    }

    // Increment usage count
    incrementApiUsage();
    
    // Submit the form
    onSubmit({ emailContent: emailContent.trim(), tone });
  };

  const toneOptions = [
    { value: 'professional', label: 'Professional', desc: 'Formal and business-appropriate' },
    { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', desc: 'Relaxed and informal' },
    { value: 'formal', label: 'Formal', desc: 'Very formal and respectful' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-blue rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Generate Smart Reply
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Paste the email you want to reply to and choose your preferred tone
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Email Content Input */}
        <div>
          <label htmlFor="emailContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Original Email Content
          </label>
          <textarea
            id="emailContent"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste the email you want to reply to here..."
            rows={8}
            className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[120px]"
            disabled={isLoading}
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Include the full email for better context and more accurate replies
          </p>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Reply Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toneOptions.map((option) => (
              <label
                key={option.value}
                className={`relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  tone === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={tone === option.value}
                  onChange={(e) => setTone(e.target.value)}
                  className="sr-only"
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full border-2 mr-3 ${
                      tone === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {tone === option.value && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        tone === option.value
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.label}
                      </div>
                      <div className={`text-xs ${
                        tone === option.value
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {option.desc}
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Powered by Gemini AI • Free tier: 5 calls per day
          </p>
          <button
            type="submit"
            disabled={isLoading || !canMakeApiCall() || !emailContent.trim()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Reply
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailForm;