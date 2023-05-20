export const removeFromCart = (cart, item) => {
  const newCart = {
    ...cart,
    [item.name]: cart[item.name] - 1,
  };

  if (!newCart[item.name]) {
    delete newCart[item.name];
  }
  return newCart;
};

export const addToCart = (cart, item) => {
  if (cart.hasOwnProperty(item.name)) {
    return {
      ...cart,
      [item.name]: cart[item.name] + 1,
    };
  }

  return {
    ...cart,
    [item.name]: 1,
  };
};

export const getQuantityOfItemInCart = (cart, item) => {
  return cart[item.name] || 0;
};

export const getTotalItemsInCart = (cart) => {
  const ids = Object.keys(cart);
  if (!ids?.length) return 0;

  return ids.reduce((acc, id) => {
    return acc + cart[id];
  }, 0);
};
