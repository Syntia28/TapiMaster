"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, ShieldAlert, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MaterialBrowser.module.css";

const MATERIALS = [
  {
    id: "pranna",
    name: "Pranna",
    badge: "Sintético Premium",
    badgeType: "synthetic",
    description: "Sintético automotriz de alta ingeniería, diseñado específicamente para soportar el desgaste diario continuo sin perder color ni estructura. Es el favorito para vehículos comerciales y de alto uso.",
    benefits: [
      { title: "Durabilidad Extrema: ", desc: "Alta resistencia al frotamiento, desgarro y tensiones mecánicas." },
      { title: "Mantenimiento Cero: ", desc: "Impermeable al 100%. Se limpia fácilmente con un paño húmedo y jabón suave." },
      { title: "Tránsito Pesado: ", desc: "Ideal para colectivos, camionetas de trabajo y conductores de uso diario." }
    ],
    warranty: "2 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo5_consola_bellows.png", label: "Tapizado en Pranna Negro", sub: "Acabado clásico de alta resistencia" },
      { url: "/images/real/trabajo6_asientos_pick_up.png", label: "Paneles y Asiento en Pranna", sub: "Combinación ideal para transporte" }
    ]
  },
  {
    id: "tacto-cuero",
    name: "Tacto Cuero",
    badge: "Sintético Flexible",
    badgeType: "synthetic",
    description: "Material sintético con base textil que imita la textura del cuero a la perfección. Destaca por su alta suavidad y excelente adaptabilidad a la forma del asiento.",
    benefits: [
      { title: "Relación Costo-Beneficio: ", desc: "Aspecto elegante y premium con una inversión moderada y accesible." },
      { title: "Protección UV Integrada: ", desc: "Formulado para resistir el sol intenso de Cajamarca sin resecarse ni agrietarse." },
      { title: "Confort y Suavidad: ", desc: "Mayor flexibilidad corporal, proporcionando un viaje suave y fresco." }
    ],
    warranty: "3 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo2_asiento_accent.png", label: "Butacas Deportivas en Tacto Cuero", sub: "Costuras rojas deportivas reforzadas" },
      { url: "/images/real/trabajo4_puerta_pranna.png", label: "Tapizado Completo en Tacto Cuero", sub: "Renovación total de interiores" }
    ]
  },
  {
    id: "cuero-americano",
    name: "Cuero Americano",
    badge: "Sintético de Alta Gama",
    badgeType: "premium",
    description: "Sintético de calibre grueso y de tacto sumamente suave. Posee un grano elegante y un brillo mate característico que compite directamente con el cuero natural, con un rendimiento térmico mejorado.",
    benefits: [
      { title: "Calibre Grueso y Firme: ", desc: "Mayor espesor que proporciona costuras de relieve pronunciado muy estéticas." },
      { title: "Textura Realista: ", desc: "Grano de cuero grabado que simula a la perfección el cuero natural de alta gama." },
      { title: "Retardante de Llama: ", desc: "Material con certificación ignífuga y alta resistencia a la abrasión." }
    ],
    warranty: "4 Años de Garantía",
    gallery: [
      { url: "/images/real/trabajo1_asiento_hilux.png", label: "Interior Luxury en Cuero Americano", sub: "Detalle de costuras tipo rombo" },
      { url: "/images/real/trabajo2_asiento_accent.png", label: "Asientos y Apoyabrazos Americano", sub: "Acabado mate de alta costura" }
    ]
  },
  {
    id: "cuero-natural",
    name: "Cuero Natural",
    badge: "Exclusivo Genuino",
    badgeType: "genuine",
    description: "La máxima expresión de lujo automotriz. Cuero 100% genuino de vacuno seleccionado. Se adapta al cuerpo de forma óptima, respira de manera natural y adquiere una pátina hermosa con los años.",
    benefits: [
      { title: "Transpirabilidad Natural: ", desc: "Permite la circulación de aire, manteniéndose fresco en calor y templado en frío." },
      { title: "Lujo y Confort Supremo: ", desc: "Textura y aroma inconfundible de cuero auténtico de gama ejecutiva." },
      { title: "Inversión para Toda la Vida: ", desc: "Durabilidad de más de una década con el cuidado mínimo adecuado." }
    ],
    warranty: "5 Años de Garantía Completa",
    gallery: [
      { url: "/images/real/trabajo1_asiento_hilux.png", label: "Tapizado en Cuero Legítimo de Exportación", sub: "Costuras dobles y tacto premium" },
      { url: "/images/real/trabajo3_volante_rio.png", label: "Detalles en Cuero Natural Cosido a Mano", sub: "Volante y palanca de cambios" }
    ]
  }
];

