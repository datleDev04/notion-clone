import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/hooks/use-cover-image"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"
import { Skeleton } from "./ui/skeleton"

interface CoverProps {
    urlImage?: string
    preview ?: boolean
}

const Cover = ({
    urlImage,
    preview
} : CoverProps) => {

    const { edgestore } = useEdgeStore()

    const coverImage = useCoverImage()

    const params = useParams()
    const removeCoverImage = useMutation(api.documents.removeImageCover)

    const onRemove = async () => {
        if (urlImage) {
            await edgestore.publicFiles.delete({
                url: urlImage
            })
        }
        removeCoverImage({
            documentId: params.documentId as Id<"documents">
        })
    }

  return (
    <div className={cn(
        "relative w-full h-[35vh] group",
        !urlImage && "h-[12vh]",
        urlImage && "bg-muted"
    )}>
        {!!urlImage && (
            <Image 
                src={urlImage}
                fill
                alt="Cover"
                className="object-cover"
            />
        )}
        {urlImage && !preview && (
            <div className="opacity-0 group-hover:opacity-100 absolute
            bottom-5 right-5 flex items-center gap-x-2">
                <Button
                    onClick={() => coverImage.onReplace(urlImage)}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"                    
                >
                    <ImageIcon className=" w-4 h-4 mr-2" />
                    Change cover
                </Button>
                <Button
                    onClick={onRemove}
                    className="text-muted-foreground text-xs"
                    variant="outline"
                    size="sm"                    
                >
                    <X className=" w-4 h-4 mr-2" />
                    Remove cover
                </Button>
            </div>
        )}
    </div>
  )
}

export default Cover

Cover.Skeleton = function CoverSkeleton () {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}