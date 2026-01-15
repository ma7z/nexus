"use client";

import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 h-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <Spinner className="size-16" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm text-muted-foreground"
      >
        Por favor, aguarde enquanto carregamos tudo pra você. :D
      </motion.span>
    </div>
  );
};

export default Loading;
