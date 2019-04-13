/**
 * 打乱数组并返回新数组
 * @param oArr 原数组
 * @returns {*}
 */
export function shuffleArray(oArr) {
  if (oArr.length == 0) return oArr
  let arr = oArr.slice(0)

  var len = arr.length,
    temp, rand;

  for (var i = 0; i < len; i++) {
    rand = Math.floor(Math.random() * i);
    let t = arr[i];
    arr[i] = arr[rand];
    arr[rand] = t;
  }
  return arr;
}

export function pad2Num(num) {
  return num.toString().padStart(2, '0')
}