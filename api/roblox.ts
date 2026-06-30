import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const ids = req.query.ids as string;

  if (!ids) {
    return res.status(400).json({ error: "ids query param required" });
  }

  try {
    const response = await fetch(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${ids}&size=420x420&format=Png&isCircular=false`
    );
    const data = await response.json();
    return res.json(data);
  } catch {
    return res.status(502).json({ error: "Failed to fetch from Roblox" });
  }
}
