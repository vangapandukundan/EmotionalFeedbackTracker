export const drawFaceLandmarks = (ctx, landmarks, boundingBox) => {
  if (!ctx || !landmarks || !boundingBox) return;

  // Draw bounding box
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.strokeRect(
    boundingBox.x,
    boundingBox.y,
    boundingBox.width,
    boundingBox.height
  );

  // Draw landmarks
  ctx.fillStyle = '#00ff00';
  landmarks.forEach(landmark => {
    ctx.beginPath();
    ctx.arc(landmark.x, landmark.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Label landmarks
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.fillText(landmark.type, landmark.x + 5, landmark.y - 5);
    ctx.fillStyle = '#00ff00';
  });
};

export const simulateFaceLandmarks = (width, height) => {
  const faceX = width * 0.3;
  const faceY = height * 0.2;
  const faceW = width * 0.4;
  const faceH = height * 0.5;

  return {
    boundingBox: {
      x: faceX,
      y: faceY,
      width: faceW,
      height: faceH
    },
    landmarks: [
      { x: faceX + faceW * 0.3, y: faceY + faceH * 0.3, type: 'LeftEye' },
      { x: faceX + faceW * 0.7, y: faceY + faceH * 0.3, type: 'RightEye' },
      { x: faceX + faceW * 0.5, y: faceY + faceH * 0.5, type: 'Nose' },
      { x: faceX + faceW * 0.3, y: faceY + faceH * 0.7, type: 'LeftMouth' },
      { x: faceX + faceW * 0.7, y: faceY + faceH * 0.7, type: 'RightMouth' },
      { x: faceX + faceW * 0.5, y: faceY + faceH * 0.7, type: 'MouthCenter' }
    ]
  };
};

export const calculateEyeContact = (landmarks) => {
  // Simulate eye contact calculation based on eye landmarks
  if (!landmarks || landmarks.length === 0) return 0;

  const leftEye = landmarks.find(l => l.type === 'LeftEye');
  const rightEye = landmarks.find(l => l.type === 'RightEye');

  if (!leftEye || !rightEye) return 0;

  // Simple simulation - in production use actual eye gaze detection
  return 60 + Math.random() * 40;
};

export const detectFacePresence = (boundingBox, canvasWidth, canvasHeight) => {
  if (!boundingBox) return false;

  const { x, y, width, height } = boundingBox;
  
  // Check if face is within reasonable bounds
  return (
    x >= 0 &&
    y >= 0 &&
    x + width <= canvasWidth &&
    y + height <= canvasHeight &&
    width > 50 &&
    height > 50
  );
};