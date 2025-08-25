import React, { useEffect, useState } from "react";
import styles from "@styles/Hero.module.css";

export default function Hero({
  imageSrc = `${import.meta.env.BASE_URL}images/portada.webp`,
  headline = "Vecinos Buenavilla A.C.",
  lead = "Comunidad Vecinal Buenavilla en Silao de la Victoria, Guanajuato",
}) {
  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedLead, setTypedLead] = useState("");
  const [typedInfoText, setTypedInfoText] = useState("");
  const [headlineDone, setHeadlineDone] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [showContactButton, setShowContactButton] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        const next = headline.slice(0, i + 1);
        setTypedHeadline(next);
        i++;
        if (next === headline) {
          clearInterval(interval);
          setHeadlineDone(true);
        }
      }, 30);
    }, 2000);
    return () => clearTimeout(delay);
  }, [headline]);

  useEffect(() => {
    if (!headlineDone) return;
    let j = 0;
    const interval = setInterval(() => {
      const next = lead.slice(0, j + 1);
      setTypedLead(next);
      j++;
      if (next === lead) {
        clearInterval(interval);
        setShowLogo(true);
        setTimeout(() => setLogoReady(true), 800); // listo para clic tras fadeIn
        setTimeout(() => {
          let k = 0;
          const info =
            "Bienvenido a Buenavilla, una comunidad unida por el compromiso y la colaboración para mejorar nuestros espacios, fortalecer la convivencia y promover iniciativas locales de bienestar común. Porque una comunidad vecinal unida y colaborativa es una comunidad confiable, segura y feliz.";
          const infoInterval = setInterval(() => {
            const nextInfo = info.slice(0, k + 1);
            setTypedInfoText(nextInfo);
            k++;
            if (nextInfo === info) {
              clearInterval(infoInterval);
              setTimeout(() => setShowContactButton(true), 300);
            }
          }, 6);
        }, 300);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [headlineDone, lead]);

  return (
    <>
      <section
        id="inicio"
        data-anchor="inicio"
        className={styles.hero}
        aria-labelledby="titulo-hero"
      >
        <div
          className={styles.mediaWrap}
          role="img"
          aria-label="Portada de Vecinos Buenavilla A.C."
        >
          <img
            className={styles.image}
            src={imageSrc}
            alt="Portada de la comunidad Vecinos Buenavilla A.C."
            loading="eager"
          />
        </div>

        <img
          className={`${styles.watermark} 
            ${showLogo ? styles.visible : ""} 
            ${logoReady ? styles.logoReady : ""} 
            ${bounce ? styles.bounce : ""}`}
          src={`${import.meta.env.BASE_URL}images/logo3.svg`}
          alt="Logotipo Vecinal"
          onClick={() => {
            if (logoReady) {
              setBounce(true);
              setTimeout(() => setBounce(false), 400);
            }
          }}
        />

        <div className={`container ${styles.content}`}>
          <h1 id="titulo-hero" className={styles.title}>
            {typedHeadline}
          </h1>
          <p className={styles.lead}>{typedLead}</p>
        </div>
      </section>

      <section className={`container ${styles.infoBox}`}>
        <p className={styles.infoText}>{typedInfoText}</p>
        {showContactButton && (
          <div className={styles.buttonWrap}>
            <a href="#contacto" className={styles.contactButton}>
              Contáctanos
            </a>
          </div>
        )}
      </section>
    </>
  );
}
