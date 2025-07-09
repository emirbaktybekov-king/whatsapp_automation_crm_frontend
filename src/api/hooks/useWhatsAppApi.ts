"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/qr/";

export const useWhatsAppApi = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [scanStatus, setScanStatus] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("whatsapp_sessionId")
      : null
  );
  const [chats, setChats] = useState<any[]>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("whatsapp_chats") || "[]")
      : []
  );
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;
  const router = useRouter();

  const connectWebSocket = () => {
    wsRef.current = new WebSocket(WS_URL);
    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0;
      if (
        sessionId &&
        wsRef.current &&
        wsRef.current.readyState === WebSocket.OPEN
      ) {
        wsRef.current.send(JSON.stringify({ sessionId }));
        console.log(`Sent WebSocket registration for session: ${sessionId}`);
      }
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        if (data.sessionId && data.status === "AUTHENTICATED") {
          setSessionId(data.sessionId);
          localStorage.setItem("whatsapp_sessionId", data.sessionId);
          setQrCode(null);
          setScanStatus(data.message || "Fetching chats...");
          if (data.chats) {
            setChats(data.chats);
            localStorage.setItem("whatsapp_chats", JSON.stringify(data.chats));
            setScanStatus("Chats loaded");
            setError(null);
          }
          console.log(
            `Triggering redirect to /whatsapp_bot/session/${data.sessionId}`
          );
          router.replace(`/whatsapp_bot/session/${data.sessionId}`);
        } else if (data.type === "chat_selected") {
          if (data.success) {
            console.log(
              `Chat ${data.chatId} selected successfully for session ${data.sessionId}`
            );
            setError(null);
          } else {
            console.error(
              `Failed to select chat ${data.chatId} for session ${
                data.sessionId
              }: ${data.error || "Unknown error"}`
            );
            setError(data.error || `Failed to select chat ${data.chatId}`);
          }
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };
    wsRef.current.onclose = (event) => {
      console.log(
        `WebSocket disconnected: code=${event.code}, reason=${event.reason}`
      );
      wsRef.current = null;
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        console.log(
          `Reconnecting WebSocket, attempt ${reconnectAttempts.current}`
        );
        setTimeout(connectWebSocket, 1000 * reconnectAttempts.current);
      } else {
        setError("WebSocket connection failed after max retries");
      }
    };
    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket connection failed");
    };
  };

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        await axios.get(`${API_URL}/api/v1/health`, { timeout: 5000 });
        setConnectionStatus("Connected");
      } catch (err) {
        setConnectionStatus("Disconnected");
      }
    };
    checkServerConnection();
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [router]);

  useEffect(() => {
    if (sessionId && wsRef.current) {
      const sendSessionId = async () => {
        let wsAttempts = 0;
        const maxWsAttempts = 5;
        while (wsAttempts < maxWsAttempts) {
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ sessionId }));
            console.log(
              `Sent WebSocket registration for session: ${sessionId}`
            );
            break;
          } else {
            console.log(
              `WebSocket not ready for session ${sessionId}, retrying attempt ${
                wsAttempts + 1
              }`
            );
            wsAttempts++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
        if (wsAttempts >= maxWsAttempts) {
          console.error(
            `Failed to register WebSocket for session ${sessionId} after ${maxWsAttempts} attempts`
          );
          setError("Failed to connect WebSocket");
        }
      };
      sendSessionId();
    }
  }, [sessionId]);

  const createSession = async () => {
    try {
      setScanStatus("Fetching QR code...");
      console.log("Making request to /api/v1/session/create");
      const response = await axios.post(
        `${API_URL}/api/v1/session/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      const { sessionId, qrCode } = response.data;
      console.log("QR code received:", qrCode.substring(0, 50) + "...");
      setSessionId(sessionId);
      localStorage.setItem("whatsapp_sessionId", sessionId);
      setQrCode(qrCode);
      setScanStatus("QR code loaded");
    } catch (err: any) {
      console.error("Session creation error:", err);
      setError(err.response?.data?.error || "Failed to create session");
      setScanStatus("Disconnected");
    }
  };

  const refreshQRCode = async () => {
    if (!sessionId) {
      setError("No active session to refresh");
      return;
    }
    try {
      setScanStatus("Fetching QR code...");
      console.log("Making request to /api/v1/session/refresh");
      const response = await axios.post(
        `${API_URL}/api/v1/session/refresh`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      const { sessionId: newSessionId, qrCode } = response.data;
      console.log(
        "Refreshed QR code received:",
        qrCode.substring(0, 50) + "..."
      );
      setSessionId(newSessionId || sessionId);
      localStorage.setItem("whatsapp_sessionId", newSessionId || sessionId);
      setQrCode(qrCode);
      setScanStatus("QR code loaded");
    } catch (err: any) {
      console.error("QR code refresh error:", err);
      setError(err.response?.data?.error || "Failed to refresh QR code");
      setScanStatus("Disconnected");
    }
  };

  const triggerQRCode = () => {
    setScanStatus("");
    setQrCode(null);
    setSessionId(null);
    setChats([]);
    localStorage.removeItem("whatsapp_sessionId");
    localStorage.removeItem("whatsapp_chats");
    console.log("Triggering QR code reset");
  };

  const handleChatSelect = async (chat: any) => {
    setSelectedChat(chat);
    setMessages([]);
    if (!sessionId || !wsRef.current) {
      console.error(
        "WebSocket not ready or sessionId missing for chat selection"
      );
      setError("Failed to select chat: WebSocket not connected");
      return;
    }
    // Retry sending select_chat message up to 3 times
    let wsAttempts = 0;
    const maxWsAttempts = 3;
    while (wsAttempts < maxWsAttempts) {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({ type: "select_chat", sessionId, chatId: chat.id })
        );
        console.log(
          `Sent select_chat message for chat ${chat.id} in session ${sessionId}`
        );
        break;
      } else {
        console.log(
          `WebSocket not ready for chat ${
            chat.id
          } selection, retrying attempt ${wsAttempts + 1}`
        );
        wsAttempts++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    if (wsAttempts >= maxWsAttempts) {
      console.error(
        `Failed to send select_chat for chat ${chat.id} in session ${sessionId} after ${maxWsAttempts} attempts`
      );
      setError("Failed to select chat: WebSocket not connected");
    }
  };

  return {
    qrCode,
    connectionStatus,
    setConnectionStatus,
    scanStatus,
    selectedChat,
    messages,
    setMessages,
    error,
    setError,
    triggerQRCode,
    handleChatSelect,
    createSession,
    refreshQRCode,
    sessionId,
    chats,
    setChats,
  };
};
