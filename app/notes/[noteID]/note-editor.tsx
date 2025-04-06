'use client'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

// Define types for our messages
interface Message {
  role: 'user' | 'model';
  content: string;
}

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function NoteEditor({ initialNote, noteId }: { initialNote: any, noteId : any }) {
  const [value, setValue] = useState(initialNote.content || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  
  const handleEditorChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };

  // request flashcards here
  const requestFlashcardSet = async () => {
    setIsGenerating(true);
    setStatusMessage("Generating flashcards...");
    
    const systemPrompt = `
  You are an AI that helps create study flashcards.
  Given the following markdown notes, return exactly 3 flashcards formatted in JSON like this:
  [
    {
      "front": "What is ...?",
      "back": "..."
    },
    ...
  ]
  
  ONLY return valid JSON, no extra text. Here are the notes:
  `;

    const systemPromptGenerateSetName = `
    based on the given markdown note, generate a name that would be used for its flashcard set
    `
  
    const fullPrompt = `${systemPrompt}\n${value}`;
    const promptGenerateSetName =  `${systemPromptGenerateSetName}\n${value}`;
  
    try {
      setStatusMessage("Generating flashcards content...");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: fullPrompt,
            }
          ]
        }),
      });
      
      setStatusMessage("Generating flashcard set name...");
      const response2 = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: promptGenerateSetName,
            }
          ]
        }),
      });
  
      const data = await response.json();
      console.log("data returned , ", data);
      const flashcards = JSON.parse(data.response); // ⚠️ only safe if model returns clean JSON
      
      const data2 = await response2.json();

      // Option 1: If AI wraps the name in quotes
      let flashcardSetName = "";
      try {
        flashcardSetName = JSON.parse(data2.response); // safely parses "..."
      } catch {
        // Fallback in case it's just raw text
        flashcardSetName = data2.response.trim().replace(/^"|"$/g, '');
      }

      console.log("Flashcard set name:", flashcardSetName);
      console.log("Flashcards:", flashcards);
  
      // Make API call to save flashcards
      setStatusMessage("Saving flashcards to database...");
      const flashcardsResponse = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          setName: flashcardSetName,  // This matches the API field name
          flashcards: flashcards,     // This matches the expected format
          noteId: noteId              // This is the source note ID
        }),
      });

      if (!flashcardsResponse.ok) {
        const errorData = await flashcardsResponse.json();
        throw new Error(errorData.error || "Failed to save flashcards");
      }
      
      const result = await flashcardsResponse.json();
      
      if (result.success) {
        setStatusMessage("Flashcards saved successfully!");
        setTimeout(() => setStatusMessage(""), 3000);
        console.log("saved flashcards!!!", result.flashcardSet);
      } else {
        throw new Error("Failed to save flashcards");
      }
  
    } catch (err: any) {
      console.error("Failed to generate flashcards:", err);
      setStatusMessage(`Error: ${err.message || "Failed to generate flashcards"}`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#454888] font-mono">{initialNote.title || "Untitled Note"}</h1>
        <div className="flex items-center gap-3">
          {statusMessage && (
            <span className="text-sm text-gray-600">{statusMessage}</span>
          )}
          <button className="font-mono px-2 py-2 bg-white text-[#454888] rounded border border-[#454888] hover:bg-[#454888] hover:text-white transition duration-300">
            Save
          </button>
          <button 
            className={`font-mono px-2 py-2 bg-white text-[#454888] rounded border border-[#454888] hover:bg-[#454888] hover:text-white transition duration-300${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={requestFlashcardSet}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Make Flashcards'}
          </button>
        </div>
      </div>

      <div data-color-mode="light" className="w-full">
        <MDEditor
          value={value}
          onChange={handleEditorChange}
          preview="edit"
          height={700} // Increase the height
          className="w-full" // Make sure it's full width
          style={{ maxWidth: '100%' }} // Ensure it doesn't exceed the container
        />
      </div>
    </div>
  );
}