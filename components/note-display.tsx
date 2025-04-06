"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function NoteDisplay({ noteName, noteId }: { noteName: string, noteId: string }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/notes/${noteId}`)
  }

  return (
    <Card className="bg-[#6D6E93] border-[#D4C0E2] cursor-pointer hover:shadow-lg hover:border-white rounded border transition-shadow">
      <Link href={`/notes/${noteId}`}>
        <CardHeader>
          <CardTitle className="truncate text-white">{noteName}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground text-white">Click to view note</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className='border-white text-white shadow-lg rounded border' variant="outline" size="sm" onClick={handleClick}>
            Open
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}