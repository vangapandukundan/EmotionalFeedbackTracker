import React, { useEffect, useRef } from 'react';
import { BarChart3 } from 'lucide-react';
import Chart from 'chart.js/auto';

const EngagementChart = ({ engagement }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Eye Contact', 'Attention', 'Confidence'],
          datasets: [{
            data: [engagement.eyeContact, engagement.attention, engagement.confidence],
            backgroundColor: [
              'rgba(34, 211, 238, 0.6)',
              'rgba(139, 92, 246, 0.6)',
              'rgba(251, 191, 36, 0.6)'
            ],
            borderColor: [
              '#22d3ee',
              '#8b5cf6',
              '#fbbf24'
            ],
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 28
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: false }
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
              ticks: { color: '#71717a', font: { size: 10, family: 'Inter' } },
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
  }, [engagement]);

  return (
    <div className="bg-[#111118] border border-zinc-800/60 rounded-xl p-5 hidden lg:block">
      <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <BarChart3 size={13} className="text-zinc-500" />
        Engagement Overview
      </h3>
      <div className="h-44">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default EngagementChart;