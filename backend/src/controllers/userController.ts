import express from "express";

import { getUsers, deleteUserById, getUserById, getUserBySessionToken } from "../db/users";

export const getAllUsers = async(req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async(req: express.Request, res: express.Response) => {
    try  {
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);
        return res.json(deleteUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }
        const user = await getUserById(id);
        if (!user) {
            return res.sendStatus(400);
        }
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    }
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getPortfolio = async(req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['STOCK_TRACKER_AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }
        return res.status(200).json(existingUser).end();
    }
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updatePortfolio = async(req: express.Request, res: express.Response) => {
    try {
        const sessionToken = req.cookies['STOCK_TRACKER_AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        const { name, ticker, price, quantity } = req.body;
        if (!name || !ticker || !price || !quantity) {
            return res.sendStatus(400);
        }

        existingUser.portfolio.push({name, ticker, price, quantity});
        await existingUser.save();
        return res.status(200).json(existingUser).end();
    }
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
