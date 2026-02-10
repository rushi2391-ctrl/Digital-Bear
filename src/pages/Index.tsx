import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeddySilhouette from "@/components/TeddySilhouette";
import Teddy from "@/components/Teddy";
import Sparkles from "@/components/Sparkles";
import WarmButton from "@/components/WarmButton";
import NameTeddy from "@/components/NameTeddy";

type Stage = "intro" | "hook" | "reveal" | "interact" | "name" | "final";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [teddyName, setTeddyName] = useState<string | undefined>();
  const [tapCount, setTapCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");

  const interactionMessages = [
    "Sending you a hug 🤗",
    "Soft. Warm. Yours. 💙",
    "You're not alone 🧸",
    "Always here for you ✨",
  ];

  // Introduction sequence
  useEffect(() => {
    if (stage === "intro") {
      const timer = setTimeout(() => setStage("hook"), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Hook text reveal
  useEffect(() => {
    if (stage === "hook") {
      const timer = setTimeout(() => setShowSecondLine(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Show name options after a few taps
  useEffect(() => {
    if (stage === "interact" && tapCount >= 2 && !teddyName) {
      const timer = setTimeout(() => setStage("name"), 1500);
      return () => clearTimeout(timer);
    }
  }, [tapCount, stage, teddyName]);

  const handleOpenTeddy = () => {
    setStage("reveal");
    setTimeout(() => setStage("interact"), 2500);
  };

  const handleTeddyTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    setCurrentMessage(interactionMessages[newCount % interactionMessages.length]);
    
    setTimeout(() => setCurrentMessage(""), 2000);
  };

  const handleNameSelect = (name: string) => {
    setTeddyName(name);
    setTimeout(() => setStage("final"), 2000);
  };

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background sparkles */}
      {(stage === "reveal" || stage === "interact" || stage === "name" || stage === "final") && (
        <Sparkles />
      )}

      {/* Soft glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Intro Screen */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-4xl">🧸</span>
            </motion.div>
          </motion.div>
        )}

        {/* Hook Screen */}
        {stage === "hook" && (
          <motion.div
            key="hook"
            className="text-center flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              >
                I couldn't give you a teddy today…
              </motion.h1>

              <AnimatePresence>
                {showSecondLine && (
                  <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-primary leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    So I sent one here.
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <TeddySilhouette />
            </motion.div>

            {showSecondLine && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
              >
                <WarmButton onClick={handleOpenTeddy}>
                  Tap to Open Your Teddy
                </WarmButton>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Reveal & Interact Screen */}
        {(stage === "reveal" || stage === "interact" || stage === "name") && (
          <motion.div
            key="reveal"
            className="text-center flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Reveal message */}
            {stage === "reveal" && (
              <motion.p
                className="text-xl md:text-2xl font-medium text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                This one is just for you 🧸
              </motion.p>
            )}

            {/* Interaction message */}
            <AnimatePresence>
              {currentMessage && (
                <motion.p
                  key={currentMessage}
                  className="text-lg md:text-xl font-medium text-love h-8"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {currentMessage}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Empty space for message when not showing */}
            {!currentMessage && stage !== "reveal" && <div className="h-8" />}

            {/* The Teddy */}
            <motion.div
              className="animate-breathe"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              <Teddy
                isRevealed={true}
                name={teddyName}
                onTap={handleTeddyTap}
              />
            </motion.div>

            {/* Tap hint */}
            {stage === "interact" && tapCount < 2 && !teddyName && (
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, ease: "easeOut" }}
              >
                Tap the teddy 💛
              </motion.p>
            )}

            {/* Name selection */}
            {stage === "name" && !teddyName && (
              <NameTeddy onNameSelect={handleNameSelect} />
            )}
          </motion.div>
        )}

        {/* Final Screen */}
        {stage === "final" && (
          <motion.div
            key="final"
            className="text-center flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
          >
            <motion.div
              className="animate-breathe"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              <Teddy isRevealed={true} name={teddyName} onTap={handleTeddyTap} />
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Happy Teddy Dayyy 🍓
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                Whenever you miss me, come here.
              </p>
            </motion.div>

            {/* Floating hearts decoration */}
            <motion.div
              className="absolute bottom-10 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, ease: "easeOut" }}
            >
              {["🧸", "💛", "✨", "💕"].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.6,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
