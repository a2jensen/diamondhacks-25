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
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <Link href={`/notes/${noteId}`}>
        <CardHeader>
          <CardTitle className="truncate">{noteName}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">Click to view note</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleClick}>
            Open
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}