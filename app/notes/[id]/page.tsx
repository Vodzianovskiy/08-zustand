import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import NoteDetails from "./NoteDetails.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

//SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  return {
    title: `${note.title} | NoteHub`,
    description: note.content,
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content,
      url: `http://localhost:3000/notes/${id}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub note: ${note.title}`,
        },
      ],
      locale: "en-US",
      type: "article",
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
