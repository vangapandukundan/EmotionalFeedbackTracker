export const initializeWebcam = async (constraints = {}) => {
  const defaultConstraints = {
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      facingMode: 'user',
      frameRate: { ideal: 30 }
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      ...defaultConstraints,
      ...constraints
    });
    return stream;
  } catch (error) {
    console.error('Webcam initialization error:', error);
    throw new Error('Failed to access webcam');
  }
};

export const stopWebcam = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};

export const captureVideoFrame = (videoElement, canvasElement) => {
  if (!videoElement || !canvasElement) return null;

  const context = canvasElement.getContext('2d');
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0);

  return canvasElement.toDataURL('image/jpeg', 0.8);
};

export const checkWebcamPermission = async () => {
  try {
    const result = await navigator.permissions.query({ name: 'camera' });
    return result.state; // 'granted', 'denied', or 'prompt'
  } catch (error) {
    console.error('Permission check error:', error);
    return 'unknown';
  }
};