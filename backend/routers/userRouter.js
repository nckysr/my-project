import express from 'express';
import { createUser, editUser, getUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post("/",createUser);
userRouter.post("/login",loginUser);
userRouter.get("/",getUser);
userRouter.put("/:email",editUser);


export default userRouter;