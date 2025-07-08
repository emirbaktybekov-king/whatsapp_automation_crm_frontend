"use client";

import { useState, useEffect } from "react";
import axios from "axios";

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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);

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

    // WebSocket connection
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.sessionId === sessionId && data.status === "AUTHENTICATED") {
          setQrCode(null); // Hide QR code immediately
          setScanStatus(data.message || "Fetching chats...");
          if (data.chats) {
            setChats(data.chats);
            setScanStatus("Chats loaded");
          }
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };
    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => ws.close();
  }, [sessionId]);

  const createSession = async () => {
    try {
      setScanStatus("Fetching QR code...");
      console.log("Making request to /api/v1/session/create"); // Debug log
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
      console.log("QR code received:", qrCode.substring(0, 50) + "..."); // Debug log
      setSessionId(sessionId);
      setQrCode(qrCode);
      setScanStatus("QR code loaded");
    } catch (err: any) {
      console.error("Session creation error:", err); // Debug log
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
      console.log("Making request to /api/v1/session/refresh"); // Debug log
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
      setSessionId(newSessionId || sessionId); // Update sessionId if new one is provided
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
    console.log("Triggering QR code reset"); // Debug log
  };

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  return {
    qrCode,
    connectionStatus,
    setConnectionStatus,
    scanStatus,
    selectedChat,
    messages,
    error,
    triggerQRCode,
    handleChatSelect,
    createSession,
    refreshQRCode,
    sessionId,
    chats,
  };
};
