"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from "framer-motion";
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

  const filteredItems =
    filter === "todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

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
      <div className={styles.header}>
        <span className={styles.subtitle}>Portafolio Real</span>
        <h2 className={styles.title}>Nuestros Trabajos</h2>
        <p className={styles.description}>
          Galería de autos reales tapizados en nuestro taller en el Jr. Mariscal Cáceres 1031, Cajamarca. La calidad final de nuestras costuras habla por nosotros.
        </p>
      </div>

      {/* Before & After Interactive Slider */}
      <BeforeAfterSlider />

      <div className={styles.sectionDivider} />

      {/* Filter Tabs */}
      <div className={styles.filterContainer}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${filter === cat.id ? styles.filterBtnActive : ""}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <framerMotion.div layout className={styles.galleryGrid}>
        <FramerAnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <framerMotion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={styles.galleryItem}
              onClick={() => openLightbox(index)}
            >
              <div
                className={styles.itemImage}
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className={styles.itemOverlay}>
                <span className={styles.itemCategory}>{item.category}</span>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemMaterial}>{item.material}</p>
              </div>
            </framerMotion.div>
          ))}
        </FramerAnimatePresence>
      </framerMotion.div>

      {/* Lightbox Modal */}
      <FramerAnimatePresence>
        {lightboxIndex !== null && (
          <framerMotion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
          >
            <framerMotion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.lightboxClose} onClick={closeLightbox}>
                <X size={20} />
                <span>Cerrar</span>
              </button>

              {/* Navigation Arrows */}
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxLeft}`}
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxRight}`}
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </button>

              {/* Main Image */}
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className={styles.lightboxImage}
              />

              {/* Title & description */}
              <div className={styles.lightboxInfo}>
                <h4 className={styles.lightboxTitle}>{filteredItems[lightboxIndex].title}</h4>
                <p className={styles.lightboxSub}>
                  Línea: {filteredItems[lightboxIndex].material} ({filteredItems[lightboxIndex].category.toUpperCase()})
                </p>
              </div>
            </framerMotion.div>
          </framerMotion.div>
        )}
      </FramerAnimatePresence>
    </section>
  );
}
