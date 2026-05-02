import { Metadata } from "next";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

//SEO
export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Create a new note in NoteHub. Use our intuitive form to add a title, content, and select a tag for your note. Start organizing your thoughts and ideas today!",
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Create a new note in NoteHub. Use our intuitive form to add a title, content, and select a tag for your note. Start organizing your thoughts and ideas today!",
    url: "http://localhost:3000/notes/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 763,
        height: 512,
        alt: "Create Note page on NoteHub",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};
export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
