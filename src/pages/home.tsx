import { useState, useEffect, useRef } from "react";
import { IconCrown, IconDiamond, IconShield, IconStar, IconLightning, IconArrowRight, IconTrophy } from "@/components/icons";
import { logEvent } from "@/lib/log";

interface UGCItem {
  assetId: number;
  name: string;
  price: number;
  tier: "legendary" | "epic" | "rare" | "uncommon";
  creator: string;
  sales: number;
}

const featuredUGCs: UGCItem[] = [
  { assetId: 1, name: "Dragon Wings", price: 850, tier: "legendary", creator: "CoolCreator", sales: 12400 },
  { assetId: 2, name: "Neon Halo", price: 320, tier: "epic", creator: "PixelMaster", sales: 8700 },
  { assetId: 3, name: "Crystal Crown", price: 1200, tier: "legendary", creator: "UGCPro", sales: 21000 },
  { assetId: 4, name: "Shadow Cape", price: 180, tier: "rare", creator: "DarkArtist", sales: 5300 },
  { assetId: 5, name: "Flame Sword", price: 650, tier: "epic", creator: "FireForge", sales: 9800 },
  { assetId: 6, name: "Galaxy Backpack", price: 420, tier: "rare", creator: "StarMaker", sales: 6700 },
];

const tierColors: Record<string, string> = {
  legendary: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  epic: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  rare: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  uncommon: "text-green-400 border-green-400/30 bg-green-400/10",
};

const tierLabels: Record<string, string> = {
  legendary: "Lendario",
  epic: "Epico",
  rare: "Raro",
  uncommon: "Incomum",
};

const tierIcons: Record<string, React.ReactNode> = {
  legendary: <IconCrown className="w-3 h-3" />,
  epic: <IconDiamond className="w-3 h-3" />,
  rare: <IconShield className="w-3 h-3" />,
  uncommon: <IconStar className="w-3 h-3" />,
};

