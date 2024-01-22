import {Router} from 'express';
import {ProductWithoutId} from '../types';
import fileDb from '../fileDb';
import {imagesUpload} from '../multer';

const productsRouter = Router();
productsRouter.get('/', async (req, res) => {
  const products = await fileDb.getItem();
  res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const products = await fileDb.getItem();
  const product = products.find(p => p.id === req.params.id);
  res.send(product);
});

productsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const product: ProductWithoutId = {
    title: req.body.title,
    price: parseFloat(req.body.price),
    description: req.body.description,
    image: req.file ? req.file.fieldname : null,
  };
  
  const newProduct = await fileDb.addItem(product);
  res.send(newProduct);
});

export default productsRouter;