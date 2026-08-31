// app/api/tiktok-stream/route.ts
import { liveEvents, getTikTokConnection } from "@/lib/tiktok-connection";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  getTikTokConnection('janinnce'); // asegura que exista

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const onEvent = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      liveEvents.on("event", onEvent);

      // limpieza cuando el cliente se desconecta
      return () => liveEvents.off("event", onEvent);
    },
    cancel() {
      // Next también invoca esto al cerrar el stream
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}