import { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import TypingIndicator from './TypingIndicator';



const ChatMessages = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 animate-fade-in ${message.isBot ? 'justify-start' : 'justify-end'
            }`}
        >
          {message.isBot && (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${message.isBot
              ? 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-tl-sm'
              : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-tr-sm'
              }`}
          >
            <p className="text-sm leading-relaxed">{message.text}</p>
            <span className={`text-xs mt-2 block opacity-70 ${message.isBot ? 'text-gray-500' : 'text-purple-100'
              }`}>
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          {!message.isBot && (
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <TypingIndicator />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;