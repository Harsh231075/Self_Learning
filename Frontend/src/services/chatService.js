class ChatService {
  baseUrl = import.meta.env.VITE_API_URL; // Replace with your actual backend URL

  async sendMessage(message) {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || 'Sorry, I could not process your request.';
    } catch (error) {
      console.error('Chat service error:', error);
      // For demo purposes, return a mock response
      return this.getMockResponse(message);
    }
  }

  // private getMockResponse(message) {
  //   // This is a mock response for demo purposes
  //   // Remove this when you connect to your actual backend
  //   const responses = [
  //     "That's an interesting question! Let me think about that.",
  //     "I understand your request. Here's what I think...",
  //     "Great question! Based on what you've told me...",
  //     "I'd be happy to help you with that!",
  //     "Let me provide you with some insights on this topic."
  //   ];

  //   return responses[Math.floor(Math.random() * responses.length)];
  // }
}

export const chatService = new ChatService();