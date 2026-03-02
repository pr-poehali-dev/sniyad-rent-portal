import { useState, useEffect, useRef } from "react";
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
  type = "button",
}: {
  children: React.ReactNode;
  accent: string;
  filled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
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

const STICKER_COLORS = ["#7C3AFF", "#84CC16", "#FF6B00", "#00BCD4"];

function StickerCard({
  item,
  accent,
  accentDark,
  onSelect,
  colorIdx,
}: {
  item: ItemType;
  accent: string;
  accentDark: string;
  onSelect: (item: ItemType) => void;
  colorIdx: number;
}) {
  const [hov, setHov] = useState(false);
  const cardColor = STICKER_COLORS[colorIdx % STICKER_COLORS.length];
  const clip = "polygon(0% 8px, 8px 0%, calc(100% - 12px) 3px, 100% 10px, calc(100% - 4px) calc(100% - 8px), calc(100% - 10px) 100%, 6px calc(100% - 4px), 0% calc(100% - 12px))";
  const clipHov = "polygon(0% 6px, 10px 0%, calc(100% - 8px) 2px, 100% 8px, calc(100% - 3px) calc(100% - 6px), calc(100% - 8px) 100%, 5px calc(100% - 3px), 0% calc(100% - 10px))";

  return (
    <div
      onClick={() => onSelect(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer",
        background: cardColor + (hov ? "40" : "22"),
        border: `2px solid ${cardColor}${hov ? "CC" : "60"}`,
        clipPath: hov ? clipHov : clip,
        transform: hov ? "translateY(-6px) rotate(0.4deg)" : "rotate(-0.2deg)",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "visible",
        padding: "0 0 16px",
        boxShadow: hov ? `0 8px 30px ${cardColor}50, 4px 4px 0 ${cardColor}40` : `2px 2px 0 ${cardColor}30`,
      }}
    >
      {/* Photo placeholder */}
      <div style={{
        width: "100%", height: 120,
        background: cardColor + "30",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 6,
        borderBottom: `1px solid ${cardColor}40`,
        marginBottom: 14,
      }}>
        <Icon name="Image" size={28} style={{ color: cardColor, opacity: 0.5 }} />
        <span style={{ fontFamily: "Oswald, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: cardColor, opacity: 0.4 }}>Фото</span>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Sticker border deco */}
        <div style={{
          position: "absolute", inset: -5, clipPath: clip,
          background: cardColor + "12", zIndex: -1, transition: "all 0.25s",
        }} />

        {item.tag && (
          <div style={{
            position: "absolute", top: -2, right: 8,
            background: cardColor, color: "#000",
            padding: "2px 10px",
            fontFamily: "Oswald, sans-serif", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.15em",
            clipPath: "polygon(0 0, 100% 0, calc(100% - 6px) 100%, 6px 100%)",
            zIndex: 10,
          }}>
            {item.tag}
          </div>
        )}

        <p style={{ color: cardColor, opacity: 0.7, fontSize: "11px", fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 3 }}>
          {item.type}
        </p>
        <h3 style={{ color: "#F5F5F5", fontFamily: "Bebas Neue, sans-serif", fontSize: "20px", lineHeight: 1.1, marginBottom: 10 }}>
          {item.name}
        </h3>
        <div style={{
          display: "inline-block", background: cardColor + "28", color: cardColor,
          border: `1px solid ${cardColor}50`, padding: "2px 10px", fontSize: "11px",
          fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.18em",
          marginBottom: 12,
          clipPath: "polygon(4px 0%, calc(100% - 4px) 0%, 100% 50%, calc(100% - 4px) 100%, 4px 100%, 0% 50%)",
        }}>
          ⚡ {item.power}
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          {item.priceHour && (
            <div>
              <p style={{ fontSize: "10px", opacity: 0.4, fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>Час</p>
              <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: cardColor, lineHeight: 1 }}>{item.priceHour.toLocaleString("ru")} ₽</p>
            </div>
          )}
          {item.priceDay && (
            <div>
              <p style={{ fontSize: "10px", opacity: 0.4, fontFamily: "Oswald, sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>Сутки</p>
              <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "24px", color: accentDark, lineHeight: 1 }}>{item.priceDay.toLocaleString("ru")} ₽</p>
            </div>
          )}
        </div>

        <div style={{
          width: "100%", padding: "9px 0", textAlign: "center",
          fontFamily: "Oswald, sans-serif", fontSize: "12px", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.2em",
          background: hov ? cardColor : "transparent",
          color: hov ? "#000" : cardColor,
          border: `1.5px solid ${cardColor}70`,
          clipPath: "polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)",
          transition: "all 0.2s",
        }}>
          Подробнее →
        </div>
      </div>
    </div>
  );
}

// ─────────────── PHOTO PLACEHOLDER ───────────────

function PhotoPlaceholder({ accent }: { accent: string }) {
  return (
    <div style={{
      width: "100%", height: 130,
      background: accent + "0F",
      borderBottom: `1px solid ${accent}20`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 6,
    }}>
      <Icon name="Image" size={26} style={{ color: accent, opacity: 0.35 }} />
      <span style={{ fontFamily: "Oswald, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: accent, opacity: 0.25 }}>Фото</span>
    </div>
  );
}

// ─────────────── DEFAULT CARD ───────────────

function VehicleCard({
  item,
  section,
  onSelect,
  colorIdx,
}: {
  item: ItemType;
  section: SectionType;
  onSelect: (item: ItemType) => void;
  colorIdx?: number;
}) {
  const [hovered, setHovered] = useState(false);

  if (section.id === "style") {
    return <StickerCard item={item} accent={section.accent} accentDark={section.accentDark} onSelect={onSelect} colorIdx={colorIdx ?? 0} />;
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

      {/* Photo placeholder */}
      <PhotoPlaceholder accent={section.accent} />

      <div className="p-4">
        <p className="text-xs font-body uppercase tracking-widest mb-1" style={{ color: section.accent, opacity: 0.6 }}>
          {item.type}
        </p>
        <h3 className="font-heading text-lg uppercase leading-tight text-white mb-2">{item.name}</h3>
        <div
          className="text-xs font-body uppercase tracking-widest px-2 py-1 inline-block mb-4"
          style={{ background: section.accent + "18", color: section.accent, border: `1px solid ${section.accent}35` }}
        >
          ⚡ {item.power}
        </div>
        <div className="flex gap-5 mb-4">
          {item.priceHour && (
            <div>
              <p className="text-xs opacity-40 font-body uppercase tracking-wider mb-0.5">Час</p>
              <p className="font-display text-xl leading-none" style={{ color: section.accent }}>
                {item.priceHour.toLocaleString("ru")} ₽
              </p>
            </div>
          )}
          {item.priceDay && (
            <div>
              <p className="text-xs opacity-40 font-body uppercase tracking-wider mb-0.5">Сутки</p>
              <p className="font-display text-xl leading-none" style={{ color: section.accentDark }}>
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

// ─────────────── BOOKING FORM MODAL ───────────────

const ALL_VEHICLES = SECTIONS.flatMap(s =>
  s.categories.flatMap(c => c.items.map(it => it.name))
);

function BookingModal({ section, preselect, onClose }: {
  section: SectionType;
  preselect?: string;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState(preselect ?? "");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("1");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => firstRef.current?.focus(), 100);
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const accent = section.accent;
  const bg = section.bgSection;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: accent + "0A",
    border: `1px solid ${accent}35`,
    color: "#F0F0F0",
    padding: "12px 16px",
    fontFamily: "Oswald, sans-serif",
    fontSize: "14px",
    letterSpacing: "0.05em",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Oswald, sans-serif",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: accent,
    opacity: 0.6,
    marginBottom: 6,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto"
        style={{ background: bg, border: `1px solid ${accent}50` }}
      >
        {/* Top accent bar */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${section.accentDark})` }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: `1px solid ${accent}18` }}>
          <div>
            <p style={{ ...labelStyle, marginBottom: 3 }}>Снаряд — Аренда</p>
            <h2 className="font-display text-3xl" style={{ color: "#F5F5F5" }}>ЗАЯВКА</h2>
          </div>
          <button onClick={onClose}
            className="w-10 h-10 flex items-center justify-center font-heading text-base transition-all hover:opacity-60"
            style={{ border: `1px solid ${accent}30`, color: accent }}>✕</button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h3 className="font-display text-4xl mb-3" style={{ color: accent }}>ПРИНЯТО!</h3>
            <p className="font-body text-white/50 text-sm mb-8">
              Свяжемся с вами в течение 15 минут для подтверждения бронирования
            </p>
            <button
              onClick={onClose}
              className="px-10 py-3 font-heading text-sm uppercase tracking-widest"
              style={{ background: accent, color: "#000" }}
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">

            {/* Name */}
            <div>
              <label style={labelStyle}>Ваше имя</label>
              <input
                ref={firstRef}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                required
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
                style={inputStyle}
              />
            </div>

            {/* Vehicle select */}
            <div>
              <label style={labelStyle}>Техника</label>
              <select
                value={vehicle}
                onChange={e => setVehicle(e.target.value)}
                required
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="" disabled style={{ background: "#111" }}>Выберите из каталога</option>
                {ALL_VEHICLES.map(v => (
                  <option key={v} value={v} style={{ background: "#111" }}>{v}</option>
                ))}
              </select>
            </div>

            {/* Date + duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Дата</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  style={{ ...inputStyle, colorScheme: "dark" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Количество часов</label>
                <select
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {["1", "2", "3", "4", "6", "8", "Весь день (24ч)"].map(d => (
                    <option key={d} value={d} style={{ background: "#111" }}>{d === "Весь день (24ч)" ? d : `${d} ч`}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label style={labelStyle}>Комментарий</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Выезд, количество участников, пожелания..."
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            {/* Info strip */}
            <div className="flex items-center gap-3 px-4 py-3"
              style={{ background: accent + "0D", border: `1px solid ${accent}20` }}>
              <Icon name="Clock" size={16} style={{ color: accent, flexShrink: 0 }} />
              <p className="font-body text-xs" style={{ color: accent, opacity: 0.7 }}>
                Ответим в течение 15 минут · Без предоплаты · Бронирование бесплатно
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 font-heading text-base uppercase tracking-widest transition-opacity hover:opacity-85"
              style={{ background: accent, color: "#000" }}
            >
              Отправить заявку →
            </button>
          </form>
        )}
      </div>
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

function VehicleModal({ item, section, onClose, onBook }: { item: ItemType; section: SectionType; onClose: () => void; onBook: (v: string) => void }) {
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
            <DirtButton accent={section.accent} filled onClick={() => { onClose(); onBook(item.name); }}>Оставить заявку на аренду</DirtButton>
          ) : (
            <button
              onClick={() => { onClose(); onBook(item.name); }}
              className="w-full py-4 font-heading text-base uppercase tracking-widest"
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
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPreselect, setBookingPreselect] = useState<string | undefined>();

  const openBooking = (vehicle?: string) => {
    setBookingPreselect(vehicle);
    setBookingOpen(true);
  };

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
          {SECTIONS.map((s, i) => {
            const active = i === activeSectionIdx;
            // per-section nav button shape
            const clipMap: Record<string, string> = {
              dirt: "polygon(3px 0%, calc(100% - 6px) 2px, 100% 4px, calc(100% - 2px) calc(100% - 3px), calc(100% - 8px) 100%, 4px calc(100% - 1px), 0% calc(100% - 5px), 2px 3px)",
              speed: "none",
              style: "polygon(0% 6px, 6px 0%, calc(100% - 6px) 0%, 100% 6px, calc(100% - 6px) 100%, 6px 100%)",
              classic: "none",
              patriot: "none",
            };
            return (
              <button
                key={s.id}
                onClick={() => setActiveSectionIdx(i)}
                className="px-4 py-1.5 font-heading text-sm uppercase tracking-wider transition-all duration-300"
                style={{
                  background: active ? s.accent : "transparent",
                  color: active ? "#000" : s.accent,
                  border: `1px solid ${s.accent}${active ? "FF" : "35"}`,
                  clipPath: clipMap[s.id] ?? "none",
                  borderRadius: s.id === "classic" ? "0" : undefined,
                  // speed: skewed
                  transform: s.id === "speed" ? "skewX(-8deg)" : undefined,
                  // patriot: double border trick via outline
                  outline: s.id === "patriot" && active ? `2px solid ${s.accentDark}` : undefined,
                  outlineOffset: s.id === "patriot" ? "2px" : undefined,
                }}
              >
                <span style={{ display: "inline-block", transform: s.id === "speed" ? "skewX(8deg)" : undefined }}>
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <button onClick={() => openBooking()} className="px-4 py-2 font-heading text-sm uppercase tracking-wider" style={{ background: section.accent, color: "#000" }}>
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
          <div key={gridKey} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
            style={{ padding: isStyle ? "8px 4px" : undefined }}>
            {currentItems.map((item, i) => (
              <div key={item.name} style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <VehicleCard item={item} section={section} onSelect={setSelectedItem} colorIdx={i} />
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
                Любое время · Доставка + Механик + Инструктаж + Экипировка + Камеры
              </p>
            </div>
            {isDirt ? (
              <DirtButton accent={section.accent} filled onClick={() => openBooking()}>Узнать стоимость выезда</DirtButton>
            ) : (
              <button
                onClick={() => openBooking()}
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
        <VehicleModal item={selectedItem} section={section} onClose={() => setSelectedItem(null)} onBook={(v) => { setSelectedItem(null); openBooking(v); }} />
      )}
      {bookingOpen && (
        <BookingModal section={section} preselect={bookingPreselect} onClose={() => setBookingOpen(false)} />
      )}
    </div>
  );
}