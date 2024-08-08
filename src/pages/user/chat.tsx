import React, { useEffect, useRef, useState } from "react";
import Conversation from "../../chat/user/conversation";
import Message from "../../chat/user/Message";
import Navbar from "../../components/user/NavBar/Navbar";
import { FiSend } from "react-icons/fi";
import { useAppSelector } from "../../redux/store/store";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, USER_API } from "../../constants";
import { useSocket } from "../../redux/Context/SocketContext";

const Chat: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice);

  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [receiverData, setReceiverData] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();

  useEffect(() => {
    socket?.on("getMessage", (data: any) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket?.on("updateLastMessage", (data: any) => {
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === data.conversationId
            ? { ...conversation, lastMessage: data.lastMessage }
            : conversation
        );

        updatedConversations.sort((a, b) => {
          if (!a.lastMessage || !b.lastMessage) return 0;
          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          );
        });

        return updatedConversations;
      });
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      if (currentChat?.members.includes(arrivalMessage.senderId)) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: arrivalMessage }
            : conversation
        );

        updatedConversations.sort((a, b) => {
          if (!a.lastMessage || !b.lastMessage) return 0; 
          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          );
        });

        return updatedConversations;
      });
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.emit("addUser", user.id);
    socket?.on("getUsers", (_users: any) => {});
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axiosJWT.get(
          `${CHAT_API}/conversations/${user.id}`
        );
        const conversationData = response.data;

        const updatedConversations = await Promise.all(
          conversationData.map(async (conversation: any) => {
            const messagesResponse = await axiosJWT.get(
              `${CHAT_API}/messages/${conversation._id}`
            );
            const messages = messagesResponse.data.messages;
            const lastMessage = messages[messages.length - 1];
            return { ...conversation, lastMessage };
          })
        );

        updatedConversations.sort((a, b) => {
          if (!a.lastMessage || !b.lastMessage) return 0; 
          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          );
        });

        setConversations(updatedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const response = await axiosJWT.get(
          `${CHAT_API}/messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleConversationClick = async (conversation: any) => {
    setCurrentChat(conversation);

    const id = conversation.members.find((member: any) => member !== user.id);

    try {
      const response = await axiosJWT.get(`${USER_API}/OwnerDetails/${id}`);
      setReceiverData(response.data.Hotel); 
    } catch (error) {
      console.error("Error fetching receiver details:", error);
    }

    const lastMessageResponse = await axiosJWT.get(
      `${CHAT_API}/messages/${conversation._id}`
    );
    const lastMessageData = lastMessageResponse.data.messages.slice(-1)[0];
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conv) =>
        conv._id === conversation._id
          ? { ...conv, lastMessage: lastMessageData }
          : conv
      );

      updatedConversations.sort((a, b) => {
        if (!a.lastMessage || !b.lastMessage) return 0; 
        return (
          new Date(b.lastMessage.createdAt).getTime() -
          new Date(a.lastMessage.createdAt).getTime()
        );
      });

      return updatedConversations;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      senderId: user.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member: any) => member !== user.id
    );

    socket?.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
      conversationId: currentChat?._id,
    });

    try {
      const response = await axiosJWT.post(`${CHAT_API}/messages`, message);
      setMessages([...messages, response.data]);
      setNewMessage("");
      setConversations((prevConversations) => {
        const updatedConversations = prevConversations.map((conversation) =>
          conversation._id === currentChat?._id
            ? { ...conversation, lastMessage: response.data }
            : conversation
        );

        updatedConversations.sort((a, b) => {
          if (!a.lastMessage || !b.lastMessage) return 0;
          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          );
        });

        return updatedConversations;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Chat Menu */}
        <div className="w-full lg:w-1/4 bg-gray-200 overflow-y-auto h-full">
          <div className="p-4">
            {conversations.map((conversation, index) => (
              <div
                key={index}
                onClick={() => handleConversationClick(conversation)}
              >
                <Conversation
                  conversation={conversation}
                  lastMessage={conversation.lastMessage}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <div className="w-full lg:w-3/4 bg-gray-100 flex flex-col h-full">
          <div className="flex-1 flex flex-col overflow-y-auto p-4">
            {!currentChat ? (
              <div className="text-center text-2xl text-gray-400 cursor-default my-auto">
                Open a chat to start conversation..
              </div>
            ) : (
              <>
                {messages.map((m, index) => (
                  <div key={index} ref={scrollRef} className="flex-1">
                    <Message
                      message={m}
                      own={m.senderId === user.id}
                      receiverProfilePicture={receiverData?.profilePic}
                      receiverName={receiverData?.name}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          {currentChat && (
            <div className="flex items-center p-4 border-t border-gray-300">
              <textarea
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Write something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSubmit}
              >
                <FiSend size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
