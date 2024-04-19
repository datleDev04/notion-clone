"use client"

import { cn } from '@/lib/utils'
import { ChevronLeft, MenuIcon, PlusCircle, PlusIcon, Search, Settings, TrashIcon } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import React, { ElementRef, useRef, useState, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import UserItems from './user-items'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Item from './item'
import { toast } from 'react-toastify'
import DocumentList from './documentList'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import TrashBox from './trashBox'
import { useSearch } from '@/hooks/use-search'
import { useSetting } from '@/hooks/use-setting'
import SecondNavBar from './secondNavBar'
const Navigation = () => {

    const params = useParams()
    const pathName = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)")
    const isResizingRef = useRef(false)
    const sideBarRef = useRef<ElementRef<"aside">>(null)
    const navBarRef = useRef<ElementRef<"div">>(null)

    const [isResetting, setIsResetting] = useState(false)

    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const create = useMutation(api.documents.create)

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {

        if (isMobile) {
            collapse();
        }
        console.log(!!params.documentId)
        

    }, [pathName, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (
        event: MouseEvent
    ) => {
        if (!isResizingRef.current) return

        // get current width
        let newWidth = event.clientX

        // setup max and min of resize width
        if (newWidth < 240) newWidth = 240
        if (newWidth > 480) newWidth = 480

        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`
            navBarRef.current.style.setProperty('left', `${newWidth}px`)
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false

        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sideBarRef.current.style.width = isMobile ? "100%" : "240px"
            navBarRef.current.style.setProperty('width', isMobile ? "0px" : `calc(100% - 240px)`)
            navBarRef.current.style.setProperty('left', isMobile ? "100%" : "240px")

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sideBarRef.current.style.width = "0px"
            navBarRef.current.style.setProperty('width', "100%")
            navBarRef.current.style.setProperty('left', "0px")

            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const handleCreate = () => {
        const promise = create({ title: "Untitled" })

        toast.promise(promise, {
            pending: "Creating a new document...",
            success: "Created a new document!",
            error: "Failed to create a new document!"
        })
    }

    const search = useSearch()
    const setting = useSetting()


    return (
        <>
            <aside
                ref={sideBarRef}
                className={cn(
                    "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"

                )}
            >
                <div
                    onClick={collapse}
                    role='button'
                    className={
                        cn(
                            'h-6 w-6 text-muted-foreground rounded-sm',
                            'hover:bg-neutral-300 dark:hover:bg-neutral-600',
                            'absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                            isMobile && "opacity-100"
                        )}
                >
                    <ChevronLeft className='w-6 h-6' />
                </div>
                <div>
                    <UserItems />
                    <Item
                        label='Search'
                        onClick={search.onOpen}
                        icon={Search}
                        isSearch
                    />
                    <Item
                        label='Setting'
                        onClick={setting.onOpen}
                        icon={Settings}
                    />
                    <Item
                        label='New Page'
                        onClick={handleCreate}
                        icon={PlusCircle}
                    />
                </div>

                <div className='mt-4'>
                    <DocumentList />
                    <div className="pt-2 cursor-pointer">
                        <Item
                            label='Add a page'
                            icon={PlusIcon}
                            onClick={handleCreate}
                        />
                    </div>


                    <Popover>
                        <PopoverTrigger asChild className='w-full mt-4'>
                            <div>
                                <Item
                                    label='Trash'
                                    icon={TrashIcon}
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 w-72"
                            side={isMobile ? "bottom" : "right"}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>

                <div
                    className='opacity-0 group-hover/sidebar:opacity-100 
                transition cursor-ew-resize absolute h-full w-1 bg-primary/10
                right-0 top-0'
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                />

            </aside>

            <div
                ref={navBarRef}
                className={cn(
                    "absolute top-0 z-[99999] left-60 w-[calc(100%- 240px)] ",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >    
                {!!params.documentId ? 
                (   
                    <SecondNavBar
                        isCollapsed = {isCollapsed}
                        onResetWidth={resetWidth}
                        />
                ) :
                (

                    <nav className='bg-transparent px-3 py-2 w-full' >
                        {
                            isCollapsed &&
                            <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6 text-muted-foreground' />
                        }
                    </nav>
                )}

            </div>
        </>
    )
}

export default Navigation