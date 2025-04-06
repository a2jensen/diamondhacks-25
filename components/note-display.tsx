"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TbNotes } from "react-icons/tb";

export function NoteDisplay({ noteName, noteId }: { noteName: string, noteId: string }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/notes/${noteId}`)
  }

  return (
<Card className="bg-[#6D6E93] border-[#D4C0E2] cursor-pointer shadow-md shadow-[#000000] hover:border-white rounded border transform transition duration-300 hover:-translate-y-2 hover:scale-105 ">
<Link href={`/notes/${noteId}`}>
        <CardHeader>
          <CardTitle className="truncate text-white">{noteName}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground text-white flex items-center gap-2">Click to view note <TbNotes className="text-md text-[#F8F4F9]" /></p>
        </CardContent>
        <CardFooter className="flex justify-end">
          
          <Button className='border-white text-white shadow-lg rounded border hover:bg-white' variant="outline" size="sm" onClick={handleClick}>
            Open
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}