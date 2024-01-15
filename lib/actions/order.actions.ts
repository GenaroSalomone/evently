"use server"

import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from "next/navigation";
import { initiateDBConnection } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  try {
    // SDK de Mercado Pago
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCES_TOKEN! });
    const preference = await new Preference(client).
      create({
        body: {
          items: [
            {
              id: 'order',
              title: order.eventTitle,
              quantity: 1,
              unit_price: Number(order.price)
            }
          ],
          metadata: {
            eventId: order.eventId,
            buyerId: order.buyerId
          },
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            // pending: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            failure: `${process.env.NEXT_PUBLIC_SERVER_URL}/`
          },
          auto_return: 'approved'
        }
      })
      // .then(console.log)
      // .catch(console.log);
    redirect(preference.sandbox_init_point!)

  } catch (error) {
    throw error;
  }
}

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await initiateDBConnection();
    
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}