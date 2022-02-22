const omit = (obj, key) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

export { omit };
