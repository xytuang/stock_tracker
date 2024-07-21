import { Router } from "express";
import { login, register } from "../controllers/authenticationController";

const authenticationRouter = Router();
authenticationRouter.post('/register', register)
authenticationRouter.post('/login', login)


export default authenticationRouter;