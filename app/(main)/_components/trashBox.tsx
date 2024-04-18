"use client"

import Spinner from "@/components/Spinner"
import ConfirmModals from "@/components/modals/ConfirmModals"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { Search, Trash2, Undo } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const TrashBox = () => {

    const router = useRouter()
    const params = useParams()

    const documents = useQuery(api.documents.getTrash)

    const restore = useMutation(api.documents.restore)
    const remove = useMutation(api.documents.remove)

    const [search, setSearch] = useState<string>("")

    const filterDocuments = documents?.filter(document => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) => {
        event.stopPropagation()

        if (!documentId) return

        const promise = restore({ id: documentId })

        toast.promise(promise, {
            pending: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore note!"
        })
    }
    const onRemove = (
        documentId: Id<"documents">
    ) => {
        if (!documentId) return

        const promise = remove({ id: documentId })

        toast.promise(promise, {
            pending: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete note."
        })

        if (params.documentId === documentId) {
            router.push("/documents")
        }
    }

    if ( documents === undefined ) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
          )
    }

  return (
    <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
            <Search className="w-4 h-4 " />
            <Input 
                className="h-7 px-2 focus-visible:ring-transparent bg-secondary "
                role="search"
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter by page title..."
            />
        </div>

        <div className="mt-2 px-1 pb-1">
            <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                No documents found
            </p>
            {filterDocuments?.map((document) => {
                return (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex 
                        items-center text-primary justify-between"
                    >
                        <span className="truncate pl-2">{document.title}</span>
                        <div
                            className="flex items-center "
                        >
                            <div
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-200"
                                onClick={(e) => onRestore(e, document._id)}
                            >
                                <Undo className="w-4 h-4 text-muted-foreground" />
                            </div>

                            <ConfirmModals
                                onConfirm={() => onRemove(document._id)}
                            >

                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200"
                                >
                                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                                </div>
                                
                            </ConfirmModals>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default TrashBox