const createStorageInstance = (key: string) => {
  const get = () => {
    return localStorage.getItem(key);
  };
  const set = (value: string) => {
    return localStorage.setItem(key, value);
  };
  const remove = () => {
    return localStorage.removeItem(key);
  };

  return {
    get,
    set,
    remove,
  };
};

export const tokenStorage = createStorageInstance('token');
export const userStorage = createStorageInstance('user_info');
