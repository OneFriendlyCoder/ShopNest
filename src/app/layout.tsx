export const dynamic = 'force-dynamic'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProviders";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "../../actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"], weight:['400', '700'] });

export const metadata: Metadata = {
  title: "ShopNest",
  description: "E-commerce web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster toastOptions={{style:{
          background: 'rgb(51 65 85)',
          color: '#fff',
        }}}/>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
