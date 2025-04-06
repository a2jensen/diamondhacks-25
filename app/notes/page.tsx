import { InfoIcon } from "lucide-react";
import { NoteDisplay } from "@/components/note-display";
import { checkAuth, fetchNotes } from "@/lib/db-utils";

export default async function Notes() {
    const {notes}  = await fetchNotes();
    console.log("notes:", notes);

    return (
        <div className="flex-1 w-full flex flex-col gap-6">
            <h2 className="font-bold text-2xl mb-4">Your Notes</h2>
            <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                <InfoIcon size="16" strokeWidth={2} />
                This is a protected page that you can only see as an authenticated
                user
            </div>
            
            {notes && notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <NoteDisplay 
                            key={note.id} 
                            noteName={note.title} 
                            noteId={note.id.toString()} 
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 border rounded-md bg-muted/50">
                    <p>You don't have any notes yet. Create your first note to get started!</p>
                </div>
            )}
        </div>
    );
}