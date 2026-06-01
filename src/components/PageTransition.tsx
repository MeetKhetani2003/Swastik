"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.main 
        key={pathname} 
        initial={{ opacity: 0, y: 15, filter: "blur(10px)" }} 
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
        exit={{ opacity: 0, y: -15, filter: "blur(10px)" }} 
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}