import { Suspense } from 'react'
import Header from "@/Sections/Header";
import Notes from "@/Sections/Notes";
import Spinner from '@/components/Spinner';

export default function Home() {
  return (
    <>
      <main className="w-10/12 mx-auto flex flex-col gap-8">
        <Header />

        <h1 className="font-bold text-4xl md:text-5xl">Your Notes</h1>

        <Suspense fallback={<Spinner />}>
          <Notes />
        </Suspense>

      </main>
    </>
  )
}
