import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AlertDialogProps {
    children: React.ReactNode,
    onConfirm: () => void
}


const ConfirmModals = ({
    children,
    onConfirm
}: AlertDialogProps) => {

    const handleConfirm = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onConfirm()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children} 
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                     onClick={(e) => e.stopPropagation()}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModals