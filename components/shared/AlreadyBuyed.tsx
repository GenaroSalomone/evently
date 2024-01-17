import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AlertDialogComponent = () => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
      <AlertDialog defaultOpen>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className='text-red-500'>Ticket Already Purchased</AlertDialogTitle>
            <AlertDialogDescription className="p-regular-16 text-grey-600">
              You have already purchased a ticket for this event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  router.push(process.env.NEXT_PUBLIC_SERVER_URL + '/profile');
                })
              }
            >
              {isPending ? "Redirecting..." : "Go to Profile"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}