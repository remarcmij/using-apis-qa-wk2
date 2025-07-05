import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3030;

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.json());
app.use(morgan('tiny'));

app.get('/pokemons', (req, res) => {
  res.sendFile('/pokemons.json', {
    root: '.',
    headers: { ContentType: 'application/json' },
  });
});

app.put('/pokemons', (req, res) => {
  console.log(req.body);
  res.json({ received: req.body });
});

app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
