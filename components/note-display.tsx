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
<Card className="bg-[#6D6E93] border-[#D4C0E2] cursor-pointer shadow-md shadow-[#000000] hover:border-white rounded border transform transition duration-300 hover:-translate-y-2 hover:scale-105 font-mono ">
<div className="absolute top-[-50px] right-[-50px] opacity-20 z-0 pointer-events-none">
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64">
    <path fill="#E0D4F7" d="M40.4,-54.5C53.1,-44.9,64.7,-33.6,70.7,-19.7C76.6,-5.9,77,10.6,70.6,24.1C64.2,37.6,50.9,48.1,37.1,56.9C23.3,65.7,9.2,72.8,-4.6,78.2C-18.4,83.6,-36.8,87.3,-51.3,80.6C-65.7,73.9,-76.2,56.7,-77.1,40.3C-78,23.8,-69.4,8.1,-64.8,-7.7C-60.3,-23.4,-59.9,-39.2,-50.7,-50.5C-41.5,-61.8,-23.6,-68.6,-6.6,-64.7C10.5,-60.9,21,-46.9,40.4,-54.5Z" transform="translate(100 100)" />
  </svg>
</div>

<Link href={`/notes/${noteId}`}>
        <CardHeader>
          <CardTitle className="truncate text-white">{noteName}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground text-white flex items-center gap-2 ">Click to view note <TbNotes className="text-md text-[#F8F4F9]" /></p>
        </CardContent>
        <CardFooter className="flex justify-end">
          
          <Button className='border-white text-white shadow-lg rounded border hover:bg-[#F5F0EE] hover:border-[#5E3023] hover:text-[#5E3023]' variant="outline" size="sm" onClick={handleClick}>
            Open
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}