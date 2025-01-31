import express from "express";

import { createUser, getUserByEmail, getUserBySessionToken } from "../db/users";
import { authentication, random } from "../helpers"; 

export const check = async(req: express.Request, res: express.Response) => {
    try {
        const token = req.cookies.STOCK_TRACKER_AUTH
        if (!token) {
            return res.sendStatus(401);
        }

        const user = await getUserBySessionToken(token);

        if (!user) {
            return res.sendStatus(401);
        }
        return res.status(200).json(user).end();
    } 
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random()

        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        return res.status(200).json(user).end();
    } 
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            //console.log("no email or password")
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user || !user.authentication || !user.authentication.salt) {
            //console.log("invalid user")
            return res.sendStatus(400);
        }
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash) {
            //console.log("invalid password")
            return res.sendStatus(403);
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user.id.toString());

        await user.save();

        res.cookie('STOCK_TRACKER_AUTH', user.authentication.sessionToken, { 
            httpOnly: true,
            secure: true,
            sameSite: true,
            domain: 'localhost', 
            path: '/' 
        });

        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    res.clearCookie('STOCK_TRACKER_AUTH', { path: '/' });
    return res.sendStatus(200);
}