import { Id } from '@/convex/_generated/dataModel'
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'


interface ItemProps {
    id?: Id<"documents">,
    documentIcon?: string,
    active?: boolean,
    expanded?: boolean,
    isSearch?: boolean,
    onExpand?: () => void,
    level?: number
    label: string,
    onClick: () => void,
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

    const ChevronIcon = expanded ? ChevronDown : ChevronRight
    
    const handleExpanded = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onExpand?.()
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
                className='h-full rounded-sm hover:bg-neutral-600 mr-1'
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
                <span className='text-sm'>Ctrl</span> + K
            </kbd>
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