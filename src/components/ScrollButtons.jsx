import React, { useEffect, useState } from "react";
import styles from "@styles/ScrollButtons.module.css";

export default function ScrollButtons() {
  const [pos, setPos] = useState("top"); // 'top' | 'mid' | 'bottom'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight - 4;
      if (y <= 4) setPos("top");
      else if (y >= max) setPos("bottom");
      else setPos("mid");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max, behavior: "smooth" });
  };

  return (
    <div className={styles.stack} aria-label="Navegación por flechas">
      {(pos === "mid" || pos === "bottom") && (
        <button
          className={styles.btn}
          onClick={scrollToTop}
          aria-label="Subir al inicio"
        >
          ▲
        </button>
      )}
      {(pos === "mid" || pos === "top") && (
        <button
          className={styles.btn}
          onClick={scrollToBottom}
          aria-label="Bajar al final"
        >
          ▼
        </button>
      )}
    </div>
  );
}
