import { useGame } from '@/context/GameContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { path: '/',         label: 'Главная' },
  { path: '/shop',     label: 'Товары' },
  { path: '/rules',    label: 'Правила' },
  { path: '/contacts', label: 'Контакты' },
];

export const Navbar = () => {
  const { theme, cart, cartOpen, setCartOpen, setShowOverlay } = useGame();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="font-pixel pixel-glow"
          style={{ color: 'var(--theme-text-accent)', fontSize: '10px' }}
        >
          GAMAI CLUB
        </button>
        <span
          className="hidden md:block font-pixel px-2 py-1 rounded"
          style={{
            background: 'var(--theme-glow-soft)',
            color: 'var(--theme-text-bright)',
            fontSize: '8px',
            border: '1px solid var(--theme-border)',
          }}
        >
          {theme === 'anarchy' ? '💀 АНАРХИЯ' : '🌲 КЛАССИКА'}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="game-btn px-3 md:px-4 py-2 text-xs rounded font-semibold relative overflow-hidden"
              style={{
                color: active ? 'var(--theme-text-accent)' : '#888',
                background: active ? 'var(--theme-glow-soft)' : 'transparent',
              }}
              data-active={active}
            >
              {item.label}
            </button>
          );
        })}

        {/* Cart */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="game-btn relative ml-2 p-2 rounded"
          style={{ background: 'var(--theme-glow-soft)', border: '1px solid var(--theme-border)' }}
        >
          <Icon name="ShoppingCart" size={18} style={{ color: 'var(--theme-text-accent)' }} />
          {cart.length > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold text-black"
              style={{ background: 'var(--theme-text-accent)' }}
            >
              {cart.length}
            </span>
          )}
        </button>

        {/* Switch server */}
        <button
          onClick={() => setShowOverlay(true)}
          className="game-btn p-2 text-gray-600 hover:text-gray-400 transition-colors"
          title="Сменить сервер"
        >
          <Icon name="RefreshCw" size={15} />
        </button>
      </div>
    </nav>
  );
};
