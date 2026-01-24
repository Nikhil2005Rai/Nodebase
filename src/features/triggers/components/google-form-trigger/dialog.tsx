"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const GoogleFormTriggerDialog = ({
    open,
    onOpenChange,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Google Form Trigger Configuration</DialogTitle>
                    <DialogDescription>
                        Use this webhook URL in your Google Form's Apps Script to trigger this workflow when a form is submitted.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        Used to manually execute a workflow, no configuration available.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};