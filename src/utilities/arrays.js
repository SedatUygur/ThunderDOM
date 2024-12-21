class ArrayWithIndices {
  // private props
  #arr = [];
  #indices = [];
  #equalsFunc;

  constructor(array, equalsFn) {
    this.#arr = [...array];
    this.#indices = array.map((_, i) => i);
    this.#equalsFunc = equalsFn;
  }

  get length() {
    return this.#arr.length;
  }

  deleteItem(index) {
    const operation = {
      index,
      item: this.#arr[index],
      op: ARRAY_OPS.DELETE,
    };

    this.#arr.splice(index, 1);
    this.#indices.splice(index, 1);

    return operation;
  }

  deleteItems(index) {
    const operations = [];

    while (this.length > index) {
      operations.push(this.deleteItem(index));
    }

    return operations;
  }

  findIndex(item, index) {
    for (let i = index; i < this.length; i++) {
      if (this.#equalsFunc(item, this.#arr[i])) {
        return i;
      }
    }

    return -1;
  }

  indexAt(index) {
    return this.#indices[index];
  }

  insertItem(item, index) {
    const operation = {
      index,
      item,
      op: ARRAY_OPS.INSERT,
    };

    this.#arr.splice(index, 0, item);
    this.#indices.splice(index, 0, -1);

    return operation;
  }

  isDeletion(index, newArray) {
    if (index >= this.length) {
      return false;
    }

    const item = this.#arr[index];
    const indexInNewArray = newArray.findIndex((newItem) =>
      this.#equalsFunc(item, newItem),
    );

    return indexInNewArray === -1;
  }

  isInsertion(item, fromIdx) {
    return this.findIndex(item, fromIdx) === -1;
  }

  isNoop(index, newArray) {
    if (index >= this.length) {
      return false;
    }

    const item = this.#arr[index];
    const newItem = newArray[index];

    return this.#equalsFunc(item, newItem);
  }

  moveItem(item, toIndex) {
    const fromIndex = this.findIndex(item, toIndex);

    const operation = {
      op: ARRAY_OPS.MOVE,
      originalIndex: this.indexAt(fromIndex),
      from: fromIndex,
      index: toIndex,
      item: this.#arr[fromIndex],
    };

    const [_item] = this.#arr.splice(fromIndex, 1);
    this.#arr.splice(toIndex, 0, _item);

    const [originalIndex] = this.#indices.splice(fromIndex, 1);
    this.#indices.splice(toIndex, 0, originalIndex);

    return operation;
  }

  noopItem(index) {
    return {
      index,
      item: this.#arr[index],
      op: ARRAY_OPS.NOOP,
      originalIndex: this.indexAt(index),
    };
  }
}

export const ARRAY_OPS = {
  DELETE: "delete",
  INSERT: "insert",
  MOVE: "move",
  NOOP: "noop",
};

export const getDifferenceArrays = (oldArr, newArr) => {
  return {
    deleted: oldArr.filter((oldItem) => !newArr.includes(oldItem)),
    inserted: newArr.filter((newItem) => !oldArr.includes(newItem)),
  };
};

export const getDifferenceArraysSequence = (
  oldArr,
  newArr,
  equalsFn = (a, b) => a === b,
) => {
  const sequence = [];
  const arr = new ArrayWithIndices(oldArr, equalsFn);

  for (let index = 0; index < newArr.length; index++) {
    if (arr.isDeletion(index, newArr)) {
      sequence.push(arr.deleteItem(index));
      index--;
      continue;
    }

    if (arr.isNoop(index, newArr)) {
      sequence.push(arr.noopItem(index));
      continue;
    }

    const item = newArr[index];

    if (arr.isInsertion(item, index)) {
      sequence.push(arr.insertItem(item, index));
      continue;
    }

    sequence.push(arr.moveItem(item, index));
  }

  sequence.push(...arr.deleteItems(newArr.length));

  return sequence;
};
