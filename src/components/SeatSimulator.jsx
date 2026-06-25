"use client";

import { useState } from "react";
import { CheckCircle2, ShoppingCart, MessageCircle, Heart, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SeatSimulator.module.css";

const LEATHERS = [
  {
    id: "negro",
    name: "Negro Carbón",
    type: "Cuero Americano",
    desc: "Brillo mate, grano medio, estilo deportivo clásico y alta resistencia.",
    centerGrad: ["#2d2d35", "#18181c"],
    sideGrad: ["#1e1e24", "#0a0a0c"],
    bgHex: "#1a1a1c",
  },
  {
    id: "beige",
    name: "Beige Confort",
    type: "Tacto Cuero Premium",
    desc: "Tono cálido, textura ultra-suave que refresca el habitáculo y luce lujoso.",
    centerGrad: ["#f2eae1", "#dac8b6"],
    sideGrad: ["#e9dbcd", "#cbbaa7"],
    bgHex: "#dfd2c4",
  },
  {
    id: "marron",
    name: "Marrón Habanero",
    type: "Cuero Natural Genuino",
    desc: "Elegancia ejecutiva inconfundible con pátina natural y aroma premium.",
    centerGrad: ["#7a4f32", "#4a2e1d"],
    sideGrad: ["#633f28", "#372215"],
    bgHex: "#5c3a25",
  }
];

const STITCHES = [
  { id: "rojo", name: "Rojo Competizione", hex: "#dc2626", glow: "rgba(220, 38, 38, 0.4)" },
  { id: "dorado", name: "Oro Champagne", hex: "#d4af37", glow: "rgba(212, 175, 55, 0.4)" },
  { id: "negro", name: "Negro Sigilo (Hilos Ocultos)", hex: "#111111", glow: "rgba(0, 0, 0, 0.4)" }
];

export default function SeatSimulator() {
  const [leather, setLeather] = useState(LEATHERS[0]);
  const [stitch, setStitch] = useState(STITCHES[0]);

  const handleWhatsAppQuote = () => {
    const message = `Hola TapiMaster Cajamarca, estuve probando el simulador de asientos en su web y quiero cotizar la siguiente combinación para mi vehículo:\n\n- Tipo de Cuero: ${leather.name} (${leather.type})\n- Color de Costura: ${stitch.name}\n\n¿Cuál es el costo aproximado y la disponibilidad de citas? ¡Muchas gracias!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/51943030438?text=${encoded}`, "_blank");
  };

  return (
    <section className={styles.section} id="simulador">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Diseña a tu Medida</span>
          <h3 className={styles.title}>Simulador de Interiores 3D</h3>
          <p className={styles.description}>
            Personaliza el color de los tapizados y el hilo de la costura. Visualiza la calidad de nuestro trabajo artesanal en Cajamarca en tiempo real.
          </p>
        </div>

        <div className={styles.layoutGrid}>
          {/* Left Side: Seat Preview Canvas */}
          <div className={styles.previewCanvas}>
            <div className={styles.bgGlow} style={{ background: `radial-gradient(circle, ${stitch.glow} 0%, transparent 70%)` }} />
            
            {/* Detailed Seat SVG */}
            <svg 
              className={styles.seatSvg}
              viewBox="0 0 400 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Dynamic Gradients for center seat panels */}
                <linearGradient id="centerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={leather.centerGrad[0]} />
                  <stop offset="100%" stopColor={leather.centerGrad[1]} />
                </linearGradient>
                {/* Dynamic Gradients for side bolster panels */}
                <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={leather.sideGrad[0]} />
                  <stop offset="100%" stopColor={leather.sideGrad[1]} />
                </linearGradient>
                {/* Drop shadow filter for 3D depth */}
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              <g filter="url(#shadow)">
                {/* Headrest Support Bars */}
                <rect x="175" y="60" width="10" height="40" rx="3" fill="#333" />
                <rect x="215" y="60" width="10" height="40" rx="3" fill="#333" />

                {/* Headrest */}
                <rect x="140" y="20" width="120" height="65" rx="20" fill="url(#sideGrad)" stroke="#111" strokeWidth="2" />
                <rect x="155" y="30" width="90" height="45" rx="14" fill="url(#centerGrad)" opacity="0.95" />
                
                {/* Stitching on headrest */}
                <path d="M 155 30 A 14 14 0 0 1 245 30" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="3,2" />
                <path d="M 155 75 A 14 14 0 0 0 245 75" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="3,2" />

                {/* Main Backrest Outer Frame (Left/Right Bolsters Combined background) */}
                <path 
                  d="M 130 90 L 270 90 Q 320 180 325 300 Q 320 330 270 330 L 130 330 Q 80 330 75 300 Q 80 180 130 90 Z" 
                  fill="url(#sideGrad)" 
                  stroke="#111" 
                  strokeWidth="2.5" 
                />

                {/* Backrest Center Insert Panel (Anatomical Ribbed) */}
                <path 
                  d="M 150 100 Q 200 95 250 100 L 260 295 Q 200 305 140 295 Z" 
                  fill="url(#centerGrad)" 
                  stroke="#151515" 
                  strokeWidth="1.5"
                />

                {/* Ribbed lines on Backrest Center Insert */}
                <path d="M 155 140 Q 200 135 245 140" stroke="#111" strokeWidth="2" />
                <path d="M 152 180 Q 200 175 248 180" stroke="#111" strokeWidth="2" />
                <path d="M 148 220 Q 200 215 252 220" stroke="#111" strokeWidth="2" />
                <path d="M 144 260 Q 200 255 256 260" stroke="#111" strokeWidth="2" />

                {/* Double Stitching along Backrest Seams (Red/Gold Accent) */}
                {/* Left seam stitch */}
                <path d="M 149 100 Q 140 197 139 295" stroke={stitch.hex} strokeWidth="2" strokeDasharray="5,3" />
                <path d="M 146 101 Q 137 197 136 295" stroke={stitch.hex} strokeWidth="1" strokeDasharray="5,3" opacity="0.6" />
                
                {/* Right seam stitch */}
                <path d="M 251 100 Q 260 197 261 295" stroke={stitch.hex} strokeWidth="2" strokeDasharray="5,3" />
                <path d="M 254 101 Q 263 197 264 295" stroke={stitch.hex} strokeWidth="1" strokeDasharray="5,3" opacity="0.6" />

                {/* Horizontal Stitching on Ribs */}
                <path d="M 155 137 Q 200 132 245 137" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 152 177 Q 200 172 248 177" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 148 217 Q 200 212 252 217" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 144 257 Q 200 252 256 257" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />

                {/* Seat Cushion (Bottom Cushion) Bolsters Frame */}
                <path 
                  d="M 100 335 L 300 335 Q 355 350 350 435 Q 345 465 295 465 L 105 465 Q 55 465 50 435 Q 45 350 100 335 Z" 
                  fill="url(#sideGrad)" 
                  stroke="#111" 
                  strokeWidth="2.5" 
                />

                {/* Cushion Center Insert Panel */}
                <path 
                  d="M 140 335 Q 200 338 260 335 L 270 445 Q 200 455 130 445 Z" 
                  fill="url(#centerGrad)" 
                  stroke="#151515" 
                  strokeWidth="1.5"
                />

                {/* Ribbed lines on Cushion Center Insert */}
                <path d="M 137 375 Q 200 378 263 375" stroke="#111" strokeWidth="2" />
                <path d="M 134 410 Q 200 413 266 410" stroke="#111" strokeWidth="2" />

                {/* Double Stitching along Cushion Seams */}
                {/* Left Cushion Seam */}
                <path d="M 139 335 Q 133 390 129 445" stroke={stitch.hex} strokeWidth="2" strokeDasharray="5,3" />
                <path d="M 136 335 Q 130 390 126 445" stroke={stitch.hex} strokeWidth="1" strokeDasharray="5,3" opacity="0.6" />

                {/* Right Cushion Seam */}
                <path d="M 261 335 Q 267 390 271 445" stroke={stitch.hex} strokeWidth="2" strokeDasharray="5,3" />
                <path d="M 264 335 Q 270 390 274 445" stroke={stitch.hex} strokeWidth="1" strokeDasharray="5,3" opacity="0.6" />

                {/* Horizontal Stitching on Cushion Ribs */}
                <path d="M 137 372 Q 200 375 263 372" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 134 407 Q 200 410 266 407" stroke={stitch.hex} strokeWidth="1.5" strokeDasharray="4,2" />

                {/* Front Cushion Extension (Leg Support Bolster) */}
                <path d="M 115 466 L 285 466 Q 295 485 270 488 L 130 488 Q 105 485 115 466 Z" fill="url(#sideGrad)" stroke="#111" strokeWidth="1.5" />
                <path d="M 130 466 L 270 466 L 260 480 L 140 480 Z" fill="url(#centerGrad)" opacity="0.9" />
                <path d="M 130 466 L 270 466" stroke={stitch.hex} strokeWidth="2" strokeDasharray="5,3" />
              </g>
            </svg>

            {/* Glowing Specs Badges */}
            <div className={styles.visualSpecs}>
              <div className={styles.specItem}>
                <Sparkles size={14} className={styles.specIcon} />
                <span>Textura 3D Mate</span>
              </div>
              <div className={styles.specItem}>
                <Star size={14} className={styles.specIcon} />
                <span>Hilos Alemanes</span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Controls */}
          <div className={styles.controlPanel}>
            <div className={`glass-panel ${styles.panelBody}`}>
              <div className={styles.panelHeader}>
                <div className={styles.brandTitle}>TAPI-CONFIGURATOR</div>
                <h4 className={styles.panelTitle}>Personaliza tu Interior</h4>
                <p className={styles.panelDesc}>Elige los materiales del revestimiento y las costuras de relieve doble.</p>
              </div>

              {/* 1. Leather Option Selector */}
              <div className={styles.optionSection}>
                <span className={styles.sectionLabel}>1. Material y Tonalidad del Cuero</span>
                <div className={styles.leatherGrid}>
                  {LEATHERS.map((item) => (
                    <button
                      key={item.id}
                      className={`${styles.leatherCard} ${leather.id === item.id ? styles.leatherCardActive : ""}`}
                      onClick={() => setLeather(item)}
                    >
                      <div className={styles.swatchWrapper}>
                        <div className={styles.colorSwatch} style={{ backgroundColor: item.bgHex }} />
                        {leather.id === item.id && <div className={styles.swatchChecked} />}
                      </div>
                      <div className={styles.leatherInfo}>
                        <span className={styles.leatherName}>{item.name}</span>
                        <span className={styles.leatherType}>{item.type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Stitching Color Selector */}
              <div className={styles.optionSection}>
                <span className={styles.sectionLabel}>2. Color del Hilo de Costura (Alta Densidad)</span>
                <div className={styles.stitchRow}>
                  {STITCHES.map((item) => (
                    <button
                      key={item.id}
                      className={`${styles.stitchBtn} ${stitch.id === item.id ? styles.stitchBtnActive : ""}`}
                      onClick={() => setStitch(item)}
                      style={{ "--stitch-color": item.hex }}
                    >
                      <div className={styles.stitchColorDot} style={{ backgroundColor: item.hex }} />
                      <span>{item.name.split(" ")[0]}</span>
                      {stitch.id === item.id && <span className={styles.stitchCheckedDot} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              {/* 3. Real-time Summary Card */}
              <div className={styles.summaryCard}>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>Cuero Seleccionado:</span>
                  <span className={styles.sumValue}>{leather.name} ({leather.type})</span>
                </div>
                <p className={styles.sumDesc}>{leather.desc}</p>
                <div className={styles.summaryRow} style={{ marginTop: "12px" }}>
                  <span className={styles.sumLabel}>Estilo de Costura:</span>
                  <span className={styles.sumValue} style={{ color: stitch.hex, fontWeight: "700" }}>{stitch.name}</span>
                </div>
                <p className={styles.sumDesc}>Doble pespunte de precisión a mano con hilo de alta resistencia a la rotura.</p>
              </div>

              {/* WhatsApp Quote Action */}
              <button 
                className={`btn-sporty stitching-border ${styles.whatsappBtn}`}
                onClick={handleWhatsAppQuote}
              >
                <MessageCircle size={18} fill="white" />
                <span>Cotizar esta Combinación</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
