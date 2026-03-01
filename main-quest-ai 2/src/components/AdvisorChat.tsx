import React, { useState, useRef, useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import { advisorChat } from '../ai/flows/advisor-chat';

export default function AdvisorChat() {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! I'm your AI M&A Advisor. I can help you analyze deals, understand SBA loans, or plan your acquisition roadmap. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What's a good EBITDA multiple?",
    "How does SBA 7(a) work?",
    "Analyze my top matched deal"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    setSuggestions([]);

    try {
      const response = await advisorChat(
        text,
        newMessages.map(m => ({ role: m.role, content: m.content })),
        session.buyerProfile,
        session.matchedDeals
      );

      setMessages(prev => [...prev, { role: 'assistant', content: response.response }]);
      setSuggestions(response.suggestedFollowUps || []);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[400px] h-[80vh] md:h-[600px] bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] md:rounded-2xl shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between bg-[var(--color-bg-section)] md:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-primary)]/20 flex items-center justify-center text-[var(--color-accent-primary)]">
              🤖
            </div>
            <div>
              <h3 className="font-display font-semibold text-[16px] text-[var(--color-text-primary)] leading-tight">AI Advisor</h3>
              <p className="text-[12px] text-[var(--color-text-secondary)]">M&A Expert</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-2"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] rounded-tr-sm' 
                  : 'bg-[var(--color-bg-section)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[var(--color-bg-section)] border border-[var(--color-border-subtle)] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && !isTyping && (
          <div className="p-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] overflow-x-auto whitespace-nowrap hide-scrollbar flex gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="inline-block px-3 py-1.5 rounded-full border border-[var(--color-accent-primary)]/30 text-[12px] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/10 transition-colors whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-section)] md:rounded-b-2xl">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about M&A..."
              className="flex-1 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-full px-4 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              ↑
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
