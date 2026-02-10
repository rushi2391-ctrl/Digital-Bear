import { motion } from "framer-motion";
import WarmButton from "./WarmButton";

interface NameTeddyProps {
  onNameSelect: (name: string) => void;
}

const names = ["Honey", "Cuddles", "Snuggles"];

const NameTeddy = ({ onNameSelect }: NameTeddyProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.p
        className="text-lg md:text-xl text-muted-foreground text-center font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        What would you name this teddy?
      </motion.p>
      
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {names.map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.15 }}
          >
            <WarmButton
              variant="name"
              onClick={() => onNameSelect(name)}
            >
              {name}
            </WarmButton>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NameTeddy;