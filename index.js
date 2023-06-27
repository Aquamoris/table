function gettingData() {
    const tableRows = document.querySelectorAll('.tr__cars');

    let tableData = [];

    for (let i=0; i<tableRows.length; i++) {
        tableData.push(tableRows[i].querySelectorAll('td'));
    }

    resultData = [];

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

    return resultData;
}

function makeTableViewPrice (priceBefore) {
    let priceAfter = ''
    let count = 0;

    for (let i=priceBefore.length; i>0; i--) {
        priceAfter += priceBefore[i-1];
        count++;
        if (count == 3) {
            priceAfter += ' ';
            count = 0;
        }
    }
    return priceAfter.split('').reverse().join('');
}


function drawTable(data) {
    let newTable = document.createElement('table');

    newTable.classList.add('main-table');

    newTable.setAttribute('border', '1');
    newTable.setAttribute('cellspacing', '0');
    newTable.setAttribute('cellpadding', '5');
    newTable.setAttribute('bordercolor', 'white')

    let htmlTable = `<tr>
                        <th>Марка</th>
                        <th>Название</th>
                        <th>Страна</th>
                        <th>Двигатель (Л)</th>
                        <th>Мощность (л.с.)</th>
                        <th>0-100 км/ч (с)</th>
                        <th>Цена ($)</th>
                    </tr>`;

    for (let el of data) {
        htmlTable += `<tr class="tr__cars">
                        <td>${el.mark}</td>
                        <td>${el.name}</td>
                        <td>${el.country}</td>
                        <td>${el.engine}</td>
                        <td>${el.power}</td>
                        <td>${el.overclocking}</td>
                        <td>${makeTableViewPrice(el.price)}</td>
                      </tr>`;
    }
    
    newTable.innerHTML = htmlTable;

    const relativeElement = document.querySelector('.list-of-cars-content__hr')
    relativeElement.after(newTable);
}


function sortingAndDrawTable() {
    console.log(resultData);


    resultData.sort( (a, b) => a.price - b.price );
    console.log(resultData);

    const mainTable = document.querySelector('.main-table');
    mainTable.remove();

    drawTable(resultData);
}

const sortButton = document.querySelector('.sorting-button')
sortButton.addEventListener('click', sortingAndDrawTable.bind(gettingData()));