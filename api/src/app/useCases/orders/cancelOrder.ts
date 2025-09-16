import type { Request, Response } from 'express';
import { Order } from '../../models/Order.js';

export async function cancelOrder(request: Request, response: Response) {
  try {
    const { orderId } = request.params;
    await Order.findByIdAndDelete(orderId);
    response.sendStatus(204);
  } catch {
    response.sendStatus(500);
  }
}
