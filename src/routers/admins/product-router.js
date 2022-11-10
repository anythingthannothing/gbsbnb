import { Router } from 'express';
import { productController } from '../../controllers';
import { productImageUpload } from '../../util';
import {
  asyncHandler,
  authenticator,
  checkRole,
  productValidator,
} from '../../middlewares';

const adminProductRouter = Router();

adminProductRouter.use(authenticator.isLoggedIn, checkRole);
adminProductRouter.get('/', asyncHandler(productController.getProductsByAdmin));
adminProductRouter.post(
  '/',
  productImageUpload.single('image'),
  productValidator.createProduct,
  asyncHandler(productController.createProduct),
);
adminProductRouter.put('/', asyncHandler(productController.updateProduct));
adminProductRouter.delete(
  '/:productId',
  asyncHandler(productController.deleteProduct),
);

export { adminProductRouter };