import { motion } from "framer-motion";

export default function TopSheet({ children, onClose, overlayClassName = "", containerClassName = "" }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <button
        type="button"
        aria-label="Close overlay"
        className={`absolute inset-0 bg-slate-950/20 backdrop-blur-md ${overlayClassName}`}
        onClick={onClose}
      />
      <motion.div
        className={`relative z-10 mx-auto w-full max-w-[420px] ${containerClassName}`}
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.985 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
