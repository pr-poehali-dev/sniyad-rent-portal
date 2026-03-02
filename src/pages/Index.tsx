import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─────────────── DATA ───────────────

const SECTIONS = [
  {
    id: "dirt",
    label: "Грязь",
    accent: "#FF6B00",
    accentDark: "#C43A00",
    bg: "#140800",
    bgSection: "#1A0B00",
    heroImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/eb99d79c-6876-46f1-a904-222a78b84f1f.jpg",
    tagline: "МЕСИТЬ ГРЯЗЬ — ЭТО ИСКУССТВО",
    description: "Квадроциклы, внедорожники и эндуро для тех, кто не боится выйти за асфальт",
    isPatriot: false,
    sectionBg: "speed-bg",
    categories: [
      {
        id: "4x4", label: "4×4",
        items: [
          { name: "Yamaha Grizzly 700", type: "Квадроцикл", power: "45 л.с.", priceHour: 3500, priceDay: 18000, tag: "ХИТ" },
          { name: "Can-Am Maverick", type: "Багги", power: "120 л.с.", priceHour: 5500, priceDay: 30000, tag: "МОЩЬ" },
          { name: "Нива Legend 4×4", type: "Внедорожник", power: "83 л.с.", priceHour: 2500, priceDay: 12000, tag: null },
        ],
      },
      {
        id: "moto", label: "Moto",
        items: [
          { name: "KTM EXC 300 TPI", type: "Эндуро", power: "55 л.с.", priceHour: 4000, priceDay: 22000, tag: "ТОПОВЫЙ" },
          { name: "Husqvarna FC 350", type: "Кроссовый", power: "52 л.с.", priceHour: 3800, priceDay: 20000, tag: null },
          { name: "Pitbike YCF 190", type: "Питбайк", power: "12 л.с.", priceHour: 1500, priceDay: 7000, tag: "СТАРТ" },
        ],
      },
    ],
  },
  {
    id: "speed",
    label: "Скорость",
    accent: "#0099FF",
    accentDark: "#005FCC",
    bg: "#00060F",
    bgSection: "#001020",
    heroImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/30f2d4eb-46c0-461e-a0a3-3f69275a4d57.jpg",
    collageImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/b6857674-41ff-4de9-af69-9e63bb597a1d.jpg",
    tagline: "СКОРОСТЬ — ЭТО ВСЕГО ЛИШЬ ОЩУЩЕНИЕ",
    description: "Кольцевые болиды, карты и трековые мотоциклы — максимальная скорость на треке",
    isPatriot: false,
    categories: [
      {
        id: "kuzov", label: "Кузов",
        items: [
          { name: "Переднеприводный кольцевик", type: "Кольцевой FWD", power: "170 л.с.", priceHour: 6000, priceDay: 35000, tag: null },
          { name: "Заднеприводный кольцевик", type: "Кольцевой RWD", power: "250 л.с.", priceHour: 8000, priceDay: 45000, tag: "PRO" },
          { name: "Жига кольцевая", type: "ВАЗ Кольцевой", power: "130 л.с.", priceHour: 4000, priceDay: 22000, tag: "ЛЕГЕНДА" },
        ],
      },
      {
        id: "karts", label: "Iron Eggs",
        items: [
          { name: "Карт Rotax Max", type: "Картинг Rotax", power: "30 л.с.", priceHour: 2500, priceDay: 12000, tag: "ПОПУЛЯРНЫЙ" },
          { name: "Карт DD2", type: "Картинг DD2", power: "35 л.с.", priceHour: 3000, priceDay: 15000, tag: null },
          { name: "Карт KZ", type: "Картинг KZ", power: "48 л.с.", priceHour: 4000, priceDay: 20000, tag: "ЭКСТРИМ" },
        ],
      },
    ],
  },
  {
    id: "style",
    label: "Стиль",
    accent: "#FFE000",
    accentDark: "#CC9900",
    bg: "#0C0B00",
    bgSection: "#141100",
    heroImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/921d2952-3e05-46cf-b2da-b88b46ddecff.jpg",
    smokeImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/8a6ba769-5c61-4574-9ba4-a7faac39df2e.jpg",
    tagline: "КОНТРОЛЬ НА ГРАНИ ПОТЕРИ",
    description: "Дрифт-автомобили от полустока до 400+ сил — почувствуй боковое скольжение",
    isPatriot: false,
    categories: [
      {
        id: "drift", label: "Дрифт",
        items: [
          { name: "Иномарка 2JZ 400+ л.с.", type: "Дрифт Pro", power: "400+ л.с.", priceHour: 10000, priceDay: null, tag: "МОНСТР" },
          { name: "Иномарка Missile", type: "Дрифт Missile", power: "200-400 л.с.", priceHour: 7000, priceDay: null, tag: null },
          { name: "Иномарка полусток", type: "Дрифт Полусток", power: "до 250 л.с.", priceHour: 5000, priceDay: null, tag: "СТАРТ" },
          { name: "Жига Дрифт", type: "ВАЗ Дрифт", power: "120 л.с.", priceHour: 3500, priceDay: null, tag: "НАРОДНЫЙ" },
        ],
      },
    ],
  },
  {
    id: "classic",
    label: "Классика",
    accent: "#E8E8E8",
    accentDark: "#999999",
    bg: "#080808",
    bgSection: "#0F0F0F",
    heroImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/e061dbea-3b06-4dac-ba0b-c9d349e668b1.jpg",
    tagline: "ВРЕМЯ ОСТАНАВЛИВАЕТСЯ",
    description: "Классические автомобили в идеальном состоянии — аренда от суток",
    isPatriot: false,
    categories: [
      {
        id: "classics", label: "Классика",
        items: [
          { name: "ВАЗ-2107", type: "Советская классика", power: "70 л.с.", priceHour: null, priceDay: 8000, tag: "НОСТАЛЬГИЯ" },
          { name: "Mercedes W123", type: "Немецкая классика", power: "95 л.с.", priceHour: null, priceDay: 15000, tag: null },
          { name: "Кабриолет 70-х", type: "Кабриолет", power: "80 л.с.", priceHour: null, priceDay: 18000, tag: "РЕДКОСТЬ" },
          { name: "BMW E30", type: "Баварская классика", power: "115 л.с.", priceHour: null, priceDay: 14000, tag: null },
        ],
      },
    ],
  },
  {
    id: "patriot",
    label: "Отечество",
    accent: "#EE0000",
    accentDark: "#0044CC",
    bg: "#080004",
    bgSection: "#0F0006",
    heroImg: "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/d465db33-6ccb-498a-9446-52802abce8b5.jpg",
    tagline: "НАША ТЕХНИКА — НАШ ХАРАКТЕР",
    description: "Вся мощь отечественного автопрома — от классики до боевых машин трека",
    isPatriot: true,
    categories: [
      {
        id: "otechestvo", label: "ВАЗ & Нива",
        items: [
          { name: "Жигули классика", type: "ВАЗ Классика", power: "70 л.с.", priceHour: 2000, priceDay: 8000, tag: null },
          { name: "Нива 4×4", type: "Нива Внедорожник", power: "83 л.с.", priceHour: 2500, priceDay: 12000, tag: "ЛЕГЕНДА" },
          { name: "Жигули Кольцевая", type: "ВАЗ Кольцевой", power: "130 л.с.", priceHour: 4000, priceDay: 22000, tag: "ТРЕК" },
          { name: "Жигули Дрифт", type: "ВАЗ Дрифт", power: "150 л.с.", priceHour: 3500, priceDay: null, tag: "УГАР" },
        ],
      },
    ],
  },
] as const;

type SectionType = typeof SECTIONS[number] & { collageImg?: string; smokeImg?: string };
type ItemType = { name: string; type: string; power: string; priceHour: number | null; priceDay: number | null; tag: string | null };

// ─────────────── TIRE TRACK SVG ───────────────

function TireTracks({ accent }: { accent: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.07 }}
    >
      {/* Left track */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={`l${i}`}
          x="8%"
          y={`${4 + i * 5.6}%`}
          width="4%"
          height="3.2%"
          rx="1"
          fill={accent}
          transform={`skewY(${i % 2 === 0 ? 2 : -1})`}
        />
      ))}
      {/* Right track */}
      {Array.from({ length: 18 }).map((_, i) => (
        <rect
          key={`r${i}`}
          x="85%"
          y={`${4 + i * 5.6}%`}
          width="4%"
          height="3.2%"
          rx="1"
          fill={accent}
          transform={`skewY(${i % 2 === 0 ? -2 : 1})`}
        />
      ))}
      {/* Diagonal crossing track */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={`d${i}`}
          x={`${15 + i * 5}%`}
          y={`${10 + i * 5.5}%`}
          width="3%"
          height="2.5%"
          rx="1"
          fill={accent}
          transform={`rotate(-20, ${15 + i * 5}%, ${10 + i * 5.5}%)`}
        />
      ))}
    </svg>
  );
}

