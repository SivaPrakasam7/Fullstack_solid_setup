import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import bodyParser from 'body-parser';

dotenv.config();

// Files imports here
import { errorHandler } from 'src/handler/error';
import { logAccess } from 'src/handler/logger';
import userRotes from 'src/routes/user';

//
const app = express();
const port = process.env.PORT;

app.use(logAccess);

app.use(bodyParser.json({ limit: '5MB' }));
app.use(bodyParser.urlencoded({ limit: '5MB', extended: true }));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.use('/v1/user', userRotes);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test')
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

export default app;
