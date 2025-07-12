import React, { useState, useEffect, useRef } from 'react';

const SmartLoadingButton = ({ 
  onClick, 
  children, 
  className = "", 
  disabled = false,
  isLoading = false, // Add this prop to control from parent
  ...props
}) => {
  const [loadingState, setLoadingState] = useState('idle');
  const [countdown, setCountdown] = useState(0);
  const startTimeRef = useRef(null);
  const timersRef = useRef([]);

  const loadingStates = {
    idle: {
      text: children,
      icon: "⚡",
      color: "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    },
    connecting: {
      text: "Connecting to server...",
      icon: "🔗",
      color: "from-gray-500 to-gray-600",
      showSpinner: true
    },
    cold_start: {
      text: "Server warming up...",
      icon: "🔥",
      color: "from-orange-500 to-red-600",
      showSpinner: true,
      showCountdown: true
    },
    processing: {
      text: "Generating your reply...",
      icon: "🤖",
      color: "from-green-500 to-blue-500",
      showSpinner: true
    }
  };

  // Reset state when external loading prop changes
  useEffect(() => {
    if (!isLoading && loadingState !== 'idle') {
      cleanup();
      setLoadingState('idle');
    }
  }, [isLoading, loadingState]);

  const cleanup = () => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
    setCountdown(0);
  };

  const handleClick = async () => {
    if (loadingState !== 'idle' || disabled) return;

    startTimeRef.current = Date.now();
    setLoadingState('connecting');
    setCountdown(30);

    // Set up progression timers
    const coldStartTimer = setTimeout(() => {
      setLoadingState('cold_start');
      setCountdown(25);
    }, 5000);

    const processingTimer = setTimeout(() => {
      setLoadingState('processing');
      setCountdown(15);
    }, 15000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    timersRef.current = [coldStartTimer, processingTimer, countdownInterval];

    try {
      await onClick();
    } catch (error) {
      console.error('Button click error:', error);
    } finally {
      cleanup();
      setLoadingState('idle');
    }
  };

  const currentState = loadingStates[loadingState];
  const isButtonLoading = loadingState !== 'idle' || isLoading;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isButtonLoading || disabled}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-white
          transition-all duration-300 transform
          ${isButtonLoading 
            ? `bg-gradient-to-r ${currentState.color} cursor-not-allowed` 
            : `bg-gradient-to-r ${currentState.color} hover:scale-105 shadow-lg hover:shadow-xl`
          }
          ${className}
        `}
        {...props}
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center">
            {currentState.showSpinner ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            ) : (
              <span className="text-lg mr-2">{currentState.icon}</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-base font-medium">
              {currentState.text}
            </span>
            
            {currentState.showCountdown && countdown > 0 && (
              <span className="text-sm opacity-80 font-normal">
                ~{countdown}s remaining
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Progress bar */}
      {isButtonLoading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full bg-gradient-to-r ${currentState.color} transition-all duration-1000`}
              style={{
                width: loadingState === 'connecting' ? '20%' :
                       loadingState === 'cold_start' ? '50%' :
                       loadingState === 'processing' ? '80%' : '0%'
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartLoadingButton;