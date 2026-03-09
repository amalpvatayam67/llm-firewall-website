'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types of pixel agents based on the image provided
const AGENT_TYPES = ['suit', 'dress', 'orange-shirt', 'red-shirt', 'grey-hair', 'brown-hair'];
const ACTIVITIES = ['walking', 'working', 'idle', 'reading'];

interface Agent {
  id: string;
  type: string;
  x: number;
  y: number;
  activity: string;
  direction: 'left' | 'right';
  targetX?: number;
  targetY?: number;
  speed: number;
  lastUpdate: number;
}

export function PixelAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  // Initialize agents
  useEffect(() => {
    setMounted(true);
    
    // Create agents based on viewport size
    const isMobile = window.innerWidth < 768;
    const numAgents = isMobile ? Math.floor(Math.random() * 4) + 6 : Math.floor(Math.random() * 5) + 15;
    const initialAgents: Agent[] = [];
    
    // We want them to spawn mostly in the lower two-thirds of the screen on desktop.
    // On mobile, the cards take up the bottom, so we spawn them higher up (15-45%).
    for (let i = 0; i < numAgents; i++) {
      initialAgents.push({
        id: `agent-${i}`,
        type: AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)],
        x: Math.random() * 100, // percentage
        y: isMobile ? 15 + Math.random() * 30 : 40 + Math.random() * 60,
        activity: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
        direction: Math.random() > 0.5 ? 'right' : 'left',
        speed: 0.05 + Math.random() * 0.05, // Movement speed
        lastUpdate: Date.now()
      });
    }
    
    setAgents(initialAgents);
  }, []);

  // Animation Loop
  useEffect(() => {
    if (agents.length === 0) return;

    let lastTime = performance.now();
    
    const updateAgents = (time: number) => {
      // Cap deltaTime to avoid massive jumps if tab is inactive
      const rawDelta = time - lastTime;
      const deltaTime = rawDelta > 100 ? 16 : rawDelta;
      lastTime = time;

      setAgents(currentAgents => {
        return currentAgents.map(agent => {
          let { x, y, activity, direction, targetX, targetY, speed } = agent;
          
          // Randomly change activities occasionally
          if (Math.random() < 0.005) {
            activity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
            
            // If starting to walk, pick a new target
            if (activity === 'walking') {
              const isMobile = window.innerWidth < 768;
              targetX = Math.random() * 100;
              targetY = isMobile ? 15 + Math.random() * 30 : 40 + Math.random() * 60;
              direction = targetX > x ? 'right' : 'left';
            }
          }

          // Handle walking
          if (activity === 'walking' && targetX !== undefined && targetY !== undefined) {
            const dx = targetX - x;
            const dy = targetY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 1) {
              // Reached target
              activity = 'working';
              targetX = undefined;
              targetY = undefined;
            } else {
              // Move towards target
              x += (dx / (distance || 1)) * speed * (deltaTime / 16);
              y += (dy / (distance || 1)) * (speed * 0.5) * (deltaTime / 16); // Y movement is slower
            }
          }

          return { ...agent, x, y, activity, direction, targetX, targetY };
        });
      });

      animationRef.current = requestAnimationFrame(updateAgents);
    };

    animationRef.current = requestAnimationFrame(updateAgents);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [agents.length]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <AnimatePresence>
        {agents.map((agent) => (
          <PixelCharacter key={agent.id} agent={agent} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sub-component to render individual pixel characters
function PixelCharacter({ agent }: { agent: Agent }) {
  // Use framer motion for smooth positioning based on the state updates
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center transform-gpu"
      style={{
        left: `${agent.x}%`,
        top: `${agent.y}%`,
        // Flip image based on direction
        rotateY: agent.direction === 'left' ? 180 : 0
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: agent.activity === 'working' ? 0.9 : 0.7, 
        scale: 1,
        // Small bop animation when walking
        y: agent.activity === 'walking' ? [0, -3, 0] : 0
      }}
      transition={{
        y: {
          duration: 0.3,
          repeat: agent.activity === 'walking' ? Infinity : 0,
          ease: "linear"
        },
        opacity: { duration: 1 }
      }}
    >
      {/* 
        We use an SVG that simulates pixel art. 
        In a real scenario with actual image files, this would be an <img src="/pixels/suit.png" />
      */}
      <div className={cn(
        "relative w-8 h-10 transition-all duration-300",
        // The bop effect slightly squishes the character
        agent.activity === 'walking' && "scale-y-[0.95]"
      )}>
        <CharacterSVG type={agent.type} activity={agent.activity} />
        
        {/* Render "working" indicators (like a laptop or documents) */}
        {agent.activity === 'working' && (
          <div className="absolute -bottom-1 -right-2 w-4 h-3 bg-zinc-400 rounded-sm border-t-2 border-zinc-300">
            {/* Laptop screen glow */}
            <div className="absolute -top-3 right-0 w-3 h-3 bg-emerald-400/20 blur-sm rounded-full animate-pulse" />
          </div>
        )}
        
        {/* Render "reading" indicators (document) */}
        {agent.activity === 'reading' && (
          <div className="absolute top-4 -right-2 w-3 h-4 bg-yellow-100/90 rounded-sm rotate-12 shadow-sm" />
        )}
      </div>
      
      {/* Small shadow underneath the character */}
      <div className="w-6 h-1 bg-black/40 blur-[1px] rounded-full mt-1 opacity-50" />
      
      {/* Optional: Small status indicator (like they are analyzing packets) */}
      {(agent.activity === 'working' || agent.activity === 'reading') && (
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -10 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: Math.random() * 3 }}
          className="absolute -top-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_rgba(16,185,129,0.8)]"
        />
      )}
    </motion.div>
  );
}

// Utility classname merger
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Since we cannot easily import 6 separate PNG sprite sheets, we'll draw
// SVG representations of the pixel characters that match the vibe of the user's screenshot.
function CharacterSVG({ type, activity }: { type: string, activity: string }) {
  // Define colors based on the requested variations from image 1
  const palettes: Record<string, { hair: string, skin: string, shirt: string, pants: string }> = {
    'suit': { hair: '#8B5A2B', skin: '#FFDAC1', shirt: '#1E3A8A', pants: '#0F172A' }, // Suit guy
    'dress': { hair: '#D2B48C', skin: '#FFDAC1', shirt: '#171717', pants: '#171717' }, // Black dress
    'orange-shirt': { hair: '#1A1A1A', skin: '#5C3A21', shirt: '#EA580C', pants: '#1E3A8A' }, // Orange shirt
    'red-shirt': { hair: '#27272A', skin: '#FFE0BD', shirt: '#DC2626', pants: '#27272A' }, // Red shirt
    'grey-hair': { hair: '#D4D4D8', skin: '#C68E58', shirt: '#F4F4F5', pants: '#D4D4D8' }, // Grey hair
    'brown-hair': { hair: '#5C3A21', skin: '#FFDAC1', shirt: '#F4F4F5', pants: '#1E3A8A' }, // White shirt brown hair
  };

  const p = palettes[type] || palettes['suit'];

  return (
    <svg viewBox="0 0 16 20" className="w-full h-full drop-shadow-md" preserveAspectRatio="xMidYMid meet" style={{ imageRendering: 'pixelated' }}>
      {/* Base pixel grid coordinate system */}
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        
        {/* Hair Back/Volume */}
        <rect fill={p.hair} x="4" y="1" width="8" height="2" rx="1" />
        <rect fill={p.hair} x="3" y="2" width="10" height="4" rx="1" />
        
        {/* Head / Skin */}
        <rect fill={p.skin} x="4" y="4" width="8" height="6" rx="1" />
        
        {/* Hair Front Bangs */}
        <rect fill={p.hair} x="3" y="3" width="4" height="3" />
        <rect fill={p.hair} x="9" y="3" width="4" height="2" />
        {type === 'suit' && <rect fill={p.hair} x="6" y="3" width="2" height="4" />}
        {type === 'dress' && <rect fill={p.hair} x="3" y="4" width="2" height="6" />}
        {type === 'dress' && <rect fill={p.hair} x="11" y="4" width="2" height="6" />}

        {/* Eyes (Closed if working, open otherwise) */}
        {activity === 'working' ? (
          <g fill="#1A1A1A">
            <rect x="5" y="7" width="2" height="1" />
            <rect x="9" y="7" width="2" height="1" />
          </g>
        ) : (
          <g fill="#1A1A1A">
            <rect x="5" y="6" width="2" height="2" />
            <rect x="9" y="6" width="2" height="2" />
            {/* White specular highlight */}
            <rect fill="#FFFFFF" x="6" y="6" width="1" height="1" />
            <rect fill="#FFFFFF" x="10" y="6" width="1" height="1" />
          </g>
        )}

        {/* Body/Shirt */}
        <rect fill={p.shirt} x="4" y="10" width="8" height="5" />
        
        {/* Arms */}
        <rect fill={p.shirt} x="2" y="10" width="2" height="4" />
        <rect fill={p.shirt} x="12" y="10" width="2" height="4" />
        
        {/* Hands */}
        <rect fill={p.skin} x="2" y="14" width="2" height="2" />
        <rect fill={p.skin} x="12" y="14" width="2" height="2" />

        {/* Special details: Tie for suit */}
        {type === 'suit' && (
          <rect fill="#FFFFFF" x="7" y="10" width="2" height="5" />
        )}
        {type === 'suit' && (
          <rect fill="#1A1A1A" x="7.5" y="10" width="1" height="4" />
        )}

        {/* Legs/Pants */}
        <rect fill={p.pants} x="4" y="15" width="3" height="3" />
        <rect fill={p.pants} x="9" y="15" width="3" height="3" />
        
        {/* Shoes */}
        <rect fill="#1A1A1A" x="4" y="18" width="3" height="2" />
        <rect fill="#1A1A1A" x="9" y="18" width="3" height="2" />
      </g>
    </svg>
  );
}
