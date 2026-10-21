import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { META_PIXEL_ID } from "@/lib/analytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://terreno-troviscal.pt"),
  title: "Terreno Urbano no Troviscal, Oliveira do Bairro | 1.474,50 m² • 38 m de frente • 50.000 €",
  description: "Terreno plano de 1.474,50 m² com 38 metros de frente no Troviscal, Oliveira do Bairro. Possível moradia familiar ou projeto de várias moradias, sujeito a validação no PDM. Preço: 50.000 € (negociável).",
  keywords: [
    "terreno troviscal",
    "terreno oliveira do bairro",
    "terreno 38m frente",
    "terreno plano aveiro",
    "50000 euros"
  ],
  openGraph: {
    title: "Terreno Urbano no Troviscal | 1.474,50 m² • 38 m de frente • 50.000 €",
    description: "Terreno plano com 38 m de frente e 1.474,50 m² no Troviscal, Oliveira do Bairro. 50.000 € (negociável).",
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
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#062319] text-[#fcf9f2] selection:bg-[#c5a869] selection:text-[#062319]">
        {children}
      </body>
    </html>
  );
}
