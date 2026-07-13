'use client';

import React, { useRef, useState, useLayoutEffect, useEffect, ReactNode } from 'react';

interface ScaledAnimationProps {
  children: ReactNode;
  /** Width (px) the animation was designed for */
  designWidth?: number;
  /** Height (px) the animation was designed for */
  designHeight?: number;
  className?: string;
}

/**
 * Scales the animation DOWN when the container is smaller than the design
 * dimensions, so all elements stay visible and properly positioned.
 *
 * On large screens (container >= design size): renders normally – no transform
 * applied, no visual change. Exactly like before.
 *
 * On small screens (container < design size): applies transform:scale() so
 * the whole animation shrinks proportionally to fit the frame.
 */
export function ScaledAnimation({
  children,
  designWidth = 560,
  designHeight = 420,
  className = '',
}: ScaledAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // null = not measured yet (hide during SSR to avoid flash)
  const [info, setInfo] = useState<{
    scale: number;
    offsetX: number;
    offsetY: number;
    needsScale: boolean;
  } | null>(null);

  const measure = (el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    const scaleX = width / designWidth;
    const scaleY = height / designHeight;
    const scale = Math.min(scaleX, scaleY);
    const needsScale = scale < 1;

    setInfo({
      scale,
      needsScale,
      offsetX: needsScale ? (width - designWidth * scale) / 2 : 0,
      offsetY: needsScale ? (height - designHeight * scale) / 2 : 0,
    });
  };

  // Fires synchronously BEFORE the first browser paint → no flash.
  useLayoutEffect(() => {
    if (containerRef.current) measure(containerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designWidth, designHeight]);

  // ResizeObserver updates scale when the window / container is resized.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure(el));
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designWidth, designHeight]);

  // ─── LARGE SCREEN (scale ≥ 1) ─────────────────────────────────────────────
  // Render exactly like the original: children fill the container naturally.
  // No transform, no wrapper, no side-effects. This path is identical to the
  // state before any of our changes.
  if (info && !info.needsScale) {
    return (
      <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }

  // ─── SMALL SCREEN (scale < 1) or NOT YET MEASURED ─────────────────────────
  // Use a fixed-size inner div (design dimensions) + scale transform so every
  // element stays in its correct proportional position inside the frame.
  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        style={{
          // Fixed design dimensions — the animation thinks it's always 560×420
          width: designWidth,
          height: designHeight,
          // Scale transform shrinks everything proportionally
          transform: info ? `scale(${info.scale})` : 'scale(1)',
          transformOrigin: 'top left',
          position: 'absolute',
          top: info?.offsetY ?? 0,
          left: info?.offsetX ?? 0,
          // Hidden until measured so the user never sees the full-size
          // (potentially clipped) content during SSR hydration.
          visibility: info ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
