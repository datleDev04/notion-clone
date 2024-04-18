"use client"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { api } from "@/convex/_generated/api"
import { useSearch } from "@/hooks/use-search"
import { useQuery } from "convex/react"
import { FileIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const SearchCommand = () => {


    const router = useRouter()

    const documents = useQuery(api.documents.getSearch)
    const [isMounted, setIsMounted] = useState(false)

    const toggle = useSearch((store) => store.toggleSearch)
    const isOpen = useSearch((store) => store.isOpen)
    const onClose = useSearch((store) => store.onClose)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        
        document.addEventListener("keydown",down)

        return () => document.removeEventListener("keydown",down)
    }, [toggle])

    if (!isMounted) {
        return null
    }

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`)
        onClose()
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose} >
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {
                        documents?.map((document) => {
                            return (
                                <CommandItem
                                    key={document._id}
                                    value= {`${document._id}-${document.title}`}
                                    title={document.title}
                                    onSelect={onSelect}
                                    className="font-semibold"
                                >
                                    {
                                        document.icon ? (
                                            <p className="mr-2 text-[18px]" >
                                                {document.icon}
                                            </p>
                                        )
                                        : (
                                            <FileIcon className="mr-2 w-4 h-4" />
                                        )
                                    }
                                    {document.title}
                                </CommandItem>
                            )
                        })
                    }
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </CommandDialog>
    )
}

export default SearchCommand