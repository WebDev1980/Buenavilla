import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/WidgetsPanel.module.css";

export default function WidgetsPanel({
  email = "contacto@vecinosbuenavilla.com",
  whatsHref = "https://wa.me/524721005615",
}) {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleOpen = () => {
    setAnimating(true);
    setTimeout(() => {
      setOpen(true);
      setAnimating(false);
    }, 300);
  };

  const handleClose = () => {
    setAnimating(true);
    setOpen(false);
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };

  return (
    <>
      {!open && (
        <button
          className={`${styles.toggle} ${
            animating ? styles.fadeOut : styles.fadeIn
          }`}
          aria-label="Abrir panel de acciones"
          onClick={handleOpen}
        >
          ☰
        </button>
      )}

      <aside
        className={`${styles.panel} ${open ? styles.open : styles.closed} ${
          open ? styles.bounceIn : ""
        }`}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          <button
            className={styles.close}
            aria-label="Cerrar panel"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
        <div className={styles.body}>
          <a
            href={whatsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp"
            className={styles.iconButton}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.37.01 12c0 2.11.55 4.17 1.6 6L0 24l6.17-1.61a11.94 11.94 0 0 0 5.83 1.49c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.8 0-3.56-.48-5.11-1.39l-.36-.21-3.65.95.97-3.56-.23-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.73c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36s-1 1-1 2.43 1.02 2.82 1.16 3.02c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
            </svg>
          </a>

          <a
            href={`https://mail.google.com/mail/?view=cm&to=contacto@vecinosbuenavilla.com`}
            target="_blank"
            aria-label="Enviar correo"
            className={styles.iconButton}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}
