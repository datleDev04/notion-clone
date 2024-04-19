import { Id } from '@/convex/_generated/dataModel'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon, Trash, Trash2 } from 'lucide-react'


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
            <DropdownMenuTrigger>
                <Button size="sm" variant="ghost" >
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align='end' alignOffset={8} forceMount>
                <DropdownMenuLabel>Note's Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onArchive}>
                    <Trash className='w-4 h-4 mr-2' />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <div className='text-xs text-muted-foreground p-2'>
                    Last edited by : {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu
