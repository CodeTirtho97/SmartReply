import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { emailService } from '../../services/api';

const UsageCounter = ({ refreshTrigger }) => {
  const [usageData, setUsageData] = useState({
    currentUsage: 0,
    remainingCalls: 5,
    maxCalls: 5,
    canMakeCall: true
  });

  useEffect(() => {
    fetchUsage();
  }, [refreshTrigger]);

  const fetchUsage = async () => {
    try {
      const data = await emailService.getUsage();
      setUsageData(data);
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const getStatusColor = () => {
    if (usageData.remainingCalls === 0) return 'text-red-500';
    if (usageData.remainingCalls <= 2) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressColor = () => {
    if (usageData.remainingCalls === 0) return 'bg-red-500';
    if (usageData.remainingCalls <= 2) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const progressPercentage = (usageData.currentUsage / usageData.maxCalls) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            API Usage
          </h3>
        </div>
        <span className={`text-sm font-bold ${getStatusColor()}`}>
          {usageData.remainingCalls}/{usageData.maxCalls}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>
          {usageData.remainingCalls > 0 
            ? `${usageData.remainingCalls} calls remaining` 
            : 'Daily limit reached'
          }
        </span>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Resets daily at midnight</span>
        </div>
      </div>

      {usageData.remainingCalls === 0 && (
        <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-xs text-red-600 dark:text-red-400">
            You've reached your daily limit. Try again after the reset or install our Chrome extension for unlimited usage!
          </p>
        </div>
      )}
    </div>
  );
};

export default UsageCounter;