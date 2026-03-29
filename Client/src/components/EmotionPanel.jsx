import React from 'react';

const EmotionPanel = ({ emotions }) => {
  const emotionKeys = Object.keys(emotions).filter(
    key => !['dominantemotion', 'timestamp'].includes(key.toLowerCase())
  );

  const dominantEmotion = emotionKeys.length > 0
    ? emotionKeys.reduce((a, b) => emotions[a] > emotions[b] ? a : b)
    : 'neutral';

  const emojiMap = {
    happy: '😊',
    sad: '😔',
    surprised: '😲',
    angry: '😠',
    neutral: '😐'
  };

  const colorMap = {
    happy: 'bg-emerald-500',
    sad: 'bg-blue-500',
    surprised: 'bg-amber-500',
    angry: 'bg-red-500',
    neutral: 'bg-zinc-500'
  };

  return (
    <div className="bg-[#111118] border border-zinc-800/60 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">Detected Emotion</h3>
        <span className="text-lg">{emojiMap[dominantEmotion.toLowerCase()] || '😐'}</span>
      </div>

      {/* Dominant emotion */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-2xl font-bold text-white capitalize">{dominantEmotion}</span>
        <span className="text-[12px] font-mono text-indigo-400">{Math.round(emotions[dominantEmotion] || 0)}%</span>
      </div>

      {/* Bars */}
      <div className="space-y-3">
        {emotionKeys.map(emotion => {
          const value = emotions[emotion];
          return (
            <div key={emotion}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-zinc-500 capitalize font-medium">{emotion}</span>
                <span className="text-[11px] text-zinc-400 font-mono">{Math.round(value)}%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`${colorMap[emotion.toLowerCase()] || 'bg-indigo-500'} h-1.5 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${Math.min(value, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionPanel;