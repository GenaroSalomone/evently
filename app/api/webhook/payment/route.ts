import { createOrder } from "@/lib/actions/order.actions";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCES_TOKEN_PROD!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });
  // console.log(body);
  const payment = await new Payment(client).get({ id: body.data.id });
  const status = payment.status;
  // console.log(payment.metadata.event_id)
  if (status === 'approved') {
    const order = {
      createdAt: new Date(),
      mercadoPagoId: payment.id!.toString(),
      totalAmount: payment.transaction_amount!.toString(),
      eventId: payment.metadata.event_id,
      buyerId: payment.metadata.buyer_id

    }
    const newOrder = await createOrder( order );
    return NextResponse.json({ message: 'OK', newOrder: newOrder})
  }

  return Response.json({ success: true });
}


