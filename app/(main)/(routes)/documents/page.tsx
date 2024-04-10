"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"


const DocumentsPage = () => {

  const { user } = useUser()


  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4 " >
      <Image 
        src="/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />
      <Image 
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium" >
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>

      <Button >
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage