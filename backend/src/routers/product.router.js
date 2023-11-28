import { Router } from "express";
import { productController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/getListOfProducts", productController.getAll);
productRouter.post("/addNewProduct", productController.addNew);
productRouter.put("/updateProduct", productController.update);
productRouter.delete('/deleteProduct', productController.delete);

export { productRouter };
