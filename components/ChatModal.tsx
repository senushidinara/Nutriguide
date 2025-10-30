import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { X, Zap, Sparkles } from './icons';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, history, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-brand-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-brand-surface rounded-2xl shadow-2xl shadow-brand-primary/20 border border-brand-primary/20 w-full max-w-2xl h-[80vh] flex flex-col animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-brand-primary/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-brand-primary" />
            <h2 className="text-xl font-bold text-brand-secondary">Chat with NutriGuide AI</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-bg">
            <X className="w-5 h-5 text-brand-text-muted" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {history.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-primary' : 'bg-brand-accent'}`}>
                {msg.role === 'user' ? 'U' : <Sparkles className="w-5 h-5 text-brand-bg" />}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-brand-primary/80 rounded-br-none' : 'bg-brand-bg rounded-bl-none'}`}>
                 <p className="text-brand-text leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-accent">
                <Sparkles className="w-5 h-5 text-brand-bg" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-brand-bg rounded-bl-none">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-pulse-fast" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-pulse-fast" style={{animationDelay: '200ms'}}></span>
                    <span className="w-2 h-2 bg-brand-text-muted rounded-full animate-pulse-fast" style={{animationDelay: '400ms'}}></span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-brand-primary/20 flex-shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your results..."
              className="w-full bg-brand-bg border border-brand-primary/50 rounded-lg p-3 text-brand-text placeholder-brand-text-muted focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-brand-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all transform hover:scale-105"
            >
              <Zap className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
