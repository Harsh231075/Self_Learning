import { useState } from 'react';
import { Send, Mic } from 'lucide-react';


const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-6 border-t border-gray-100">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none max-h-32 text-gray-800 placeholder-gray-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 bottom-3 p-1 text-gray-400 hover:text-purple-500 transition-colors"
            title="Voice input (coming soon)"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      <div className="flex items-center justify-center mt-3 gap-2 text-xs text-gray-400">
        <span>Press Enter to send, Shift + Enter for new line</span>
      </div>
    </div>
  );
};

export default ChatInput;