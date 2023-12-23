import { products } from './mocks/products.json';
import Products from './components/Products';

export default function App () {
  return (
    <>
      <header>
        <h1>React E-commerce Shopping Cart</h1>
      </header>

      <main>
        <Products products={products}/>
      </main>
    </>
  );
}
