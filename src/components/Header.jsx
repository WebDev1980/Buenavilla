import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/Header.module.css";

const STORAGE_KEY = "vb-theme";

export default function Header({
  title = "Vecinos Buenavilla A.C.",
  items = [],
}) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [theme, setTheme] = useState("light");

  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Tema inicial: siempre claro por defecto
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored || "light";
    setTheme(initial);
  }, []);

  // Detectar cambios en el tema desde ThemeToggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme");
      if (current) setTheme(current);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Evitar scroll de fondo al abrir menú
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cierre con Escape o clic fuera
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleOutsideClick = (e) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  // Detectar sección activa
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => io.observe(sec));
    return () => io.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const node = document.getElementById(id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  // Logo según tema
  const base = import.meta.env.BASE_URL;
  const currentLogo =
    theme === "dark" ? `${base}images/logo2.svg` : `${base}images/logo.svg`;

  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.inner}`}>
        {/* Logo + leyenda: recarga página */}
        <a
          href="#inicio"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          <img
            src={currentLogo}
            alt="Logotipo Vecinos Buenavilla A.C."
            className={styles.logo}
            width="74"
            height="74"
          />
          <span className={styles.title}>{title}</span>
        </a>

        {/* Menú principal */}
        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.list}>
            {items.map((it) => (
              <li key={it.id}>
                <a
                  href={it.href}
                  onClick={(e) => handleNavClick(e, it.href)}
                  className={`${styles.link} ${
                    activeId === it.href.replace("#", "") ? styles.active : ""
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={btnRef}
          className={styles.hamburger}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className={styles.bars}></span>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        ref={menuRef}
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <ul className={styles.mobileList}>
          {items.map((it) => (
            <li key={`m-${it.id}`}>
              <a
                href={it.href}
                onClick={(e) => handleNavClick(e, it.href)}
                className={`${styles.mobileLink} ${
                  activeId === it.href.replace("#", "") ? styles.active : ""
                }`}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
