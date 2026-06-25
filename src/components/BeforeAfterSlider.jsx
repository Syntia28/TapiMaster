"use client";

import { useState, useRef } from "react";
import { MoveHorizontal, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BeforeAfterSlider.module.css";

const VEHICLES = [
  {
    id: "hilux",
    name: "Toyota Hilux (Pick-up)",
    before: "/images/before_after/hilux_before.png",
    after: "/images/before_after/hilux_after.png",
    title: "Reconstrucción Anatómica y Tapizado",
    desc: "Se reparó la estructura metálica, se rellenó la espuma desgastada y se tapizó con Pranna Gris de alta resistencia mecánica, especial para camionetas de trabajo.",
    location: "Jr. Mariscal Cáceres 1031"
  },
  {
    id: "accent",
    name: "Hyundai Accent (Sedán)",
    before: "/images/before_after/accent_before.png",
    after: "/images/before_after/accent_after.png",
    title: "Renovación Deportiva Completa",
    desc: "Cambio total de fundas de tela gastada a Tacto Cuero Americano Premium negro mate, con costuras deportivas dobles en hilo rojo de alta tenacidad.",
    location: "Trabajo local en Cajamarca"
  },
  {
    id: "rio",
    name: "Kia Rio (Volante)",
    before: "/images/before_after/rio_before.png",
    after: "/images/before_after/rio_after.png",
    title: "Restauración de Volante a Mano",
    desc: "Volante de poliuretano pelado forrado a mano en Cuero Natural Microperforado con costuras cruzadas de precisión milimétrica.",
    location: "Realizado por el maestro tapicero"
  }
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState("hilux");
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCar = VEHICLES.find((v) => v.id === activeTab);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>El Cambio Real</span>
        <h3 className={styles.title}>Resultados Antes y Después</h3>
        <p className={styles.description}>
          Desliza el control para comparar el estado en el que recibimos los vehículos frente al acabado final entregado a nuestros clientes cajamarquinos.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        {VEHICLES.map((car) => (
          <button
            key={car.id}
            className={`${styles.tabBtn} ${activeTab === car.id ? styles.tabBtnActive : ""}`}
            onClick={() => {
              setActiveTab(car.id);
              setSliderPos(50); // reset position
            }}
          >
            {car.name}
          </button>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Interactive Slider Area */}
        <div 
          className={styles.sliderWrapper}
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* After Image (Full width background) */}
          <img
            src={activeCar.after}
            alt="Después de tapizar"
            className={`${styles.sliderImg} ${styles.imgAfter}`}
            draggable="false"
          />

          {/* Before Image (Clipped overlay) */}
          <div 
            className={styles.imgBeforeWrapper}
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={activeCar.before}
              alt="Antes de tapizar"
              className={`${styles.sliderImg} ${styles.imgBefore}`}
              style={{ width: containerRef.current ? containerRef.current.offsetWidth : "100%" }}
              draggable="false"
            />
          </div>

          {/* Slider Line & Handle */}
          <div 
            className={styles.sliderLine}
            style={{ left: `${sliderPos}%` }}
          >
            <div className={styles.sliderHandle}>
              <MoveHorizontal size={18} className={styles.handleIcon} />
            </div>
          </div>

          {/* Badges */}
          <div className={styles.badgeBefore}>ANTES</div>
          <div className={styles.badgeAfter}>DESPUÉS</div>
        </div>

        {/* Info card describing the work */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCar.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`glass-panel ${styles.infoCard}`}
          >
            <span className={styles.carName}>{activeCar.name}</span>
            <h4 className={styles.workTitle}>{activeCar.title}</h4>
            <p className={styles.workDesc}>{activeCar.desc}</p>
            <div className={styles.divider} />
            <div className={styles.locationWrapper}>
              <MapPin size={16} className={styles.locIcon} />
              <span>{activeCar.location}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
