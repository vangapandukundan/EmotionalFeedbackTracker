import { useState, useRef, useEffect, useCallback } from 'react';
import * as faceapi from '@vladmandic/face-api';

const useEmotionTracking = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const [isTracking, setIsTracking] = useState(false);
  const [trackingMode, setTrackingMode] = useState('realtime'); // 'realtime' or 'photo'
  const [countdown, setCountdown] = useState(null);
  
  const [emotions, setEmotions] = useState({
    happy: 0,
    sad: 0,
    surprised: 0,
    angry: 0,
    neutral: 0
  });
  const [engagement, setEngagement] = useState({
    eyeContact: 0,
    attention: 0,
    confidence: 0
  });
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [latency, setLatency] = useState(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  
  const sessionLogRef = useRef([]);

  const isTrackingRef = useRef(isTracking);
  const trackingModeRef = useRef(trackingMode);

  const modelsLoadedRef = useRef(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        modelsLoadedRef.current = true;
      } catch (err) {
        console.error("Failed to load models", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => { isTrackingRef.current = isTracking; }, [isTracking]);
  useEffect(() => { 
    trackingModeRef.current = trackingMode; 
    if (trackingMode === 'realtime' && isTracking && modelsLoaded) {
      processFrame();
    }
  }, [trackingMode, isTracking, modelsLoaded]);


  const processFrame = useCallback(async () => {
    if (!isTrackingRef.current) return;

    if (!modelsLoadedRef.current) {
      if (trackingModeRef.current === 'realtime') {
        animationRef.current = requestAnimationFrame(processFrame);
      }
      return;
    }

    const startTime = performance.now();

    if (videoRef.current && videoRef.current.readyState >= 2) {
      try {
        const detections = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.25 })
        ).withFaceLandmarks().withFaceExpressions();

        if (detections && isTrackingRef.current) {
          // Draw tracking visuals
          if (canvasRef.current) {
            const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
            faceapi.matchDimensions(canvasRef.current, displaySize);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Draw custom bounding box
            const box = resizedDetections.detection.box;
            new faceapi.draw.DrawBox(box, { label: 'Face', lineWidth: 2, boxColor: '#6366f1' }).draw(canvasRef.current);
            
            // Draw landmarks
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections, { drawLines: true, color: '#22d3ee', lineWidth: 1 });
          }

          const expr = detections.expressions;
          const newEmotions = {
            happy: expr.happy * 100,
            sad: expr.sad * 100,
            surprised: expr.surprised * 100,
            angry: expr.angry * 100,
            neutral: expr.neutral * 100
          };
          
          setEmotions(newEmotions);
          
          const engagementMetrics = {
            eyeContact: (expr.neutral + expr.happy) > 0.5 ? 85 : 45,
            attention: detections.detection.score * 100,
            confidence: detections.detection.score * 100
          };

          setEngagement({
            eyeContact: engagementMetrics.eyeContact,
            attention: engagementMetrics.attention,
            confidence: engagementMetrics.confidence
          });

          const logEntry = {
            timestamp: Date.now(),
            ...newEmotions,
            ...engagementMetrics
          };

          sessionLogRef.current.push(logEntry);

          setEmotionHistory(prev => {
            const newHistory = [...prev, logEntry];
            return newHistory.slice(-30);
          });

          const endTime = performance.now();
          setLatency(Math.round(endTime - startTime));
        }
      } catch (error) {
        console.error('Analysis error:', error);
      }
    }

    if (isTrackingRef.current && trackingModeRef.current === 'realtime') {
      animationRef.current = requestAnimationFrame(processFrame);
    }
  }, []);

  const takePhoto = () => {
    if (countdown !== null) return;
    let count = 5;
    setCountdown(count);
    const intervalId = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(intervalId);
        setCountdown(null);
        processFrame();
      }
    }, 1000);
  };

  const startTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsTracking(true);
        sessionLogRef.current = []; // Clear session log on new tracking start
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Unable to access webcam');
    }
  };

  const stopTracking = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setCountdown(null);
    setIsTracking(false);
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  const exportSessionData = () => {
    if (sessionLogRef.current.length === 0) {
      alert("No session data recorded yet.");
      return;
    }
    
    const headers = ['Timestamp', 'Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'EyeContact', 'Attention', 'Confidence'];
    const rows = sessionLogRef.current.map(row => [
      new Date(row.timestamp).toISOString(),
      row.happy?.toFixed(2) || '0.00',
      row.sad?.toFixed(2) || '0.00',
      row.angry?.toFixed(2) || '0.00',
      row.surprised?.toFixed(2) || '0.00',
      row.neutral?.toFixed(2) || '0.00',
      row.eyeContact?.toFixed(2) || '0.00',
      row.attention?.toFixed(2) || '0.00',
      row.confidence?.toFixed(2) || '0.00'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `lumina_session_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    isTracking,
    trackingMode,
    setTrackingMode,
    countdown,
    takePhoto,
    emotions,
    engagement,
    emotionHistory,
    latency,
    startTracking,
    stopTracking,
    exportSessionData,
    videoRef,
    canvasRef
  };
};

export default useEmotionTracking;