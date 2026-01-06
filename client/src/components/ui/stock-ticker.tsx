import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const indices = [
  { name: "다우 산업", value: "43,977.18", diff: "+1.23%", isUp: true },
  { name: "나스닥 종합", value: "23,395.82", diff: "+0.69%", isUp: true },
  { name: "S&P 500", value: "5,987.32", diff: "+0.95%", isUp: true },
  { name: "코스피 종합", value: "2,542.36", diff: "-0.45%", isUp: false },
  { name: "코스닥 종합", value: "955.97", diff: "-0.16%", isUp: false },
  { name: "달러 환율", value: "1,385.50", diff: "+0.20%", isUp: true },
  { name: "니케이 225", value: "38,925.10", diff: "+1.15%", isUp: true },
];

export default function StockTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % indices.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = indices[currentIndex];

  return (
    <div className="h-full w-full overflow-hidden relative flex items-center justify-start">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-start gap-2 w-full h-full"
        >
          <span className="text-[12px] font-bold text-white">{current.name}</span>
          <div className={`text-[12px] font-medium flex items-center gap-1.5 ${current.isUp ? 'text-[#ff3b30]' : 'text-blue-400'}`}>
            <span>{current.value}</span>
            <span>{current.diff}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
