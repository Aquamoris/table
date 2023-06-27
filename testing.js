// бещ bind sortButton.addEventListener('click', sortingAndDrawTable, {"once": true});

function sortingAndDrawTable() {

    const tableRows = document.querySelectorAll('.tr__cars');

    const relEl = document.querySelector('.list-of-cars-content__hr')
    console.log(resultData);

    let tableData = [];

    for (let i=0; i<tableRows.length; i++) {
        tableData.push(tableRows[i].querySelectorAll('td'));
    }

    resultData = []

    for (el of tableData) {
        resultData.push({
            mark: `${el[0].innerHTML}`,
            name: `${el[1].innerHTML}`,
            country: `${el[2].innerHTML}`,
            engine: `${el[3].innerHTML}`,
            power: `${el[4].innerHTML}`,
            overclocking: `${el[5].innerHTML}`,
            price: `${el[6].innerHTML.split(' ')[0] + el[6].innerHTML.split(' ')[1]}`
        });
    }

    resultData.sort( (a, b) => a.price - b.price );
    console.log(resultData);

    const mainTable = document.querySelector('.main-table');
    mainTable.remove();

    drawTable(resultData, relEl, "after");
}