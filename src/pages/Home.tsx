import { useGame } from '@/context/GameContext';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export const Home = () => {
  const { theme, setGuideModal } = useGame();
  const navigate = useNavigate();

  const videoId = theme === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
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

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <div
          className="font-pixel text-3xl md:text-5xl lg:text-6xl mb-4 animate-flicker leading-tight"
          style={{
            color: 'var(--theme-text-accent)',
            textShadow: '0 0 30px var(--theme-glow), 0 0 60px var(--theme-glow-soft)',
          }}
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
            fontSize: '10px',
            animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards',
            background: 'rgba(0,0,0,0.7)',
            border: '1px solid var(--theme-border)',
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
            className="game-btn-primary px-8 py-4 rounded-xl font-pixel text-white"
            style={{ fontSize: '11px' }}
          >
            ▶ НАЧАТЬ ИГРАТЬ
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="game-btn px-8 py-4 rounded-xl font-pixel text-gray-300 hover:text-white"
            style={{
              fontSize: '11px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--theme-border)',
            }}
          >
            🛒 МАГАЗИН
          </button>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 justify-center mt-14 animate-slide-up"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {[
            { val: '1.21.1', label: 'Версия' },
            { val: '24/7',   label: 'Онлайн' },
            { val: '2',      label: 'Сервера' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div
                className="font-pixel text-base md:text-xl"
                style={{ color: 'var(--theme-text-accent)' }}
              >
                {s.val}
              </div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <Icon name="ChevronDown" size={26} className="text-gray-600" />
      </div>
    </section>
  );
};
