import React, { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import Chart from 'chart.js/auto';

const EmotionTrendsChart = ({ emotionHistory }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && emotionHistory.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: emotionHistory.map((_, i) => ''),
          datasets: [
            {
              label: 'Happy',
              data: emotionHistory.map(e => e.happy),
              borderColor: '#22c55e',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderWidth: 1.5,
              pointRadius: 0
            },
            {
              label: 'Neutral',
              data: emotionHistory.map(e => e.neutral),
              borderColor: '#71717a',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderWidth: 1.5,
              pointRadius: 0
            },
            {
              label: 'Angry',
              data: emotionHistory.map(e => e.angry),
              borderColor: '#ef4444',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderWidth: 1.5,
              pointRadius: 0
            },
            {
              label: 'Sad',
              data: emotionHistory.map(e => e.sad),
              borderColor: '#3b82f6',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderWidth: 1.5,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#71717a',
                font: { size: 10, family: 'Inter' },
                boxWidth: 8,
                boxHeight: 8,
                padding: 12,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: { color: '#3f3f46', font: { size: 9 } },
              grid: { color: '#1e1e2a', lineWidth: 0.5 },
              border: { display: false }
            },
            x: {
              ticks: { display: false },
              grid: { display: false },
              border: { display: false }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [emotionHistory]);

  return (
    <div className="bg-[#111118] border border-zinc-800/60 rounded-xl p-5 hidden lg:block">
      <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <TrendingUp size={13} className="text-zinc-500" />
        Emotion Trends
      </h3>
      <div className="h-44">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EmotionTrendsChart;