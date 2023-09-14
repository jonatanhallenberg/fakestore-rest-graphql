import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log(req.headers);
    res.send('Hello World!');
}
);

app.post('/', (req, res) => {
    res.send('Du gjorde en post');
})

app.get('/products', async (req, res) => {
    const json = await (await fetch('https://fakestoreapi.com/products')).json();
    res.send(json);
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);

