import React from 'react';
import { useSession } from '../context/SessionContext';
import FadeIn from './FadeIn';
import { Briefcase, Clock, CheckCircle2, Send, FileText, ArrowRight } from 'lucide-react';
import { PipelineStatus } from '../types';

export default function DealPipeline() {
  const { session, updatePipelineStatus } = useSession();
  
  const savedDeals = session.matchedDeals?.filter(d => session.savedDealIds.includes(d.id)) || [];

  const statusIcons: Record<PipelineStatus, React.ReactNode> = {
    'Reviewing': <Clock className="w-4 h-4 text-blue-400" />,
    'NDA Signed': <FileText className="w-4 h-4 text-purple-400" />,
    'LOI Sent': <Send className="w-4 h-4 text-yellow-400" />,
    'Under LOI': <CheckCircle2 className="w-4 h-4 text-green-400" />
  };

  const statusColors: Record<PipelineStatus, string> = {
    'Reviewing': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    'NDA Signed': 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    'LOI Sent': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    'Under LOI': 'bg-green-400/10 text-green-400 border-green-400/20'
  };

  const nextStatus: Record<PipelineStatus, PipelineStatus | null> = {
    'Reviewing': 'NDA Signed',
    'NDA Signed': 'LOI Sent',
    'LOI Sent': 'Under LOI',
    'Under LOI': null
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <FadeIn className="mb-12">
        <h2 className="font-display font-bold text-4xl text-white mb-4">Deal Pipeline</h2>
        <p className="text-gray-400">Track your progress from initial review to closing.</p>
      </FadeIn>

      {savedDeals.length === 0 ? (
        <FadeIn className="glass-card p-20 text-center border-dashed border-white/10">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-2">No deals in pipeline</h3>
          <p className="text-gray-400 mb-8">Save deals from the scout tool to start tracking them here.</p>
          <button className="bg-[#15F5BA] text-black font-display font-bold text-sm uppercase px-8 py-4 rounded-xl">
            Go to Scout Tool
          </button>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {savedDeals.map((deal, idx) => {
            const pipelineInfo = session.pipelineDeals.find(p => p.dealId === deal.id);
            const status = pipelineInfo?.status || 'Reviewing';
            const next = nextStatus[status];

            return (
              <FadeIn key={deal.id} delay={idx * 50}>
                <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                      {deal.industry === 'Facility Services' ? '🏢' : deal.industry === 'Light Manufacturing' ? '⚙️' : '💻'}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-white mb-1">{deal.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{deal.location}</span>
                        <span>•</span>
                        <span>${(deal.askingPrice / 1000000).toFixed(1)}M Asking</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${statusColors[status]}`}>
                      {statusIcons[status]}
                      {status}
                    </div>

                    {next && (
                      <button 
                        onClick={() => updatePipelineStatus(deal.id, next)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-all group"
                      >
                        Advance to {next}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}
    </div>
  );
}
