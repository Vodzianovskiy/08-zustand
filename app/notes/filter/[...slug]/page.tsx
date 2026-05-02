import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === "all" || !slug ? "all" : slug[0];

  const title =
    tag === "all"
      ? "All notes | NoteHub"
      : `Notes filtered by "${tag}" | NoteHub`;

  const description =
    tag === "all"
      ? "Browse all notes in NoteHub."
      : `Browse NoteHub notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub notes page",
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] === "all" || !slug ? undefined : slug[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
