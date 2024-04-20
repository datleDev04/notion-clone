"use client"

import Cover from "@/components/cover"
import ToolBar from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import dynamic from "next/dynamic"
import { useMemo } from "react"

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })
    
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), [])

    const update = useMutation(api.documents.update)

    const onChange = (content: string) => {
        update({
            id: document?._id as Id<"documents"> ,
            content
        })
    }

    if (document === undefined) {
        return (
            <>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-6xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 "pt-4>
                        <Skeleton className="h-10 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[30%]" />
                        <Skeleton className="h-4 w-[20%]" />
                    </div>
                </div>
            </>
        )    
    }
    if (document === null) {
        return ( <p> Notfound </p>)
    }


  return (
    <div className="pb-[500px]">
        {/* <div className="h-[35vh]" /> */}
        <Cover urlImage={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
            <ToolBar initialData={document} />
            <Editor
                onChange= {onChange}
                initialContent = {document.content}
            />
        </div>
    </div>
  )
}

export default DocumentIdPage