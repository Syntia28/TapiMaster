"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";

const SLIDES = [
  {
    id: 1,
    image: "/images/real/trabajo1_asiento_hilux.png",
    title: "DISEÑO Y CONFORT SIN LÍMITES",
    highlight: "TAPIMASTER",
    subtitle: "TAPICERÍA AUTOMOTRIZ DE ALTA COSTURA",
    description: "Transformamos el interior de tu vehículo en una cabina de lujo. Especialistas en acabados deportivos, clásicos y personalizados en Cajamarca.",
  },
  {
    id: 2,
    image: "/images/real/trabajo3_volante_rio.png",
    title: "ACABADOS ARTESANALES DE LUJO",
    highlight: "DETALLES",
    subtitle: "EL ARTE DE LA COSTURA DE PRECISIÓN",
    description: "Cada puntada cuenta. Reconstrucción anatómica de asientos, volantes y consolas con materiales garantizados de primer nivel.",
  },
  {
    id: 3,
    image: "/images/real/trabajo2_asiento_accent.png",
    title: "MATERIALES SELECCIONADOS PREMIUM",
    highlight: "GARANTÍA",
    subtitle: "DURABILIDAD Y ESTILO EN CAJAMARCA",
    description: "Elegancia que perdura. Desde el exclusivo cuero natural hasta la resistencia de la pranna y tacto cuero americano para un acabado perfecto.",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleCtaClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="inicio" className={styles.hero}>
      {/* Background Slider */}
      <div className={styles.sliderWrapper}>
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === current ? styles.slideActive : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {index === current && <div className={`${styles.slide} ${styles.zoomIn}`} style={{ backgroundImage: `url(${slide.image})` }} />}
            <div className={styles.overlay} />
            <div className={styles.patternOverlay} />
          </div>
        ))}
      </div>

      {/* Floating Dot Indicators */}
      <div className={styles.dots}>
        {SLIDES.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.tagline}
        >
          <span className={styles.taglineDot} />
          {SLIDES[current].subtitle}
        </motion.div>

        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.title}
        >
          {SLIDES[current].title.split(SLIDES[current].highlight)[0]}
          <span>{SLIDES[current].highlight}</span>
          {SLIDES[current].title.split(SLIDES[current].highlight)[1]}
        </motion.h1>

        <motion.p
          key={`desc-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.description}
        >
          {SLIDES[current].description}
        </motion.p>

        <motion.div
          key={`cta-${current}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.ctaGroup}
        >
          <a
            href="#materiales"
            className="btn-sporty stitching-border"
            onClick={(e) => handleCtaClick(e, "materiales")}
          >
            <span>Ver Materiales</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="#contacto"
            className="btn-sporty-secondary"
            onClick={(e) => handleCtaClick(e, "contacto")}
          >
            <span>Visitar Taller</span>
          </a>
        </motion.div>
      </div>

      {/* Manual Navigation Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} onClick={prevSlide} aria-label="Slide anterior">
          <ChevronLeft size={22} />
        </button>
        <button className={styles.controlBtn} onClick={nextSlide} aria-label="Siguiente slide">
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
