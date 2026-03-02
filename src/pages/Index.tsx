import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─────────────── DATA ───────────────

const SECTIONS = [
  {
    id: "dirt",
    label: "Грязь",
    accent: "#FF6B00",
    accentDark: "#C43A00",
    bg: "#0D0400",
    bgGrad: "linear-gradient(135deg, #120500 0%, #1E0800 50%, #0D0000 100%)",
    heroImg:
      "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/eb99d79c-6876-46f1-a904-222a78b84f1f.jpg",
    tagline: "МЕСИТЬ ГРЯЗЬ — ЭТО ИСКУССТВО",
    description:
      "Квадроциклы, внедорожники и эндуро для тех, кто не боится выйти за асфальт",
    isPatriot: false,
    categories: [
      {
        id: "4x4",
        label: "4×4",
        items: [
          { name: "Yamaha Grizzly 700", type: "Квадроцикл", power: "45 л.с.", priceHour: 3500, priceDay: 18000, tag: "ХИТ" },
          { name: "Can-Am Maverick", type: "Багги", power: "120 л.с.", priceHour: 5500, priceDay: 30000, tag: "МОЩЬ" },
          { name: "Нива Legend 4×4", type: "Внедорожник", power: "83 л.с.", priceHour: 2500, priceDay: 12000, tag: null },
        ],
      },
      {
        id: "moto",
        label: "Moto",
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
    bg: "#00050F",
    bgGrad: "linear-gradient(135deg, #000A1A 0%, #001133 50%, #000510 100%)",
    heroImg:
      "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/30f2d4eb-46c0-461e-a0a3-3f69275a4d57.jpg",
    tagline: "СКОРОСТЬ — ЭТО ВСЕГО ЛИШЬ ОЩУЩЕНИЕ",
    description:
      "Кольцевые болиды, карты и трековые мотоциклы — максимальная скорость на треке",
    isPatriot: false,
    categories: [
      {
        id: "kuzov",
        label: "Кузов",
        items: [
          { name: "Переднеприводный кольцевик", type: "Кольцевой FWD", power: "170 л.с.", priceHour: 6000, priceDay: 35000, tag: null },
          { name: "Заднеприводный кольцевик", type: "Кольцевой RWD", power: "250 л.с.", priceHour: 8000, priceDay: 45000, tag: "PRO" },
          { name: "Жига кольцевая", type: "ВАЗ Кольцевой", power: "130 л.с.", priceHour: 4000, priceDay: 22000, tag: "ЛЕГЕНДА" },
        ],
      },
      {
        id: "karts",
        label: "Iron Eggs",
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
    accentDark: "#00CC44",
    bg: "#080800",
    bgGrad: "linear-gradient(135deg, #0A0A00 0%, #141400 50%, #050500 100%)",
    heroImg:
      "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/921d2952-3e05-46cf-b2da-b88b46ddecff.jpg",
    tagline: "КОНТРОЛЬ НА ГРАНИ ПОТЕРИ",
    description:
      "Дрифт-автомобили от полустока до 400+ сил — почувствуй боковое скольжение",
    isPatriot: false,
    categories: [
      {
        id: "drift",
        label: "Дрифт",
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
    bgGrad: "linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #050505 100%)",
    heroImg:
      "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/e061dbea-3b06-4dac-ba0b-c9d349e668b1.jpg",
    tagline: "ВРЕМЯ ОСТАНАВЛИВАЕТСЯ",
    description:
      "Классические автомобили в идеальном состоянии — аренда от суток",
    isPatriot: false,
    categories: [
      {
        id: "classics",
        label: "Классика",
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
    bg: "#040408",
    bgGrad: "linear-gradient(135deg, #050510 0%, #090915 50%, #030308 100%)",
    heroImg:
      "https://cdn.poehali.dev/projects/3803cd10-70d8-4bbd-bfb1-4cf15f4d9c95/files/bd5dac26-32e0-4ace-82db-08e62b7361b4.jpg",
    tagline: "НАША ТЕХНИКА — НАШ ХАРАКТЕР",
    description:
      "Вся мощь отечественного автопрома — от классики до боевых машин трека",
    isPatriot: true,
    categories: [
      {
        id: "otechestvo",
        label: "ВАЗ & Нива",
        items: [
          { name: "Жигули классика", type: "ВАЗ Классика", power: "70 л.с.", priceHour: 2000, priceDay: 8000, tag: null },
          { name: "Нива 4×4", type: "Нива Внедорожник", power: "83 л.с.", priceHour: 2500, priceDay: 12000, tag: "ЛЕГЕНДА" },
          { name: "Жигули Кольцевая", type: "ВАЗ Кольцевой", power: "130 л.с.", priceHour: 4000, priceDay: 22000, tag: "ТРЕК" },
          { name: "Жигули Дрифт", type: "ВАЗ Дрифт", power: "150 л.с.", priceHour: 3500, priceDay: null, tag: "УГАР" },
        ],
      },
    ],
  },
];

type SectionType = typeof SECTIONS[0];
type ItemType = typeof SECTIONS[0]["categories"][0]["items"][0];

// ─────────────── MARQUEE ───────────────

function MarqueeLine({ accent }: { accent: string }) {
  const words = ["АРЕНДА", "АДРЕНАЛИН", "СКОРОСТЬ", "ТЕХНИКА", "КОНТРОЛЬ", "МОЩЬ", "ТРЕК", "СНАРЯД"];
  return (
    <div className="overflow-hidden py-3" style={{ borderTop: `1px solid ${accent}30`, borderBottom: `1px solid ${accent}30` }}>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-8 font-display text-sm tracking-widest" style={{ color: accent, opacity: 0.35 }}>
            {w} <span className="mx-2 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────── VEHICLE CARD ───────────────

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

  return (
    <div
      className="relative cursor-pointer overflow-hidden group"
      style={{
        background: hovered ? section.accent + "12" : section.bg,
        border: `1px solid ${section.accent}${hovered ? "60" : "25"}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(item)}
    >
      {/* Tag */}
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
        <h3 className="font-heading text-xl uppercase leading-tight text-white mb-3">
          {item.name}
        </h3>

        <div
          className="text-xs font-body uppercase tracking-widest px-2 py-1 inline-block mb-5"
          style={{ background: section.accent + "18", color: section.accent, border: `1px solid ${section.accent}35` }}
        >
          ⚡ {item.power}
        </div>

        <div className="flex gap-6 mb-5">
          {item.priceHour && (
            <div>
              <p className="text-xs opacity-40 font-body uppercase tracking-wider mb-0.5">На месте / час</p>
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
      </div>

      {/* Bottom line */}
      <div
        className="h-0.5 transition-all duration-500"
        style={{ background: section.accent, width: hovered ? "100%" : "0%" }}
      />
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(10px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: section.bg, border: `1px solid ${section.accent}50` }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${section.accent}, ${section.accentDark})` }} />

        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-6"
          style={{ background: section.bg, borderBottom: `1px solid ${section.accent}20` }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest font-body mb-1" style={{ color: section.accent, opacity: 0.6 }}>{item.type}</p>
            <h2 className="font-heading text-2xl uppercase" style={{ color: "#F0F0F0" }}>{item.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center font-heading text-lg transition-all"
            style={{ border: `1px solid ${section.accent}30`, color: section.accent }}
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* 360 placeholder */}
          <div
            className="h-52 flex flex-col items-center justify-center"
            style={{ background: section.accent + "08", border: `1px solid ${section.accent}20` }}
          >
            <div className="text-6xl mb-3">🔄</div>
            <p className="font-heading uppercase tracking-widest text-base" style={{ color: section.accent, opacity: 0.5 }}>Видео 360°</p>
            <p className="font-body text-xs opacity-25 mt-1">Добавьте видео через настройки</p>
          </div>

          {/* Detail photos */}
          <div>
            <p className="font-heading uppercase text-xs tracking-widest opacity-30 mb-3">Детали</p>
            <div className="grid grid-cols-5 gap-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="aspect-square flex items-center justify-center text-xl"
                  style={{ background: section.accent + "10", border: `1px solid ${section.accent}20` }}>📷</div>
              ))}
            </div>
          </div>

          {/* Prices */}
          <div>
            <p className="font-heading uppercase text-xs tracking-widest opacity-30 mb-4">Расценки</p>
            <div className="space-y-3">
              {item.priceHour && (
                <div className="flex items-center justify-between p-4"
                  style={{ background: section.accent + "10", border: `1px solid ${section.accent}25` }}>
                  <div>
                    <p className="font-heading uppercase text-sm" style={{ color: section.accent }}>На месте — почасово</p>
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

          {/* Выездной пакет */}
          <div>
            <p className="font-heading uppercase text-xs tracking-widest opacity-30 mb-1">Выездной пакет</p>
            <p className="font-body text-xs opacity-25 mb-4">Мин. 3 часа · Доступно к любой из услуг ниже</p>
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

          {/* CTA */}
          <button
            className="w-full py-4 font-heading text-base uppercase tracking-widest transition-opacity"
            style={{ background: section.accent, color: "#000" }}
          >
            Оставить заявку на аренду
          </button>
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

  const section = SECTIONS[activeSectionIdx];

  useEffect(() => {
    setActiveCatIdx(0);
    setHeroLoaded(false);
    setGridKey(k => k + 1);
  }, [activeSectionIdx]);

  useEffect(() => {
    setGridKey(k => k + 1);
  }, [activeCatIdx]);

  const currentItems = section.categories[activeCatIdx]?.items ?? [];

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

        <button
          className="px-4 py-2 font-heading text-sm uppercase tracking-wider"
          style={{ background: section.accent, color: "#000" }}
        >
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

        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: section.isPatriot
              ? `linear-gradient(to bottom, ${section.bg}AA 0%, ${section.bg}CC 55%, ${section.bg} 100%), linear-gradient(135deg, #CC000022 0%, transparent 50%, #0033CC22 100%)`
              : `linear-gradient(to bottom, ${section.bg}88 0%, ${section.bg}BB 55%, ${section.bg} 100%)`,
          }}
        />

        {/* Patriot tricolor */}
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

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10 md:px-16 md:pb-14">
          <div className="max-w-4xl">
            <div
              className="inline-block px-3 py-1 text-xs font-heading uppercase tracking-widest mb-5"
              style={{ background: section.accent, color: "#000" }}
            >
              Каталог — {section.label}
            </div>
            <h1 className="font-display text-5xl md:text-8xl leading-none text-white mb-4">
              {section.tagline}
            </h1>
            <p className="font-body text-base md:text-xl text-white/60 max-w-xl">
              {section.description}
            </p>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 md:w-40 md:h-40"
          style={{ background: section.accent, clipPath: "polygon(100% 0, 100% 100%, 0 100%)", opacity: 0.12 }}
        />
      </div>

      {/* ── MARQUEE ── */}
      <MarqueeLine accent={section.accent} />

      {/* ── CATALOGUE ── */}
      <div className="px-5 md:px-12 py-12">

        {/* Category tabs */}
        {section.categories.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-10">
            {section.categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCatIdx(i)}
                className="px-6 py-2.5 font-heading text-sm uppercase tracking-widest transition-all duration-300"
                style={{
                  background: i === activeCatIdx ? section.accent : "transparent",
                  color: i === activeCatIdx ? "#000" : section.accent,
                  border: `1px solid ${section.accent}${i === activeCatIdx ? "FF" : "40"}`,
                }}
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
        <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item, i) => (
            <div
              key={item.name}
              style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
            >
              <VehicleCard item={item} section={section} onSelect={setSelectedItem} />
            </div>
          ))}
        </div>

        {/* Выездной пакет banner */}
        <div
          className="mt-12 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6"
          style={{ border: `1px solid ${section.accent}25`, background: section.accent + "07" }}
        >
          <div className="flex-1">
            <h3 className="font-heading text-2xl uppercase mb-2" style={{ color: section.accent }}>
              Выездной пакет
            </h3>
            <p className="font-body text-sm text-white/50">
              Минимум 3 часа · Доставка + Механик + Инструктаж + Экипировка + Камеры · Едем в любую точку
            </p>
          </div>
          <button
            className="flex-shrink-0 px-8 py-3 font-heading uppercase tracking-widest text-sm transition-opacity hover:opacity-80"
            style={{ background: section.accent, color: "#000" }}
          >
            Узнать стоимость выезда
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="px-5 md:px-12 py-10 mt-4" style={{ borderTop: `1px solid ${section.accent}20` }}>
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

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── MODAL ── */}
      {selectedItem && (
        <VehicleModal item={selectedItem} section={section} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}