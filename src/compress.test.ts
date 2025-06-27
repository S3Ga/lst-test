import { Compress } from "./compress";

function createArray(count = 50, max = 300, min = 1) {
    const arr = [];

    for (let i = 0; i < count; i++) {
        const number = Math.floor(Math.random() * (max - min) + min);
        arr.push(number);
    }

    return arr;
}

function createTripleArray() {
    const result = [];
    for (let i = 1; i <= 300; i++) {
        result.push(i, i, i);
    }
    return result;
}

const tests = [
    { name: "50 numbers", data: createArray() },
    { name: "100 numbers", data: createArray(100) },
    { name: "500 numbers", data: createArray(500) },
    { name: "1000 numbers", data: createArray(1000) },
    { name: "1000 numbers (1digit)", data: createArray(1000, 10) },
    { name: "1000 numbers (2digit)", data: createArray(1000, 99, 10) },
    { name: "1000 numbers (3digit)", data: createArray(1000, 299, 100) },
    { name: "900 numbers (triple)", data: createTripleArray() },
];

tests.forEach((test) => {
    const compressed = Compress.compress(test.data);

    addToTable(test.name, test.data, compressed);
});

function addToTable(name: string, original: number[], compressed: string) {
    const tbody = document.getElementById("results");
    const row = document.createElement("tr");

    const ratio = compressed.length / JSON.stringify(original).length;

    row.innerHTML = `
                <td>${name}</td>
                <td>${original.length} symbols</td>
                <td>${compressed.length} symbols</td>
                <td class="${ratio < 0.5 ? "good" : "bad"}">${(
        (1 - ratio) *
        100
    ).toFixed(1)}%</td>


                <td>
                    <details>
                        <summary>Original</summary>
                        ${original}
                    </details>
                </td>

                <td>
                    <details>
                        <summary>Compressed</summary>
                        ${compressed}
                    </details>
                </td>
            `;

    tbody?.appendChild(row);
}
