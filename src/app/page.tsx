// components/TikTokLiveFeed.tsx
"use client";

import { useEffect, useState } from "react";

type LiveEvent = { type: "chat" | "gift"; [key: string]: any };

 function TikTokLiveFeed() {
  const [events, setEvents] = useState<LiveEvent[]>([]);

  useEffect(() => {
    const es = new EventSource("/api/tiktok-stream");

    es.onmessage = (msg) => {
      const data: LiveEvent = JSON.parse(msg.data);
      setEvents((prev) => [...prev.slice(-99), data]);
    };

    es.onerror = (err) => {
      console.error("SSE error", err);
      // EventSource reintenta reconexión automáticamente por defecto
    };

    return () => es.close();
  }, []);

  return (
    <ul>
      {events.map((e, i) => (
        <li key={i}>{e.type === "chat" ? e.content : `🎁 ${e.user}`}</li>
      ))}
    </ul>
  );
}


export default TikTokLiveFeed;