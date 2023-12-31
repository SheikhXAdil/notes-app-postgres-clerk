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
import { Note } from "@/lib/drizzle"
import { ExternalLink } from "lucide-react"


const FullNote = ({ note }: { note: Note }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger><ExternalLink /></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="flex flex-col gap-10">
                    <AlertDialogTitle className="text-2xl">{note.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-lg">{note.note}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FullNote
