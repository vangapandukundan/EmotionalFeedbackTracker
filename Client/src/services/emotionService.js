export const processEmotionData = (rawEmotions) => {
  const emotions = {
    happy: rawEmotions.happy || 0,
    sad: rawEmotions.sad || 0,
    surprised: rawEmotions.surprised || 0,
    angry: rawEmotions.angry || 0,
    neutral: rawEmotions.neutral || 0
  };

  const dominantEmotion = Object.keys(emotions).reduce((a, b) =>
    emotions[a] > emotions[b] ? a : b
  );

  return {
    ...emotions,
    dominant: dominantEmotion,
    dominantConfidence: emotions[dominantEmotion]
  };
};

export const calculateEngagementScore = (engagement) => {
  const { eyeContact, attention, confidence } = engagement;
  return ((eyeContact + attention + confidence) / 3).toFixed(2);
};

export const getEmotionColor = (emotion) => {
  const colorMap = {
    happy: '#22c55e',
    sad: '#3b82f6',
    surprised: '#f59e0b',
    angry: '#ef4444',
    neutral: '#94a3b8'
  };
  return colorMap[emotion] || '#94a3b8';
};

export const getEmotionEmoji = (emotion) => {
  const emojiMap = {
    happy: '😊',
    sad: '😢',
    surprised: '😮',
    angry: '😠',
    neutral: '😐'
  };
  return emojiMap[emotion] || '😐';
};

export const normalizeEmotionScores = (emotions) => {
  const total = Object.values(emotions).reduce((sum, val) => sum + val, 0);
  
  if (total === 0) return emotions;

  return Object.keys(emotions).reduce((normalized, key) => {
    normalized[key] = (emotions[key] / total) * 100;
    return normalized;
  }, {});
};