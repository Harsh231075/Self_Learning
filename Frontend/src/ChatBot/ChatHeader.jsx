import { Bot, Sparkles } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="text-center py-8 px-4">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        AI Assistant
      </h1>

      <p className="text-gray-600 text-lg font-medium">
        Your intelligent companion for any question
      </p>

      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-500">Online & Ready to Help</span>
      </div>
    </div>
  );
};

export default ChatHeader;