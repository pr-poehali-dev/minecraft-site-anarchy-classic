import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';

export type ServerTheme = 'anarchy' | 'classic';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  type: string;
  emoji: string;
}

interface GameContextType {
  theme: ServerTheme;
  setTheme: (t: ServerTheme) => void;
  showOverlay: boolean;
  setShowOverlay: (v: boolean) => void;
  highlightedCard: ServerTheme;
  setHighlightedCard: (t: ServerTheme) => void;
  hoveredByMouseRef: React.MutableRefObject<boolean>;
  selectServer: (s: ServerTheme) => void;
  cart: CartItem[];
  addToCart: (product: Product, duration?: string, price?: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  buyModal: { product: Product } | null;
  setBuyModal: (v: { product: Product } | null) => void;
  guideModal: boolean;
  setGuideModal: (v: boolean) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ServerTheme>('anarchy');
  const [showOverlay, setShowOverlay] = useState(true);
  const [highlightedCard, setHighlightedCard] = useState<ServerTheme>('anarchy');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [buyModal, setBuyModal] = useState<{ product: Product } | null>(null);
  const [guideModal, setGuideModal] = useState(false);
  const autoSwitchRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveredByMouseRef = useRef(false);

  const setTheme = useCallback((t: ServerTheme) => {
    setThemeState(t);
    document.body.classList.toggle('theme-classic', t === 'classic');
  }, []);

  useEffect(() => {
    document.body.classList.toggle('theme-classic', theme === 'classic');
  }, [theme]);

  const startAutoSwitch = useCallback(() => {
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current);
    autoSwitchRef.current = setInterval(() => {
      if (!hoveredByMouseRef.current) {
        setHighlightedCard(prev => prev === 'anarchy' ? 'classic' : 'anarchy');
      }
    }, 10000);
  }, []);

  useEffect(() => {
    if (showOverlay) startAutoSwitch();
    return () => { if (autoSwitchRef.current) clearInterval(autoSwitchRef.current); };
  }, [showOverlay, startAutoSwitch]);

  const selectServer = useCallback((s: ServerTheme) => {
    setTheme(s);
    setHighlightedCard(s);
    setShowOverlay(false);
    if (autoSwitchRef.current) clearInterval(autoSwitchRef.current);
  }, [setTheme]);

  const addToCart = useCallback((product: Product, duration?: string, price?: number) => {
    setCart(prev => [...prev, {
      id: Date.now(),
      name: product.name + (duration ? ` [${duration}]` : ''),
      price: price ?? product.price,
      emoji: product.emoji,
    }]);
    setBuyModal(null);
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const cartTotal = cart.reduce((s, i) => s + i.price, 0);

  return (
    <GameContext.Provider value={{
      theme, setTheme,
      showOverlay, setShowOverlay,
      highlightedCard, setHighlightedCard,
      hoveredByMouseRef,
      selectServer,
      cart, addToCart, removeFromCart, cartTotal,
      cartOpen, setCartOpen,
      buyModal, setBuyModal,
      guideModal, setGuideModal,
    }}>
      {children}
    </GameContext.Provider>
  );
};
