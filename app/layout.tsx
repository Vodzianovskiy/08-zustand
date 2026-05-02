import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "noteHub",
  description:
    "I create a note-taking app built with React, TypeScript, and Next.js. It allows users to create, edit, and delete notes, as well as organize them into categories.",

  openGraph: {
    title: "NoteHub",
    description:
      "This is a note-taking app built with React, TypeScript, and Next.js. It allows users to create, edit, and delete notes, as well as organize them into categories.",
    url: "http://localhost:3000/",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 763,
        height: 512,
        alt: "noteHub",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
