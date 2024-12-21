export const getDifferenceArrays = (oldArr, newArr) => {
  return {
    deleted: oldArr.filter((oldItem) => !newArr.includes(oldItem)),
    inserted: newArr.filter((newItem) => !oldArr.includes(newItem)),
  };
};
