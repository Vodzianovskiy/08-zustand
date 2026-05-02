import css from "./page.module.css";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",

  openGraph: {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    url: "http://localhost:3000/not-found",
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

export default function NotFound() {
  return (
    <main>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
