import { Router } from "express";
import { check, login, register } from "../controllers/authenticationController";

const authenticationRouter = Router();
authenticationRouter.get('/check', check)
authenticationRouter.post('/register', register)
authenticationRouter.post('/login', login)


export default authenticationRouter;