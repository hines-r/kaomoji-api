import express, {Application, Request, Response} from 'express';
import { json } from 'stream/consumers';
import kaomojis from './kaomoji.json';

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.json('Welcome to the Kaomoji API!');
});

app.get('/tags', (req: Request, res: Response) => {
    res.json(Object.keys(kaomojis));
});

app.get('/kaomojis', (req: Request, res: Response) => {
    let result: string[] = [];
    let searchKey: string = req.query.tag as string;

    if (searchKey) {
        const filteredKaomojis: string[] = kaomojis[Object.keys(kaomojis).find(key => key.toLowerCase() === searchKey.toLowerCase())];

        if (filteredKaomojis) {
            result = filteredKaomojis.map(x => x.trim());                  
            res.json(result);
        }
    }
    else {
        result = JSON.parse(JSON.stringify(kaomojis));
        res.json(result);
    }
    
    if (result.length == 0) {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
