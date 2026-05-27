import Icon from '@/components/ui/icon';

const CONTACTS = [
  {
    icon: 'MessageCircle' as const,
    label: 'Discord',
    value: 'discord.gg/gamai',
    desc: 'Основное сообщество',
    emoji: '💬',
  },
  {
    icon: 'Send' as const,
    label: 'Telegram',
    value: '@gamai_club',
    desc: 'Новости и поддержка',
    emoji: '✈️',
  },
  {
    icon: 'Globe' as const,
    label: 'IP сервера',
    value: 'mc.gamai.club',
    desc: 'Версия 1.21.1 · Java',
    emoji: '🌐',
  },
  {
    icon: 'Mail' as const,
    label: 'Email',
    value: 'admin@gamai.club',
    desc: 'По вопросам сотрудничества',
    emoji: '📧',
  },
];

export const Contacts = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>
          [ КОНТАКТЫ ]
        </div>
        <h1 className="font-russo text-3xl md:text-4xl text-white mb-3">Связаться с нами</h1>
        <p className="text-gray-400 text-sm">Всегда рады помочь и ответить на вопросы</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {CONTACTS.map((c, i) => (
          <div
            key={c.label}
            className="game-card rounded-2xl p-6 animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
              >
                <Icon name={c.icon} size={22} style={{ color: 'var(--theme-text-accent)' }} />
              </div>
              <div>
                <div className="font-russo text-white text-lg leading-tight">{c.label}</div>
                <div className="text-gray-500 text-xs">{c.desc}</div>
              </div>
            </div>
            <div
              className="font-pixel"
              style={{ color: 'var(--theme-text-bright)', fontSize: '10px' }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      {/* Server address block */}
      <div
        className="p-8 rounded-2xl text-center animate-fade-in"
        style={{
          animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards',
          background: 'var(--theme-card-bg)',
          border: '2px solid var(--theme-border)',
          boxShadow: '0 0 40px var(--theme-glow-soft)',
        }}
      >
        <div className="text-5xl mb-4">🎮</div>
        <div className="font-pixel mb-2" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>
          АДРЕС СЕРВЕРА
        </div>
        <div className="font-russo text-white text-3xl md:text-4xl mb-2">mc.gamai.club</div>
        <div className="text-gray-500 text-sm">Версия 1.21.1 · Java Edition · 24/7</div>
      </div>


    </div>
  );
};