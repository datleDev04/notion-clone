import { Id } from '@/convex/_generated/dataModel'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, MoreHorizontalIcon, Trash, Trash2 } from 'lucide-react'


interface MenuProps {
    documentId: Id<"documents">
}
const Menu = ({
    documentId
}: MenuProps) => {

    const router = useRouter()

    const { user } = useUser()

    const archive = useMutation(api.documents.archive)

    const onArchive = () => {
        const promise = archive({ id: documentId })

        toast.promise(promise, {
            pending: "Moving document to trash...",
            success: "Archived a document!",
            error: "Failed to Archived a document!"
        })

        router.push("/documents")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                    Last edited by: {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu
