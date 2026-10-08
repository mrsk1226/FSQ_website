import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const StatItem = ({ target, suffix, label, isLast, startCount }) => {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (!startCount) return;
    let startTime = null;
    let animationFrameId = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.floor(easedProgress * target);
      setDisplayVal(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayVal(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [startCount, target]);

  const formattedValue = () => {
    if (target === 100000) {
      return displayVal >= 100000 ? "1,00,000" + suffix : displayVal.toLocaleString("en-IN") + suffix;
    }
    if (target >= 1000) {
      return displayVal.toLocaleString("en-IN") + suffix;
    }
    return displayVal + suffix;
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "16px 12px",
        borderRight: isLast ? "none" : "1px solid rgba(255, 255, 255, 0.12)"
      }}
      className="stat-box"
    >
      <motion.strong
        className="counter-animate"
        initial={{ scale: 0.8 }}
        animate={startCount ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
        style={{
          display: "block",
          fontFamily: "'Outfit', sans-serif",
          color: "#ffffff",
          fontSize: "clamp(1.8rem, 2.8vw, 2.5rem)",
          fontWeight: "700",
          lineHeight: "1.1",
          marginBottom: "6px"
        }}
      >
        {formattedValue()}
      </motion.strong>
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: "600",
          color: "rgba(255, 255, 255, 0.7)",
          letterSpacing: "0.06em",
          textTransform: "uppercase"
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const StatsBand = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { target: 20, prefix: "", suffix: "", label: "Year Warranty" },
    { target: 25000, prefix: "", suffix: "+", label: "Hours Weather Testing" },
    { target: 1, prefix: "", suffix: "", label: "Flagship Showroom (Erode)" },
    { target: 3, prefix: "", suffix: "", label: "Divisions (uPVC, Alu, Interiors)" },
    { target: 100, prefix: "", suffix: "+", label: "Colours & Finishes" },
    { target: 100000, prefix: "", suffix: "+", label: "Hardware Cycles Tested" }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      style={{
        padding: "60px 0",
        background: "linear-gradient(135deg, #0d2137 0%, #163a52 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(33, 150, 243, 0.12), transparent 60%)",
          pointerEvents: "none"
        }}
      />
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            position: "relative",
            zIndex: 1
          }}
          className="stats-grid-wrap"
        >
          {stats.map((st, idx) => (
            <StatItem
              key={idx}
              target={st.target}
              suffix={st.suffix}
              label={st.label}
              isLast={idx === stats.length - 1}
              startCount={isInView}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .stats-grid-wrap { grid-template-columns: repeat(3, 1fr) !important; row-gap: 24px; }
          .stat-box:nth-child(3n) { border-right: none !important; }
        }
        @media (max-width: 576px) {
          .stats-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .stat-box:nth-child(2n) { border-right: none !important; }
        }
      `}</style>
    </motion.section>
  );
};

export default StatsBand;
