
import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    
    if (!dot || !outline) return;
    
    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Add a subtle lag to the outline
      requestAnimationFrame(() => {
        if (dot) {
          dot.style.transform = `translate(${clientX}px, ${clientY}px)`;
        }
        
        if (outline) {
          outline.animate({
            transform: `translate(${clientX}px, ${clientY}px)`
          }, { 
            duration: 500,
            fill: 'forwards',
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
          });
        }
      });
    };
    
    const mouseDownHandler = () => {
      if (outline) {
        outline.style.transform = 'scale(0.9)';
      }
    };
    
    const mouseUpHandler = () => {
      if (outline) {
        outline.style.transform = 'scale(1)';
      }
    };
    
    const mouseLinkHoverHandler = () => {
      if (dot && outline) {
        dot.style.transform = 'scale(1.5)';
        outline.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        outline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }
    };
    
    const mouseLinkLeaveHandler = () => {
      if (dot && outline) {
        dot.style.transform = 'scale(1)';
        outline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        outline.style.backgroundColor = 'transparent';
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    
    // Handle link and button hover states
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', mouseLinkHoverHandler);
      el.addEventListener('mouseleave', mouseLinkLeaveHandler);
    });
    
    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mousedown', mouseDownHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseLinkHoverHandler);
        el.removeEventListener('mouseleave', mouseLinkLeaveHandler);
      });
    };
  }, []);
  
  return (
    <>
      <div ref={dotRef} className="cursor-dot"></div>
      <div ref={outlineRef} className="cursor-outline"></div>
    </>
  );
};
