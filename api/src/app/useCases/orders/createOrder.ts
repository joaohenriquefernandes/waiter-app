import type { Request, Response } from 'express';
import { Order } from '../../models/Order.js';
import { io } from '../../../index.js';

export async function createOrder(request: Request, response: Response) {
  try {
    const { table, products } = request.body;
    const order = await Order.create({ table, products });
    const orderDetails = await order.populate('products.product');
    io.emit('orders@new', orderDetails);
    response.status(201).json({ order });
  } catch {
    response.sendStatus(500);
  }
}
