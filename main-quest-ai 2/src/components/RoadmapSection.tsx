import React, { useState } from 'react';
import { useSession } from '../context/SessionContext';
import FadeIn from './FadeIn';

export default function RoadmapSection() {
  const { session, updateSession } = useSession();
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(2);

  const toggleMilestone = (id: number) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const milestones = [
    {
      id: 1,
      title: "Build Buyer Profile",
      status: "completed",
      icon: "✓",
      tasks: [
        { text: "Answer 12 questions", completed: true },
        { text: "Get archetype", completed: true },
        { text: "See matched deals", completed: true }
      ]
    },
    {
      id: 2,
      title: "Review Matched Deals",
      status: "active",
      icon: "2",
      tasks: [
        { text: "Review all 6 matched deals", completed: false },
        { text: "Save at least 2 deals to watchlist", completed: session.savedDealIds.length >= 2 },
        { text: "Read: Understanding EBITDA Multiples", completed: false }
      ]
    },
    {
      id: 3,
      title: "Sign NDA",
      status: "locked",
      icon: "3",
      unlockMessage: "Unlocks when you save 2 deals",
      tasks: []
    },
    {
      id: 4,
      title: "Diligence",
      status: "locked",
      icon: "4",
      unlockMessage: "Unlocks after NDA",
      tasks: []
    },
    {
      id: 5,
      title: "POF Verified",
      status: "locked",
      icon: "5",
      unlockMessage: "Unlocks after Diligence",
      tasks: []
    },
    {
      id: 6,
      title: "Submit LOI",
      status: "locked",
      icon: "6",
      unlockMessage: "Unlocks after POF",
      tasks: []
    },
    {
      id: 7,
      title: "Close",
      status: "locked",
      icon: "🏆",
      unlockMessage: "Unlocks after LOI",
      tasks: []
    }
  ];

  return (
    <div className="py-20 px-4 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)]">
      <div className="max-w-[800px] mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-[32px] text-[var(--color-text-primary)] mb-4">
              YOUR 90-DAY ACQUISITION ROADMAP
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-2 w-64 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] transition-all duration-1000"
                  style={{ width: '14%' }}
                ></div>
              </div>
              <span className="text-[14px] text-[var(--color-text-secondary)] font-medium">
                1 of 7 milestones complete
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div 
                key={milestone.id}
                className={`glass-card overflow-hidden transition-all duration-300 ${
                  milestone.status === 'locked' ? 'opacity-60' : ''
                } ${expandedMilestone === milestone.id ? 'border-[var(--color-accent-primary)]' : ''}`}
              >
                <div 
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-[var(--color-bg-elevated)]/50 transition-colors"
                  onClick={() => milestone.status !== 'locked' && toggleMilestone(milestone.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-[16px] ${
                      milestone.status === 'completed' ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]' :
                      milestone.status === 'active' ? 'bg-[var(--color-bg-elevated)] border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' :
                      'bg-[var(--color-bg-elevated)] border-2 border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div>
                      <h3 className={`font-display font-semibold text-[18px] ${
                        milestone.status === 'locked' ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
                      }`}>
                        {milestone.title}
                      </h3>
                      {milestone.status === 'locked' && (
                        <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
                          🔒 {milestone.unlockMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {milestone.status !== 'locked' && (
                    <div className={`text-[var(--color-text-secondary)] transition-transform duration-300 ${expandedMilestone === milestone.id ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  )}
                </div>

                {expandedMilestone === milestone.id && milestone.tasks.length > 0 && (
                  <div className="p-6 pt-0 border-t border-[var(--color-border-subtle)]/50 bg-[var(--color-bg-elevated)]/20">
                    <div className="space-y-3 mt-4">
                      {milestone.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${
                            task.completed 
                              ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)] text-[var(--color-bg-primary)]' 
                              : 'border-[var(--color-border-subtle)] text-transparent'
                          }`}>
                            ✓
                          </div>
                          <span className={`text-[15px] ${task.completed ? 'text-[var(--color-text-secondary)] line-through' : 'text-[var(--color-text-primary)]'}`}>
                            {task.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
