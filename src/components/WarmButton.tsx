import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WarmButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "soft" | "name";
}

const WarmButton = ({ onClick, children, variant = "primary" }: WarmButtonProps) => {
  const baseClasses = "font-semibold transition-all duration-300 rounded-full touch-manipulation";
  
  const variants = {
    primary: "px-8 py-4 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl animate-pulse-glow",
    soft: "px-6 py-3 text-base bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md",
    name: "px-5 py-2.5 text-sm bg-accent text-accent-foreground hover:bg-accent/80 shadow-sm hover:shadow-md",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  );
};

export default WarmButton;