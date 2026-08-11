// Fichier : src/components/chat/ChatWindow.jsx
// Rôle : Fenêtre de chat entre client et chauffeur

import React, { useState } from 'react';
import Modal from '../ui/Modal';

const ChatWindow = ({ isOpen, onClose, contactName, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, isMine: true }]);
    setInput('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Chat avec ${contactName}`}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          {messages.length === 0 && <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>Aucun message</div>}
          {messages.map(msg => (
            <div 
              key={msg.id} 
              style={{ 
                alignSelf: msg.isMine ? 'flex-end' : 'flex-start',
                backgroundColor: msg.isMine ? 'var(--color-primary)' : 'var(--color-surface)',
                color: msg.isMine ? 'white' : 'var(--color-text)',
                padding: '0.5rem 1rem',
                borderRadius: '16px',
                border: msg.isMine ? 'none' : '1px solid var(--color-border)',
                maxWidth: '80%'
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            className="input" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Votre message..."
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={handleSend}>Envoyer</button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatWindow;
