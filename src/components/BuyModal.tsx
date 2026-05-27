import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

const DURATIONS = [
  { label: '30 дней',  multiplier: 1 },
  { label: '60 дней',  multiplier: 1.7 },
  { label: '90 дней',  multiplier: 2.2 },
  { label: 'Навсегда', multiplier: 3.5 },
];

export const BuyModal = () => {
  const { buyModal, setBuyModal, addToCart } = useGame();
  const [selected, setSelected] = useState(0);

  if (!buyModal) return null;
  const { product } = buyModal;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)' }}
      onClick={(e) => e.target === e.currentTarget && setBuyModal(null)}
    >
      <div
        className="animate-modal-in rounded-2xl p-6 max-w-md w-full"
        style={{ background: 'rgba(15,5,0,0.99)', border: '1px solid var(--theme-border)' }}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-3xl mb-1">{product.emoji}</div>
            <h3 className="font-russo text-xl text-white">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.desc}</p>
          </div>
          <button onClick={() => setBuyModal(null)} className="game-btn text-gray-600 hover:text-gray-400 p-1 rounded">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mb-5">
          <div className="font-pixel text-gray-500 mb-3" style={{ fontSize: '9px' }}>ВЫБЕРИТЕ СРОК:</div>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d, i) => {
              const price = Math.round(product.price * d.multiplier);
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="game-btn p-3 rounded-xl text-left"
                  style={{
                    border: `2px solid ${selected === i ? 'var(--theme-text-accent)' : 'var(--theme-border)'}`,
                    background: selected === i ? 'var(--theme-glow-soft)' : 'rgba(255,255,255,0.02)',
                    boxShadow: selected === i ? '0 0 20px var(--theme-glow-soft)' : 'none',
                  }}
                >
                  <div className="font-russo text-white text-sm">{d.label}</div>
                  <div className="font-pixel mt-0.5" style={{ color: 'var(--theme-text-bright)', fontSize: '10px' }}>
                    {price} ₽
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => addToCart(
            product,
            DURATIONS[selected].label,
            Math.round(product.price * DURATIONS[selected].multiplier)
          )}
          className="game-btn-primary w-full py-4 rounded-xl font-pixel text-white"
          style={{ fontSize: '11px' }}
        >
          В КОРЗИНУ — {Math.round(product.price * DURATIONS[selected].multiplier)} ₽
        </button>
      </div>
    </div>
  );
};
