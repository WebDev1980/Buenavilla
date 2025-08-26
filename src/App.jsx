import React, { useMemo } from "react";
import Header from "@components/Header.jsx";
import Hero from "@components/Hero.jsx";
import About from "@components/About.jsx";
import Gallery from "@components/Gallery.jsx";
import Contact from "@components/Contact.jsx";
import Footer from "@components/Footer.jsx";
import ScrollButtons from "@components/ScrollButtons.jsx";
import ThemeToggle from "@components/ThemeToggle.jsx";
import WidgetsPanel from "@components/WidgetsPanel.jsx";
const base = import.meta.env.BASE_URL;
export default function App() {
  const navItems = useMemo(
    () => [
      { id: "inicio", href: "#inicio", label: "Inicio" },
      { id: "nosotros", href: "#nosotros", label: "Nosotros" },
      { id: "galeria", href: "#galeria", label: "Galería" },
      { id: "contacto", href: "#contacto", label: "Contacto" },
    ],
    []
  );
  const galleryImages = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0");
      return {
        src: `${base}images/carrusel/img-${n}.webp`,
        alt: `Galería Vecinos Buenavilla — imagen ${i + 1} de 15`,
      };
    });
  }, [base]);
  return (
    <>
      {" "}
      <Header
        logoSrc={`${base}images/logo.svg`}
        title="Vecinos Buenavilla A.C."
        items={navItems}
      />{" "}
      <main>
        {" "}
        <Hero
          imageSrc={`${base}images/portada.webp`}
          watermarkSrc={`${base}images/logo.svg`}
          headline="Vecinos Buenavilla A.C."
        />{" "}
        <section
          id="nosotros"
          data-anchor="nosotros"
          aria-labelledby="titulo-nosotros"
        >
          {" "}
          <div className="container">
            {" "}
            <About />{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="galeria"
          data-anchor="galeria"
          aria-labelledby="titulo-galeria"
        >
          {" "}
          <div className="container">
            {" "}
            <Gallery
              images={galleryImages}
              enableDrag={true}
              enableLightbox={true}
            />{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="contacto"
          data-anchor="contacto"
          aria-labelledby="titulo-contacto"
        >
          {" "}
          <div className="container">
            {" "}
            <Contact
              // whatsNumber="472 100 5615"
              email="contacto@vecinosbuenavilla.com"
              address={`A Trejo 74\nCol. Estrella\nSilao de la Victoria, Gto.`}
              mapsHrefEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.123456789!2d-101.43107!3d20.92776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842b9c9e675bb211%3A0x2de6e6b8f8c1e55c!2sBuenavilla%20Residencial!5e0!3m2!1ses!2smx!4v1691234567890!5m2!1ses!2smx"
              mapsHrefPin="https://maps.app.goo.gl/NDX3D53MkzGD1Mb79"
            />{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
      <WidgetsPanel
        email="contacto@vecinosbuenavilla.com"
        whatsHref="https://wa.me/524721005615"
      />{" "}
      <ScrollButtons
        sectionOrder={["inicio", "nosotros", "galeria", "contacto"]}
      />{" "}
      <ThemeToggle /> <Footer logoSrc={`${base}images/logo3.svg`} />{" "}
    </>
  );
}
