"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from '../apiClient';

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
  media_type: string | null;
}

interface WhatsAppApiState {
  qrCode: string | null;
  connectionStatus: string;
  scanStatus: string;
  chats: Chat[];
  selectedChat: Chat | null;
  messages: Message[];
  error: string | null;
}

export const useWhatsAppApi = () => {
  const [state, setState] = useState<WhatsAppApiState>({
    qrCode: null,
    connectionStatus: "Disconnected",
    scanStatus: "Connecting to server...",
    chats: [],
    selectedChat: null,
    messages: [],
    error: null,
  });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 5000;

  const triggerQRCode = async () => {
    try {
      setState((prev) => ({ ...prev, scanStatus: "Triggering QR code...", error: null }));
      console.log("Triggering QR code request to /whatsapp");
      const response = await apiClient.get("/whatsapp");
      const data = await response.data;
      console.log("QR code trigger response:", data);
      if (data.status === "error") {
        setState((prev) => ({ ...prev, scanStatus: "Error", error: data.message }));
      } else {
        setState((prev) => ({
          ...prev,
          scanStatus: data.qr_code ? "QR code loaded" : "Waiting for QR code...",
          qrCode: data.qr_code || null,
          error: null,
        }));
      }
    } catch (error: any) {
      console.error("Error triggering QR code:", error);
      if (error.response?.status === 401) {
        setState((prev) => ({
          ...prev,
          scanStatus: "Error",
          error: "Unauthorized: Please log in again",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          scanStatus: "Error",
          error: error.response?.data?.message || error.message || "Failed to trigger QR code",
        }));
      }
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
          chat_name: chat.name,
        })
      );
    } else {
      console.error("WebSocket not connected for chat selection");
      setState((prev) => ({
        ...prev,
        scanStatus: "Error",
        error: "WebSocket not connected",
      }));
    }
  };

  const connectWebSocket = () => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.error("No access token found for WebSocket");
      setState((prev) => ({
        ...prev,
        connectionStatus: "Disconnected",
        scanStatus: "Error",
        error: "No access token found. Please log in.",
      }));
      window.location.href = "/auth/login";
      return;
    }

    console.log("Connecting to WebSocket: ws://127.0.0.1:8000/ws/qr/");
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/qr/`);

    websocket.onopen = () => {
      console.log("WebSocket connected successfully");
      setState((prev) => ({
        ...prev,
        connectionStatus: "Connected",
        scanStatus: "Waiting for QR code...",
        error: null,
      }));
      setReconnectAttempts(0);
      triggerQRCode();
    };

    websocket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.status === "error") {
          console.error("WebSocket error message:", data.message);
          setState((prev) => ({
            ...prev,
            scanStatus: "Error",
            error: data.message || "Unknown error",
          }));
          return;
        }
        if (data.qr_code) {
          setState((prev) => ({
            ...prev,
            qrCode: data.qr_code,
            scanStatus: data.message || "QR code loaded",
            chats: [],
            messages: [],
            error: null,
          }));
          console.log("Received QR code:", data.qr_code.substring(0, 50) + "...");
        } else if (data.message === "Loading chats") {
          setState((prev) => ({
            ...prev,
            qrCode: null,
            scanStatus: "Loading chats",
            chats: [],
            selectedChat: null,
            messages: [],
            error: null,
          }));
          console.log("Received loading chats signal");
        } else if (data.chats && data.chats.length > 0) {
          setState((prev) => ({
            ...prev,
            qrCode: null,
            scanStatus: "Chats loaded",
            chats: data.chats,
            selectedChat: data.chats[0] || prev.selectedChat,
            error: null,
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
            error: null,
          }));
          console.log("Received messages for chat:", data.messages);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setState((prev) => ({
          ...prev,
          scanStatus: "Error",
          error: "Failed to parse server response",
        }));
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setState((prev) => ({
        ...prev,
        connectionStatus: "Error",
        scanStatus: "WebSocket error",
        error: "WebSocket connection failed",
      }));
    };

    websocket.onclose = (event) => {
      console.log("WebSocket closed. Code:", event.code, "Reason:", event.reason);
      setState((prev) => ({
        ...prev,
        connectionStatus: "Disconnected",
        scanStatus: "WebSocket disconnected",
        error: `WebSocket closed: ${event.reason || 'Unknown reason'}`,
      }));
      if (reconnectAttempts < maxReconnectAttempts) {
        console.log(`Reconnecting (${reconnectAttempts + 1}/${maxReconnectAttempts})...`);
        setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connectWebSocket();
        }, reconnectInterval);
      } else {
        console.error("Max reconnect attempts reached");
        setState((prev) => ({
          ...prev,
          scanStatus: "Error",
          error: "Failed to reconnect to WebSocket",
        }));
      }
    };

    setWs(websocket);
  };

  useEffect(() => {
    console.log("Initializing WebSocket connection");
    connectWebSocket();
    return () => {
      if (ws) {
        console.log("Closing WebSocket on cleanup");
        ws.close();
      }
    };
  }, []);

  return { ...state, triggerQRCode, handleChatSelect };
};
