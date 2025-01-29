export function getDifference(array1, array2, setstate, meal, setsecondstate) {
  let arr = [];
  let secondarr = [];
  let thirdarr = [];

  array1.filter((object1) => {
    return array2?.some((object2, ind) => {
      if (object1._id == object2._id) {
        if (meal) {
          secondarr.push(array1.find((item) => item._id === object2._id));
        } else {
          let pushtobe = array2.find((item) => item._id === object1._id);
          secondarr.push(pushtobe);
          thirdarr.push(pushtobe._id);
        }
        arr.push(array1.findIndex((item) => item._id === object2._id));
      }
    });
  });
  setstate(secondarr);
  if (setsecondstate !== undefined) {
    setsecondstate(thirdarr);
  }
  return [...new Set(arr)];
}

export function getSimpleDiff(array1, array2, setstate) {
  let arr = [];
  let secondarr = [];

  array1.filter((object1) => {
    return array2.some((object2, ind) => {
      if (object1 === object2) {
        secondarr.push(array1.find((item) => item === object2));
        arr.push(array1.findIndex((item) => item === object2));
      }
    });
  });
  setstate(secondarr);
  return [...new Set(arr)];
}

export function getTryDifference(
  array1,
  array2,
  setstate,
  meal,
  setsecondstate
) {
  let arr = [];
  let secondarr = [];
  let thirdarr = [];

  array1.filter((object1) => {
    return array2?.some((object2, ind) => {
      if (object1._id == object2) {
        if (meal) {
          secondarr.push(array1.find((item) => item._id === object2._id));
        } else {
          let pushtobe = array2.find((item) => item === object1._id);
          secondarr.push(pushtobe);
          thirdarr.push(pushtobe);
        }
        arr.push(array1.findIndex((item) => item._id === object2));
      }
    });
  });
  setstate(secondarr);
  if (setsecondstate !== undefined) {
    setsecondstate(thirdarr);
  }
  return [...new Set(arr)];
}
