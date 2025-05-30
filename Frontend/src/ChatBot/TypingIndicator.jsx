import React from 'react'

function TypingIndicator() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default TypingIndicator