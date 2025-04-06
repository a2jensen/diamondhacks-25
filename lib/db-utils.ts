/**
 * This file will house all of the CRUD functions for interacting with our DB.
 */
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function checkAuth() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      redirect("/sign-in");
    }
    
    return { user, supabase };
  }

export async function fetchNotes(){
    const { user, supabase } = await checkAuth();

    const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching notes:", error);
    return { notes: [] };
  }
  
  return { notes };
}

export async function fetchNoteById(noteId: number) {
  const { user, supabase } = await checkAuth();
  
  const { data: note, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .eq("user_id", user.id)
    .single();
  
  if (error) {
    console.error("Error fetching note:", error);
    return { note: null };
  }
  
  return { note };
}

export async function fetchFlashcardSets(){

}

export async function fetchFlashcards(){

}

export async function fetchQuizzes(){

}

export async function fetchQuizQuestions(){

}