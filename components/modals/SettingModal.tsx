"use-client"

import { useSetting } from "@/hooks/use-setting"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { ModeToggle } from "../mode-toggle"


const SettingModal = () => {
    const setting = useSetting()
    return (
        <Dialog open={setting.isOpen} onOpenChange={setting.onClose} >
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <DialogTitle>
                        My Settings
                    </DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label > Apperance </Label>
                        <span className="text-[0.8rem] text-muted-foreground" >Customize how Jotion looks on your device</span>
                    </div>
                </div>
                <ModeToggle />
            </DialogContent>
        </Dialog>
    )
}

export default SettingModal