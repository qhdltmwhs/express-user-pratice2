import express from 'express';
import 'dotenv/config';

import passport from './lib/passport.js';
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routers/userRouter.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use(userRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is Running Port: ${port}`);
});
