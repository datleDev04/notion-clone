import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/themesProvider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: '/logo.svg',
        href: '/logo.svg'
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: '/logo-dark.svg',
        href: '/logo-dark.svg'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className}>
        <ConvexClientProvider >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme-2"
          >
            <ModalProvider />
            {children}
            <ToastContainer newestOnTop={true} position="bottom-center" pauseOnHover={false} autoClose={2000} />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
