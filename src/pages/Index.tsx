import { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '@/components/ui/icon';

type ServerTheme = 'anarchy' | 'classic';

// ===== SWORD CURSOR SVG (Anarchy) =====
const SwordSVG = ({ hover, pressed }: { hover: boolean; pressed: boolean }) => (
  <svg
    width="48" height="48" viewBox="0 0 48 48"
    style={{ imageRendering: 'pixelated', transform: pressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s' }}
  >
    <g transform="rotate(-45, 24, 24)">
      <rect x="21" y="4" width="6" height="28" fill="#c8d4d8" />
      <rect x="22" y="5" width="4" height="26" fill="#e8f0f4" />
      <rect x="23" y="4" width="2" height="2" fill="#ffffff" opacity="0.8" />
      <rect x="14" y="30" width="20" height="4" fill="#8890a0" />
      <rect x="15" y="31" width="18" height="2" fill="#a0a8b8" />
      <rect x="20" y="34" width="8" height="10" fill="#7b5e3a" />
      <rect x="21" y="35" width="6" height="8" fill="#9b7a4e" />
      <rect x="19" y="43" width="10" height="3" fill="#8890a0" />
    </g>
    {hover && (
      <g style={{ transformOrigin: '10px 10px' }} className="animate-fire">
        <ellipse cx="10" cy="12" rx="5" ry="7" fill="#ff6a00" opacity="0.9" />
        <ellipse cx="10" cy="11" rx="3" ry="5" fill="#ffaa00" opacity="0.85" />
        <ellipse cx="10" cy="10" rx="2" ry="3" fill="#fff700" opacity="0.8" />
        <ellipse cx="10" cy="9" rx="1" ry="2" fill="#ffffff" opacity="0.6" />
      </g>
    )}
  </svg>
);

// ===== AXE CURSOR SVG (Classic) =====
const AxeSVG = ({ hover, pressed }: { hover: boolean; pressed: boolean }) => (
  <svg
    width="48" height="48" viewBox="0 0 48 48"
    style={{ imageRendering: 'pixelated', transform: pressed ? 'scale(0.88)' : 'scale(1)', transition: 'transform 0.1s' }}
  >
    <g transform="rotate(-45, 24, 24)">
      <rect x="21" y="18" width="5" height="26" fill="#7b5e3a" />
      <rect x="22" y="19" width="3" height="24" fill="#9b7a4e" />
      <rect x="12" y="6" width="20" height="18" fill="#8890a0" rx="1" />
      <rect x="14" y="7" width="16" height="16" fill="#a0a8b8" />
      <rect x="13" y="8" width="5" height="12" fill="#c0c8d8" />
      <rect x="28" y="7" width="3" height="16" fill="#d0d8e8" />
      <rect x="20" y="20" width="7" height="3" fill="#5a3a1a" />
    </g>
    {hover && (
      <g>
        <rect x="2" y="2" width="14" height="14" fill="#8B5E3C" />
        <rect x="3" y="3" width="12" height="12" fill="#A0703F" />
        <rect x="4" y="3" width="1" height="12" fill="#7a4a2a" opacity="0.5" />
        <rect x="7" y="3" width="1" height="12" fill="#7a4a2a" opacity="0.4" />
        <rect x="11" y="3" width="1" height="12" fill="#7a4a2a" opacity="0.5" />
        <rect x="3" y="5" width="12" height="1" fill="#7a4a2a" opacity="0.3" />
        <rect x="3" y="9" width="12" height="1" fill="#7a4a2a" opacity="0.3" />
        <rect x="2" y="2" width="14" height="14" fill="none" stroke="#5a3a1a" strokeWidth="1" />
      </g>
    )}
  </svg>
);

// ===== DATA =====
const PRODUCTS = {
  anarchy: [
    { id: 1, name: '💀 Скелет', desc: 'Набор выживальщика анархии', price: 199, type: 'privilege', emoji: '💀' },
    { id: 2, name: '🔥 Демон', desc: 'Огненные способности и защита', price: 349, type: 'privilege', emoji: '🔥' },
    { id: 3, name: '⚡ Властелин', desc: 'Абсолютная сила на сервере', price: 599, type: 'privilege', emoji: '⚡' },
    { id: 4, name: '🗡️ Сет железа', desc: 'Полный набор железного снаряжения', price: 79, type: 'item', emoji: '🗡️' },
    { id: 5, name: '💣 ТНТ x64', desc: '64 блока ТНТ для взрывов', price: 99, type: 'item', emoji: '💣' },
    { id: 6, name: '🪙 1000 монет', desc: 'Внутриигровая валюта', price: 149, type: 'item', emoji: '🪙' },
  ],
  classic: [
    { id: 7, name: '🌱 Новичок+', desc: 'Базовые привилегии игрока', price: 149, type: 'privilege', emoji: '🌱' },
    { id: 8, name: '🏗️ Строитель', desc: 'Увеличенные регионы и команды', price: 299, type: 'privilege', emoji: '🏗️' },
    { id: 9, name: '👑 Мастер', desc: 'Максимальные возможности', price: 499, type: 'privilege', emoji: '👑' },
    { id: 10, name: '🪵 Дерево x64', desc: '64 блока дуба', price: 49, type: 'item', emoji: '🪵' },
    { id: 11, name: '🏠 Стартовый набор', desc: 'Инструменты и еда для старта', price: 89, type: 'item', emoji: '🏠' },
    { id: 12, name: '🪙 1000 монет', desc: 'Внутриигровая валюта', price: 129, type: 'item', emoji: '🪙' },
  ],
};

const RULES = {
  anarchy: [
    { title: '⚠️ Основные правила', items: ['Читерство с помощью внешних программ запрещено', 'Дюпы, кроме официально разрешённых — бан', 'Реклама других серверов — бан'] },
    { title: '⚔️ PvP и рейды', items: ['PvP разрешён везде и всегда', 'Гриферство и рейды — часть игры', 'Фарм спавна новичков дольше 10 минут запрещён'] },
    { title: '💬 Общение', items: ['Оскорбления по национальному признаку — бан', 'Спам в чате — мут 30 минут', 'Реклама — перманентный бан'] },
    { title: '🔨 Строительство', items: ['Строить вблизи спавна (500 блоков) запрещено', 'Лагерные ловушки на спавне запрещены', 'Постройки из читерных блоков удаляются'] },
  ],
  classic: [
    { title: '📋 Общие правила', items: ['Уважай других игроков', 'Читерство запрещено — перманентный бан', 'Обход бана с другого аккаунта — ban IP'] },
    { title: '🌍 Мир и регионы', items: ['Строй только в своих регионах', 'Гриферство чужих построек — бан 7 дней', 'Максимум 3 региона без привилегий'] },
    { title: '💬 Чат и общение', items: ['Мат в общем чате запрещён', 'Флуд и спам — мут 1 час', 'Оскорбления — мут от 1 до 24 часов'] },
    { title: '🛒 Торговля', items: ['Мошенничество в сделках — бан 3 дня', 'Магазины должны быть честными', 'Продажа за реальные деньги без разрешения — бан'] },
  ],
};

const DURATIONS = [
  { label: '30 дней', multiplier: 1 },
  { label: '60 дней', multiplier: 1.7 },
  { label: '90 дней', multiplier: 2.2 },
  { label: 'Навсегда', multiplier: 3.5 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

const Index = () => {
  const [theme, setTheme] = useState<ServerTheme>('anarchy');
  const [showOverlay, setShowOverlay] = useState(true);
  const [highlightedCard, setHighlightedCard] = useState<ServerTheme>('anarchy');
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [buyModal, setBuyModal] = useState<{ product: (typeof PRODUCTS.anarchy)[0] } | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [openRules, setOpenRules] = useState<number | null>(0);
  const [guideModal, setGuideModal] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [hoveringBtn, setHoveringBtn] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);
  const autoSwitchRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredByMouseRef = useRef(false);

  // Cursor tracking
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const down = (e: MouseEvent) => {
      setMousePressed(true);
      spawnClickBurst(e.clientX, e.clientY);
    };
    const up = () => setMousePressed(false);
    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"]')) setHoveringBtn(true);
    };
    const leave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"]')) setHoveringBtn(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, [theme]);

  const spawnClickBurst = (x: number, y: number) => {
    const colors = theme === 'anarchy'
      ? ['#ff6a00', '#ff3300', '#ffaa00', '#ff0000', '#ff8800']
      : ['#c87820', '#8B5E3C', '#e8a840', '#a0703f', '#d4a030'];
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.className = 'click-burst';
      el.style.cssText = `
        position:fixed; pointer-events:none; z-index:99998;
        width:${4 + Math.random() * 5}px; height:${4 + Math.random() * 5}px;
        border-radius:50%;
        left:${x}px; top:${y}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation: burst-out 0.5s ease-out forwards;
      `;
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
      const dist = 25 + Math.random() * 50;
      el.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
      el.style.setProperty('--by', `${Math.sin(angle) * dist}px`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 600);
    }
  };

  // Theme class on body
  useEffect(() => {
    document.body.classList.toggle('theme-classic', theme === 'classic');
  }, [theme]);

  // Auto switch
  const startAutoSwitch = useCallback(() => {
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current);
    autoSwitchRef.current = setInterval(() => {
      if (!hoveredByMouseRef.current) {
        setHighlightedCard(prev => prev === 'anarchy' ? 'classic' : 'anarchy');
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (showOverlay) startAutoSwitch();
    return () => { if (autoSwitchRef.current) clearInterval(autoSwitchRef.current); };
  }, [showOverlay, startAutoSwitch]);

  const selectServer = (s: ServerTheme) => {
    setTheme(s);
    setHighlightedCard(s);
    setShowOverlay(false);
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current);
  };

  const addToCart = (product: (typeof PRODUCTS.anarchy)[0], duration?: string, price?: number) => {
    setCart(prev => [...prev, {
      id: Date.now(),
      name: product.name + (duration ? ` [${duration}]` : ''),
      price: price ?? product.price,
      emoji: product.emoji,
    }]);
    setBuyModal(null);
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const cartTotal = cart.reduce((s, i) => s + i.price, 0);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const products = PRODUCTS[theme];
  const rules = RULES[theme];
  const videoId = theme === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M';

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'shop', label: 'Товары' },
    { id: 'rules', label: 'Правила' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-body overflow-x-hidden">

      {/* Custom cursor */}
      <div
        style={{
          position: 'fixed',
          left: cursorPos.x - 4,
          top: cursorPos.y - 44,
          pointerEvents: 'none',
          zIndex: 99999,
          display: theme === 'anarchy' ? 'block' : 'none',
        }}
      >
        <SwordSVG hover={hoveringBtn} pressed={mousePressed} />
      </div>
      <div
        style={{
          position: 'fixed',
          left: cursorPos.x - 4,
          top: cursorPos.y - 44,
          pointerEvents: 'none',
          zIndex: 99999,
          display: theme === 'classic' ? 'block' : 'none',
        }}
      >
        <AxeSVG hover={hoveringBtn} pressed={mousePressed} />
      </div>

      {/* Server selection overlay */}
      {showOverlay && (
        <div className="server-overlay">
          <div className="text-center max-w-4xl w-full px-4">
            <div className="font-pixel text-white text-base md:text-2xl mb-2 animate-flicker pixel-glow" style={{ color: 'var(--theme-text-accent)' }}>
              GAMAI CLUB
            </div>
            <div className="text-gray-500 text-xs mb-10 font-pixel" style={{ fontSize: '9px' }}>ВЫБЕРИ СВОЙ ПУТЬ</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div
                className={`server-card-select anarchy rounded-xl p-8 cursor-pointer ${highlightedCard === 'anarchy' ? 'highlighted' : ''}`}
                style={{
                  background: highlightedCard === 'anarchy'
                    ? 'linear-gradient(135deg, rgba(60,5,0,0.97) 0%, rgba(30,0,0,0.93) 100%)'
                    : 'rgba(20,2,0,0.7)',
                  border: `2px solid ${highlightedCard === 'anarchy' ? '#ff4400' : 'rgba(255,60,0,0.15)'}`,
                  boxShadow: highlightedCard === 'anarchy' ? '0 0 50px rgba(255,60,0,0.35), 0 0 100px rgba(255,20,0,0.1)' : 'none',
                }}
                onClick={() => selectServer('anarchy')}
                onMouseEnter={() => { hoveredByMouseRef.current = true; setHighlightedCard('anarchy'); }}
                onMouseLeave={() => { hoveredByMouseRef.current = false; }}
              >
                <div className="text-6xl mb-5 animate-float">💀</div>
                <div className="font-pixel text-red-400 text-xl mb-3" style={{ textShadow: '0 0 20px rgba(255,50,0,0.8)' }}>АНАРХИЯ</div>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">Никаких правил. Полная свобода. Выживание — закон.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['PvP', 'Рейды', 'Гриф', 'Без правил'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,60,0,0.15)', border: '1px solid rgba(255,60,0,0.35)', color: '#ff8844' }}>{t}</span>
                  ))}
                </div>
                {highlightedCard === 'anarchy' && (
                  <div className="mt-5 font-pixel text-red-300 animate-fade-in" style={{ fontSize: '9px' }}>[ НАЖМИ ЧТОБЫ ВОЙТИ ]</div>
                )}
              </div>

              <div
                className={`server-card-select classic rounded-xl p-8 cursor-pointer ${highlightedCard === 'classic' ? 'highlighted' : ''}`}
                style={{
                  background: highlightedCard === 'classic'
                    ? 'linear-gradient(135deg, rgba(45,25,0,0.97) 0%, rgba(22,12,0,0.93) 100%)'
                    : 'rgba(20,10,0,0.7)',
                  border: `2px solid ${highlightedCard === 'classic' ? '#c87820' : 'rgba(180,120,30,0.15)'}`,
                  boxShadow: highlightedCard === 'classic' ? '0 0 50px rgba(180,120,30,0.35), 0 0 100px rgba(120,80,10,0.1)' : 'none',
                }}
                onClick={() => selectServer('classic')}
                onMouseEnter={() => { hoveredByMouseRef.current = true; setHighlightedCard('classic'); }}
                onMouseLeave={() => { hoveredByMouseRef.current = false; }}
              >
                <div className="text-6xl mb-5 animate-float" style={{ animationDelay: '1.5s' }}>🌲</div>
                <div className="font-pixel text-amber-400 text-xl mb-3" style={{ textShadow: '0 0 20px rgba(180,120,30,0.8)' }}>КЛАССИКА</div>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">Строй, торгуй, дружи. Честная игра в лучших традициях.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['SMP', 'Экономика', 'Регионы', 'Ивенты'].map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(180,120,30,0.15)', border: '1px solid rgba(180,120,30,0.35)', color: '#e8a840' }}>{t}</span>
                  ))}
                </div>
                {highlightedCard === 'classic' && (
                  <div className="mt-5 font-pixel text-amber-300 animate-fade-in" style={{ fontSize: '9px' }}>[ НАЖМИ ЧТОБЫ ВОЙТИ ]</div>
                )}
              </div>
            </div>

            <div className="mt-8 text-gray-700 font-pixel" style={{ fontSize: '8px' }}>автосмена каждые 10 сек</div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('home')}
            className="font-pixel text-xs pixel-glow"
            style={{ color: 'var(--theme-text-accent)', fontSize: '10px' }}
          >
            GAMAI CLUB
          </button>
          <span
            className="hidden md:block font-pixel px-2 py-1 rounded"
            style={{ background: 'var(--theme-glow-soft)', color: 'var(--theme-text-bright)', fontSize: '8px', border: '1px solid var(--theme-border)' }}
          >
            {theme === 'anarchy' ? '💀 АНАРХИЯ' : '🌲 КЛАССИКА'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-2 md:px-4 py-2 text-xs rounded font-semibold transition-all"
              style={{
                color: activeSection === item.id ? 'var(--theme-text-accent)' : '#888',
                background: activeSection === item.id ? 'var(--theme-glow-soft)' : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-2 p-2 rounded transition-all hover:scale-105"
            style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
          >
            <Icon name="ShoppingCart" size={18} style={{ color: 'var(--theme-text-accent)' }} />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-black"
                style={{ background: 'var(--theme-text-accent)' }}
              >
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowOverlay(true)}
            className="p-2 text-gray-600 hover:text-gray-400 transition-colors"
            title="Сменить сервер"
          >
            <Icon name="RefreshCw" size={15} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="video-bg-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&playsinline=1`}
            allow="autoplay; encrypted-media; fullscreen"
            title="bg"
          />
          <div className="video-overlay" />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.65) 100%)',
          }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <div
            className="font-pixel text-3xl md:text-5xl lg:text-6xl mb-4 animate-flicker leading-tight"
            style={{ color: 'var(--theme-text-accent)', textShadow: '0 0 30px var(--theme-glow), 0 0 60px var(--theme-glow-soft)' }}
          >
            GAMAI CLUB
          </div>
          <div
            className="font-russo text-xl md:text-2xl text-gray-200 mb-2 animate-slide-up"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {theme === 'anarchy' ? '💀 Сервер Анархии' : '🌲 Классический SMP'}
          </div>
          <div
            className="text-gray-400 text-sm mb-6 animate-slide-up"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Версия 1.21.1 · Java Edition
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 font-pixel animate-slide-up"
            style={{
              fontSize: '10px', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards',
              background: 'rgba(0,0,0,0.7)', border: '1px solid var(--theme-border)',
              color: 'var(--theme-text-bright)',
            }}
          >
            <Icon name="Server" size={13} />
            mc.gamai.club
          </div>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => setGuideModal(true)}
              className="btn-glow px-8 py-4 rounded-lg font-pixel text-white"
              style={{
                fontSize: '11px',
                background: `linear-gradient(135deg, var(--theme-text-accent), hsl(var(--theme-primary)))`,
              }}
            >
              ▶ НАЧАТЬ ИГРАТЬ
            </button>
            <button
              onClick={() => scrollTo('shop')}
              className="px-8 py-4 rounded-lg font-pixel text-gray-300 hover:text-white transition-all"
              style={{
                fontSize: '11px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--theme-border)',
              }}
            >
              🛒 МАГАЗИН
            </button>
          </div>

          <div
            className="flex gap-10 justify-center mt-14 animate-slide-up"
            style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {[{ val: '1.21.1', label: 'Версия' }, { val: '24/7', label: 'Онлайн' }, { val: '2', label: 'Сервера' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-pixel text-base md:text-xl" style={{ color: 'var(--theme-text-accent)' }}>{s.val}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <Icon name="ChevronDown" size={26} className="text-gray-600" />
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>[ МАГАЗИН ]</div>
          <h2 className="font-russo text-3xl md:text-4xl text-white mb-3">Товары</h2>
          <p className="text-gray-400 text-sm">{theme === 'anarchy' ? 'Снаряжение и привилегии для анархии' : 'Привилегии и ресурсы для классики'}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="game-card rounded-xl p-5 animate-fade-in"
              style={{ animationDelay: `${i * 0.07}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="text-4xl mb-3">{product.emoji}</div>
              <div className="flex items-start justify-between mb-1 gap-2">
                <div className="font-russo text-white text-lg">{product.name}</div>
                <span
                  className="text-xs px-2 py-0.5 rounded flex-shrink-0 font-pixel"
                  style={{
                    fontSize: '8px',
                    background: product.type === 'privilege' ? 'var(--theme-glow-soft)' : 'rgba(255,255,255,0.04)',
                    color: product.type === 'privilege' ? 'var(--theme-text-accent)' : '#666',
                    border: '1px solid var(--theme-border)',
                  }}
                >
                  {product.type === 'privilege' ? 'ПРИВИЛ.' : 'ПРЕДМЕТ'}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{product.desc}</p>
              <div className="flex items-center justify-between">
                <div className="font-pixel text-lg" style={{ color: 'var(--theme-text-bright)' }}>
                  {product.price} ₽
                </div>
                <button
                  onClick={() => {
                    if (product.type === 'privilege') {
                      setBuyModal({ product });
                      setSelectedDuration(0);
                    } else {
                      addToCart(product);
                    }
                  }}
                  className="btn-glow px-4 py-2 rounded-lg text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, var(--theme-text-accent), hsl(var(--theme-primary)))` }}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>[ ПРАВИЛА ]</div>
          <h2 className="font-russo text-3xl md:text-4xl text-white mb-3">Правила сервера</h2>
          <p className="text-gray-400 text-sm">{theme === 'anarchy' ? 'Правила анархии — минимум, но важные' : 'Правила классики — честная игра'}</p>
        </div>
        <div className="space-y-3">
          {rules.map((section, i) => (
            <div key={i} className="game-card rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenRules(openRules === i ? null : i)}
              >
                <span className="font-russo text-white">{section.title}</span>
                <Icon name={openRules === i ? 'ChevronUp' : 'ChevronDown'} size={18} style={{ color: 'var(--theme-text-accent)', flexShrink: 0 }} />
              </button>
              {openRules === i && (
                <div className="px-5 pb-5 animate-fade-in">
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span style={{ color: 'var(--theme-text-accent)', flexShrink: 0 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>[ КОНТАКТЫ ]</div>
          <h2 className="font-russo text-3xl md:text-4xl text-white mb-3">Связаться с нами</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: 'MessageCircle', label: 'Discord', value: 'discord.gg/gamai', desc: 'Основное сообщество' },
            { icon: 'Send', label: 'Telegram', value: '@gamai_club', desc: 'Новости и поддержка' },
            { icon: 'Globe', label: 'IP сервера', value: 'mc.gamai.club', desc: 'Версия 1.21.1' },
          ].map((c) => (
            <div key={c.label} className="game-card rounded-xl p-6 text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
              >
                <Icon name={c.icon as 'Globe'} size={22} style={{ color: 'var(--theme-text-accent)' }} />
              </div>
              <div className="font-russo text-white text-lg mb-1">{c.label}</div>
              <div className="font-pixel mb-2" style={{ color: 'var(--theme-text-bright)', fontSize: '9px' }}>{c.value}</div>
              <div className="text-gray-500 text-sm">{c.desc}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16 pt-8" style={{ borderTop: '1px solid var(--theme-border)' }}>
          <div className="font-pixel mb-2" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>GAMAI CLUB</div>
          <div className="text-gray-700 text-xs">© 2024 gamai.club · Не связан с Mojang AB</div>
        </div>
      </section>

      {/* Privilege buy modal */}
      {buyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)' }}
          onClick={(e) => e.target === e.currentTarget && setBuyModal(null)}
        >
          <div
            className="animate-modal-in rounded-2xl p-6 max-w-md w-full"
            style={{ background: 'rgba(15,5,0,0.98)', border: '1px solid var(--theme-border)' }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-3xl mb-1">{buyModal.product.emoji}</div>
                <h3 className="font-russo text-xl text-white">{buyModal.product.name}</h3>
                <p className="text-gray-400 text-sm">{buyModal.product.desc}</p>
              </div>
              <button onClick={() => setBuyModal(null)} className="text-gray-600 hover:text-gray-400 p-1">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="mb-5">
              <div className="font-pixel text-gray-500 mb-3" style={{ fontSize: '9px' }}>ВЫБЕРИТЕ СРОК:</div>
              <div className="grid grid-cols-2 gap-2">
                {DURATIONS.map((d, i) => {
                  const price = Math.round(buyModal.product.price * d.multiplier);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDuration(i)}
                      className="p-3 rounded-xl text-left transition-all"
                      style={{
                        border: `2px solid ${selectedDuration === i ? 'var(--theme-text-accent)' : 'var(--theme-border)'}`,
                        background: selectedDuration === i ? 'var(--theme-glow-soft)' : 'rgba(255,255,255,0.02)',
                        boxShadow: selectedDuration === i ? '0 0 20px var(--theme-glow-soft)' : 'none',
                      }}
                    >
                      <div className="font-russo text-white text-sm">{d.label}</div>
                      <div className="font-pixel mt-0.5" style={{ color: 'var(--theme-text-bright)', fontSize: '10px' }}>{price} ₽</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => addToCart(
                buyModal.product,
                DURATIONS[selectedDuration].label,
                Math.round(buyModal.product.price * DURATIONS[selectedDuration].multiplier)
              )}
              className="w-full btn-glow py-4 rounded-xl font-pixel text-white"
              style={{ fontSize: '11px', background: `linear-gradient(135deg, var(--theme-text-accent), hsl(var(--theme-primary)))` }}
            >
              В КОРЗИНУ — {Math.round(buyModal.product.price * DURATIONS[selectedDuration].multiplier)} ₽
            </button>
          </div>
        </div>
      )}

      {/* Cart panel */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm flex flex-col animate-cart-in"
            style={{ background: 'rgba(8,3,0,0.98)', borderLeft: '1px solid var(--theme-border)' }}
          >
            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--theme-border)' }}>
              <h3 className="font-russo text-xl text-white flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} style={{ color: 'var(--theme-text-accent)' }} />
                Корзина
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-300">
                <Icon name="X" size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center text-gray-600 py-16">
                  <div className="text-4xl mb-3">🛒</div>
                  <div className="font-pixel" style={{ fontSize: '9px' }}>КОРЗИНА ПУСТА</div>
                </div>
              ) : cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--theme-border)' }}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{item.name}</div>
                    <div className="font-pixel mt-0.5" style={{ color: 'var(--theme-text-bright)', fontSize: '10px' }}>{item.price} ₽</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-5" style={{ borderTop: '1px solid var(--theme-border)' }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Итого:</span>
                  <span className="font-pixel text-2xl" style={{ color: 'var(--theme-text-accent)' }}>{cartTotal} ₽</span>
                </div>
                <button
                  className="w-full btn-glow py-4 rounded-xl font-pixel text-white"
                  style={{ fontSize: '11px', background: `linear-gradient(135deg, var(--theme-text-accent), hsl(var(--theme-primary)))` }}
                >
                  ОФОРМИТЬ ЗАКАЗ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Start guide modal */}
      {guideModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={(e) => e.target === e.currentTarget && setGuideModal(false)}
        >
          <div
            className="animate-modal-in rounded-2xl p-6 max-w-lg w-full overflow-y-auto max-h-[90vh]"
            style={{ background: 'rgba(12,5,0,0.99)', border: '1px solid var(--theme-border)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-russo text-2xl text-white">🎮 Как начать играть</h3>
              <button onClick={() => setGuideModal(false)} className="text-gray-600 hover:text-gray-400">
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Скачай лаунчер', desc: 'Используй официальный Minecraft Launcher (Java Edition) или TLauncher для бесплатной игры.', link: 'tlauncher.org', emoji: '📥' },
                { step: '2', title: 'Выбери версию', desc: 'В лаунчере выбери версию Minecraft 1.21.1 Java Edition. Нажми «Играть».', emoji: '⚙️' },
                { step: '3', title: 'Добавь сервер', desc: 'Главное меню → Сетевая игра → Добавить сервер → введи адрес mc.gamai.club', emoji: '🌐' },
                { step: '4', title: 'Готово!', desc: `Ты на сервере ${theme === 'anarchy' ? 'Анархии' : 'Классики'}! Удачи и приятной игры 🎉`, emoji: '🚀' },
              ].map(s => (
                <div
                  key={s.step}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--theme-border)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-pixel text-sm"
                    style={{ background: 'var(--theme-glow-soft)', color: 'var(--theme-text-accent)', border: '1px solid var(--theme-border)' }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div className="font-russo text-white mb-0.5">{s.emoji} {s.title}</div>
                    <div className="text-gray-400 text-sm">{s.desc}</div>
                    {s.link && <div className="font-pixel mt-1" style={{ color: 'var(--theme-text-bright)', fontSize: '9px' }}>→ {s.link}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-5 p-4 rounded-xl text-center"
              style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
            >
              <div className="font-pixel text-gray-400 mb-1" style={{ fontSize: '9px' }}>АДРЕС СЕРВЕРА</div>
              <div className="font-russo text-white text-2xl">mc.gamai.club</div>
              <div className="text-gray-500 text-xs mt-1">Версия 1.21.1 · Java Edition</div>
            </div>
            <button
              onClick={() => setGuideModal(false)}
              className="w-full mt-4 btn-glow py-4 rounded-xl font-pixel text-white"
              style={{ fontSize: '11px', background: `linear-gradient(135deg, var(--theme-text-accent), hsl(var(--theme-primary)))` }}
            >
              ПОНЯТНО, ИГРАТЬ!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
