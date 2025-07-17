import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FloatingSkillsProps {
  skills: string[];
  count?: number;
  navHeight?: number;
  footerHeight?: number;
  containerHeight?: number;
}

const FRIGHT_RADIUS = 100;
const NUDGE_STRENGTH = 40; // Gentler nudge
const FLOAT_RADIUS = 100; // Larger, slower orbits
const FLOAT_SPEED = 0.07; // Slower movement

interface FloatingSkill {
  skill: string;
  base: { x: number; y: number };
  angle: number;
  speed: number;
  id: number;
  offset: number;
  nudge: { x: number; y: number };
  _x?: number;
  _y?: number;
}

const getRandomBase = (navHeight = 0, footerHeight = 0, containerHeight = window.innerHeight) => ({
  x: Math.random() * (window.innerWidth - 120),
  y:
    navHeight +
    Math.random() * (containerHeight - navHeight - footerHeight - 40),
});

const FloatingSkills: React.FC<FloatingSkillsProps> = ({
  skills,
  count,
  navHeight = 0,
  footerHeight = 0,
  containerHeight = window.innerHeight,
}) => {
  const [floating, setFloating] = useState<FloatingSkill[]>([]);
  const [tick, setTick] = useState(0); // For re-render
  const mouse = useRef({ x: -9999, y: -9999 });

  // Initialize floating skills
  useEffect(() => {
    const n = count || skills.length;
    const chosen = skills
      .sort(() => 0.5 - Math.random())
      .slice(0, n)
      .map((skill, i) => {
        const base = getRandomBase(navHeight, footerHeight, containerHeight);
        return {
          skill,
          base,
          angle: Math.random() * Math.PI * 2,
          speed: FLOAT_SPEED * (0.7 + Math.random() * 0.6),
          id: i,
          offset: Math.random() * 1000,
          nudge: { x: 0, y: 0 },
        };
      });
    setFloating(chosen);
    // eslint-disable-next-line
  }, [skills, count, navHeight, footerHeight, containerHeight]);

  // Animate floating
  useEffect(() => {
    let running = true;
    function animate() {
      setFloating((prev) =>
        prev.map((item) => {
          // Circular or wavy float
          const t = Date.now() / 1000 + item.offset;
          const x = item.base.x + Math.cos(t * item.speed) * FLOAT_RADIUS + item.nudge.x;
          const y = item.base.y + Math.sin(t * item.speed * 0.8) * FLOAT_RADIUS + item.nudge.y;
          return { ...item, angle: item.angle, nudge: { ...item.nudge }, _x: x, _y: y };
        })
      );
      setTick((t) => t + 1); // force re-render
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, []);

  // Mouse move handler: nudge skills away from mouse
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      setFloating((prev) =>
        prev.map((item) => {
          const t = Date.now() / 1000 + item.offset;
          const x = item.base.x + Math.cos(t * item.speed) * FLOAT_RADIUS + item.nudge.x;
          const y = item.base.y + Math.sin(t * item.speed * 0.8) * FLOAT_RADIUS + item.nudge.y;
          const dx = x - e.clientX;
          const dy = y - e.clientY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < FRIGHT_RADIUS) {
            // Nudge away from mouse
            const angle = Math.atan2(dy, dx);
            return {
              ...item,
              nudge: {
                x: item.nudge.x + Math.cos(angle) * NUDGE_STRENGTH,
                y: item.nudge.y + Math.sin(angle) * NUDGE_STRENGTH,
              },
            };
          }
          return item;
        })
      );
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden
    >
      {floating.map((item) => (
        <motion.span
          key={item.id}
          animate={{
            x: item._x || item.base.x,
            y: item._y || item.base.y,
            opacity: 0.7,
          }}
          transition={{
            type: "spring",
            stiffness: 12,
            damping: 18,
            mass: 1.2,
          }}
          style={{
            position: "absolute",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#fff",
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
          }}
        >
          {item.skill}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingSkills; 