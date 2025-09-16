import type { Request, Response } from 'express';
import { Product } from '../../models/Product.js';

export async function listProducts(request: Request, response: Response) {
  try {
    const products = await Product.find();
    response.json({ products });
  } catch {
    response.sendStatus(500);
  }
}
