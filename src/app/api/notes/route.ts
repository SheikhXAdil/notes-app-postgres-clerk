import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import { sql } from "@vercel/postgres";
import { db, Note, newNote, notesTable } from "@/lib/drizzle";
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';


export async function GET(request: NextRequest) {

    const headerList = headers()
    const userid = headerList.get("userid")

    try {
        await sql`CREATE TABLE IF NOT EXISTS Notes(id varchar(255), Title varchar(255), Note text, userid varchar(255))`

        if (userid) {
            const res: Note[] = await db.select().from(notesTable).where(eq(notesTable.userid, userid)).execute()
            return NextResponse.json({ data: res })
        } else {
            return NextResponse.json("Not Authorized", { status: 401 })
        }
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json("Something Went Wrong", { status: 500 })
    }

}

export async function POST(request: NextRequest) {

    const req: newNote = await request.json()

    try {
        if (req.userid) {
            if ((req.title && req.note)) {
                const res = await db.insert(notesTable).values({
                    id: uuidv4(),
                    title: req.title,
                    note: req.note,
                    userid: req.userid
                }).returning().execute()

                return NextResponse.json({ message: "Data Added Successfully", data: res })
            } else {
                throw new Error("Title and Task Fields are required")
            }
        } else {
            return NextResponse.json("Not Authorized", { status: 401 })
        }

    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })

    }
}

export async function DELETE(request: NextRequest) {
    const reqId = request.nextUrl.searchParams.get("id")
    try {
        if (reqId) {
            const res = await db.delete(notesTable).where(eq(notesTable.id, reqId)).returning().execute()
            return NextResponse.json({ message: "Data deleted Successfully", date: res })
        }

    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })

    }

}

export async function PUT(request: NextRequest) {
    const reqId = request.nextUrl.searchParams.get("id")
    const req: newNote = await request.json()

    try {
        if (reqId) {
            const res = await db.update(notesTable)
                .set({
                    title: req.title,
                    note: req.note
                })
                .where(eq(notesTable.id, reqId)).returning().execute()
            return NextResponse.json({ message: "Data updated Successfully", date: res })
        }

    } catch (error) {
        return NextResponse.json({ message: (error as { message: string }).message })

    }
}