const ugcImages = [
  "/ugc-1.png", "/ugc-2.png", "/ugc-3.png",
  "/ugc-4.png", "/ugc-5.png", "/ugc-6.png",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const pageViewSent = useRef(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pageViewSent.current) {
      pageViewSent.current = true;
      logEvent({ type: "page_view", page: "/" });
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.trim().length > 1) {
      searchTimeout.current = setTimeout(() => {
        const results = featuredUGCs.filter(
          (ugc) =>
            ugc.name.toLowerCase().includes(value.toLowerCase()) ||
            ugc.creator.toLowerCase().includes(value.toLowerCase())
        ).length;
        logEvent({ type: "search", query: value, results });
      }, 800);
    }
  };

  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
    logEvent({ type: "tier_filter", tier });
  };

  const handleUGCClick = (ugc: UGCItem) => {
    logEvent({ type: "ugc_click", ugcName: ugc.name, assetId: ugc.assetId, creator: ugc.creator, tier: ugc.tier });
  };

  const filtered = featuredUGCs.filter((ugc) => {
    const matchesSearch =
      ugc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ugc.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === "all" || ugc.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <IconTrophy className="w-7 h-7 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Best<span className="text-primary">UGCs</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#catalog" className="hover:text-foreground transition-colors">Catalogo</a>
              <a href="#top" className="hover:text-foreground transition-colors">Top UGCs</a>
              <a href="#creators" className="hover:text-foreground transition-colors">Criadores</a>
            </div>
            <a
              href="https://roblox.com.ki/communities/2539532469/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Comunidade UGC <IconArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <IconLightning className="w-4 h-4" />
            Comunidade #1 de UGC Roblox
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Descubra os Melhores{" "}
            <span className="text-primary">UGCs</span> do Roblox
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explore, colecione e compartilhe os items UGC mais incriveis do Roblox.
            Curado pela comunidade para os melhores jogadores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#catalog"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              Explorar Catalogo <IconArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#top"
              className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground border border-border px-8 py-3 rounded-xl font-semibold hover:bg-accent/10 transition-colors text-lg"
            >
              <IconTrophy className="w-5 h-5" /> Top UGCs
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "UGCs Catalogados", value: "2.400+", icon: <IconDiamond className="w-5 h-5" /> },
            { label: "Criadores", value: "380+", icon: <IconCrown className="w-5 h-5" /> },
            { label: "Vendas Totais", value: "1.2M+", icon: <IconTrophy className="w-5 h-5" /> },
            { label: "Comunidade", value: "50K+", icon: <IconStar className="w-5 h-5" /> },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="flex justify-center text-primary mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Em Alta */}
      <section id="top" className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            <IconLightning className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Em <span className="text-primary">Alta</span></h2>
            <p className="text-sm text-muted-foreground">Os UGCs mais vendidos da semana</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { position: 1, name: "Crystal Crown", creator: "UGCPro", sales: 21000, tier: "legendary", change: "+18%" },
            { position: 2, name: "Flame Sword", creator: "FireForge", sales: 9800, tier: "epic", change: "+12%" },
            { position: 3, name: "Dragon Wings", creator: "CoolCreator", sales: 12400, tier: "legendary", change: "+9%" },
            { position: 4, name: "Neon Halo", creator: "PixelMaster", sales: 8700, tier: "epic", change: "+7%" },
            { position: 5, name: "Galaxy Backpack", creator: "StarMaker", sales: 6700, tier: "rare", change: "+5%" },
          ].map((item) => (
            <div
              key={item.position}
              className="flex-shrink-0 w-64 bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-4xl font-black ${item.position === 1 ? "text-primary" : "text-muted-foreground/30"}`}>
                  #{item.position}
                </span>
                <span className="text-xs font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                  {item.change}
                </span>
              </div>
              <p className="font-bold text-foreground text-lg leading-tight mb-1">{item.name}</p>
              <p className="text-sm text-muted-foreground mb-3">por {item.creator}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tierColors[item.tier]}`}>
                  {tierLabels[item.tier]}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <IconStar className="w-3 h-3" /> {item.sales.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Catalogo de <span className="text-primary">UGCs</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="search"
              placeholder="Buscar UGC ou criador..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-secondary border border-border text-foreground placeholder:text-muted-foreground px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-64"
            />
            <select
              value={selectedTier}
              onChange={(e) => handleTierChange(e.target.value)}
              className="bg-secondary border border-border text-foreground px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">Todos os Tiers</option>
              <option value="legendary">Lendario</option>
              <option value="epic">Epico</option>
              <option value="rare">Raro</option>
              <option value="uncommon">Incomum</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ugc, i) => (
            <div
              key={ugc.assetId}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative bg-secondary aspect-square overflow-hidden">
                {!imageErrors[i] ? (
                  <img
                    src={ugcImages[i % ugcImages.length]}
                    alt={ugc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => setImageErrors((prev) => ({ ...prev, [i]: true }))}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconDiamond className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}
                <div className={`absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${tierColors[ugc.tier]}`}>
                  {tierIcons[ugc.tier]}
                  <span>{tierLabels[ugc.tier]}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground text-lg">{ugc.name}</h3>
                  <span className="text-primary font-bold">{ugc.price} R$</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">por {ugc.creator}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <IconStar className="w-3 h-3" /> {ugc.sales.toLocaleString()} vendas
                  </span>
                  <a
                    href="https://roblox.com.ki/communities/2539532469/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleUGCClick(ugc)}
                    className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                  >
                    Ver <IconArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <IconDiamond className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Nenhum UGC encontrado</p>
            <p className="text-sm">Tente ajustar a busca ou o filtro de tier</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-4 text-center text-muted-foreground text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IconTrophy className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">BestUGCs</span>
        </div>
        <p className="mb-4">Comunidade de UGC Roblox &mdash; Nao afiliado oficialmente ao Roblox</p>
        <a
          href="https://www.tiktok.com/@luluseis?_r=1&_t=ZS-97ehuqDkUoK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
          </svg>
          @luluseis
        </a>
      </footer>
    </div>
  );
}
