"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () => fetchNotes({ tag, search: debouncedSearch, page }),
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <Link href="/notes/action/create">Create note +</Link>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
