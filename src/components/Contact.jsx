import React from 'react';
import styles from '@styles/Contact.module.css';

export default function Contact({
  whatsNumber = '524721005615',
  email = 'contacto@vecinosbuenavilla.com',
  address = '',
  mapsHrefEmbed = '',
  mapsHrefPin = ''
}) {
  // const waHref = `https://wa.me/${whatsNumber}`;
  const telHref = `tel:${whatsNumber.replace(/\D/g, '')}`;
  const mailHref = `mailto:${email}`;

  return (
    <div className={styles.wrap}>
      <h2 id="titulo-contacto" className={styles.heading}>
        Contacto
      </h2>
      <div className={styles.grid}>
        <a
          className={styles.card}
          href={telHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir WhatsApp"
        >
          <div className={styles.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .01 5.37.01 12c0 2.11.55 4.17 1.6 6L0 24l6.17-1.61a11.94 11.94 0 0 0 5.83 1.49c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.8 0-3.56-.48-5.11-1.39l-.36-.21-3.65.95.97-3.56-.23-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.73c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36s-1 1-1 2.43 1.02 2.82 1.16 3.02c.14.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.33z" />
            </svg>
          </div>
          <div className={styles.info}>
            <strong>WhatsApp</strong>
            <span>{whatsNumber}</span>
            <span>Llamadas y mensajes</span>
          </div>
        </a>

        <a className={styles.card} href={mapsHrefPin} aria-label="Enviar correo">
          <div className={styles.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div className={styles.info}>
            <strong>E-mail</strong>
            <span className={styles.email}>{email}</span>
            <span>Respuesta en +/- 24 horas</span>
          </div>
        </a>

        <a
          className={styles.card}
          href={mapsHrefPin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir en Google Maps"
        >
          <div className={styles.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <div className={styles.info}>
            <strong>Dirección</strong>
            {address.split("\n").map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </a>
      </div>

      {mapsHrefEmbed && (
        <div className={styles.mapFrame}>
          <iframe
            src={mapsHrefEmbed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación en Google Maps"
          ></iframe>
        </div>
      )}
    </div>
  );
}
