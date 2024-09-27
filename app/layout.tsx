import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import GoogleOAuthProvide from "@/components/GoogleOAuthProvider";
// const inter = Inter({ subsets: ['latin'] })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productionglue",
  description: "Together, we advance whats possible - productionglue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={plusJakartaSans.className} suppressHydrationWarning={true}>
        <GoogleOAuthProvide>{children}</GoogleOAuthProvide>
        <Toaster />
      </body>
    </html>
  );
}
