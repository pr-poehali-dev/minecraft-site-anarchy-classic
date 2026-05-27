import { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { VideoModal } from '@/components/VideoModal';
import Icon from '@/components/ui/icon';

interface ServerStatus {
  online: boolean;
  players: { online: number; max: number } | null;
}

const REGISTERED_COUNT = 1_247; // статичная база, можно будет подключить к API

const useServerStatus = () => {
  const [status, setStatus] = useState<ServerStatus>({ online: false, players: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch('https://api.mcsrvstat.us/3/mc.gamai.club');
        const data = await res.json();
        setStatus({
          online: data.online ?? false,
          players: data.players ? { online: data.players.online, max: data.players.max } : null,
        });
      } catch {
        setStatus({ online: false, players: null });
      } finally {
        setLoading(false);
      }
    };
    fetch_();
    const interval = setInterval(fetch_, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { status, loading };
};

export const Home = () => {
  const { theme, setGuideModal } = useGame();
  const [videoOpen, setVideoOpen] = useState(false);
  const { status, loading } = useServerStatus();

  const videoId = theme === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M';

  const playerCount = loading
    ? '...'
    : status.online && status.players
      ? status.players.online.toString()
      : '0';

  const playerMax = status.players?.max ?? 0;

  return (
    <>
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

          {/* Server address badge */}
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

          {/* Buttons */}
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
              onClick={() => setVideoOpen(true)}
              className="game-btn px-8 py-4 rounded-xl font-pixel relative overflow-hidden"
              style={{
                fontSize: '11px',
                color: 'var(--theme-text-bright)',
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid var(--theme-border)',
              }}
            >
              {/* Play icon with pulse ring */}
              <span className="inline-flex items-center gap-2">
                <span className="relative flex items-center justify-center">
                  <span
                    className="absolute w-5 h-5 rounded-full animate-ping opacity-40"
                    style={{ background: 'var(--theme-text-accent)' }}
                  />
                  <Icon name="Play" size={14} style={{ color: 'var(--theme-text-accent)', position: 'relative', zIndex: 1 }} />
                </span>
                ВИДЕО
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 md:gap-12 justify-center mt-14 animate-slide-up"
            style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* Version */}
            <div className="text-center">
              <div className="font-pixel text-base md:text-xl" style={{ color: 'var(--theme-text-accent)' }}>
                1.21.1
              </div>
              <div className="text-gray-500 text-xs mt-1">Версия</div>
            </div>

            {/* Online players — live */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                {!loading && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: status.online ? '#4ade80' : '#ef4444',
                      boxShadow: status.online ? '0 0 6px #4ade80' : '0 0 6px #ef4444',
                    }}
                  />
                )}
                <div className="font-pixel text-base md:text-xl" style={{ color: 'var(--theme-text-accent)' }}>
                  {loading ? (
                    <span className="animate-pulse">…</span>
                  ) : (
                    <>
                      {playerCount}
                      {playerMax > 0 && (
                        <span className="text-gray-600" style={{ fontSize: '10px' }}>/{playerMax}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="text-gray-500 text-xs mt-1">Онлайн сейчас</div>
            </div>

            {/* Registered */}
            <div className="text-center">
              <div className="font-pixel text-base md:text-xl" style={{ color: 'var(--theme-text-accent)' }}>
                {REGISTERED_COUNT.toLocaleString('ru')}
              </div>
              <div className="text-gray-500 text-xs mt-1">Игроков с нами</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <Icon name="ChevronDown" size={26} className="text-gray-600" />
        </div>
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
};
