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
