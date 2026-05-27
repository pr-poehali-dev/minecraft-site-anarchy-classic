import { useGame } from '@/context/GameContext';
import Icon from '@/components/ui/icon';

export const CartPanel = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal } = useGame();

  if (!cartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}
    >
      <div
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm flex flex-col animate-cart-in"
        style={{ background: 'rgba(8,3,0,0.98)', borderLeft: '1px solid var(--theme-border)' }}
      >
        <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid var(--theme-border)' }}>
          <h3 className="font-russo text-xl text-white flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} style={{ color: 'var(--theme-text-accent)' }} />
            Корзина
          </h3>
          <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-300 game-btn p-1 rounded">
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center text-gray-600 py-16">
              <div className="text-4xl mb-3">🛒</div>
              <div className="font-pixel" style={{ fontSize: '9px' }}>КОРЗИНА ПУСТА</div>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--theme-border)' }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold truncate">{item.name}</div>
                  <div className="font-pixel mt-0.5" style={{ color: 'var(--theme-text-bright)', fontSize: '10px' }}>
                    {item.price} ₽
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="game-btn p-1 rounded text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5" style={{ borderTop: '1px solid var(--theme-border)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Итого:</span>
              <span className="font-pixel text-2xl" style={{ color: 'var(--theme-text-accent)' }}>
                {cartTotal} ₽
              </span>
            </div>
            <button
              className="game-btn-primary w-full py-4 rounded-xl font-pixel text-white"
              style={{ fontSize: '11px' }}
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
