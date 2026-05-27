import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

const NAV = [
  { path: '/',         label: 'Главная' },
  { path: '/shop',     label: 'Товары' },
  { path: '/rules',    label: 'Правила' },
  { path: '/contacts', label: 'Контакты' },
];

const SOCIALS = [
  { icon: 'MessageCircle' as const, label: 'Discord',  value: 'discord.gg/gamai' },
  { icon: 'Send'          as const, label: 'Telegram', value: '@gamai_club' },
];

export const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useGame();

  return (
    <footer
      className="relative mt-auto"
      style={{
        background: 'rgba(0,0,0,0.92)',
        borderTop: '1px solid var(--theme-border)',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: '10%', right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--theme-glow), transparent)',
          filter: 'blur(2px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div
              className="font-pixel mb-3 animate-flicker"
              style={{ color: 'var(--theme-text-accent)', fontSize: '14px',
                textShadow: '0 0 14px var(--theme-glow)' }}
            >
              GAMAI CLUB
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Лучший Minecraft сервер с двумя режимами игры — Анархия и Классика.
              Играй честно или без правил — выбор за тобой.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-pixel"
              style={{
                fontSize: '9px',
                background: 'var(--theme-glow-soft)',
                border: '1px solid var(--theme-border)',
                color: 'var(--theme-text-bright)',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
                display: 'inline-block',
                flexShrink: 0,
              }} />
              {theme === 'anarchy' ? '💀 АНАРХИЯ' : '🌲 КЛАССИКА'}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-pixel text-gray-400 mb-4" style={{ fontSize: '9px' }}>
              НАВИГАЦИЯ
            </div>
            <ul className="space-y-2">
              {NAV.map(item => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="game-btn text-gray-400 hover:text-white text-sm flex items-center gap-2 rounded px-1"
                  >
                    <span style={{ color: 'var(--theme-text-accent)', fontSize: '10px' }}>▸</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-pixel text-gray-400 mb-4" style={{ fontSize: '9px' }}>
              КОНТАКТЫ
            </div>
            <ul className="space-y-3 mb-5">
              {SOCIALS.map(s => (
                <li key={s.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
                  >
                    <Icon name={s.icon} size={15} style={{ color: 'var(--theme-text-accent)' }} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">{s.label}</div>
                    <div className="font-pixel" style={{ color: 'var(--theme-text-bright)', fontSize: '9px' }}>
                      {s.value}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Server address */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--theme-border)' }}
            >
              <Icon name="Server" size={14} style={{ color: 'var(--theme-text-accent)', flexShrink: 0 }} />
              <div>
                <div className="font-pixel text-white" style={{ fontSize: '10px' }}>mc.gamai.club</div>
                <div className="text-gray-600 text-xs">Java 1.21.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="font-pixel text-gray-700" style={{ fontSize: '8px' }}>
            © 2024 GAMAI CLUB · НЕ СВЯЗАН С MOJANG AB
          </div>
          <div className="flex items-center gap-4">
            <span className="font-pixel text-gray-700" style={{ fontSize: '8px' }}>
              ВЕРСИЯ 1.21.1
            </span>
            <span
              className="font-pixel px-2 py-1 rounded"
              style={{
                fontSize: '8px',
                background: 'var(--theme-glow-soft)',
                color: 'var(--theme-text-accent)',
                border: '1px solid var(--theme-border)',
              }}
            >
              JAVA EDITION
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
