import type { Request, Response } from 'express';
import { Order } from '../../models/Order.js';

export async function listOrders(request: Request, response: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: 1 }).populate('products.product');
    response.json({ orders });
  } catch {
    response.sendStatus(500);
  }
}
