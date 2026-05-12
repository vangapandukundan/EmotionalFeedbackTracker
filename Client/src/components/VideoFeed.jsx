import React from 'react';
import { Camera, VideoOff } from 'lucide-react';

const VideoFeed = ({ isTracking, trackingMode, setTrackingMode, countdown, takePhoto, latency, onStart, onStop, videoRef, canvasRef }) => {
  return (
    <div className="bg-[#111118] border border-zinc-800/60 rounded-xl overflow-hidden relative">
      {/* Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-[#0e0e14]">
        <div className="flex items-center gap-2.5">
          <Camera size={14} className="text-zinc-500" />
          <span className="text-[12px] font-medium text-zinc-400">Camera Feed</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mode Toggle */}
          <div className="flex bg-zinc-900 rounded-md p-0.5 border border-zinc-800/80">
            <button
              onClick={() => setTrackingMode('realtime')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                trackingMode === 'realtime'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Real-Time
            </button>
            <button
              onClick={() => setTrackingMode('photo')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                trackingMode === 'photo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Photo
            </button>
          </div>

          {/* Take Picture (photo mode) */}
          {isTracking && trackingMode === 'photo' && countdown === null && (
            <button
              onClick={takePhoto}
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              Capture
            </button>
          )}

          {/* Start / Stop */}
          {isTracking ? (
            <button
              onClick={onStop}
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold bg-red-600 text-white hover:bg-red-500 transition-colors flex items-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Stop
            </button>
          ) : (
            <button
              onClick={onStart}
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              Start
            </button>
          )}
        </div>
      </div>

      {/* Video Area */}
      <div className="relative bg-black/60 flex items-center justify-center" style={{ minHeight: '420px' }}>
        {/* Photo mode bounding box */}
        {isTracking && trackingMode === 'photo' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className={`border-2 border-dashed rounded-2xl w-80 h-96 flex items-center justify-center transition-all duration-300 ${
              countdown !== null
                ? 'border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                : 'border-zinc-500/50'
            }`}>
              {countdown === null ? (
                <span className="bg-black/60 text-zinc-300 px-3 py-1.5 rounded-md text-[12px] font-medium border border-zinc-700/50">
                  Position your face here
                </span>
              ) : (
                <span className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                  {countdown}
                </span>
              )}
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover z-10 transition-opacity duration-500 ${isTracking ? 'opacity-100' : 'opacity-0 absolute'}`}
        />
        <canvas
          ref={canvasRef}
          className={`absolute top-0 left-0 w-full h-full z-20 pointer-events-none transition-opacity duration-500 ${isTracking ? 'opacity-100' : 'opacity-0'}`}
        />

        {!isTracking && (
          <div className="relative z-10 flex flex-col items-center justify-center text-zinc-600 gap-3 py-20">
            <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <VideoOff size={24} className="text-zinc-600" />
            </div>
            <p className="text-[12px] font-medium text-zinc-600">Camera inactive</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;