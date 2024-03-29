"use server";

import {
  CheckOrderParams,
  CheckoutOrderParams,
  CreateFreeOrderParams,
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { initiateDBConnection } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  try {
    // SDK de Mercado Pago
    // const client = new MercadoPagoConfig({
    //   accessToken: process.env.MP_ACCES_TOKEN!,
    // });
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCES_TOKEN_PROD!,
    });
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "order",
            title: order.eventTitle,
            quantity: 1,
            unit_price: Number(order.price),
          },
        ],
        metadata: {
          eventId: order.eventId,
          buyerId: order.buyerId,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
          // pending: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
          failure: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        },
        auto_return: "approved",
      },
    });
    // .then(console.log)
    // .catch(console.log);
    redirect(preference.init_point!);
  } catch (error) {
    throw error;
  }
};

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
};

export const createFreeOrder = async (order: CreateFreeOrderParams) => {
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
};

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await initiateDBConnection();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await initiateDBConnection();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: "Event",
        populate: {
          path: "organizer",
          model: "User",
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("event._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export const checkOrderExists = async (params: CheckOrderParams) => {
  try {
    await initiateDBConnection();

    const order = await Order.findOne({
      event: params.eventId,
      buyer: params.buyerId,
    });

    return order != null;
  } catch (error) {
    handleError(error);
  }
};
