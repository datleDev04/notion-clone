"use client"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


const DocumentsPage = () => {

  const { user } = useUser()
  const router = useRouter()

  const create = useMutation(api.documents.create)

  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
        .then((documentId) => {
            console.log(documentId)
            router.push(`/documents/${documentId}`)
        })

    toast.promise(promise, {
        pending: "Creating a new document...",
        success: "Created a new document!",
        error: "Failed to create a new document!"
    })
}

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

      <Button onClick={handleCreate} >
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentsPage