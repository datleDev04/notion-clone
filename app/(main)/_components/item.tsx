import { Id } from '@/convex/_generated/dataModel'
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusIcon, Trash } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useUser } from '@clerk/clerk-react'

interface ItemProps {
    id?: Id<"documents">,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    onExpand?: () => void,
    level?: number
    label: string,
    onClick?: () => void,
    icon: LucideIcon
}

const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    expanded,
    onExpand,
    level = 0
}: ItemProps) => {

    const router = useRouter()

    const { user } = useUser()

    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    
    const handleExpanded = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onExpand?.()
    }

    const create = useMutation(api.documents.create)

    const archive =  useMutation(api.documents.archive)

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {

        event.stopPropagation()

        if (!id) return 

        const promise =  create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.()
                }

                router.push(`/documents/${documentId}`)
            })
            toast.promise(promise, {
                pending: "Creating a new document...",
                success: "Created a new document!",
                error: "Failed to create a new document!"
            })
        }

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()

        if (!id) return

        const promise = archive({ id })

        toast.promise(promise, {
            pending: "Moving document to trash...",
            success: "Archived a document!",
            error: "Failed to Archived a document!"
        })
    }


    return (

    <div 
        onClick = {onClick}
        style={{ 
            paddingLeft: level ? `${( level * 12 ) + 12}px` :'12px' 
        }} 
        className={cn(
            "group min-h-[27px] text-sm py-1 pr-3 w-full cursor-pointer",
            "hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
            active && "bg-primary/5 text-primary"
            // isSearch && "text-accent-foreground"
        )}
    >
        {!!id &&
            <div
                role='button'
                className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
                onClick={handleExpanded}
            >
                <ChevronIcon className='w-4 h-4 text-muted-foreground/50' />
            </div>
        }

        {documentIcon ? (
            <div className='shrink-0 text-[18px] mr-2' >
                {documentIcon}
            </div>
        ): (
            <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
        )}

        <label className='truncate'>
            {label}
        </label>

        {isSearch && (
            <kbd className='ml-auto pointer-events-none inline-flex 
            h-5 select-none items-center gap-1 rounded border bg-muted 
            px-1.5 font-medium text-muted-foreground opacity-100'>
                <span className='text-sm'>⌘</span> + K
            </kbd>
        )}

        {!!id && (
            <div 
                className= "ml-auto flex items-center gap-x-2"
                role='button'
                onClick={onCreate}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger
                        onClick={e => e.stopPropagation()}
                        asChild
                    >
                        <div
                            role='button'
                            className='opacity-0 group-hover:opacity-100 h-full ml-auto
                            rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-700'
                        >
                            <MoreHorizontal className='w-4 h-4 text-muted-foreground' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side='right'
                        forceMount
                    >
                        <DropdownMenuItem onClick={onArchive}>
                            <Trash className='w-4 h-4 mr-2' />
                            Archive
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <div className='text-xs text-muted-foreground p-2'>
                            last edited by : {user?.fullName}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='opacity-0 group-hover:opacity-100 h-full 
                    rounded-sm hover:bg-neutral-300 dark:bg-neutral-700'>
                    <PlusIcon className='w-4 h-4 text-muted-foreground' />
                </div>
            </div>
        )}

    </div>
  )
}

export default Item


Item.Skeleton = function ItemSkeleton ({ level }: { level ?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${( level * 12 ) + 25}px` :'12px'
            }}
            className='flex gap-2 py-[3px]'
        >
           <Skeleton 
                className='w-4 h-4'
            />
           <Skeleton 
                className='w-[30%] -h4'
            />
        </div>
    )
}