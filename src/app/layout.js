import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TapiMaster | Tapicería Automotriz Premium en Cajamarca",
  description: "Especialistas en tapizado de asientos de autos en Cajamarca. Trabajamos con Cuero Natural, Cuero Americano, Tacto Cuero y Pranna. Diseños personalizados y alta costura con garantía.",
  keywords: ["tapiceria cajamarca", "tapizado de autos", "cuero automotriz", "tapimaster", "mariscal caceres 1031", "pranna cajamarca"],
  authors: [{ name: "TapiMaster" }],
  icons: {
    icon: "/images/logo/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader />
        <CustomCursor />
        {children}
        {/* Widget de Accesibilidad UserWay – carga después del contenido principal */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="au1j2fECe0"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
