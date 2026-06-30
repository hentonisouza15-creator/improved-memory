import type { VercelRequest, VercelResponse } from "@vercel/node";

type LogEvent =
  | { type: "page_view"; page: string; userAgent?: string }
  | { type: "ugc_click"; ugcName: string; assetId: number; creator: string; tier: string }
  | { type: "search"; query: string; results: number }
  | { type: "tier_filter"; tier: string };

const tierColors: Record<string, number> = {
  legendary: 0xf59e0b,
  epic: 0xa855f7,
  rare: 0x3b82f6,
  uncommon: 0x22c55e,
  all: 0x6b7280,
};

const eventEmojis: Record<string, string> = {
  page_view: "👁️",
  ugc_click: "🛍️",
  search: "🔍",
  tier_filter: "🏷️",
};

function buildEmbed(event: LogEvent, ip: string): object {
  const timestamp = new Date().toISOString();
  switch (event.type) {
    case "page_view":
      return {
        title: `${eventEmojis.page_view} Visita de Página`,
        color: 0x7c3aed,
        fields: [
          { name: "Página", value: event.page, inline: true },
          { name: "IP", value: ip, inline: true },
          ...(event.userAgent
            ? [{ name: "Navegador", value: event.userAgent.slice(0, 100), inline: false }]
            : []),
        ],
        timestamp,
      };
    case "ugc_click":
      return {
        title: `${eventEmojis.ugc_click} UGC Clicado`,
        color: tierColors[event.tier] ?? 0x7c3aed,
        fields: [
          { name: "Nome", value: event.ugcName, inline: true },
          { name: "Criador", value: event.creator, inline: true },
          { name: "Tier", value: event.tier.charAt(0).toUpperCase() + event.tier.slice(1), inline: true },
          { name: "Asset ID", value: String(event.assetId), inline: true },
        ],
        timestamp,
      };
    case "search":
      return {
        title: `${eventEmojis.search} Busca Realizada`,
        color: 0x0ea5e9,
        fields: [
          { name: "Termo", value: event.query || "(vazio)", inline: true },
          { name: "Resultados", value: String(event.results), inline: true },
        ],
        timestamp,
      };
    case "tier_filter":
      return {
        title: `${eventEmojis.tier_filter} Filtro de Tier`,
        color: tierColors[event.tier] ?? 0x6b7280,
        fields: [
          {
            name: "Tier Selecionado",
            value: event.tier === "all" ? "Todos" : event.tier.charAt(0).toUpperCase() + event.tier.slice(1),
            inline: true,
          },
        ],
        timestamp,
      };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const event = req.body as LogEvent;
  if (!event?.type) {
    return res.status(400).json({ error: "Missing event type" });
  }

  const allowed = ["page_view", "ugc_click", "search", "tier_filter"];
  if (!allowed.includes(event.type)) {
    return res.status(400).json({ error: "Invalid event type" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
      "unknown";

    const embed = buildEmbed(event, ip);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "BestUGCs Logs",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        embeds: [embed],
      }),
    }).catch(() => {});
  }

  return res.status(204).send("");
}
