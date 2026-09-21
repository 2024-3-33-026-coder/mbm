import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const EditorialCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-smooth spring physics
  const springX = useSpring(mouseX, { stiffness: 450, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 35 });

  useEffect(() => {
    // Only activate cursor for non-touch pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Scan for cursor hover attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.4 : 1,
          width: isHovered && cursorText ? 'auto' : isHovered ? 48 : 10,
          height: isHovered ? 48 : 10,
          paddingLeft: cursorText ? 16 : 0,
          paddingRight: cursorText ? 16 : 0,
          backgroundColor: isHovered ? '#F05401' : 'rgba(36, 35, 33, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="rounded-full flex items-center justify-center backdrop-blur-[2px] shadow-sm select-none"
      >
        {isHovered && cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-white whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
