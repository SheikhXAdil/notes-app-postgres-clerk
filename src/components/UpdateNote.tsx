"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { checkEnvironment } from "@/Sections/Notes"
import { Note } from "@/lib/drizzle"
import { useState } from "react"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"


const handleUpdate = async (id: number, newTitle: string, newNote: string, router: any) => {

    try {
        const res = await fetch(`/api/notes?id=${id}`, {
            method: "put",
            body: JSON.stringify({
                title: newTitle,
                note: newNote
            })
        })
        console.log(await res.json())
        router.refresh()
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong")
    }
}

const UpdateNote = ({ children, note }: { children: React.ReactNode, note: Note }) => {

    const [updatedTitle, setUpdatedTitle] = useState(note.title)
    const [updatedNote, setUpdatedNote] = useState(note.note)

    const router = useRouter()

    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-col gap-10">
                    <AlertDialogTitle className="text-2xl">Enter New Details</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold">Enter Updated Title (Required)</h2>
                            <Input required value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-semibold">Enter Updated Note (Required)</h2>
                            <Input required value={updatedNote} onChange={(e) => setUpdatedNote(e.target.value)} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => await handleUpdate(note.id, updatedTitle, updatedNote, router)}>Update</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UpdateNote
