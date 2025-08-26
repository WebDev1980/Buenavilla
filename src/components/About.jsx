import React, { useEffect } from "react";
import styles from "@styles/About.module.css";

export default function About() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const boxes = document.querySelectorAll(`.${styles.valueBox}`);

    const handleClick = (e) => {
      e.stopPropagation();
      const box = e.currentTarget;

      boxes.forEach((b) => b.classList.remove(styles.showTooltip));
      box.classList.add(styles.showTooltip);

      setTimeout(() => {
        box.classList.remove(styles.showTooltip);
      }, 3000);
    };

    const handleOutsideClick = (e) => {
      if (![...boxes].some((box) => box.contains(e.target))) {
        boxes.forEach((b) => b.classList.remove(styles.showTooltip));
      }
    };

    boxes.forEach((box) => {
      box.addEventListener("click", handleClick);
    });
    document.addEventListener("click", handleOutsideClick);

    return () => {
      boxes.forEach((box) => {
        box.removeEventListener("click", handleClick);
      });
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <h2 id="titulo-nosotros">Quiénes somos</h2>
      <p>
        Vecinos Buenavilla A.C. nace de la iniciativa de residentes
        comprometidos con mejorar la calidad de vida en nuestra colonia. Creemos
        en el poder de la cooperación vecinal para resolver problemas, impulsar
        proyectos y fortalecer nuestros lazos.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Misión</h3>
          <p>
            Promover la participación activa de los vecinos para crear un
            entorno más seguro, armonioso y sustentable.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Visión</h3>
          <p>
            Ser un modelo de organización comunitaria que inspire a otras
            colonias a trabajar juntas por el bien común.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Valores</h3>
          <div className={styles.valueGrid}>
            <div className={styles.valueBox}>
              RESPETO
              <span className={styles.tooltip}>
                Cada individuo es importante y merece ser atendido.
              </span>
            </div>
            <div className={styles.valueBox}>
              RESPONSABILIDAD
              <span className={styles.tooltip}>
                Asumir la parte que a cada parte compete.
              </span>
            </div>
            <div className={styles.valueBox}>
              SOLIDARIDAD
              <span className={styles.tooltip}>
                Apoyo y compromiso incondicional a causas comunes.
              </span>
            </div>
            <div className={styles.valueBox}>
              TRANSPARENCIA
              <span className={styles.tooltip}>
                La verdad como núcleo aboluto de confianza vecinal.
              </span>
            </div>
            <div className={styles.valueBox}>
              EMPATÍA
              <span className={styles.tooltip}>
                Ponerse en el papel del otro para asentar un entendimiento
                mutuo.
              </span>
            </div>
            <div className={styles.valueBox}>
              COOPERACIÓN
              <span className={styles.tooltip}>
                Trabajo organizado conjunto en pro de objetivos comunes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
