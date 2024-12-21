export const findDifferenceObjects = (oldObj, newObj) => {
  const oldObjKeys = Object.keys(oldObj);
  const newObjKeys = Object.keys(newObj);

  return {
    deleted: oldObjKeys.filter((key) => !(key in newObj)),
    edited: newObjKeys.filter(
      (key) => key in oldObj && oldObj[key] !== newObj[key],
    ),
    inserted: newObjKeys.filter((key) => !(key in oldObj)),
  };
};
