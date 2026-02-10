import { motion } from "framer-motion";
import { useState } from "react";

interface TeddyProps {
  isRevealed: boolean;
  name?: string;
  onTap?: () => void;
}

interface ClickSparkle {
  id: number;
  x: number;
  y: number;
}

const Teddy = ({ isRevealed, name, onTap }: TeddyProps) => {
  const [isHugging, setIsHugging] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [clickSparkles, setClickSparkles] = useState<ClickSparkle[]>([]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHugging(true);
    setShowHearts(true);
    onTap?.();

    // Create click sparkles
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSparkle: ClickSparkle = { id: Date.now(), x, y };
    setClickSparkles((prev) => [...prev, newSparkle]);
    setTimeout(() => {
      setClickSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 800);
    
    setTimeout(() => setIsHugging(false), 400);
    setTimeout(() => setShowHearts(false), 1000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Click sparkles */}
      {clickSparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none text-lg"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating hearts on tap */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl"
              initial={{ 
                opacity: 1, 
                y: 0, 
                x: `calc(50% + ${(i - 2.5) * 30}px)`,
                scale: 0 
              }}
              animate={{ 
                opacity: 0, 
                y: -80, 
                scale: 1,
                rotate: (i - 2.5) * 15
              }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.05,
                ease: "easeOut"
              }}
              style={{ left: "50%", top: "20%" }}
            >
              {i % 2 === 0 ? "💕" : "✨"}
            </motion.span>
          ))}
        </div>
      )}

      {/* The Teddy Bear */}
      <motion.div
        className="cursor-pointer select-none"
        onClick={handleTap}
        animate={isHugging ? { scale: 1.1 } : { scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="w-56 h-56 md:w-64 md:h-64 teddy-shadow"
          initial={isRevealed ? { scale: 0, opacity: 0 } : {}}
          animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
        >
          {/* Ears */}
          <motion.circle
            cx="50"
            cy="50"
            r="28"
            className="fill-teddy-fur"
            animate={isHugging ? { cy: 45 } : { cy: 50 }}
          />
          <circle cx="50" cy="50" r="16" className="fill-teddy-fur-light" />
          <motion.circle
            cx="150"
            cy="50"
            r="28"
            className="fill-teddy-fur"
            animate={isHugging ? { cy: 45 } : { cy: 50 }}
          />
          <circle cx="150" cy="50" r="16" className="fill-teddy-fur-light" />

          {/* Head */}
          <motion.ellipse
            cx="100"
            cy="85"
            rx="60"
            ry="55"
            className="fill-teddy-fur"
            style={{ originX: "50%", originY: "50%" }}
          />

          {/* Body */}
          <motion.ellipse
            cx="100"
            cy="155"
            rx="50"
            ry="40"
            className="fill-teddy-fur"
            animate={isHugging ? { ry: 38 } : { ry: 40 }}
          />

          {/* Belly patch */}
          <ellipse cx="100" cy="155" rx="30" ry="25" className="fill-teddy-fur-light" />

          {/* Arms */}
          <motion.ellipse
            cx="55"
            cy="140"
            rx="18"
            ry="28"
            className="fill-teddy-fur"
            style={{ rotate: isHugging ? 30 : 20 }}
            animate={isHugging ? { rotate: 50, x: 15, y: -10 } : { rotate: 20, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
          />
          <motion.ellipse
            cx="145"
            cy="140"
            rx="18"
            ry="28"
            className="fill-teddy-fur"
            animate={isHugging ? { rotate: -50, x: -15, y: -10 } : { rotate: -20, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
          />

          {/* Muzzle */}
          <ellipse cx="100" cy="95" rx="25" ry="18" className="fill-teddy-fur-light" />

          {/* Nose */}
          <ellipse cx="100" cy="88" rx="8" ry="6" className="fill-teddy-nose" />

          {/* Eyes */}
          <motion.g
            animate={isHugging ? { scaleY: 0.1 } : { scaleY: 1 }}
            style={{ originY: "50%" }}
          >
            <circle cx="78" cy="72" r="8" className="fill-teddy-eyes" />
            <circle cx="122" cy="72" r="8" className="fill-teddy-eyes" />
            <circle cx="80" cy="70" r="3" fill="white" />
            <circle cx="124" cy="70" r="3" fill="white" />
          </motion.g>

          {/* Cheeks */}
          <motion.circle
            cx="65"
            cy="90"
            r="10"
            className="fill-teddy-cheeks"
            animate={isHugging ? { scale: 1.2 } : { scale: 1 }}
            style={{ opacity: 0.7 }}
          />
          <motion.circle
            cx="135"
            cy="90"
            r="10"
            className="fill-teddy-cheeks"
            animate={isHugging ? { scale: 1.2 } : { scale: 1 }}
            style={{ opacity: 0.7 }}
          />

          {/* Mouth */}
          <motion.path
            d="M 92 100 Q 100 108 108 100"
            fill="none"
            className="stroke-teddy-nose"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={isHugging ? { d: "M 88 98 Q 100 112 112 98" } : { d: "M 92 100 Q 100 108 108 100" }}
          />

          {/* Heart on belly when hugging */}
          {isHugging && (
            <motion.text
              x="100"
              y="160"
              textAnchor="middle"
              fontSize="20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ❤️
            </motion.text>
          )}
        </motion.svg>
      </motion.div>

      {/* Teddy's name */}
      {name && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 px-6 py-2 bg-secondary rounded-full"
        >
          <span className="text-lg font-semibold text-secondary-foreground">
            {name} 🧸
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Teddy;
