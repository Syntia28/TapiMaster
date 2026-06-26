"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./WorkGallery.module.css";
import BeforeAfterSlider from "./BeforeAfterSlider";

const GALLERY_ITEMS = [
  {
    id: 1,
    image: "/images/real/trabajo1_asiento_hilux.png",
    category: "asientos",
    title: "Butacas de Hilux Double Stitch",
    material: "Cuero Americano Premium",
  },
  {
    id: 2,
    image: "/images/real/trabajo2_asiento_accent.png",
    category: "asientos",
    title: "Butacas Deportivas Accent",
    material: "Tacto Cuero Americano",
  },
  {
    id: 3,
    image: "/images/real/trabajo3_volante_rio.png",
    category: "volantes",
    title: "Volante Cosido a Mano",
    material: "Cuero Natural Genuino",
  },
  {
    id: 4,
    image: "/images/real/trabajo4_puerta_pranna.png",
    category: "puertas",
    title: "Paneles Laterales de Puertas",
    material: "Pranna Sintético Reforzado",
  },
  {
    id: 5,
    image: "/images/real/trabajo5_consola_bellows.png",
    category: "consolas",
    title: "Fuelle de Cambios y Consola",
    material: "Pranna Sintético Reforzado",
  },
  {
    id: 6,
    image: "/images/real/trabajo6_asientos_pick_up.png",
    category: "asientos",
    title: "Asientos Pick-Up Alta Resistencia",
    material: "Pranna Impermeable Gris",
  },
];

const CATEGORIES = [
  { id: "todos", name: "Todos los Trabajos" },
  { id: "asientos", name: "Asientos" },
  { id: "volantes", name: "Volantes" },
  { id: "puertas", name: "Paneles de Puerta" },
  { id: "consolas", name: "Consolas & Accesorios" },
];

export default function WorkGallery() {
  const [filter, setFilter] = useState("todos");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = filter === "todos"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <Sparkles size={18} /> PORTAFOLIO REAL
          </div>
          <h2 className={styles.title}>Transformaciones que Inspiran</h2>
          <p className={styles.description}>
            Cada costura cuenta una historia. Descubre el nivel de detalle y calidad que entregamos en cada proyecto en Cajamarca.
          </p>
        </div>

        {/* Before & After Slider */}
        <BeforeAfterSlider />

        <div className={styles.sectionDivider} />

        {/* Filtros Espectaculares */}
        <div className={styles.filterContainer}>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`${styles.filterBtn} ${filter === cat.id ? styles.filterBtnActive : ""}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Galería Premium */}
        <motion.div layout className={styles.galleryGrid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                className={styles.galleryItem}
                onClick={() => openLightbox(index)}
                whileHover={{ y: -15 }}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.galleryImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.itemContent}>
                  <span className={styles.categoryTag}>{item.category}</span>
                  <h4 className={styles.itemTitle}>{item.title}</h4>
                  <p className={styles.itemMaterial}>{item.material}</p>
                </div>

                <div className={styles.glowEffect} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX CINEMATOGRÁFICO */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={closeLightbox}>
                <X size={28} />
              </button>

              <button className={styles.navArrow} onClick={handlePrevImage}>
                <ChevronLeft size={36} />
              </button>

              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className={styles.lightboxImage}
              />

              <button className={styles.navArrow} onClick={handleNextImage}>
                <ChevronRight size={36} />
              </button>

              <div className={styles.lightboxInfo}>
                <h3>{filteredItems[lightboxIndex].title}</h3>
                <p>{filteredItems[lightboxIndex].material}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}