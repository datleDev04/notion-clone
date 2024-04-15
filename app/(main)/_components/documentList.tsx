"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Item from "./item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"

interface DocumentListProps {
    parentDocumentId ?: Id<"documents">
    level?: number
    data ?: Doc<"documents">[] 
}

const DocumentList = ({
    parentDocumentId,
    level = 0
}: DocumentListProps) => {

    const params = useParams()
    
    const router = useRouter()

    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpanded = (documentId : string) => {
        setExpanded({
           ...expanded,
            [documentId]:!expanded[documentId]
        })
    }

    const documents = useQuery(api.documents.getSideBar, {
        parentDocument: parentDocumentId
    })

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }
    useEffect(() => {
        console.log(documents, expanded)
    }, [])

    if (documents == undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }
  return (
    <>
        <p
            style={{
                paddingLeft: level ? `${( level * 12 ) + 25}px` :'12px'
            }}
            className={cn(
                "hidden text-sm font-medium text-muted-foreground/80",
                expanded && "last:block",
                level === 0 && "hidden"
            )}
        >
            No page inside
        </p>

        {documents.map((document) => {
            <div key= {document._id} >
                <Item
                    id={document._id}
                    label={document.title}
                    icon= {FileIcon}
                    onClick={() => onRedirect(document._id)}
                    active={params.id === document._id}
                    level={level}
                    onExpand={() => onExpanded(document._id)}
                    expanded={expanded[document._id]}
                />
                {expanded[document._id] && (
                    <DocumentList
                        parentDocumentId={document._id}
                        level={level + 1}
                    />
                )}
            </div>
        })}
    </>
  )
}

export default DocumentList