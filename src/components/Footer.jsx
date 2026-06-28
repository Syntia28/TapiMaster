"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";
import { useRef } from "react";

const NAV = ["Inicio", "Materiales", "Calidad", "Servicios", "Galería", "Contacto"];
const NAV_IDS = ["inicio", "materiales", "calidad", "servicios", "galeria", "contacto"];
const CUEROS = ["Natural Genuino", "Americano 1.2", "Tacto Cuero", "Pranna"];

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    )
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    label: "TikTok",
    href: "#",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z" />
      </svg>
    )
  }
];

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Wordmark Cinemático */}
      <motion.div
        className={styles.wordmark}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.12, 0.22, 0.12], x: [-15, 15, -15] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        TAPIMASTER
      </motion.div>

      <div className={styles.container}>
        <div className={styles.top}>
          {/* Brand */}
          <motion.div
            className={styles.brandBlock}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className={styles.logoLine} onClick={(e) => scrollTo(e, "inicio")} style={{ cursor: "pointer" }}>
              <div className={styles.logoIcon}>
                <img src="/images/logo/logo.png" alt="Logo TapiMaster" className={styles.logoImg} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>TAPI<span>MASTER</span></span>
                <span className={styles.logoSubtitle}>Diseño y Confort</span>
              </div>
            </div>

            <p className={styles.tagline}>TAPICERÍA AUTOMOTRIZ DE ALTA GAMA • CAJAMARCA</p>
            <div className={styles.redLine} />

            <div className={styles.infoPills}>
              {[
                { icon: "📍", text: "Jr. Mariscal Cáceres 1031" },
                { icon: "📞", text: "+51 992 855 239" },
                { icon: "🕒", text: "Lun – Sáb · 8am – 6:30pm" }
              ].map((item, i) => (
                <motion.div key={i} className={styles.infoPill} whileHover={{ x: 12 }}>
                  <span className={styles.pillIcon}>{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navegación */}
          <motion.div
            className={styles.navCols}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <div className={styles.navCol}>
              <h5 className={styles.navTitle}>Explora</h5>
              {NAV.map((label, i) => (
                <motion.a
                  key={i}
                  href={`#${NAV_IDS[i]}`}
                  onClick={(e) => scrollTo(e, NAV_IDS[i])}
                  className={styles.navLink}
                  whileHover={{ x: 10 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>

            <div className={styles.navCol}>
              <h5 className={styles.navTitle}>Cueros Premium</h5>
              {CUEROS.map((c, i) => (
                <motion.a
                  key={i}
                  href="#materiales"
                  onClick={(e) => scrollTo(e, "materiales")}
                  className={styles.navLink}
                  whileHover={{ x: 10 }}
                >
                  {c}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <Link href="/derechos" className={styles.copyLink}>
            © {new Date().getFullYear()} TapiMaster. Excelencia en cada costura. Todos los derechos reservados.
          </Link>

          <motion.a
            href="https://wa.me/51992855239"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            WHATSAPP - COTIZAR PROYECTO
          </motion.a>

          <div className={styles.socials}>
            {SOCIALS.map((soc) => (
              <motion.a
                key={soc.label}
                href={soc.href}
                className={styles.soc}
                whileHover={{ scale: 1.2, rotate: 8, color: "#ff0044" }}
              >
                {soc.svg}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}