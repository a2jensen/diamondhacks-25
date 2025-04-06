import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import "@xyflow/react/dist/style.css";
import Flashcards from "./clientSide";

export default async function FlashcardsPage({
  params,
}: {
  params: { flashcardsID: string };
}) {
  const { flashcardsID } = params;

  console.log("Flashcard Set ID:", flashcardsID);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: flashcards, error } = await supabase
    .from("flashcards")
    .select("id, flashcard_set_id, front, back")
    .eq("flashcard_set_id", flashcardsID) // ← use flashcard_set_id here
    .order("created_at", { ascending: false });

  console.log("Fetched Flashcards:", flashcards);
  if (error) {
    console.error("Error fetching flashcards:", error);
    return <div>Error loading flashcards</div>;
  }

  return <Flashcards flashcards={flashcards} />;
}
