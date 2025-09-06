import express from 'express';
import userService from '../services/userService.js';
import passport from '../lib/passport.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = await userService.getUser(username, password);
            const accessToken = userService.createToken(user);
            res.status(200).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/profile',
    passport.authenticate('access-token', { session: false }),
    async (req, res, next) => {
        try {
            res.status(200).json({ message: `Protected profile data for ${req.user.username}` });
        } catch (error) {
            next(error);
        }
    }
);

export default router;

