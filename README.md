# React E-commerce Shopping Cart

E-commerce Shopping Cart using React hooks like `useContext`, `useReducer` and
`useId`.

## The reason behind this project

This project comes from `Midudev's React Crash Curse` on YouTube:

- [Shop and Cart with React + Global State using useContext, useReducer and
  useId
  (2:02:39)](https://www.youtube.com/watch?v=B9tDYAZZxcE&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29&index=6)
  - Title translated by me. The original is in spanish.

In this video he shows a Technical Test and he leverage the experience teaching
how to use the React hooks like `useContext`, `useReducer` and `useId`

## Technical Test Statement

### E-commerce

- Display a list of products sourced from a JSON.
- Add a filter by category.
- Add a filter by price.

Utilize `useContext` to avoid passing unnecessary props.

### Shopping Cart

- Allow adding products to the cart.
- Enable removing products from the cart.
- Enable modifying the quantity of products in the cart.
- Synchronize changes in the cart with the list of products.
- Save the cart in localStorage for recovery upon page reload. (extra points)

## Use of React hooks

### useId

Creates a unique identifier depending on the position and order in which it is
being called. This id is globally, so it is the same on the server and client
(so could be used in `SSR`). However, It's not valid to use as a key in a
iteration. The main purpose of `useId` is to use it to identify unique and
globally something in an app. For example:

```jsx
<label htmlFor='category'>Category</label>
<select
  name="filterCategory"
  id='category'
  onChange={handleCategoryChanges}
>
  <option value="all">All</option>
  <option value="laptops">Laptops</option>
</select>
```

The identifier `category` is being used to associate the label with it's input.
That's useful for accessibility and usability. In bigger apps, this id could be
repeated. To avoid that, it's better to use `useId`.

```jsx
const categoryFilterId = useId();

return (
  // [...]

  <label htmlFor={categoryFilterId}>Category</label>
  <select
    name="filterCategory"
    id={categoryFilterId}
    onChange={handleCategoryChanges}
  >
    <option value="all">All</option>
    <option value="laptops">Laptops</option>
  </select>

  // [...]
)
```

### useContext

That React Hook provides global access to data and functions to any component
independent of it's nesting position avoiding `prop drilling`.

> Prop drilling is basically a situation when the same data is being sent at
> almost every level due to requirements in the final level
>
> [GeekForGeeks](https://www.geeksforgeeks.org/what-is-prop-drilling-and-how-to-avoid-it/)

```jsx
function MyHeading ({ imageUrl }) {
  return (
    <MyPicture
      imageUrl={imageUrl}
    />
  )
}

function MyPicture ({ imageUrl }) {
  return (
    <MyImg
      imageUrl={imageUrl}
    />
  )
}

function MyImg ({ imageUrl }) {
  return (
    <img src={imageUrl}/>
  )
}
```

With a context, the image will be used directly on `MyImg`component without
passing any prop. In this project, I use a context to use the filters:

```jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// 1 - Create the context
export const FiltersContext = createContext();

// 2 - Create the provider
export function FiltersProvider ({ children }) {
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);

  return (
    <FiltersContext.Provider
      value={{ category, setCategory, minPrice, setMinPrice }}
    >
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired
};
```

Any component wrapped by the provider will be able to access `category` and
`minPrice`.

### useRedux

Instead of creating a bunch of functions that mutates a state, with `useRedux`
you create 1 single function that returns the new state depending on the name of
an action.

```jsx
const CART_ACTIONS = {
  ADD: 0,
  REMOVE: 1,
  INCREASE_QTY: 2,
  DECREASE_QTY: 3,
  CLEAR: 4
};

function cartReducer (cart, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.ADD:
      [...]

    case CART_ACTIONS.REMOVE:
      [...]

    case CART_ACTIONS.INCREASE_QTY: 
      [...]

    case CART_ACTIONS.DECREASE_QTY:
      [...]

    case CART_ACTIONS.CLEAR:
      [...]

    default:
      throw new Error(type + ' Is an invalid cart reducer action');
  }
}

[...]

const CART_INITIAL_STATE = [];

const [cart, dispatch] = useReducer(
  cartReducer,
  CART_INITIAL_STATE
);

const addToCart = product => dispatch({
  type: CART_ACTIONS.ADD,
  payload: product
});

const increaseQuantity = id => dispatch({
  type: CART_ACTIONS.INCREASE_QTY,
  payload: id
});

const decreaseQuantity = id => dispatch({
  type: CART_ACTIONS.DECREASE_QTY,
  payload: id
});

const removeFromCart = id => dispatch({
  type: CART_ACTIONS.REMOVE,
  payload: id
});
```

It's a feature that replaces the `useState`. However, I consider that on vanilla
JS this kind of functions or patterns are useful too. In the following function
I perform different actions depending on a specific keyword.

```jsx
function modifyQuantity (cart, index, action) {
  const firstProducts = cart.slice(0, index);
  const lastProducts = cart.slice(index + 1);
  const product = structuredClone(cart[index]);

  switch (action) {
    case 'ADD':
      product.quantity++;
      product.totalPrice += product.price;
      break;

    case 'SUB':
      product.quantity--;
      product.totalPrice -= product.price;
      break;

    default:
      throw new Error(action + ' Is an invalid modify cart action');
  }

  return [...firstProducts, product, ...lastProducts];
}
```
