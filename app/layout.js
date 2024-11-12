import { Suspense } from "react";
import "./globals.css";
import { Roboto_Flex } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export const metadata = {
  title: "Try It Mirror",
  description: "Try It Mirror",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense>
        <body className={roboto.className}>{children}</body>
      </Suspense>
    </html>
  );
}
