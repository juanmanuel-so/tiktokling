// components/TikTokLiveFeed.tsx
"use client";

import { useEffect, useState } from "react";
import {useParams} from "next/navigation";
import { narrar } from "@/lib/narrator";
type LiveEvent = { type: "chat" | "gift";[key: string]: any };

function TikTokLiveFeed() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const params = useParams<{ user: string }>();
  const { user } = params;
  console.log(user)
  useEffect(() => {
    console.log("Connecting to TikTok live feed for user:", user);
    const es = new EventSource(`/api/tiktok-stream/${user}`);

    es.onmessage = (msg) => {
      const data: LiveEvent = JSON.parse(msg.data);
      //remove non readable characters from name (symbols, emotes, etc)
      data.user = data.user?.replace(/[^a-zA-Z0-9]/g, '');

      const text = data.type === "chat" ? `${data.user} dice ${data.content}` : `🎁 ${data.user} envió un regalo`;
      narrar(text);
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