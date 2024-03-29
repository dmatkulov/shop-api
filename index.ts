import express from 'express';
import productsRouter from './routers/products';
import cors from 'cors';
import fileDb from './fileDb';
import mysqlDb from './mysqlDb';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);

const run = async () => {
  await mysqlDb.init();
  
  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};

run().catch(console.error);
