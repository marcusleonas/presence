"use client";

import { useRouter } from "next/navigation";
import { deleteAction } from "./actions";
import { toast } from "sonner";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <button
      className="text-destructive cursor-pointer hover:underline"
      onClick={async () => {
        await deleteAction(id);
        toast.success("Deleted presence");
        router.refresh();
      }}
    >
      delete
    </button>
  );
}
