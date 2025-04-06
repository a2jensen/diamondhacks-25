import React, { useCallback } from 'react';
import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import '@xyflow/react/dist/style.css'
import ClientFlow from "./clientFlow"

export default async function NodeView() {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) {
      return redirect("/sign-in")
    }
  
    const { data: notes, error } = await supabase
      .from("notes")
      .select("id, title")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
  
    if (error) {
      console.error("Error fetching notes:", error)
      return <div>Error loading notes</div>
    }
  
    return <ClientFlow notes={notes} />
  }