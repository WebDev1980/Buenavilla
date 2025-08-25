import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  // Estado para el rebote del logo
  const [bounce, setBounce] = useState(false);

  // Estado para el efecto de máquina de escribir
  const textRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Rebote al hacer clic
  const handleClick = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 400); // Duración de la animación
  };

  // Detectar entrada al viewport para el texto
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [visible]);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div
          className={`${styles.logo} ${bounce ? styles.bounce : ""}`}
          onClick={handleClick}
          role="button"
          aria-label="Logo interactivo"
        ></div>
        <small ref={textRef} className={visible ? styles.typewriter : ""}>
          © {year} Vecinos Buenavilla A.C. Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
}
