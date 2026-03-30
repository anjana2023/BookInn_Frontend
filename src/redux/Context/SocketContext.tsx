import React, { ReactNode, useContext, createContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../constants";

const SocketContext = createContext<Socket | null>(null);
SocketContext.displayName = "Socket Context";

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socket = useMemo(
    () =>
      io(BASE_URL, {
        transports: ["websocket"], // force WS
        withCredentials: true, // if using cookies
      }),
    []
  );

  socket.on("connect", () => console.log("✅ Socket connected"));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
