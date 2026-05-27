import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

export const GuideModal = () => {
  const { guideModal, setGuideModal, theme } = useGame();

  if (!guideModal) return null;

  const steps = [
    {
      step: '1',
      title: 'Скачай лаунчер',
      desc: 'Используй официальный Minecraft Launcher (Java Edition) или TLauncher для бесплатной игры.',
      link: 'tlauncher.org',
      emoji: '📥',
    },
    {
      step: '2',
      title: 'Выбери версию',
      desc: 'В лаунчере выбери версию Minecraft 1.21.1 Java Edition. Нажми «Играть».',
      emoji: '⚙️',
    },
    {
      step: '3',
      title: 'Добавь сервер',
      desc: 'Главное меню → Сетевая игра → Добавить сервер → введи адрес mc.gamai.club',
      emoji: '🌐',
    },
    {
      step: '4',
      title: 'Готово!',
      desc: `Ты на сервере ${theme === 'anarchy' ? 'Анархии' : 'Классики'}! Удачи и приятной игры 🎉`,
      emoji: '🚀',
    },
  ];

  return (
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
          <button onClick={() => setGuideModal(false)} className="game-btn text-gray-600 hover:text-gray-400 p-1 rounded">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {steps.map(s => (
            <div
              key={s.step}
              className="flex gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--theme-border)' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-pixel"
                style={{
                  background: 'var(--theme-glow-soft)',
                  color: 'var(--theme-text-accent)',
                  border: '1px solid var(--theme-border)',
                  fontSize: '12px',
                }}
              >
                {s.step}
              </div>
              <div>
                <div className="font-russo text-white mb-0.5">{s.emoji} {s.title}</div>
                <div className="text-gray-400 text-sm">{s.desc}</div>
                {s.link && (
                  <div className="font-pixel mt-1" style={{ color: 'var(--theme-text-bright)', fontSize: '9px' }}>
                    → {s.link}
                  </div>
                )}
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
          className="game-btn-primary w-full mt-4 py-4 rounded-xl font-pixel text-white"
          style={{ fontSize: '11px' }}
        >
          ПОНЯТНО, ИГРАТЬ!
        </button>
      </div>
    </div>
  );
};
