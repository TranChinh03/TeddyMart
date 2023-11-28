const createOrderID = () => {
  return "ORD" + Math.floor(Math.random() * 100000);
};

export { createOrderID };
