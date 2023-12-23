# React E-commerce Shopping Cart

E-commerce Shopping Cart using React hooks like `useContext`, `useReducer` and
`useId`.

## The reason behind this project

This project comes from `Midudev's React Crash Curse` on YouTube:

- [Shop and Cart with React + Global State using useContext, useReducer and
  useId (2:02:39)](https://www.youtube.com/watch?v=B9tDYAZZxcE&list=PLUofhDIg_38q4D0xNWp7FEHOTcZhjWJ29&index=6)
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
