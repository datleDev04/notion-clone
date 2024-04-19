"use client"

import Cover from "@/components/cover"
import ToolBar from "@/components/toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"

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
    <div className="pb-40">
        {/* <div className="h-[35vh]" /> */}
        <div className="md:max-w-3xl lg:max-w-6xl mx-auto">
            <Cover urlImage={document.coverImage} />
            <ToolBar initialData={document} />
        </div>
    </div>
  )
}

export default DocumentIdPage