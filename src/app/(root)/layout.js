import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@components/Topbar";
import Providers from "@components/Prodiver";
import ReduxProviders from "@components/ReduxProvier";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friend-Zone",
  description: "Generated by Friend-Zone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <Providers>
            <Topbar />
            {children}
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
