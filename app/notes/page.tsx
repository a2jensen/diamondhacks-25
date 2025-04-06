import { InfoIcon, PlusCircle } from "lucide-react";
import { NoteDisplay } from "@/components/note-display";
import { checkAuth, fetchNotes, createNote } from "@/lib/db-utils";
import { GiFishing } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

// Create a server action for creating a new note
async function createNewNote(formData : any) {
  'use server'
  const noteName = formData.get('noteName') || "New Note";
  // Create a new note with the provided title
  const newNoteId = await createNote(noteName);
  // Redirect to the new note's page
  redirect(`/notes/${newNoteId}`);
}

export default async function Notes() {
    const { notes } = await fetchNotes();
    
    return (
        <div className="flex-1 w-full flex flex-col gap-6">
            <div className="flex items-center justify-center">
                <h2 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-[#5E3023] pr-5 text-6xl text-[#5E3023] font-bold mb-6 -mt-2 font-mono text-shadow-lg">
                    <span className="flex items-center gap-2">
                        Get Hooked on Learning
                    </span>
                </h2>
            </div>
            
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-[#6D6E93] font-mono">Your Notes</h2>
                <form action={createNewNote} className="flex gap-2">
                    <Input 
                        name="noteName" 
                        placeholder="Note name" 
                        className="w-48"
                        defaultValue="New Note"
                        required
                    />
                    <Button 
                        type="submit"
                        className="bg-[#5E3023] hover:bg-[#4E2013] text-white flex items-center gap-2"
                    >
                        <PlusCircle size={16} />
                        Create
                    </Button>
                </form>
            </div>
            
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
                    <p className="mb-4">You don't have any notes yet. Create your first note to get started!</p>
                    <form action={createNewNote} className="flex gap-2 justify-center">
                        <Input 
                            name="noteName" 
                            placeholder="Note name" 
                            className="w-48"
                            defaultValue="My First Note"
                            required
                        />
                        <Button 
                            type="submit"
                            className="bg-[#5E3023] hover:bg-[#4E2013] text-white flex items-center gap-2"
                        >
                            <PlusCircle size={16} />
                            Create
                        </Button>
                    </form>
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