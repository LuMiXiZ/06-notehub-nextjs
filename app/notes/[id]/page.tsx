import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const noteId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={noteId} />
    </HydrationBoundary>
  );
}
