// lib/tiktok-connection.ts
import { TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector";
import { EventEmitter } from "events";

// singleton — sobrevive mientras el proceso Node esté vivo
export const liveEvents = new EventEmitter();
liveEvents.setMaxListeners(0);

let connection: TikTokLiveConnection | null = null;

export function getTikTokConnection(username: string) {
  if (connection) return connection;

  connection = new TikTokLiveConnection(username, {});

  connection.connect()
    .then((state) => console.info(`Connected to roomId ${state.roomId}`))
    .catch((err) => console.error("Failed to connect", err));

  connection.on(WebcastEvent.CHAT, (data) => {
    liveEvents.emit("event", { type: "chat", content: data.content, user: data.user?.nickname });
  });

  connection.on(WebcastEvent.GIFT, (data) => {
    liveEvents.emit("event", { type: "gift", user: data.user });
  });

  return connection;
}