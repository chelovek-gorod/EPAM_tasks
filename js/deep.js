let userArr = [0, 1, 2, 3, 4, 5];
// _+1, 0+2, 1+3, 2+4, 3+5, 4+_
// resultArr = [1, 2, 4, 6, 8, 4]
let resultArr1 = userArr.map(getApprox1);
let resultArr2 = getApprox2(userArr);

function getApprox1(v, i ,a) {
    console.log(v);
    let prev = a[i-1] ? a[i-1] : 0;
    let next = a[i+1] ? a[i+1] : 0;
    return prev + next;
}

function getApprox2(arr) {
    let resArr = [];
    let arrSize = arr.length;
    for (let i = 0; i < arrSize; i++) {
        let prev = arr[i-1] ? arr[i-1] : 0;
        let next = arr[i+1] ? arr[i+1] : 0;
        resArr.push(prev + next);
    }
    return resArr;
}

console.log(resultArr1);
console.log(resultArr2);

/****************************/
/****************************/

let userDeepArr2 = [[0, 1, 2],[1, 2, 3],[2, 3, 4],[3, 4, 5],[4, 5, 6]];
/*
-------------------
|  0  |  1  |  2  |  -> 2  4  4
-------------------
|  1  |  2  |  3  |  -> 4  8  8
-------------------
|  2  |  3  |  4  |  -> 7 12 11
-------------------
|  3 |  4  |  5  |  -> 10 16 14
-------------------
|  4 |  5  |  6  |  -> 8  14 10
------------------
*/

let userDeepArr3 = [[0, 1, 2, 3],[3, 4, 5, 6],[6, 7, 8, 9]];
/*
-------------------------
|  0  |  1  |  2  |  3  |  -> 4  6  9  8
-------------------------
|  3  |  4  |  5  |  6  |  -> 10 16 20 17
-------------------------
|  6  |  7  |  8  |  9  |  -> 10 18 21 14
-------------------------
*/

let resultDeepArr2 = getDeepApprox(userDeepArr2);
console.log('\nresultDeepArr2');
console.log(resultDeepArr2);

let resultDeepArr3 = getDeepApprox(userDeepArr3);
console.log('\nresultDeepArr3');
console.log(resultDeepArr3);

function getDeepApprox(mainArr, prevArr, nextArr) {
    console.log(mainArr);
    console.log(prevArr);
    console.log(nextArr);
    let resArr = [];
    let arrSize = mainArr.length;
    for (let i = 0; i < arrSize; i++) {

        if (Array.isArray(mainArr[i])) {
            let prevArr = mainArr[i-1] ? mainArr[i-1] : undefined;
            let nextArr = mainArr[i+1] ? mainArr[i+1] : undefined;
            resArr.push(getDeepApprox(mainArr[i] , prevArr, nextArr));
        }
        else {
            let sum = 0;
            sum += mainArr[i-1] ? mainArr[i-1] : 0;
            sum += mainArr[i+1] ? mainArr[i+1] : 0;
            sum += prevArr ? prevArr[i] : 0;
            sum += nextArr ? nextArr[i] : 0;
            resArr.push(sum);
        }
    }
    return resArr;
}

// // 

// //

let userDeepArr3 = [
    [[0, 1, 2],[1, 2, 3],[2, 3, 4]],
    [[1, 2, 3],[2, 3, 4],[3, 4, 5]],
    [[2, 3, 4],[3, 4, 5],[4, 5, 6]]
];
/*
*/
let resultDeepArr3 = getDeepApprox(userDeepArr3);
console.log('\nresultDeepArr3');
console.log(resultDeepArr3);

/* SUPER DEEP */

let userSuperDeepArr3D = [
    [
        [0, 1, 2],
        [1, 2, 3],
        [2, 3, 4]
    ], [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5]
    ], [
        [2, 3, 4],
        [3, 4, 5],
        [4, 5, 6]
    ]
];
/*
*/
let resultSuperDeepArr3D = getSuperDeepApprox(userSuperDeepArr3D);
console.log('\ngetSuperDeepApprox');
console.log(getSuperDeepApprox);

function getSuperDeepApprox(arr, depth, ...arrs) {
    let depth = depth ? depth++ : undefined;
    let resArr = [];
    let arrSize = arr.length;
    for (let i = 0; i < arrSize; i++) {

        if (Array.isArray(arr[i])) {
            let deep = arrs.length;
            let deepArr = [];
            while (deep) {
                let prevArr = arr[i-1] ? arr[i-1] : undefined;
                let nextArr = arr[i+1] ? arr[i+1] : undefined;
                deepArr.push(prevArr);
                deepArr.push(nextArr);
                deep--;
            }
            resArr.push(getDeepApprox(arr[i] , arrs.length, deepArr));
        }
        else {
            let sum = 0;
            sum += arr[i-1] ? arr[i-1] : 0;
            sum += arr[i+1] ? arr[i+1] : 0;
            sum += prevArr ? prevArr[i] : 0;
            sum += nextArr ? nextArr[i] : 0;
            resArr.push(sum);
        }
    }
    return resArr;
}