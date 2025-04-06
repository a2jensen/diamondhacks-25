// lib/db-utils-client.ts
import { createClient } from "@/utils/supabase/client"

export async function fetchNoteById(noteId: number) {
  const supabase = createClient()
  
  const { data: note, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", noteId)
    .single()
  
  if (error) {
    console.error("Error fetching note:", error)
    return { note: null }
  }
  
  return { note }
}

export async function updateNote(noteId: number, updates: { title?: string; content?: string }) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("notes")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", noteId)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating note:", error)
    return { note: null, error }
  }
  
  return { note: data, error: null }
}