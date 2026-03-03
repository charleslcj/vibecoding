import React from 'react';
import FadeIn from './FadeIn';
import { Trophy, Users, BarChart3, TrendingUp, Award, Flame, Target, Zap, Shield, Star } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export default function CommunityHub() {
  const { session } = useSession();

  const leaderboard = [
    { name: "The Dealmaker", archetype: "The Driver", level: 12, xp: 12450, dealsReviewed: 42, lois: 2, days: 58, avatar: "DM", color: "#15F5BA" },
    { name: "Systems Master", archetype: "The Systems Builder", level: 10, xp: 10200, dealsReviewed: 38, lois: 1, days: 47, avatar: "SM", color: "#15F5BA" },
    { name: "Risk Mitigator", archetype: "The Guardian", level: 9, xp: 9150, dealsReviewed: 25, lois: 0, days: 31, avatar: "RM", color: "#836FFF" },
    { name: "Strategic Guide", archetype: "The Guide", level: 8, xp: 8400, dealsReviewed: 31, lois: 0, days: 42, avatar: "SG", color: "#FFD65A" },
    { name: "The Operator", archetype: "The Systems Builder", level: 8, xp: 8100, dealsReviewed: 29, lois: 1, days: 25, avatar: "OP", color: "#15F5BA" },
    { name: "Growth Hacker", archetype: "The Driver", level: 7, xp: 7600, dealsReviewed: 22, lois: 0, days: 19, avatar: "GH", color: "#836FFF" },
    { name: "Steady Hand", archetype: "The Guardian", level: 6, xp: 6200, dealsReviewed: 18, lois: 0, days: 34, avatar: "SH", color: "#FFD65A" },
    { name: "Visionary Leader", archetype: "The Guide", level: 5, xp: 5800, dealsReviewed: 15, lois: 0, days: 12, avatar: "VL", color: "#15F5BA" },
    { name: "The Closer", archetype: "The Driver", level: 5, xp: 5400, dealsReviewed: 12, lois: 0, days: 28, avatar: "TC", color: "#836FFF" },
    { name: "Process King", archetype: "The Systems Builder", level: 4, xp: 4900, dealsReviewed: 10, lois: 0, days: 15, avatar: "PK", color: "#15F5BA" },
  ];

  const cohort = [
    { name: "Alex B.", industry: "B2B Services", location: "TX", avatar: "AB" },
    { name: "Jordan S.", industry: "B2B Services", location: "CA", avatar: "JS" },
    { name: "Taylor W.", industry: "B2B Services", location: "NY", avatar: "TW" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <FadeIn className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#15F5BA]/10 text-[#15F5BA] border border-[#15F5BA]/20 mb-6">
          <Users className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Community Hub</span>
        </div>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">You're not searching alone</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Join 847 other operators on the quest to acquisition. Share insights, compare deals, and climb the ranks.</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {/* LEADERBOARD */}
        <FadeIn className="lg:col-span-2 glass-card p-8 border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-[#FFD65A]" />
              <h3 className="font-display font-bold text-2xl text-white">Top Searchers</h3>
            </div>
            <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Weekly Leaderboard</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/5">
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">Rank</th>
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">Operator</th>
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">Archetype</th>
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">Level</th>
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">XP</th>
                  <th className="pb-4 font-display font-bold text-[11px] uppercase tracking-widest text-gray-500">Deals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leaderboard.map((user, idx) => (
                  <tr key={idx} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <span className={`font-display font-bold text-sm ${idx < 3 ? 'text-[#FFD65A]' : 'text-gray-500'}`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white border border-white/10">
                          {user.avatar}
                        </div>
                        <span className="font-medium text-white group-hover:text-[#15F5BA] transition-colors">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.archetype}</span>
                    </td>
                    <td className="py-4">
                      <span className="bg-gray-800 text-gray-300 text-[10px] px-2 py-0.5 rounded-full font-bold">LVL {user.level}</span>
                    </td>
                    <td className="py-4 text-sm text-gray-300">{user.xp.toLocaleString()}</td>
                    <td className="py-4 text-sm text-gray-300">{user.dealsReviewed}</td>
                  </tr>
                ))}
                {/* Current User Rank */}
                <tr className="bg-[#15F5BA]/5 border-t-2 border-[#15F5BA]/20">
                  <td className="py-6">
                    <span className="font-display font-bold text-sm text-[#15F5BA]">#{session.rank}</span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#15F5BA] flex items-center justify-center text-xs font-bold text-black border border-[#15F5BA]/30">
                        {session.email ? session.email[0].toUpperCase() : 'U'}
                      </div>
                      <span className="font-bold text-white">You (Operator)</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="text-[10px] font-bold text-[#15F5BA] uppercase tracking-widest">{session.archetype || 'Pending'}</span>
                  </td>
                  <td className="py-6">
                    <span className="bg-[#15F5BA] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">LVL {session.level}</span>
                  </td>
                  <td className="py-6 text-sm font-bold text-white">{session.xp.toLocaleString()}</td>
                  <td className="py-6 text-sm text-gray-300">{session.savedDealIds.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* SIDEBAR */}
        <div className="space-y-8">
          {/* WEEKLY CHALLENGE */}
          <FadeIn delay={100} className="glass-card p-8 border-[#836FFF]/30 bg-gradient-to-br from-[#0A0A0F] to-[#1A1A2E] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-20 h-20 text-[#836FFF]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-[#FFD65A]" />
                <h3 className="font-display font-bold text-xl text-white">Weekly Challenge</h3>
              </div>
              <h4 className="text-2xl font-display font-bold text-white mb-2">Review 10 Deal CIMs</h4>
              <p className="text-sm text-gray-400 mb-8">Analyze 10 deal listings this week to earn a massive XP bonus and the "Analyst" badge.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-[#15F5BA]">{session.savedDealIds.length} / 10</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#15F5BA] to-[#836FFF]"
                    style={{ width: `${Math.min(100, (session.savedDealIds.length / 10) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[#FFD65A]" />
                  <span className="text-sm font-bold text-white">+500 XP Bonus</span>
                </div>
                <span className="text-[10px] text-gray-500 uppercase font-bold">4 Days Left</span>
              </div>
            </div>
          </FadeIn>

          {/* COHORT MATCHING */}
          <FadeIn delay={200} className="glass-card p-6 border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-[#836FFF]" />
              <h3 className="font-display font-bold text-lg text-white">Industry Cohort</h3>
            </div>
            <p className="text-xs text-gray-400 mb-6">3 other searchers in your industry looking for similar businesses:</p>
            
            <div className="space-y-4">
              {cohort.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#836FFF]/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white group-hover:bg-[#836FFF] transition-colors">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{member.industry} • {member.location}</div>
                    </div>
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-[#836FFF] transition-colors" />
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-[#836FFF]/10 text-[#836FFF] font-display font-bold text-xs uppercase tracking-widest hover:bg-[#836FFF]/20 transition-all">
              Join Cohort Chat →
            </button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
