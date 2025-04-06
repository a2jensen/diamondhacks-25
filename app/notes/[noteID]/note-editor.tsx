'use client'

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

export default function NoteEditor({ initialNote }: { initialNote: any }) {
  const [value, setValue] = useState(initialNote.content || "");
  
  const handleEditorChange = (newValue?: string) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };

  
  return (
    <div className="w-full  px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{initialNote.title || "Untitled Note"}</h1>
        <button className="px-4 py-2 bg-black text-white rounded">
          Save
        </button>
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