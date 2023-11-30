import { Router } from "express";
import { blogController } from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/getListOfProducts", blogController.getAll);
blogRouter.get("/getBlog", blogController.getOne);
blogRouter.post("/addNewBlog", blogController.addNew);
blogRouter.put("/updateBlog", blogController.update);
blogRouter.delete('/deleteBlog', blogController.delete);

export { blogRouter };
