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
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-2xl shadow-2xl shadow-slate-300/60 border border-border-color w-full max-w-2xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-secondary">Chat with NutriGuide AI</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-background">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {history.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white ${msg.role === 'user' ? 'bg-slate-400' : 'bg-primary'}`}>
                {msg.role === 'user' ? 'U' : <Sparkles className="w-5 h-5" />}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-slate-700 text-white rounded-br-none' : 'bg-slate-100 text-text-primary rounded-bl-none'}`}>
                 <p className="leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-primary text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-slate-100 rounded-bl-none">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse" style={{animationDelay: '200ms'}}></span>
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-pulse" style={{animationDelay: '400ms'}}></span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border-color flex-shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your results..."
              className="w-full bg-background border border-border-color rounded-lg p-3 text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-all transform hover:scale-105"
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
