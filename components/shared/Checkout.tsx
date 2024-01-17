import React, { useState } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import {
  checkOrderExists,
  checkoutOrder,
  createFreeOrder,
} from "@/lib/actions/order.actions";
import { useRouter } from "next/navigation";
import { AlertDialogComponent } from "./AlreadyBuyed";

export const Checkout = ({
  event,
  userId,
}: {
  event: IEvent;
  userId: string;
}) => {
  const router = useRouter();
  const [orderExists, setOrderExists] = useState<Boolean>(false);
  const onCheckout = async () => {
    const order = {
      eventId: event._id,
      buyerId: userId,
    };
    const exists = (await checkOrderExists(order)) as boolean;
    setOrderExists(exists);
    if (exists) {
      return;
    }
    if (event.isFree) {
      const freeOrder = await createFreeOrder(order);
      if (freeOrder)
        router.push(process.env.NEXT_PUBLIC_SERVER_URL + "/profile");
    } else {
      const checkoutOrderParams = {
        ...order,
        eventTitle: event.title,
        price: event.price,
        isFree: event.isFree,
      };
      await checkoutOrder(checkoutOrderParams);
    }
  };

  return orderExists ? (
    <AlertDialogComponent />
  ) : (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};
