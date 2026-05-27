import { useGame } from '@/context/GameContext';

export const ServerOverlay = () => {
  const { showOverlay, highlightedCard, setHighlightedCard, hoveredByMouseRef, selectServer } = useGame();

  if (!showOverlay) return null;

  return (
    <div className="server-overlay">
      <div className="text-center max-w-4xl w-full px-4">
        <div
          className="font-pixel text-base md:text-2xl mb-2 animate-flicker pixel-glow"
          style={{ color: 'var(--theme-text-accent)' }}
        >
          GAMAI CLUB
        </div>
        <div className="text-gray-500 font-pixel mb-12" style={{ fontSize: '9px' }}>
          ВЫБЕРИ СВОЙ ПУТЬ
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Anarchy */}
          <div
            className={`server-card-select anarchy rounded-2xl p-8 cursor-pointer ${highlightedCard === 'anarchy' ? 'highlighted' : ''}`}
            style={{
              background: highlightedCard === 'anarchy'
                ? 'linear-gradient(135deg, rgba(60,5,0,0.97) 0%, rgba(30,0,0,0.93) 100%)'
                : 'rgba(20,2,0,0.7)',
              border: `2px solid ${highlightedCard === 'anarchy' ? '#ff4400' : 'rgba(255,60,0,0.15)'}`,
              boxShadow: highlightedCard === 'anarchy'
                ? '0 0 50px rgba(255,60,0,0.35), 0 0 100px rgba(255,20,0,0.1)'
                : 'none',
            }}
            onClick={() => selectServer('anarchy')}
            onMouseEnter={() => { hoveredByMouseRef.current = true; setHighlightedCard('anarchy'); }}
            onMouseLeave={() => { hoveredByMouseRef.current = false; }}
          >
            <div className="text-6xl mb-5 animate-float">💀</div>
            <div
              className="font-pixel text-red-400 text-xl mb-3"
              style={{ textShadow: '0 0 20px rgba(255,50,0,0.8)' }}
            >
              АНАРХИЯ
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Никаких правил. Полная свобода. Выживание — закон.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['PvP', 'Рейды', 'Гриф', 'Без правил'].map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: 'rgba(255,60,0,0.15)',
                    border: '1px solid rgba(255,60,0,0.35)',
                    color: '#ff8844',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {highlightedCard === 'anarchy' && (
              <div className="mt-5 font-pixel text-red-300 animate-fade-in" style={{ fontSize: '9px' }}>
                [ НАЖМИ ЧТОБЫ ВОЙТИ ]
              </div>
            )}
          </div>

          {/* Classic */}
          <div
            className={`server-card-select classic rounded-2xl p-8 cursor-pointer ${highlightedCard === 'classic' ? 'highlighted' : ''}`}
            style={{
              background: highlightedCard === 'classic'
                ? 'linear-gradient(135deg, rgba(45,25,0,0.97) 0%, rgba(22,12,0,0.93) 100%)'
                : 'rgba(20,10,0,0.7)',
              border: `2px solid ${highlightedCard === 'classic' ? '#c87820' : 'rgba(180,120,30,0.15)'}`,
              boxShadow: highlightedCard === 'classic'
                ? '0 0 50px rgba(180,120,30,0.35), 0 0 100px rgba(120,80,10,0.1)'
                : 'none',
            }}
            onClick={() => selectServer('classic')}
            onMouseEnter={() => { hoveredByMouseRef.current = true; setHighlightedCard('classic'); }}
            onMouseLeave={() => { hoveredByMouseRef.current = false; }}
          >
            <div className="text-6xl mb-5 animate-float" style={{ animationDelay: '1.5s' }}>🌲</div>
            <div
              className="font-pixel text-amber-400 text-xl mb-3"
              style={{ textShadow: '0 0 20px rgba(180,120,30,0.8)' }}
            >
              КЛАССИКА
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Строй, торгуй, дружи. Честная игра в лучших традициях.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['SMP', 'Экономика', 'Регионы', 'Ивенты'].map(t => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: 'rgba(180,120,30,0.15)',
                    border: '1px solid rgba(180,120,30,0.35)',
                    color: '#e8a840',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {highlightedCard === 'classic' && (
              <div className="mt-5 font-pixel text-amber-300 animate-fade-in" style={{ fontSize: '9px' }}>
                [ НАЖМИ ЧТОБЫ ВОЙТИ ]
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-gray-700 font-pixel" style={{ fontSize: '8px' }}>
          автосмена каждые 10 сек
        </div>
      </div>
    </div>
  );
};
