import { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

/*
  Hotspot logic:
  Sword (Anarchy): blade tip is at top-left of rotated SVG.
    After rotate(-45, 24, 24) the tip of the blade (originally at x=24, y=4)
    maps to approx (x=4, y=24) in screen coords.
    So we offset left by 4px, top by 4px — cursor div positioned at (mouseX - 4, mouseY - 4).

  Axe (Classic): axe top-left corner after rotate(-45, 24, 24).
    Top-left of axe head (originally x=12, y=6) maps to approx (x=6, y=12).
    Offset: left -= 6, top -= 12.
*/

const SwordSVG = ({ hover, pressed }: { hover: boolean; pressed: boolean }) => (
  <svg
    width="56" height="56" viewBox="0 0 48 48"
    style={{
      imageRendering: 'pixelated',
      transform: pressed ? 'scale(0.85)' : 'scale(1)',
      transition: 'transform 0.08s ease',
      transformOrigin: '4px 4px',
    }}
  >
    {/* Blade group rotated -45deg around center */}
    <g transform="rotate(-45, 24, 24)">
      {/* Blade body */}
      <rect x="21" y="4" width="6" height="28" fill="#c8d4d8" />
      <rect x="22" y="5" width="4" height="26" fill="#e8f0f4" />
      {/* Blade tip highlight */}
      <rect x="23" y="4" width="2" height="3" fill="#ffffff" opacity="0.9" />
      {/* Edge sheen */}
      <rect x="21" y="6" width="1" height="22" fill="#a0b0b8" opacity="0.6" />
      {/* Guard */}
      <rect x="14" y="30" width="20" height="5" fill="#7880a0" />
      <rect x="15" y="31" width="18" height="3" fill="#9098b8" />
      <rect x="14" y="30" width="20" height="1" fill="#ffffff" opacity="0.15" />
      {/* Handle */}
      <rect x="20" y="35" width="8" height="9" fill="#6b4e2a" />
      <rect x="21" y="36" width="6" height="7" fill="#8b6e4a" />
      <rect x="22" y="36" width="2" height="7" fill="#9b7e5a" opacity="0.6" />
      {/* Pommel */}
      <rect x="19" y="43" width="10" height="4" fill="#7880a0" />
      <rect x="20" y="44" width="8" height="2" fill="#9098b8" />
    </g>

    {/* Fire at blade tip — positioned near top-left of canvas */}
    {hover && (
      <g className="animate-fire">
        <ellipse cx="6" cy="9"  rx="5" ry="6.5" fill="#ff5500" opacity="0.95" />
        <ellipse cx="6" cy="8"  rx="3.5" ry="5" fill="#ff9900" opacity="0.9" />
        <ellipse cx="6" cy="7"  rx="2" ry="3.5" fill="#ffdd00" opacity="0.85" />
        <ellipse cx="6" cy="6"  rx="1" ry="2"   fill="#ffffff" opacity="0.7" />
        {/* Embers */}
        <circle cx="3" cy="5"  r="1" fill="#ff6600" opacity="0.8" className="animate-fire" />
        <circle cx="9" cy="4"  r="0.8" fill="#ffaa00" opacity="0.7" />
        <circle cx="5" cy="3"  r="0.6" fill="#ff4400" opacity="0.6" />
      </g>
    )}
  </svg>
);

const AxeSVG = ({ hover, pressed }: { hover: boolean; pressed: boolean }) => (
  <svg
    width="56" height="56" viewBox="0 0 48 48"
    style={{
      imageRendering: 'pixelated',
      transform: pressed ? 'scale(0.85)' : 'scale(1)',
      transition: 'transform 0.08s ease',
      transformOrigin: '6px 6px',
    }}
  >
    <g transform="rotate(-45, 24, 24)">
      {/* Handle */}
      <rect x="21" y="18" width="6" height="27" fill="#6b4e2a" />
      <rect x="22" y="19" width="4" height="25" fill="#8b6e4a" />
      <rect x="23" y="19" width="1" height="25" fill="#9b7e5a" opacity="0.5" />
      {/* Axe head */}
      <rect x="11" y="5"  width="22" height="19" fill="#7880a0" />
      <rect x="13" y="6"  width="18" height="17" fill="#9098b8" />
      {/* Blade shine */}
      <rect x="12" y="7"  width="6"  height="13" fill="#b0c0d0" />
      <rect x="12" y="7"  width="2"  height="13" fill="#d8e8f0" opacity="0.7" />
      {/* Edge */}
      <rect x="29" y="6"  width="3"  height="17" fill="#c8d8e8" />
      <rect x="30" y="7"  width="1"  height="15" fill="#e8f4ff" opacity="0.8" />
      {/* Handle wrap */}
      <rect x="20" y="20" width="8" height="4"  fill="#4a301a" />
      <rect x="21" y="21" width="6" height="2"  fill="#6a4a2a" />
    </g>

    {/* Wood block at top-left tip (axe corner) */}
    {hover && (
      <g>
        <rect x="1" y="1" width="16" height="16" fill="#7a4e28" />
        <rect x="2" y="2" width="14" height="14" fill="#9b6a38" />
        {/* Wood grain */}
        <rect x="3"  y="2" width="1" height="14" fill="#6a3e18" opacity="0.55" />
        <rect x="6"  y="2" width="1" height="14" fill="#6a3e18" opacity="0.4" />
        <rect x="10" y="2" width="1" height="14" fill="#6a3e18" opacity="0.5" />
        <rect x="13" y="2" width="1" height="14" fill="#6a3e18" opacity="0.4" />
        <rect x="2" y="5"  width="14" height="1" fill="#6a3e18" opacity="0.3" />
        <rect x="2" y="9"  width="14" height="1" fill="#6a3e18" opacity="0.35" />
        <rect x="2" y="13" width="14" height="1" fill="#6a3e18" opacity="0.3" />
        {/* Bark outline */}
        <rect x="1" y="1" width="16" height="16" fill="none" stroke="#4a2e08" strokeWidth="1.5" />
      </g>
    )}
  </svg>
);

export const CustomCursor = () => {
  const { theme } = useGame();
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = (e: MouseEvent) => {
      setPressed(true);
      spawnBurst(e.clientX, e.clientY, theme);
    };
    const onUp = () => setPressed(false);
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"], [data-hoverable]')) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"], [data-hoverable]')) setHover(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [theme]);

  /*
    Hotspot correction:
    - Sword: blade tip after rotate(-45) is at approx SVG coords (4, 4).
      We want that pixel to be at (mouseX, mouseY).
      So: left = mouseX - 4, top = mouseY - 4
    - Axe: top-left corner of axe head after rotate(-45) ≈ SVG coords (6, 6).
      So: left = mouseX - 6, top = mouseY - 6
  */
  const offsetX = theme === 'anarchy' ? 4 : 6;
  const offsetY = theme === 'anarchy' ? 4 : 6;

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - offsetX,
        top: pos.y - offsetY,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      {theme === 'anarchy'
        ? <SwordSVG hover={hover} pressed={pressed} />
        : <AxeSVG hover={hover} pressed={pressed} />
      }
    </div>
  );
};

function spawnBurst(x: number, y: number, theme: string) {
  const colors = theme === 'anarchy'
    ? ['#ff6a00', '#ff3300', '#ffaa00', '#ff0000', '#ff8800']
    : ['#c87820', '#8B5E3C', '#e8a840', '#a0703f', '#d4a030'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    const size = 3 + Math.random() * 5;
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
    const dist = 20 + Math.random() * 45;
    el.style.cssText = `
      position:fixed; pointer-events:none; z-index:99998;
      width:${size}px; height:${size}px; border-radius:50%;
      left:${x}px; top:${y}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation: burst-out 0.55s ease-out forwards;
      --bx: ${Math.cos(angle) * dist}px;
      --by: ${Math.sin(angle) * dist}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
  }
}
