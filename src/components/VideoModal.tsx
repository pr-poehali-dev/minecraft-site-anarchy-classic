import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export const VideoModal = ({ open, onClose }: VideoModalProps) => {
  const { theme } = useGame();

  const videoId = theme === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M';
  const title   = theme === 'anarchy' ? '💀 Анархия — геймплей' : '🌲 Классика — геймплей';

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-modal-in w-full max-w-4xl"
        style={{ position: 'relative' }}
      >
        {/* Pixel corner decorations */}
        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-6 h-6`}
            style={{ zIndex: 2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
              {i === 0 && <><rect x="0" y="0" width="6" height="2" fill="var(--theme-text-accent)" /><rect x="0" y="0" width="2" height="6" fill="var(--theme-text-accent)" /></>}
              {i === 1 && <><rect x="18" y="0" width="6" height="2" fill="var(--theme-text-accent)" /><rect x="22" y="0" width="2" height="6" fill="var(--theme-text-accent)" /></>}
              {i === 2 && <><rect x="0" y="22" width="6" height="2" fill="var(--theme-text-accent)" /><rect x="0" y="18" width="2" height="6" fill="var(--theme-text-accent)" /></>}
              {i === 3 && <><rect x="18" y="22" width="6" height="2" fill="var(--theme-text-accent)" /><rect x="22" y="18" width="2" height="6" fill="var(--theme-text-accent)" /></>}
            </svg>
          </div>
        ))}

        {/* Frame */}
        <div
          style={{
            border: '2px solid var(--theme-border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 0 60px var(--theme-glow), 0 0 120px var(--theme-glow-soft), 0 30px 80px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: 'rgba(0,0,0,0.9)',
              borderBottom: '1px solid var(--theme-border)',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Fake traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="font-pixel text-white" style={{ fontSize: '9px' }}>{title}</span>
            </div>
            <button
              onClick={onClose}
              className="game-btn p-1 rounded text-gray-500 hover:text-white"
            >
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Video */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={title}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                border: 'none',
              }}
            />
          </div>

          {/* Footer bar */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ background: 'rgba(0,0,0,0.9)', borderTop: '1px solid var(--theme-border)' }}
          >
            <span className="font-pixel text-gray-600" style={{ fontSize: '8px' }}>
              {theme === 'anarchy' ? 'Сервер Анархии' : 'Классический SMP'} · mc.gamai.club
            </span>
            <span className="font-pixel" style={{ color: 'var(--theme-text-accent)', fontSize: '8px' }}>
              Java 1.21.1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
