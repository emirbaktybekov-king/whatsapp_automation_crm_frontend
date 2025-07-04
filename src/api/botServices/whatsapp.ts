"use client";
import { useEffect, useState } from "react";

interface Chat {
  id: string;
  name: string;
  image: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
}

interface WhatsAppApiState {
  qrCode: string | null;
  connectionStatus: string;
  scanStatus: string;
  chats: Chat[];
  selectedChat: Chat | null;
  messages: Message[];
}

export const useWhatsAppApi = () => {
  const [state, setState] = useState<WhatsAppApiState>({
    qrCode: null,
    connectionStatus: "Disconnected",
    scanStatus: "QR Code Loading",
    chats: [],
    selectedChat: null,
    messages: [],
  });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 5000;

  const triggerQRCode = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/whatsapp");
      const data = await response.json();
      console.log("QR code trigger:", data);
      if (data.status === "error") {
        setState((prev) => ({ ...prev, scanStatus: data.message }));
      }
    } catch (error) {
      console.error("Error triggering QR code:", error);
      setState((prev) => ({ ...prev, scanStatus: "Error triggering QR code" }));
    }
  };

  const handleChatSelect = (chat: Chat) => {
    setState((prev) => ({ ...prev, selectedChat: chat }));
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Sending chat selection:", chat.id);
      ws.send(
        JSON.stringify({
          action: "select_chat",
          chat_id: chat.id,
          chat_name: chat.name, // Include chat name for fallback
        })
      );
    } else {
      console.error("WebSocket not connected");
      setState((prev) => ({ ...prev, scanStatus: "WebSocket not connected" }));
    }
  };

  const connectWebSocket = () => {
    const websocket = new WebSocket("ws://127.0.0.1:8000/ws/qr/");

    websocket.onopen = () => {
      console.log("WebSocket connected");
      setState((prev) => ({ ...prev, connectionStatus: "Connected" }));
      setReconnectAttempts(0);
      triggerQRCode();
    };

    websocket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      if (data.qr_code) {
        setState((prev) => ({
          ...prev,
          qrCode: data.qr_code,
          scanStatus: data.message || "QR code loaded",
          chats: [],
          messages: [],
        }));
        console.log("Received QR code:", data.message);
      } else if (data.message === "Loading chats") {
        setState((prev) => ({
          ...prev,
          qrCode: null,
          scanStatus: "Loading chats",
          chats: [],
          selectedChat: null,
          messages: [],
        }));
        console.log("Received loading chats signal");
      } else if (data.chats && data.chats.length > 0) {
        setState((prev) => ({
          ...prev,
          qrCode: null,
          scanStatus: data.message || "Chats loaded",
          chats: data.chats,
          selectedChat: data.chats[0] || prev.selectedChat,
        }));
        console.log("Received chats:", data.chats);
        if (data.chats[0] && websocket.readyState === WebSocket.OPEN) {
          console.log("Auto-selecting chat:", data.chats[0].id);
          websocket.send(
            JSON.stringify({
              action: "select_chat",
              chat_id: data.chats[0].id,
              chat_name: data.chats[0].name,
            })
          );
        }
      } else if (data.messages) {
        setState((prev) => ({
          ...prev,
          messages: data.messages,
          scanStatus: data.message || "Messages loaded",
        }));
        console.log(
          "Received messages for chat",
          data.chat_id,
          ":",
          data.messages
        );
      } else if (data.status === "error") {
        console.error("Error from backend:", data.message);
        setState((prev) => ({ ...prev, scanStatus: data.message }));
      }
      console.log("Current state:", state);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setState((prev) => ({
        ...prev,
        connectionStatus: "Error",
        scanStatus: "WebSocket error",
      }));
    };

    websocket.onclose = (event) => {
      console.log(
        "WebSocket closed. Code:",
        event.code,
        "Reason:",
        event.reason
      );
      setState((prev) => ({
        ...prev,
        connectionStatus: "Disconnected",
        scanStatus: "WebSocket disconnected",
      }));
      if (reconnectAttempts < maxReconnectAttempts) {
        console.log(
          `Attempting to reconnect (${
            reconnectAttempts + 1
          }/${maxReconnectAttempts})...`
        );
        setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connectWebSocket();
        }, reconnectInterval);
      } else {
        console.error(
          "Max reconnect attempts reached. Please check the backend."
        );
        setState((prev) => ({
          ...prev,
          scanStatus: "Failed to reconnect to WebSocket",
        }));
      }
    };

    setWs(websocket);
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return { ...state, triggerQRCode, handleChatSelect };
};
