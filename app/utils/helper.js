export const isEmpty = ((val) => {
    if (!val) {
        return true;
    }

    if (typeof val === 'string') {
        return !val.trim();
    }

    return !Object.keys(val).length;
});

export const returnPromise = (data) => {
    return Promise.resolve(data)
        .then((results) => {
            return results;
        })
        .catch((error) => {
            throw error;
        });
};

export const arrayCutItem = (array, index) => {
    if (!array || array.length < index) {
        return array;
    }

    return [
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length)
    ];
};

export const arraySwipeItem = (array, firstIndex, secondIndex) => {
    if (!array || array.length < firstIndex || array.length < secondIndex) {
        return array;
    }

    const item = array[firstIndex];
    array.splice(firstIndex, 1);
    array.splice(secondIndex, 0, item);
};
