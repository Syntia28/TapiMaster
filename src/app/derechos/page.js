import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Derechos Reservados | TapiMaster",
  description: "Página de derechos reservados de TapiMaster - tapicería automotriz premium en Cajamarca.",
  alternates: { canonical: "/derechos" },
};

export default function DerechosPage() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} />

      <div className={styles.card}>
        <div className={styles.headlineBlock}>
          <span className={styles.label}>Derechos Reservados</span>
          <h1 className={styles.title}>TapiMaster protege su contenido y su marca.</h1>
          <div className={styles.accentLine} />
        </div>

        <div className={styles.copyBlock}>
          <p>
            Toda la información, imágenes, textos y diseños presentados en este sitio web son propiedad de
            TapiMaster. La reproducción, distribución o uso no autorizado de cualquier material sin el consentimiento
            previo y escrito de TapiMaster está estrictamente prohibido.
          </p>

          <p>
            Esta página describe los derechos reservados sobre nuestra marca, identidad visual y contenidos de
            comunicación. Si necesitas autorización para usar material de TapiMaster, contáctanos directamente.
          </p>

          <ul className={styles.features}>
            <li>© {new Date().getFullYear()} TapiMaster. Todos los derechos reservados.</li>
            <li>Marca registrada y logotipo protegidos.</li>
            <li>Diseños, fotografías y textos exclusivos.</li>
            <li>Prohibido el uso comercial sin permiso.</li>
          </ul>

          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              Volver al inicio
            </Link>
            <a href="mailto:contacto@tapimaster.pe" className={styles.secondaryButton}>
              Contacto legal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
