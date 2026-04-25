import { motion } from "framer-motion";

export default function TopSheet({ children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-purple-950/25 px-3 pt-[88px] backdrop-blur-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="mx-auto w-full max-w-[406px]"
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
