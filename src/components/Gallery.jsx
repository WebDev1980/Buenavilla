import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@styles/Gallery.module.css";

export default function Gallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, idx: 0 });
  const [autoSlideActive, setAutoSlideActive] = useState(false);

  const trackRef = useRef(null);
  const startX = useRef(0);
  const delta = useRef(0);
  const dragging = useRef(false);

  const autoScrollTimeoutRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const isTouchDevice = () =>
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const wrapIndex = (i) => (i + images.length) % images.length;

  const prev = useCallback(
    () => setIndex((i) => wrapIndex(i - 1)),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => wrapIndex(i + 1)),
    [images.length]
  );

  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
  }, [lightbox.open]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") setLightbox((s) => ({ ...s, open: false }));
      if (e.key === "ArrowLeft")
        setLightbox((s) => ({ ...s, idx: wrapIndex(s.idx - 1) }));
      if (e.key === "ArrowRight")
        setLightbox((s) => ({ ...s, idx: wrapIndex(s.idx + 1) }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, images.length]);

  useEffect(() => {
    return () => {
      clearTimeout(autoScrollTimeoutRef.current);
      clearInterval(autoScrollIntervalRef.current);
    };
  }, []);

  const onPointerDown = (e) => {
    if (!isTouchDevice()) return;
    dragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    delta.current = 0;
    trackRef.current.style.transition = "none";
    trackRef.current?.setPointerCapture?.(e.pointerId ?? 1);
  };

  const onPointerMove = (e) => {
    if (!isTouchDevice() || !dragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    delta.current = x - startX.current;
    trackRef.current.style.transform = `translateX(calc(-${index * 100}% + ${
      delta.current
    }px))`;
  };

  const onPointerUp = () => {
    if (!isTouchDevice() || !dragging.current) return;
    dragging.current = false;
    stopAutoScroll();
    const threshold = 60;
    trackRef.current.style.transition = "transform 0.3s ease";
    if (delta.current < -threshold) next();
    else if (delta.current > threshold) prev();
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    delta.current = 0;
  };

  const openLightbox = (i) => {
    stopAutoScroll();
    setLightbox({ open: true, idx: i });
  };

  const startAutoScroll = (direction) => {
    autoScrollTimeoutRef.current = setTimeout(() => {
      autoScrollIntervalRef.current = setInterval(() => {
        direction === "left" ? prev() : next();
      }, 800);
    }, 1000);
  };

  const stopAutoScroll = () => {
    clearTimeout(autoScrollTimeoutRef.current);
    clearInterval(autoScrollIntervalRef.current);
    setAutoSlideActive(false);
  };

  const toggleAutoSlide = () => {
    if (autoSlideActive) {
      stopAutoScroll();
    } else {
      startAutoScroll("right");
      setAutoSlideActive(true);
    }
  };

  const handleArrowKeyDown = (e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  const Lightbox = () => (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Imagen en tamaño completo"
      onClick={() => setLightbox((s) => ({ ...s, open: false }))}
    >
      <button
        className={`${styles.lbArrow} ${styles.lbLeft}`}
        onClick={(e) => {
          e.stopPropagation();
          setLightbox((s) => ({ ...s, idx: wrapIndex(s.idx - 1) }));
        }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <img
        src={images[lightbox.idx]?.src}
        alt={images[lightbox.idx]?.alt}
        className={styles.lbImg}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className={`${styles.lbArrow} ${styles.lbRight}`}
        onClick={(e) => {
          e.stopPropagation();
          setLightbox((s) => ({ ...s, idx: wrapIndex(s.idx + 1) }));
        }}
        aria-label="Siguiente"
      >
        ›
      </button>
      <button
        className={styles.lbClose}
        onClick={() => setLightbox((s) => ({ ...s, open: false }))}
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <h2 id="titulo-galeria" className={styles.heading}>
        Galería
      </h2>

      <button
        onClick={toggleAutoSlide}
        className={styles.autoSlideToggle}
        aria-label="Control de slide automático"
      >
        {autoSlideActive ? "Detener Slide" : "Activar Slide"}
      </button>

      <div className={styles.carousel} aria-roledescription="carrusel">
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={prev}
          onKeyDown={(e) => handleArrowKeyDown(e, prev)}
          onMouseDown={() => startAutoScroll("left")}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          aria-label="Imagen anterior"
        >
          ‹
        </button>

        <div
          className={styles.viewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="group"
          aria-label={`Imagen ${index + 1} de ${images.length}`}
        >
          <div
            className={styles.track}
            ref={trackRef}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div className={styles.slide} key={img.src}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.slideImg}
                  onClick={() => {
                    if (!isTouchDevice() || Math.abs(delta.current) < 5)
                      openLightbox(i);
                  }}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={next}
          onKeyDown={(e) => handleArrowKeyDown(e, next)}
          onMouseDown={() => startAutoScroll("right")}
          onMouseUp={stopAutoScroll}
          onMouseLeave={stopAutoScroll}
          aria-label="Imagen siguiente"
        >
          ›
        </button>
      </div>

      {lightbox.open && ReactDOM.createPortal(<Lightbox />, document.body)}
    </div>
  );
}
