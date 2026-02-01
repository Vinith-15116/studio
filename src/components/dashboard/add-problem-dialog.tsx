'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createProblemAction } from '@/app/actions';

export function AddProblemDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const result = await createProblemAction(formData);
    if (result.success) {
      toast({ title: 'Problem submitted', description: 'The AI is analyzing the problem now.' });
      setOpen(false);
      formRef.current?.reset();
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report a New Problem</DialogTitle>
          <DialogDescription>
            Describe the problem you've observed. Our AI will analyze and categorize it.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" placeholder="e.g. Power outage in downtown" required />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="location">Location</Label>
                <Input type="text" id="location" name="location" placeholder="e.g. New York, USA" required />
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe the problem in detail." id="description" name="description" required/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit for Analysis</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
