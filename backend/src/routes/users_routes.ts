import { Router } from "express";
import { getAllUsers, deleteUser, updateUser, getPortfolio, updatePortfolio } from "../controllers/userController";
import { isAuthenticated, isOwner } from "../middlewares";
const usersRouter = Router();

usersRouter.get('/', isAuthenticated, getAllUsers);
usersRouter.delete('/:id', isAuthenticated, isOwner, deleteUser);
usersRouter.patch('/:id', isAuthenticated, isOwner, updateUser)
usersRouter.get('/:id/portfolio', isAuthenticated, isOwner, getPortfolio)
usersRouter.patch('/:id/portfolio', isAuthenticated, isOwner, updatePortfolio)
export default usersRouter;