import React from 'react';
import { Eye, Focus, ShieldCheck } from 'lucide-react';

const EngagementPanel = ({ engagement }) => {
  const metrics = [
    { label: 'Eye Contact', value: engagement.eyeContact, icon: Eye, color: 'text-cyan-400', bar: 'bg-cyan-500' },
    { label: 'Attention', value: engagement.attention, icon: Focus, color: 'text-violet-400', bar: 'bg-violet-500' },
    { label: 'Confidence', value: engagement.confidence, icon: ShieldCheck, color: 'text-amber-400', bar: 'bg-amber-500' },
  ];

  return (
    <div className="bg-[#111118] border border-zinc-800/60 rounded-xl p-5 flex-1">
      <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-5">Engagement</h3>

      <div className="space-y-4">
        {metrics.map(({ label, value, icon: Icon, color, bar }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Icon size={13} className={color} />
                <span className="text-[12px] text-zinc-400 font-medium">{label}</span>
              </div>
              <span className={`text-[12px] font-mono font-semibold ${color}`}>
                {Math.round(value)}%
              </span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
              <div
                className={`${bar} h-1.5 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementPanel;