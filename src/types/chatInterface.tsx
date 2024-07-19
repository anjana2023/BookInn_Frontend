export interface ChatInterface {
  createdAt: string;
  members: string[];
  updatedAt: string;
  _id: string;
  }
  export interface MessageInterface {
    _id?: string;
    conversationId?: string;
    senderId: string;
    text: string;
    isRead?: boolean;
    createdAt: Date;
    own?: boolean;
    isTyping?: boolean;
  }