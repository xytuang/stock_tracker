import { Router } from "express";
import { check, login, logout, register } from "../controllers/authenticationController";

const authenticationRouter = Router();
authenticationRouter.get('/check', check)
authenticationRouter.post('/register', register)
authenticationRouter.post('/login', login)
authenticationRouter.post('/logout', logout)


export default authenticationRouter;