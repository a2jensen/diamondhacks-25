import { InfoIcon } from "lucide-react";
import { NoteDisplay } from "@/components/note-display";
import { checkAuth, fetchNotes } from "@/lib/db-utils";
import { GiFishing } from "react-icons/gi";
import Hero from "@/components/frontWriting";



export default async function Notes() {
    const {notes}  = await fetchNotes();
    console.log("notes:", notes);

    return (
        <div className="flex-1 w-full flex flex-col gap-6">

            <div className="flex items-center justify-center">
                <Hero /> 
            </div>
            <h2 className="font-bold text-2xl text-[#6D6E93] -mb-2 font-mono ">Your Notes</h2>
            <hr className="border-dashed border-[#5E3023] rounded-full border-1" />
            
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

            <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center text-[#D2CBC9]">
                <InfoIcon size="12" strokeWidth={2} />
                This is a protected page that you can only see as an authenticated
                user
            </div>

        </div>
    );
}