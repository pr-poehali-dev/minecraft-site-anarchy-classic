import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

const RULES = {
  anarchy: [
    {
      title: '⚠️ Основные правила',
      items: [
        'Читерство с помощью внешних программ запрещено',
        'Дюпы, кроме официально разрешённых — бан',
        'Реклама других серверов — бан',
      ],
    },
    {
      title: '⚔️ PvP и рейды',
      items: [
        'PvP разрешён везде и всегда',
        'Гриферство и рейды — часть игры',
        'Фарм спавна новичков дольше 10 минут запрещён',
      ],
    },
    {
      title: '💬 Общение',
      items: [
        'Оскорбления по национальному признаку — бан',
        'Спам в чате — мут 30 минут',
        'Реклама — перманентный бан',
      ],
    },
    {
      title: '🔨 Строительство',
      items: [
        'Строить вблизи спавна (500 блоков) запрещено',
        'Лагерные ловушки на спавне запрещены',
        'Постройки из читерных блоков удаляются',
      ],
    },
  ],
  classic: [
    {
      title: '📋 Общие правила',
      items: [
        'Уважай других игроков',
        'Читерство запрещено — перманентный бан',
        'Обход бана с другого аккаунта — ban IP',
      ],
    },
    {
      title: '🌍 Мир и регионы',
      items: [
        'Строй только в своих регионах',
        'Гриферство чужих построек — бан 7 дней',
        'Максимум 3 региона без привилегий',
      ],
    },
    {
      title: '💬 Чат и общение',
      items: [
        'Мат в общем чате запрещён',
        'Флуд и спам — мут 1 час',
        'Оскорбления — мут от 1 до 24 часов',
      ],
    },
    {
      title: '🛒 Торговля',
      items: [
        'Мошенничество в сделках — бан 3 дня',
        'Магазины должны быть честными',
        'Продажа за реальные деньги без разрешения — бан',
      ],
    },
  ],
};

export const Rules = () => {
  const { theme } = useGame();
  const [open, setOpen] = useState<number | null>(0);
  const rules = RULES[theme];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>
          [ ПРАВИЛА ]
        </div>
        <h1 className="font-russo text-3xl md:text-4xl text-white mb-3">Правила сервера</h1>
        <p className="text-gray-400 text-sm">
          {theme === 'anarchy'
            ? 'Правила анархии — минимум, но важные'
            : 'Правила классики — честная игра'}
        </p>
      </div>

      <div className="space-y-3">
        {rules.map((section, i) => (
          <div
            key={i}
            className="game-card rounded-2xl overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-russo text-white">{section.title}</span>
              <Icon
                name={open === i ? 'ChevronUp' : 'ChevronDown'}
                size={18}
                style={{ color: 'var(--theme-text-accent)', flexShrink: 0 }}
              />
            </button>

            {open === i && (
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

      {/* Warning banner */}
      <div
        className="mt-10 p-5 rounded-2xl text-center animate-fade-in"
        style={{
          animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards',
          background: 'var(--theme-glow-soft)',
          border: '1px solid var(--theme-border)',
        }}
      >
        <div className="text-2xl mb-2">⚡</div>
        <div className="font-russo text-white mb-1">Незнание правил не освобождает от ответственности</div>
        <div className="text-gray-400 text-sm">Нарушение = бан без предупреждения</div>
      </div>
    </div>
  );
};
