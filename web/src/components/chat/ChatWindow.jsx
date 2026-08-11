// Fichier : src/components/chat/ChatWindow.jsx
// Rôle : Fenêtre de chat premium entre client et chauffeur

import React, { useState, useRef, useEffect } from 'react';
import Modal from '../ui/Modal';

const ChatWindow = ({ isOpen, onClose, contactName, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages([...messages, { id: Date.now(), text: input, isMine: true, time: timeStr }]);
    setInput('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chat avec ${contactName}`}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '400px', maxHeight: '70vh' }}>
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem', 
          marginBottom: '1rem',
          padding: '0.5rem',
          backgroundColor: 'var(--bg-base, var(--color-bg, #f9fafb))',
          borderRadius: '12px'
        }}>
          {messages.length === 0 && <div style={{ textAlign: 'center', color: 'var(--text-secondary, var(--color-text-secondary))', marginTop: '2rem', fontStyle: 'italic' }}>Aucun message</div>}
          
          {messages.map((msg, idx) => (
            <div 
              key={msg.id} 
              className="animate-slideUp"
              style={{ 
                alignSelf: msg.isMine ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                animationDelay: `${idx * 0.05}s`
              }}
            >
              <div style={{
                backgroundColor: msg.isMine ? 'var(--primary, var(--color-primary))' : 'var(--bg-surface, var(--color-surface, #ffffff))',
                color: msg.isMine ? 'white' : 'var(--text-primary, var(--color-text))',
                padding: '0.75rem 1rem',
                borderRadius: '18px',
                borderBottomRightRadius: msg.isMine ? '4px' : '18px',
                borderBottomLeftRadius: !msg.isMine ? '4px' : '18px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                border: msg.isMine ? 'none' : '1px solid var(--border-default, var(--color-border))',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                color: 'var(--text-secondary, #9ca3af)', 
                alignSelf: msg.isMine ? 'flex-end' : 'flex-start',
                marginTop: '0.25rem',
                padding: '0 4px'
              }}>
                {msg.time || 'Maintenant'}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface, var(--color-surface, #ffffff))',
          padding: '0.5rem',
          borderRadius: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid var(--border-default, var(--color-border))'
        }}>
          <input 
            type="text" 
            className="input" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Votre message..."
            style={{ 
              flex: 1, 
              border: 'none', 
              boxShadow: 'none', 
              backgroundColor: 'transparent',
              padding: '0.5rem 1rem'
            }}
          />
          <button 
            className="btn btn-primary" 
            onClick={handleSend}
            disabled={!input.trim()}
            style={{ 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              padding: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              opacity: input.trim() ? 1 : 0.5,
              transition: 'all 0.2s'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatWindow;
