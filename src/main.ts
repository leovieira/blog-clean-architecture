import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('hello world!');
});

app.listen(3000, () => {
    console.log('Server is listening at http://localhost:3000')
});
