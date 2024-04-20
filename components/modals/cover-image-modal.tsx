"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useCoverImage } from "@/hooks/use-cover-image"
import { useEdgeStore } from "@/lib/edgestore"
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"

import React, { useState } from 'react'
import { SingleImageDropzone } from "../single-image-dropzone"

const CoverImageModal = () => {
    const [file, setFile] = useState<File>()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const coverImage = useCoverImage()

    const { edgestore } = useEdgeStore()

    const update = useMutation(api.documents.update)
    const params = useParams()

    const onChange = async (file ?: File) => {
        if (file) {
            setIsSubmitting(true)
            setFile(file)

            const res =  await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                },
            })

            
            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            })

            onClose()
        }
    }

    const onClose = () => {
        setIsSubmitting(false)
        setFile(undefined)
        coverImage.onClose()
    }
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose} >
    <DialogContent>
        <DialogHeader className="border-b pb-3">
            <DialogTitle>
                Cover Image
            </DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
            className="w-full outline-none"
            disabled= {isSubmitting}
            value={file}
            onChange={onChange}
        />
    </DialogContent>
</Dialog>
  )
}

export default CoverImageModal