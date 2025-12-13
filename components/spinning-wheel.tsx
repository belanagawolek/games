'use client';

import { useEffect, useState } from 'react';

type SpinningWheelProps = {
  onComplete: () => void;
  duration?: number;
};

function getRandom(){
    return Math.random();
}

export function SpinningWheel({
  onComplete,
  duration = 3000,
}: SpinningWheelProps) {
  const [rotation, setRotation] = useState(5 + getRandom() * 3);

  useEffect(() => {
    // Start spinning animation
    const totalRotations = 5 + Math.random() * 3; // 5-8 full rotations
    const finalRotation = totalRotations * 360;

    setRotation(finalRotation);

    // Call onComplete after animation finishes
    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-64 h-64">
        {/* Wheel container */}
        <div
          className="absolute inset-0 rounded-full border-8 border-blue-500 bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl flex items-center justify-center"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {/* Wheel segments visualization */}
          <div className="w-full h-full relative">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left h-1 bg-white/30"
                style={{
                  width: '50%',
                  transform: `rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>

          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 shadow-lg flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" />
            </div>
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-red-500" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Teams werden generiert...
        </h2>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          />
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
      </div>
    </div>
  );
}
