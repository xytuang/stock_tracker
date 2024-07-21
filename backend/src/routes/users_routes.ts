import { Router } from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/userController";
import { isAuthenticated, isOwner } from "../middlewares";
const usersRouter = Router();

usersRouter.get('/', isAuthenticated, getAllUsers);
usersRouter.delete('/:id', isAuthenticated, isOwner, deleteUser);
usersRouter.patch('/:id', isAuthenticated, isOwner, updateUser)
export default usersRouter;