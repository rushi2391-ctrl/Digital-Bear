import { motion } from "framer-motion";

const TeddySilhouette = () => {
  return (
    <motion.div
      className="opacity-30"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-32 h-32 md:w-40 md:h-40"
      >
        {/* Ears */}
        <circle cx="50" cy="50" r="28" className="fill-primary/40" />
        <circle cx="150" cy="50" r="28" className="fill-primary/40" />

        {/* Head */}
        <ellipse cx="100" cy="85" rx="60" ry="55" className="fill-primary/40" />

        {/* Body */}
        <ellipse cx="100" cy="155" rx="50" ry="40" className="fill-primary/40" />

        {/* Arms */}
        <ellipse cx="55" cy="140" rx="18" ry="28" className="fill-primary/40" transform="rotate(20 55 140)" />
        <ellipse cx="145" cy="140" rx="18" ry="28" className="fill-primary/40" transform="rotate(-20 145 140)" />
      </svg>
    </motion.div>
  );
};

export default TeddySilhouette;