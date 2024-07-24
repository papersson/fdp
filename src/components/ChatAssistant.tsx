import React, { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'

export const ChatAssistant: React.FC = () => {
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    console.log('Sending message:', message)
    setMessage('')
  }

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg transition-colors hover:bg-primary-hover"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageSquare size={24} />
      </button>
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg border border-border">
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Chat Assistance</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <p className="text-sm text-text-secondary mb-4">How can I help you with data discovery today?</p>
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-grow mr-2 p-2 rounded border border-border focus:border-primary"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-primary text-white p-2 rounded hover:bg-primary-hover transition-colors"
                onClick={handleSend}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}