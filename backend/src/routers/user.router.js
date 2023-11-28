import { Router } from "express";
import{userController} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/getUserData', userController.getUserData);
// userRouter.delete('/removeUser', userController.removeUser);

export{userRouter};