"use client";

import { useState, useRef, useEffect } from "react";
import { Play, X, Shield, Settings, Heart, CheckCircle2, Volume2, VolumeX, MessageCircle, Share2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QualityShowcase.module.css";

export default function QualityShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(148);
  const videoRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const QUALITY_POINTS = [
    {
      icon: <Settings size={20} />,
      title: "Reconstrucción Anatómica Completa",
      description: "No nos limitamos a cambiar el material. Evaluamos la estructura metálica del asiento, rellenamos las espumas desgastadas y devolvemos la firmeza y soporte lumbar de fábrica."
    },
    {
      icon: <Heart size={20} />,
      title: "Costuras de Alta Densidad y Doble Hilo",
      description: "Utilizamos hilos sintéticos alemanes de alta resistencia a la tensión y la fricción. Costuras dobles reforzadas con una alineación exacta y deportiva hecha a mano."
    },
    {
      icon: <Shield size={20} />,
      title: "Garantía Escrita TapiMaster",
      description: "Nuestros trabajos cuentan con garantía de costura y adhesión de material. Nos enorgullece saber que tu tapizado durará años bajo el sol de Cajamarca sin despegarse ni romperse."
    }
  ];

  return (
    <section id="calidad" className={styles.section}>
      <div className={styles.grid}>
        {/* Left Column: Interactive Mobile Reel Showcase */}
        <div className={styles.phoneContainer}>
          {/* Smartphone Frame Outer Wrapper */}
          <div className={styles.phoneFrame}>
            <div className={styles.phoneSpeaker} />
            <div className={styles.phoneInnerScreen}>
              {/* Autoplaying background video preview */}
              <video
                ref={videoRef}
                className={styles.videoElement}
                src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-leather-piece-41718-large.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />

              {/* Phone Status Bar */}
              <div className={styles.phoneStatusBar}>
                <span className={styles.statusTime}>12:30</span>
                <div className={styles.statusIcons}>
                  <div className={styles.wifiIcon} />
                  <div className={styles.signalIcon} />
                  <div className={styles.batteryIcon} />
                </div>
              </div>

              {/* Blinking Live Indicator */}
              <div className={styles.liveTag}>
                <span className={styles.liveDot} />
                <span>EN VIVO - JR. MARISCAL CÁCERES 1031</span>
              </div>

              {/* Side Interaction Icons (TikTok/Instagram style) */}
              <div className={styles.sideActions}>
                <button 
                  className={`${styles.actionBtn} ${isLiked ? styles.actionLiked : ""}`}
                  onClick={handleLike}
                  aria-label="Dar me gusta"
                >
                  <Heart size={22} fill={isLiked ? "#dc2626" : "none"} />
                  <span className={styles.actionCount}>{likeCount}</span>
                </button>
                <button className={styles.actionBtn} aria-label="Comentarios">
                  <MessageCircle size={22} />
                  <span className={styles.actionCount}>24</span>
                </button>
                <button className={styles.actionBtn} aria-label="Compartir">
                  <Share2 size={22} />
                  <span className={styles.actionCount}>Compartir</span>
                </button>
              </div>

              {/* Volume Controller Mute/Unmute */}
              <button 
                className={styles.volumeBtn} 
                onClick={toggleMute}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Reel Info / Caption */}
              <div className={styles.videoOverlay}>
                <h5 className={styles.videoAuthor}>@tapimaster.cajamarca</h5>
                <p className={styles.videoDesc}>
                  El maestro tapicero cosiendo un panel lateral en cuero para una pick-up Hilux. ¡Precisión milimétrica hecha a mano! 🛠️💪
                </p>
                <div className={styles.videoHashtags}>
                  <span>#tapiceria</span>
                  <span>#cajamarca</span>
                  <span>#hechoamano</span>
                </div>
              </div>

              {/* Floating Fullscreen Trigger Button */}
              <button 
                className={styles.playBtn} 
                onClick={openModal}
                aria-label="Reproducir video de calidad a pantalla completa"
              >
                <Play size={22} fill="white" />
              </button>
            </div>
          </div>
          <span className={styles.reelFootnote}>💡 Haz clic en el ícono de reproducción para pantalla completa, o usa el ícono de audio para escuchar el taller.</span>
        </div>

        {/* Right Column: Narrative details */}
        <div className={styles.infoContent}>
          <span className={styles.subtitle}>Saber Hacer & Calidad</span>
          <h2 className={styles.title}>¿Por qué elegir nuestro trabajo?</h2>
          <p className={styles.introText}>
            En Cajamarca, nos distinguimos por el cuidado de los detalles. La diferencia entre un tapizado común y uno premium radica en la preparación y el acabado artesanal de nuestros maestros tapiceros.
          </p>

          <div className={styles.featuresGrid}>
            {QUALITY_POINTS.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIconWrapper}>
                  {point.icon}
                </div>
                <div className={styles.featureText}>
                  <h4 className={styles.featureTitle}>{point.title}</h4>
                  <p className={styles.featureDesc}>{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={closeModal}>
                <X size={18} />
                <span>Cerrar</span>
              </button>

              {/* Full screen vertical video player */}
              <div className={styles.modalPlayerWrapper}>
                <video
                  className={styles.modalVideo}
                  src="https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-leather-piece-41718-large.mp4"
                  autoPlay
                  controls
                  loop
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
