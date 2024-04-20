"use client"

import ConfirmModals from "@/components/modals/ConfirmModals"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface BannerProps {
    documentId: Id<"documents">
}

const Banner = ({
    documentId
}: BannerProps) => {

    const router = useRouter()

    const remove = useMutation(api.documents.remove)
    const restore = useMutation(api.documents.restore)

    const onRestore = () => {

        if (!documentId) return

        const promise = restore({ id: documentId })

        toast.promise(promise, {
            pending: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note!"
        })
    }
    const onRemove =  () => {
        if (!documentId) return

        const promise = remove({ id: documentId })

        toast.promise(promise, {
            pending: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        })

        router.push("/documents")
    }
  return (
    <div className="w-full bg-rose-500 text-center
    text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>
            This page is in the Trash 
        </p>
        <Button
            size="sm"
            variant="outline"
            onClick={onRestore}
            className="border-white bg-transparent hover:bg-primary/5
            text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
            Restore Page
        </Button>
        <ConfirmModals onConfirm={onRemove}>
            <Button
                size="sm"
                variant="outline"
                className="border-white bg-transparent hover:bg-primary/5
                text-white hover:text-white p-1 px-2 h-auto font-normal"
            >
                Delete forever
            </Button>
        </ConfirmModals>
    </div>
  )
}

export default Banner