// ─────────────── DIRT BUTTON ───────────────

function DirtButton({
  children,
  accent,
  filled,
  onClick,
}: {
  children: React.ReactNode;
  accent: string;
  filled?: boolean;
  onClick?: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        background: filled ? (hov ? accent + "EE" : accent) : "transparent",
        color: filled ? "#000" : (hov ? accent : accent + "CC"),
        border: `2px solid ${accent}${filled ? "FF" : "60"}`,
        padding: "10px 24px",
        fontFamily: "Oswald, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s",
        /* Mud-splatter clip: slight uneven polygon */
        clipPath: "polygon(3px 0%, calc(100% - 6px) 2px, 100% 4px, calc(100% - 2px) calc(100% - 3px), calc(100% - 8px) 100%, 4px calc(100% - 1px), 0% calc(100% - 5px), 2px 3px)",
        transform: hov ? "translateY(-2px) rotate(-0.3deg)" : "none",
        boxShadow: hov ? `0 4px 18px ${accent}50` : "none",
      }}
    >
      {children}
      {/* dirt splat deco */}
      <span style={{
        position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50% 30% 50% 20%",
        background: accent, opacity: 0.6, pointerEvents: "none",
      }} />
      <span style={{
        position: "absolute", bottom: -2, left: 6, width: 5, height: 5, borderRadius: "40% 60% 30% 70%",
        background: accent, opacity: 0.4, pointerEvents: "none",
      }} />
    </button>
  );
}

// ─────────────── STICKER CARD (Style section) ───────────────

function StickerCard({
  item,
  accent,
  accentDark,
  bg,
  onSelect,
}: {
  item: ItemType;
  accent: string;
  accentDark: string;
  bg: string;
  onSelect: (item: ItemType) => void;
}) {
  const [hov, setHov] = useState(false);
  // Jagged sticker clip-path
  const clip = "polygon(0% 8px, 8px 0%, calc(100% - 12px) 3px, 100% 10px, calc(100% - 4px) calc(100% - 8px), calc(100% - 10px) 100%, 6px calc(100% - 4px), 0% calc(100% - 12px))";
  const clipHov = "polygon(0% 6px, 10px 0%, calc(100% - 8px) 2px, 100% 8px, calc(100% - 3px) calc(100% - 6px), calc(100% - 8px) 100%, 5px calc(100% - 3px), 0% calc(100% - 10px))";

  return (
    <div
      onClick={() => onSelect(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer",
        background: hov ? accent + "18" : bg,
        border: `2px solid ${accent}${hov ? "AA" : "40"}`,
        clipPath: hov ? clipHov : clip,
        transform: hov ? "translateY(-6px) rotate(0.4deg)" : "rotate(-0.2deg)",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "visible",
        padding: "20px",
        boxShadow: hov ? `0 8px 30px ${accent}40, 4px 4px 0 ${accent}30` : `2px 2px 0 ${accent}20`,
      }}
    >
      {/* Sticker white border effect */}
      <div style={{
        position: "absolute", inset: -5, clipPath: clip,
        background: accent + "18", zIndex: -1,
        transition: "all 0.25s",
      }} />

      {item.tag && (
        <div style={{
          position: "absolute", top: -2, right: 8,
          background: accent, color: "#000",
          padding: "2px 10px",
          fontFamily: "Oswald, sans-serif", fontWeight: 700,
          fontSize: "11px", letterSpacing: "0.15em",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 6px) 100%, 6px 100%)",
          zIndex: 10,
        }}>
          {item.tag}
        </div>
      )}

      <p style={{ color: accent, opacity: 0.55, fontSize: "11px", fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 4 }}>
        {item.type}
      </p>
      <h3 style={{ color: "#F5F5F5", fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", lineHeight: 1, marginBottom: 12 }}>
        {item.name}
      </h3>
      <div style={{
        display: "inline-block", background: accent + "22", color: accent,
        border: `1px solid ${accent}40`, padding: "2px 10px", fontSize: "11px",
        fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.18em",
        marginBottom: 16,
        clipPath: "polygon(4px 0%, calc(100% - 4px) 0%, 100% 50%, calc(100% - 4px) 100%, 4px 100%, 0% 50%)",
      }}>
        ⚡ {item.power}
      </div>

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        {item.priceHour && (
          <div>
            <p style={{ fontSize: "10px", opacity: 0.35, fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>Час</p>
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "28px", color: accent, lineHeight: 1 }}>{item.priceHour.toLocaleString("ru")} ₽</p>
          </div>
        )}
        {item.priceDay && (
          <div>
            <p style={{ fontSize: "10px", opacity: 0.35, fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>Сутки</p>
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "28px", color: accentDark, lineHeight: 1 }}>{item.priceDay.toLocaleString("ru")} ₽</p>
          </div>
        )}
      </div>

      <div style={{
        width: "100%", padding: "10px 0", textAlign: "center",
        fontFamily: "Oswald, sans-serif", fontSize: "13px", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.2em",
        background: hov ? accent : "transparent",
        color: hov ? "#000" : accent,
        border: `1.5px solid ${accent}60`,
        clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)",
        transition: "all 0.2s",
      }}>
        Подробнее →
      </div>
    </div>
  );
}

// ─────────────── DEFAULT CARD ───────────────

function VehicleCard({
  item,
  section,
  onSelect,
}: {
  item: ItemType;
  section: SectionType;
  onSelect: (item: ItemType) => void;
}) {
  const [hovered, setHovered] = useState(false);

  if (section.id === "style") {
    return <StickerCard item={item} accent={section.accent} accentDark={section.accentDark} bg={section.bg} onSelect={onSelect} />;
  }

  return (
    <div
      className="relative cursor-pointer overflow-hidden"
      style={{
        background: hovered ? section.accent + "12" : section.bgSection,
        border: `1px solid ${section.accent}${hovered ? "60" : "22"}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(item)}
    >
      {item.tag && (
        <div
          className="absolute top-0 right-0 px-3 py-1 text-xs font-heading font-bold tracking-widest z-10"
          style={{ background: section.accent, color: "#000" }}
        >
          {item.tag}
        </div>
      )}
      <div className="p-5">
        <p className="text-xs font-body uppercase tracking-widest mb-1" style={{ color: section.accent, opacity: 0.6 }}>
          {item.type}
        </p>
        <h3 className="font-heading text-xl uppercase leading-tight text-white mb-3">{item.name}</h3>
        <div
          className="text-xs font-body uppercase tracking-widest px-2 py-1 inline-block mb-5"
          style={{ background: section.accent + "18", color: section.accent, border: `1px solid ${section.accent}35` }}
        >
          ⚡ {item.power}
        </div>
        <div className="flex gap-6 mb-5">
          {item.priceHour && (
            <div>
              <p className="text-xs opacity-40 font-body uppercase tracking-wider mb-0.5">Час</p>
              <p className="font-display text-2xl leading-none" style={{ color: section.accent }}>
                {item.priceHour.toLocaleString("ru")} ₽
              </p>
            </div>
          )}
          {item.priceDay && (
            <div>
              <p className="text-xs opacity-40 font-body uppercase tracking-wider mb-0.5">Сутки</p>
              <p className="font-display text-2xl leading-none" style={{ color: section.accentDark }}>
                {item.priceDay.toLocaleString("ru")} ₽
              </p>
            </div>
          )}
        </div>

        {section.id === "dirt" ? (
          <DirtButton accent={section.accent}>Подробнее →</DirtButton>
        ) : (
          <button
            className="w-full py-2.5 font-heading text-sm uppercase tracking-widest transition-all duration-200"
            style={{
              background: hovered ? section.accent : "transparent",
              color: hovered ? "#000" : section.accent,
              border: `1px solid ${section.accent}50`,
            }}
          >
            Подробнее →
          </button>
        )}
      </div>
      <div className="h-0.5 transition-all duration-500" style={{ background: section.accent, width: hovered ? "100%" : "0%" }} />
    </div>
  );
}

// ─────────────── MARQUEE ───────────────

function MarqueeLine({ accent, words }: { accent: string; words?: string[] }) {
  const defaultWords = ["АРЕНДА", "АДРЕНАЛИН", "СКОРОСТЬ", "ТЕХНИКА", "КОНТРОЛЬ", "МОЩЬ", "ТРЕК", "СНАРЯД"];
  const w = words ?? defaultWords;
  return (
    <div className="overflow-hidden py-3" style={{ borderTop: `1px solid ${accent}30`, borderBottom: `1px solid ${accent}30` }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...w, ...w, ...w, ...w].map((word, i) => (
          <span key={i} className="mx-8 font-display text-sm tracking-widest" style={{ color: accent, opacity: 0.35 }}>
            {word} <span className="mx-2 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────── SPEED COLLAGE BANNER ───────────────

function SpeedCollageBanner({ accent, img }: { accent: string; img: string }) {
  return (
    <div className="relative overflow-hidden" style={{ height: 340 }}>
      <img
        src={img}
        alt="Racing collage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(1.3) brightness(0.6)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, #00060F 0%, transparent 30%, transparent 70%, #00060F 100%), linear-gradient(90deg, #00060FCC 0%, transparent 40%, transparent 60%, #00060FCC 100%)` }}
      />
      {/* Overlay grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${accent}15 1px, transparent 1px), linear-gradient(90deg, ${accent}15 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Checkered flag strip */}
      <div className="absolute top-0 left-0 right-0 h-3" style={{
        backgroundImage: "repeating-linear-gradient(90deg, #fff 0px, #fff 16px, #000 16px, #000 32px)",
        opacity: 0.5,
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-3" style={{
        backgroundImage: "repeating-linear-gradient(90deg, #000 0px, #000 16px, #fff 16px, #fff 32px)",
        opacity: 0.5,
      }} />
      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-around px-8">
        {[
          { emoji: "⏱️", label: "ХРОНОМЕТРАЖ" },
          { emoji: "🏁", label: "ФИНИШ" },
          { emoji: "🏎️", label: "ТРАССА" },
          { emoji: "🔥", label: "РЕЗИНА" },
        ].map(el => (
          <div key={el.label} className="flex flex-col items-center gap-2 opacity-80">
            <span className="text-5xl">{el.emoji}</span>
            <span className="font-heading text-xs uppercase tracking-widest" style={{ color: accent }}>{el.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────── SMOKE BG SECTION ───────────────

function SmokeBg({ img, accent }: { img: string; accent: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <img
        src={img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18, filter: "saturate(0.4) brightness(0.5)", mixBlendMode: "lighten" }}
      />
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${accent}08 0%, #0C0B0000 70%)`,
      }} />
    </div>
  );
}

// ─────────────── MODAL ───────────────

const PACKAGES = [
  { icon: "Truck", label: "Доставка", desc: "В любую точку" },
  { icon: "Wrench", label: "Механик", desc: "На весь день" },
  { icon: "GraduationCap", label: "Инструктаж", desc: "Перед стартом" },
  { icon: "Shield", label: "Экипировка", desc: "Полный комплект" },
  { icon: "Camera", label: "Съёмка", desc: "Экшн-камеры" },
];

function VehicleModal({ item, section, onClose }: { item: ItemType; section: SectionType; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const isStyle = section.id === "style";
  const modalClip = isStyle ? "polygon(0% 12px, 12px 0%, calc(100% - 16px) 3px, 100% 14px, calc(100% - 5px) calc(100% - 12px), calc(100% - 14px) 100%, 8px calc(100% - 5px), 0% calc(100% - 14px))" : "none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: section.bgSection,
          border: `1px solid ${section.accent}50`,
          clipPath: modalClip,
        }}
      >
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${section.accent}, ${section.accentDark})` }} />
        <div className="sticky top-0 z-10 flex items-center justify-between p-6"
          style={{ background: section.bgSection, borderBottom: `1px solid ${section.accent}20` }}>
          <div>
            <p className="text-xs uppercase tracking-widest font-body mb-1" style={{ color: section.accent, opacity: 0.6 }}>{item.type}</p>
            <h2 className="font-heading text-2xl uppercase" style={{ color: "#F0F0F0" }}>{item.name}</h2>
          </div>
          <button onClick={onClose}
            className="w-10 h-10 flex items-center justify-center font-heading text-lg transition-all"
            style={{ border: `1px solid ${section.accent}30`, color: section.accent }}>✕</button>
        </div>
        <div className="p-6 space-y-8">
          <div className="h-52 flex flex-col items-center justify-center"
            style={{ background: section.accent + "08", border: `1px solid ${section.accent}20` }}>
            <div className="text-6xl mb-3">🔄</div>
            <p className="font-heading uppercase tracking-widest text-base" style={{ color: section.accent, opacity: 0.5 }}>Видео 360°</p>
          </div>
          <div>
            <p className="font-heading uppercase text-xs tracking-widest opacity-30 mb-4">Расценки</p>
            <div className="space-y-3">
              {item.priceHour && (
                <div className="flex items-center justify-between p-4"
                  style={{ background: section.accent + "10", border: `1px solid ${section.accent}25` }}>
                  <div>
                    <p className="font-heading uppercase text-sm" style={{ color: section.accent }}>Почасово</p>
                    <p className="font-body text-xs opacity-40 mt-0.5">Минимум 1 час</p>
                  </div>
                  <p className="font-display text-3xl" style={{ color: section.accent }}>{item.priceHour.toLocaleString("ru")} ₽/ч</p>
                </div>
              )}
              {item.priceDay && (
                <div className="flex items-center justify-between p-4"
                  style={{ background: section.accentDark + "15", border: `1px solid ${section.accentDark}30` }}>
                  <div>
                    <p className="font-heading uppercase text-sm" style={{ color: section.accentDark }}>Суточная аренда</p>
                    <p className="font-body text-xs opacity-40 mt-0.5">24 часа</p>
                  </div>
                  <p className="font-display text-3xl" style={{ color: section.accentDark }}>{item.priceDay.toLocaleString("ru")} ₽</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-heading uppercase text-xs tracking-widest opacity-30 mb-4">Выездной пакет</p>
            <div className="grid grid-cols-1 gap-2">
              {PACKAGES.map(pkg => (
                <div key={pkg.label} className="flex items-center gap-4 p-3" style={{ background: "#FFFFFF06", border: "1px solid #FFFFFF10" }}>
                  <Icon name={pkg.icon} fallback="Star" size={18} style={{ color: section.accent }} />
                  <div>
                    <p className="font-heading text-sm uppercase">{pkg.label}</p>
                    <p className="font-body text-xs opacity-40">{pkg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {section.id === "dirt" ? (
            <DirtButton accent={section.accent} filled>Оставить заявку на аренду</DirtButton>
          ) : (
            <button className="w-full py-4 font-heading text-base uppercase tracking-widest"
              style={{ background: section.accent, color: "#000" }}>
              Оставить заявку на аренду
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────── MAIN ───────────────

export default function Index() {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [gridKey, setGridKey] = useState(0);

  const section = SECTIONS[activeSectionIdx] as SectionType;

  useEffect(() => {
    setActiveCatIdx(0);
    setHeroLoaded(false);
    setGridKey(k => k + 1);
  }, [activeSectionIdx]);

  useEffect(() => { setGridKey(k => k + 1); }, [activeCatIdx]);

  const currentItems = (section.categories[activeCatIdx]?.items ?? []) as ItemType[];

  const isDirt = section.id === "dirt";
  const isSpeed = section.id === "speed";
  const isStyle = section.id === "style";

  return (
    <div className="min-h-screen" style={{ background: section.bg, transition: "background 0.5s ease" }}>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-5 py-3"
        style={{ background: section.bg + "F0", backdropFilter: "blur(20px)", borderBottom: `1px solid ${section.accent}20` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center font-display text-sm font-bold" style={{ background: section.accent, color: "#000" }}>СЯ</div>
          <span className="font-display text-xl tracking-widest text-white">СНАРЯД</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSectionIdx(i)}
              className="px-4 py-1.5 font-heading text-sm uppercase tracking-wider transition-all duration-300"
              style={{
                background: i === activeSectionIdx ? s.accent : "transparent",
                color: i === activeSectionIdx ? "#000" : s.accent,
                border: `1px solid ${s.accent}${i === activeSectionIdx ? "FF" : "35"}`,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 font-heading text-sm uppercase tracking-wider" style={{ background: section.accent, color: "#000" }}>
          Заявка
        </button>
      </nav>

      {/* Mobile tabs */}
      <div className="md:hidden flex overflow-x-auto gap-1 px-3 py-2" style={{ background: section.bg }}>
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveSectionIdx(i)}
            className="flex-shrink-0 px-3 py-1.5 font-heading text-xs uppercase tracking-wider transition-all duration-300"
            style={{
              background: i === activeSectionIdx ? s.accent : "transparent",
              color: i === activeSectionIdx ? "#000" : s.accent,
              border: `1px solid ${s.accent}35`,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      <div className="relative h-[58vh] md:h-[72vh] overflow-hidden">
        <img
          src={section.heroImg}
          alt={section.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 0.7s ease" }}
          onLoad={() => setHeroLoaded(true)}
        />
        <div
          className="absolute inset-0"
          style={{
            background: section.isPatriot
              ? `linear-gradient(to bottom, ${section.bg}AA 0%, ${section.bg}CC 55%, ${section.bg} 100%), linear-gradient(135deg, #CC000022 0%, transparent 50%, #0033CC22 100%)`
              : `linear-gradient(to bottom, ${section.bg}88 0%, ${section.bg}BB 55%, ${section.bg} 100%)`,
          }}
        />
        {section.isPatriot && (
          <>
            <div className="absolute top-0 left-0 right-0 flex h-1.5">
              <div className="flex-1" style={{ background: "#EE0000" }} />
              <div className="flex-1" style={{ background: "#FFFFFF" }} />
              <div className="flex-1" style={{ background: "#0044CC" }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
              <div className="flex-1" style={{ background: "#EE0000" }} />
              <div className="flex-1" style={{ background: "#FFFFFF" }} />
              <div className="flex-1" style={{ background: "#0044CC" }} />
            </div>
          </>
        )}
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10 md:px-16 md:pb-14">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 text-xs font-heading uppercase tracking-widest mb-5"
              style={{ background: section.accent, color: "#000" }}>
              Каталог — {section.label}
            </div>
            <h1 className="font-display text-5xl md:text-8xl leading-none text-white mb-4">{section.tagline}</h1>
            <p className="font-body text-base md:text-xl text-white/60 max-w-xl">{section.description}</p>
          </div>
        </div>
        <div
          className="absolute bottom-0 right-0 w-24 h-24 md:w-40 md:h-40"
          style={{ background: section.accent, clipPath: "polygon(100% 0, 100% 100%, 0 100%)", opacity: 0.12 }}
        />
      </div>

      {/* ── MARQUEE ── */}
      <MarqueeLine
        accent={section.accent}
        words={
          isDirt ? ["ГРЯЗЬ", "КВАДРОЦИКЛ", "ЭНДУРО", "БЕЗДОРОЖЬЕ", "НИВА", "СЛЕД ШИНЫ", "ПРЫЖОК", "РЫВОК"] :
          isSpeed ? ["ХРОНОМЕТРАЖ", "ФИНИШ", "СТАРТ", "ТРАССА", "БОЛИД", "РЕЗИНА", "ОБГОН", "РЕКОРД"] :
          isStyle ? ["ДРИФТ", "БОКОМ", "ДЫМ", "СКОЛЬЖЕНИЕ", "УГОЛ", "ШИНЫ", "УГАР", "СТИЛЬ"] :
          section.id === "patriot" ? ["ОТЕЧЕСТВО", "НИВА", "ЖИГУЛИ", "СДЕЛАНО В СССР", "МОЩЬ", "КЛАССИКА", "ВАЗ", "РОССИЯ"] :
          undefined
        }
      />

      {/* ── CATALOGUE SECTION ── */}
      <div className="relative" style={{ background: section.bgSection }}>

        {/* Dirt: tire tracks */}
        {isDirt && <TireTracks accent={section.accent} />}

        {/* Style: smoke background */}
        {isStyle && "smokeImg" in section && <SmokeBg img={(section as SectionType & { smokeImg: string }).smokeImg} accent={section.accent} />}

        <div className="relative z-10 px-5 md:px-12 py-12">

          {/* Category tabs */}
          {section.categories.length > 1 && (
            <div className="flex gap-2 flex-wrap mb-10">
              {section.categories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatIdx(i)}
                  className="transition-all duration-300"
                  style={
                    isDirt ? {
                      background: i === activeCatIdx ? section.accent : "transparent",
                      color: i === activeCatIdx ? "#000" : section.accent,
                      border: `2px solid ${section.accent}${i === activeCatIdx ? "FF" : "50"}`,
                      padding: "8px 24px",
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      fontSize: "13px",
                      clipPath: "polygon(3px 0%, calc(100% - 6px) 2px, 100% 4px, calc(100% - 2px) calc(100% - 3px), calc(100% - 8px) 100%, 4px calc(100% - 1px), 0% calc(100% - 5px), 2px 3px)",
                    } : {
                      background: i === activeCatIdx ? section.accent : "transparent",
                      color: i === activeCatIdx ? "#000" : section.accent,
                      border: `1px solid ${section.accent}${i === activeCatIdx ? "FF" : "40"}`,
                      padding: "10px 24px",
                      fontFamily: "Oswald, sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      fontSize: "13px",
                    }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Title */}
          <div className="flex items-end gap-5 mb-8">
            <h2 className="font-display text-5xl md:text-7xl leading-none" style={{ color: section.accent }}>
              {section.categories[activeCatIdx]?.label}
            </h2>
            <div className="h-px flex-1 mb-4" style={{ background: section.accent, opacity: 0.2 }} />
            <span className="font-body text-sm opacity-30 mb-3">{currentItems.length} единицы</span>
          </div>

          {/* Cards */}
          <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ padding: isStyle ? "8px 4px" : undefined }}>
            {currentItems.map((item, i) => (
              <div key={item.name} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <VehicleCard item={item} section={section} onSelect={setSelectedItem} />
              </div>
            ))}
          </div>

          {/* Speed: collage banner */}
          {isSpeed && "collageImg" in section && (
            <div className="mt-12">
              <SpeedCollageBanner accent={section.accent} img={(section as SectionType & { collageImg: string }).collageImg} />
            </div>
          )}

          {/* Выездной пакет banner */}
          <div
            className="mt-12 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
            style={{ border: `1px solid ${section.accent}25`, background: section.accent + "07" }}
          >
            <div className="flex-1">
              <h3 className="font-heading text-2xl uppercase mb-2" style={{ color: section.accent }}>Выездной пакет</h3>
              <p className="font-body text-sm text-white/50">
                Минимум 3 часа · Доставка + Механик + Инструктаж + Экипировка + Камеры
              </p>
            </div>
            {isDirt ? (
              <DirtButton accent={section.accent} filled>Узнать стоимость выезда</DirtButton>
            ) : (
              <button
                className="flex-shrink-0 px-8 py-3 font-heading uppercase tracking-widest text-sm hover:opacity-80 transition-opacity"
                style={{ background: section.accent, color: "#000" }}
              >
                Узнать стоимость выезда
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="px-5 md:px-12 py-10" style={{ borderTop: `1px solid ${section.accent}20`, background: section.bg }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-4xl tracking-widest mb-1" style={{ color: section.accent }}>СНАРЯД</p>
            <p className="font-body text-sm text-white/30">Аренда спортивной техники</p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {["О нас", "Расценки", "Партнёрам", "Галерея", "Контакты"].map(link => (
              <button key={link} className="font-body text-sm text-white/30 hover:text-white transition-colors uppercase tracking-wider">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {selectedItem && (
        <VehicleModal item={selectedItem} section={section} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
