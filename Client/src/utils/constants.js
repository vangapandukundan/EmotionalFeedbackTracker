export const EMOTION_TYPES = {
  HAPPY: 'happy',
  SAD: 'sad',
  SURPRISED: 'surprised',
  ANGRY: 'angry',
  NEUTRAL: 'neutral'
};

export const ENGAGEMENT_METRICS = {
  EYE_CONTACT: 'eyeContact',
  ATTENTION: 'attention',
  CONFIDENCE: 'confidence'
};

export const CHART_COLORS = {
  HAPPY: '#22c55e',
  SAD: '#3b82f6',
  SURPRISED: '#f59e0b',
  ANGRY: '#ef4444',
  NEUTRAL: '#94a3b8',
  EYE_CONTACT: '#3b82f6',
  ATTENTION: '#a855f7',
  CONFIDENCE: '#ec4899'
};

export const VIDEO_CONSTRAINTS = {
  width: { ideal: 640 },
  height: { ideal: 480 },
  facingMode: 'user',
  frameRate: { ideal: 30 }
};

export const API_ENDPOINTS = {
  ANALYZE_FRAME: '/api/emotion/analyze',
  HEALTH_CHECK: '/api/emotion/health'
};

export const LATENCY_THRESHOLD = {
  EXCELLENT: 50,
  GOOD: 100,
  ACCEPTABLE: 120,
  POOR: 200
};

export const MAX_HISTORY_LENGTH = 30;

export const EMOTION_EMOJIS = {
  [EMOTION_TYPES.HAPPY]: '😊',
  [EMOTION_TYPES.SAD]: '😢',
  [EMOTION_TYPES.SURPRISED]: '😮',
  [EMOTION_TYPES.ANGRY]: '😠',
  [EMOTION_TYPES.NEUTRAL]: '😐'
};

export const CHART_OPTIONS = {
  LINE_CHART: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        labels: { color: '#e2e8f0' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      }
    }
  },
  BAR_CHART: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        labels: { color: '#e2e8f0' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      },
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      }
    }
  }
};