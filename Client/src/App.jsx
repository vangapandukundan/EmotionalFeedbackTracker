import React from 'react';
import { Download } from 'lucide-react';
import VideoFeed from './components/VideoFeed';
import EmotionPanel from './components/EmotionPanel';
import EngagementPanel from './components/EngagementPanel';
import EmotionTrendsChart from './components/EmotionTrendsChart';
import EngagementChart from './components/EngagementChart';
import useEmotionTracking from './hooks/useEmotionTracking';

function App() {
  const {
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
  } = useEmotionTracking();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200 font-['Inter']">
      {/* Top Bar */}
      <header className="border-b border-zinc-800/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">Emotion AI</h1>
            <p className="text-[11px] text-zinc-500 tracking-wide">Facial Expression Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportSessionData}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium text-zinc-400 bg-zinc-800/50 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-700/50 transition-colors"
          >
            <Download size={13} />
            Export CSV
          </button>
          {isTracking && (
            <span className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {latency}ms
            </span>
          )}
          <div className={`px-3 py-1 rounded-md text-[11px] font-medium tracking-wide ${isTracking ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'}`}>
            {isTracking ? 'LIVE' : 'OFFLINE'}
          </div>
        </div>
      </header>

      <div className="p-5 space-y-5 max-w-[1600px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          
          {/* Video Feed */}
          <div className="xl:col-span-8">
            <VideoFeed
              isTracking={isTracking}
              trackingMode={trackingMode}
              setTrackingMode={setTrackingMode}
              countdown={countdown}
              takePhoto={takePhoto}
              latency={latency}
              onStart={startTracking}
              onStop={stopTracking}
              videoRef={videoRef}
              canvasRef={canvasRef}
            />
          </div>

          {/* Right Column */}
          <div className="xl:col-span-4 flex flex-col gap-5">
            <EmotionPanel emotions={emotions} />
            <EngagementPanel engagement={engagement} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <EmotionTrendsChart emotionHistory={emotionHistory} />
          <EngagementChart engagement={engagement} />
        </div>
      </div>
    </div>
  );
}

export default App;