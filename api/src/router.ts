import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import { listCategories } from './app/useCases/categories/listCategories.js';
import { createCategory } from './app/useCases/categories/createCategory.js';
import { listProducts } from './app/useCases/products/listProducts.js';
import { createProduct } from './app/useCases/products/createProduct.js';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory.js';
import { listOrders } from './app/useCases/orders/listOrders.js';
import { createOrder } from './app/useCases/orders/createOrder.js';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus.js';
import { cancelOrder } from './app/useCases/orders/cancelOrder.js';

export const router: Router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(request, file, callback) {
      callback(null,path.resolve(__dirname, '..', 'uploads'));
    },
    filename(request, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}.png`);
    },
  })
});

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);
router.get('/categories/:categoryId/products', listProductsByCategory);
router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', cancelOrder);