export default function MaterialBrowser() {
  const [activeTab, setActiveTab] = useState("pranna");
  const [galleryIndexes, setGalleryIndexes] = useState({
    pranna: 0,
    "tacto-cuero": 0,
    "cuero-americano": 0,
    "cuero-natural": 0,
  });

  const activeMaterial = MATERIALS.find((m) => m.id === activeTab);
  const currentImgIndex = galleryIndexes[activeTab];

  const handlePrevImage = () => {
    setGalleryIndexes((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === 0 ? activeMaterial.gallery.length - 1 : prev[activeTab] - 1,
    }));
  };

  const handleNextImage = () => {
    setGalleryIndexes((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] === activeMaterial.gallery.length - 1 ? 0 : prev[activeTab] + 1,
    }));
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case "synthetic":
        return styles.badgeSynthetic;
      case "premium":
        return styles.badgePremium;
      case "genuine":
        return styles.badgeGenuine;
      default:
        return styles.badgeSynthetic;
    }
  };

  return (
    <section id="materiales" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>Con qué trabajamos</span>
        <h2 className={styles.title}>Nuestros Materiales</h2>
        <p className={styles.description}>
          Seleccionamos únicamente materiales certificados de grado automotriz para garantizar acabados impecables, resistencia térmica y alta duración.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className={styles.tabsContainer}>
        {MATERIALS.map((material) => (
          <button
            key={material.id}
            className={`${styles.tabBtn} ${activeTab === material.id ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab(material.id)}
          >
            {material.name}
          </button>
        ))}
      </div>

      {/* Dynamic Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Side Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaterial.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className={`light-panel ${styles.detailsCard}`}
          >
            <div className={styles.materialHeader}>
              <h3 className={styles.materialName}>{activeMaterial.name}</h3>
              <span className={`${styles.badge} ${getBadgeClass(activeMaterial.badgeType)}`}>
                {activeMaterial.badge}
              </span>
            </div>

            <p className={styles.materialDesc}>{activeMaterial.description}</p>

            <div className={styles.benefitsList}>
              {activeMaterial.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <Check size={18} className={styles.benefitIcon} />
                  <p className={styles.benefitText}>
                    <span>{benefit.title}</span>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.warrantyInfo}>
              <Award size={20} className={styles.benefitIcon} />
              <div>
                <span className={styles.warrantyLabel}>Resistencia & Garantía:</span>
                <p className={styles.warrantyValue}>{activeMaterial.warranty}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Side Mini-Gallery Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMaterial.id}-gallery-${currentImgIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={styles.galleryCard}
          >
            <div
              className={styles.galleryImage}
              style={{ backgroundImage: `url(${activeMaterial.gallery[currentImgIndex].url})` }}
            />
            <div className={styles.galleryOverlay}>
              <h4 className={styles.galleryLabel}>{activeMaterial.gallery[currentImgIndex].label}</h4>
              <p className={styles.gallerySub}>{activeMaterial.gallery[currentImgIndex].sub}</p>
            </div>

            {/* Navigation Arrows */}
            <div className={styles.galleryControls}>
              <button className={styles.galleryArrow} onClick={handlePrevImage} aria-label="Imagen anterior">
                <ChevronLeft size={20} />
              </button>
              <button className={styles.galleryArrow} onClick={handleNextImage} aria-label="Siguiente imagen">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dot Indicator */}
            <div className={styles.thumbsContainer}>
              {activeMaterial.gallery.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.thumbDot} ${index === currentImgIndex ? styles.thumbDotActive : ""}`}
                  onClick={() => setGalleryIndexes((prev) => ({ ...prev, [activeTab]: index }))}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
