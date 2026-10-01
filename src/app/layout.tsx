import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://terreno-troviscal.pt"),
  title: "Terreno Urbano no Troviscal, Oliveira do Bairro | 1.474,50 m² • 38m Frente • 50.000€",
  description: "Terreno plano de 1.474,50 m² com 38 metros de frente urbana no Troviscal, Oliveira do Bairro. Ideal para moradia familiar ou 3-4 moradias. Preço: 50.000€ (negociável).",
  keywords: [
    "terreno troviscal",
    "terreno oliveira do bairro",
    "terreno 38m frente",
    "terreno plano aveiro",
    "50000 euros"
  ],
  openGraph: {
    title: "Terreno Urbano no Troviscal | 1.474,50 m² • 38m Frente • 50.000€",
    description: "Terreno urbano plano com 38m de frente e 1.474,50 m² em área consolidada. Oportunidade por 50.000€ (negociável).",
    url: "https://terreno-troviscal.pt",
    siteName: "Terreno Troviscal",
    images: [
      {
        url: "/images/frente.png",
        width: 1200,
        height: 630,
        alt: "Terreno Urbano no Troviscal",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${jakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#062319] text-[#fcf9f2] selection:bg-[#c5a869] selection:text-[#062319]">
        {children}
      </body>
    </html>
  );
}
