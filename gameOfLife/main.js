//creating random start array

function createField(plotis, ilgis) {
    let field = new Array(plotis);
    for (let i = 0; i < field.length; i++) {
        field[i] = new Array(ilgis);
        for (let j = 0; j < field[i].length; j++) {
            field[i][j] = (Math.random() < 0.25) ? 'X' : '.';
        }

    }
    return field;
}

const field = createField(10, 30);

function printStartArray() {
    const start = document.getElementById("start");
    start.appendChild(arrayToTable(field));
}

function arrayToTable(array) {
    const table = document.createElement("table");
    for (const mas of array) {
        const trow = document.createElement("tr");
        for (const char of mas) {
            const tdata = document.createElement("td");
            tdata.appendChild(document.createTextNode(char));
            trow.appendChild(tdata);
        }
        table.appendChild(trow);
    }
    return table;
}

//This part for printing all iterations on the HTML document

// function run() {
//     let iterSk = +prompt("Įveskite iteracijų skaičių");

//     let temp = new Array(field.length);
//     let master = new Array(iterSk);
//     let atitikimai = 0;
//     let pasikartoja = false;
//     let masterDiv = document.getElementById("lenteles");
//     for (let i = 0; i < iterSk; i++) {
//         let div = document.createElement("div");
//         div.className = "col-6";
//         let innerDiv = document.createElement("div");
//         innerDiv.appendChild(document.createTextNode((i + 1) + " iteracija"))
//         div.appendChild(innerDiv);
//         master[i] = new Array();
//         let kaimynuSk = new Array();
//         for (let y = 0; y < field.length; y++) {
//             kaimynuSk[y] = new Array();
//             master[i][y] = new Array();
//             temp[y] = new Array();
//             for (let x = 0; x < field[y].length; x++) {
//                 let kaimSk = 0;
//                 if (y - 1 >= 0 && x - 1 >= 0 && field[y - 1][x - 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if (y - 1 >= 0 && field[y - 1][x] === 'X') {
//                     kaimSk++;
//                 }

//                 if (y - 1 >= 0 && x + 1 < field[y].length && field[y - 1][x + 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if (x + 1 < field[y].length && field[y][x + 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if (y + 1 < field.length && x + 1 < field[y].length && field[y + 1][x + 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if (y + 1 < field.length && field[y + 1][x] === 'X') {
//                     kaimSk++;
//                 }

//                 if (y + 1 < field.length && x - 1 >= 0 && field[y + 1][x - 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if (x - 1 >= 0 && field[y][x - 1] === 'X') {
//                     kaimSk++;
//                 }

//                 if ((field[y][x] === 'X' && (kaimSk === 2 || kaimSk === 3)) || (field[y][x] === '.' && kaimSk === 3)) {
//                     temp[y][x] = 'X';
//                 } else {
//                     temp[y][x] = '.';
//                 }

//                 master[i][y][x] = temp[y][x];
//                 field[y][x] = temp[y][x];
//             }

//         }

//         for (let j = 0; j < i; j++) {
//             for (let y = 0; y < field.length; y++) {
//                 for (let x = 0; x < field[y].length; x++) {
//                     if (master[i][y][x] === master[j][y][x]) {
//                         atitikimai += 1;
//                     }
//                 }
//             }
//             if (atitikimai === field.length * field[0].length) {
//                 pasikartoja = true;
//             } else {
//                 atitikimai = 0;
//             }
//         }

//         div.appendChild(arrayToTable(master[i]))
//         masterDiv.appendChild(div);

//         if (pasikartoja) {
//             let p = document.createElement("p");
//             p.appendChild(document.createTextNode(i + 1 + " iteracija pasikartojo"))
//             masterDiv.appendChild(p);
//             break;
//         }
//     }

// }


//This part is for printing each iteration for one second, stops after iteration is repeated with any previous iteration

function cleanElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

function delay(milliseconds) {
    return new Promise(res => {
        setTimeout(res, milliseconds);
    });
}

async function run() {
    let iterSk = +prompt("Įveskite iteracijų skaičių");

    let master = new Array(iterSk);
    let atitikimai = 0;
    let pasikartoja = false;
    let pasikartojimoIteracija;
    let masterDiv = document.getElementById("lenteles");
    master[0] = nextField(field);
    for (let i = 1; i < master.length; i++) {
        master[i] = nextField(master[i - 1]);
        let innerDiv = document.createElement("div");
        innerDiv.appendChild(document.createTextNode((i + 1) + " iteracija"))
        masterDiv.appendChild(innerDiv);
        for (let j = 0; j < i; j++) {
            for (let y = 0; y < field.length; y++) {
                for (let x = 0; x < field[y].length; x++) {
                    if (master[i][y][x] === master[j][y][x]) {
                        atitikimai += 1;
                    }
                }
            }
            if (atitikimai === field.length * field[0].length) {
                pasikartoja = true;
                pasikartojimoIteracija = j + 1;
            } else {
                atitikimai = 0;
            }
        }

        masterDiv.appendChild(arrayToTable(master[i]));

        if (pasikartoja || i === master.length - 1) {
            let p = document.createElement("p");
            if (pasikartoja) {
                p.appendChild(document.createTextNode((i + 1) + " iteracija pasikartojo su iteracija Nr. " + pasikartojimoIteracija));
            } else {
                p.appendChild(document.createTextNode("Iteracija pasibaigė, pasikartojimų nerasta"));
            }
            masterDiv.appendChild(p);
            break;
        } else {
            await delay(1000);
            cleanElement(masterDiv);
        }
    }
}




function nextField(array) {
    next = new Array(array.length);
    for (let y = 0; y < array.length; y++) {
        next[y] = new Array(array[y].length);
        for (let x = 0; x < array[y].length; x++) {
            let kaimSk = 0;
            if (y - 1 >= 0 && x - 1 >= 0 && array[y - 1][x - 1] === 'X') {
                kaimSk++;
            }

            if (y - 1 >= 0 && array[y - 1][x] === 'X') {
                kaimSk++;
            }

            if (y - 1 >= 0 && x + 1 < array[y].length && array[y - 1][x + 1] === 'X') {
                kaimSk++;
            }

            if (x + 1 < array[y].length && array[y][x + 1] === 'X') {
                kaimSk++;
            }

            if (y + 1 < array.length && x + 1 < array[y].length && array[y + 1][x + 1] === 'X') {
                kaimSk++;
            }

            if (y + 1 < array.length && array[y + 1][x] === 'X') {
                kaimSk++;
            }

            if (y + 1 < array.length && x - 1 >= 0 && array[y + 1][x - 1] === 'X') {
                kaimSk++;
            }

            if (x - 1 >= 0 && array[y][x - 1] === 'X') {
                kaimSk++;
            }

            if ((array[y][x] === 'X' && (kaimSk === 2 || kaimSk === 3)) || (array[y][x] === '.' && kaimSk === 3)) {
                next[y][x] = 'X';
            } else {
                next[y][x] = '.';
            }
        }

    }
    return next;
}
