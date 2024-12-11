import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react'
import { Header } from "@/components/ui/Header";
import { Loading } from '@/components/layout/Loading'
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/cart/CartProvider";
import { Cart } from "@/components/cart/Cart";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // TO ADD: Add the base URL for the metadataBase when in production
  // metadataBase: new URL('https://storefront.io'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
    },
  },
  title: "Storefront - Your One-Stop Shop",
  description: "Discover amazing products at great prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} relative flex flex-col min-h-[96dvh] `}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header />
            <main className=' relative z-10 flex-grow'>
              <Suspense fallback={<Loading />}>
                  {children}
              </Suspense></main>
            <Footer />
            <Cart />
            <div
              className={` absolute z-[2] inset-0 h-full w-full bg-hero-pattern bg-[size:300px] bg-repeat mix-blend-multiply after:bg-white after:absolute after:inset-0 after:h-full after:w-full after:opacity-90 `}
            />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
