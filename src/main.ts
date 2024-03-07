import express, { Request, Response } from 'express';

import routes from './infra/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000')
});
