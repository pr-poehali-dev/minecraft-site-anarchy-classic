import { useGame } from '@/context/GameContext';
import { BuyModal } from '@/components/BuyModal';

const PRODUCTS = {
  anarchy: [
    { id: 1, name: '💀 Скелет',     desc: 'Набор выживальщика анархии',        price: 199, type: 'privilege', emoji: '💀' },
    { id: 2, name: '🔥 Демон',      desc: 'Огненные способности и защита',     price: 349, type: 'privilege', emoji: '🔥' },
    { id: 3, name: '⚡ Властелин',  desc: 'Абсолютная сила на сервере',        price: 599, type: 'privilege', emoji: '⚡' },
    { id: 4, name: '🗡️ Сет железа', desc: 'Полный набор железного снаряжения', price: 79,  type: 'item',      emoji: '🗡️' },
    { id: 5, name: '💣 ТНТ x64',   desc: '64 блока ТНТ для взрывов',          price: 99,  type: 'item',      emoji: '💣' },
    { id: 6, name: '🪙 1000 монет', desc: 'Внутриигровая валюта',              price: 149, type: 'item',      emoji: '🪙' },
  ],
  classic: [
    { id: 7,  name: '🌱 Новичок+',       desc: 'Базовые привилегии игрока',          price: 149, type: 'privilege', emoji: '🌱'  },
    { id: 8,  name: '🏗️ Строитель',      desc: 'Увеличенные регионы и команды',      price: 299, type: 'privilege', emoji: '🏗️' },
    { id: 9,  name: '👑 Мастер',          desc: 'Максимальные возможности',           price: 499, type: 'privilege', emoji: '👑'  },
    { id: 10, name: '🪵 Дерево x64',     desc: '64 блока дуба',                     price: 49,  type: 'item',      emoji: '🪵'  },
    { id: 11, name: '🏠 Стартовый набор',desc: 'Инструменты и еда для старта',       price: 89,  type: 'item',      emoji: '🏠'  },
    { id: 12, name: '🪙 1000 монет',     desc: 'Внутриигровая валюта',              price: 129, type: 'item',      emoji: '🪙'  },
  ],
};

export const Shop = () => {
  const { theme, setBuyModal, addToCart } = useGame();
  const products = PRODUCTS[theme];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="font-pixel mb-3" style={{ color: 'var(--theme-text-accent)', fontSize: '9px' }}>
          [ МАГАЗИН ]
        </div>
        <h1 className="font-russo text-3xl md:text-4xl text-white mb-3">Товары</h1>
        <p className="text-gray-400 text-sm">
          {theme === 'anarchy'
            ? 'Снаряжение и привилегии для анархии'
            : 'Привилегии и ресурсы для классики'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="game-card rounded-2xl p-5 animate-fade-in"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="text-4xl mb-3">{product.emoji}</div>

            <div className="flex items-start justify-between mb-1 gap-2">
              <div className="font-russo text-white text-lg leading-tight">{product.name}</div>
              <span
                className="font-pixel flex-shrink-0 px-2 py-0.5 rounded"
                style={{
                  fontSize: '7px',
                  background: product.type === 'privilege' ? 'var(--theme-glow-soft)' : 'rgba(255,255,255,0.04)',
                  color: product.type === 'privilege' ? 'var(--theme-text-accent)' : '#555',
                  border: '1px solid var(--theme-border)',
                }}
              >
                {product.type === 'privilege' ? 'ПРИВИЛ.' : 'ПРЕДМЕТ'}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-5">{product.desc}</p>

            <div className="flex items-center justify-between">
              <div className="font-pixel text-lg" style={{ color: 'var(--theme-text-bright)' }}>
                {product.price} ₽
              </div>
              <button
                onClick={() => {
                  if (product.type === 'privilege') {
                    setBuyModal({ product });
                  } else {
                    addToCart(product);
                  }
                }}
                className="game-btn-primary px-5 py-2 rounded-xl text-sm font-bold text-white"
              >
                Купить
              </button>
            </div>
          </div>
        ))}
      </div>

      <BuyModal />
    </div>
  );
};
