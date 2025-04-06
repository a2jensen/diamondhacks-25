// app/notes/[noteID]/page.tsx - Server Component
import { fetchNoteById } from "@/lib/db-utils";
import NoteEditor from "./note-editor";

export default async function NotePage({ params }: { params: { noteID: string } }) {
  // fetch the individual note using noteId
  const noteId = parseInt(params.noteID);
  const { note } = await fetchNoteById(noteId);
  
  if (!note) {
    return <div>Note not found or you don't have permission to view it.</div>;
  }
  // Pass the note data to the client component
  return <NoteEditor initialNote={note} />;
}