const mark = document.getElementById('markFilter');
const nameOfCar = document.getElementById('nameFilter');
const country = document.getElementById('countryFilter');
const displacementFrom = document.getElementById('displacementFilterFrom');
const displacementTo = document.getElementById('displacementFilterTo');
const powerFrom = document.getElementById('powerFilterFrom');
const powerTo = document.getElementById('powerFilterTo');
const overclockFrom = document.getElementById('overclockFilterFrom');
const overclockTo = document.getElementById('overclockFilterTo');
const priceFrom = document.getElementById('priceFilterFrom');
const priceTo = document.getElementById('priceFilterTo');

const filterButton = document.querySelector('.filter-button');
const removeFilterButton = document.querySelector('.remove-filter-button');

function gettingData() {
    const tableRows = document.querySelectorAll('.tr__cars');

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

    return resultData;
}

const initialData = gettingData();

function applyFilter() {
    let newTable = [];

    for (const el of initialData) {
        if (
            el.mark.toLowerCase().startsWith(mark.value.toLowerCase()) && 
            el.name.toLowerCase().startsWith(nameOfCar.value.toLowerCase()) &&
            el.country.toLowerCase().startsWith(country.value.toLowerCase())
            ) {
                newTable.push(el);
        }
        // engine
        if (displacementFrom.value != '' || displacementTo.value != '') {
            if (displacementFrom.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+displacementFrom.value*10 > +newTable[i].engine*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
            if (displacementTo.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+displacementTo.value*10 < +newTable[i].engine*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
        }
        // power
        if (powerFrom.value != '' || powerTo.value != '') {
            if (powerFrom.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+powerFrom.value*10 > +newTable[i].power*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
            if (powerTo.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+powerTo.value*10 < +newTable[i].power*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
        }
        // overclocking
        if (overclockFrom.value != '' || overclockTo.value != '') {
            if (overclockFrom.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+overclockFrom.value*10 > +newTable[i].overclocking*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
            if (overclockTo.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+overclockTo.value*10 < +newTable[i].overclocking*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
        }
        // price
        if (priceFrom.value != '' || priceTo.value != '') {
            if (priceFrom.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+priceFrom.value*10 > +newTable[i].price*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
            if (priceTo.value != '') {
                for (let i = 0; i < newTable.length; i++) {
                    if (+priceTo.value*10 < +newTable[i].price*10) {
                        newTable.splice(i, 1);
                    }
                }
            }
        }
    }


    clearFilters();
    return newTable;
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

function removeTable() {
    const mainTable = document.querySelectorAll('.main-table');
    for (el of mainTable) {
        el.remove();
    }
}

function drawTable(data) {
    removeTable();

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

function clearFilters() {
    mark.value = '';
    nameOfCar.value = '';
    country.value = '';
    displacementFrom.value = '';
    displacementTo.value = '';
    powerFrom.value = '';
    powerTo.value = '';
    overclockFrom.value = '';
    overclockTo.value = '';
    priceFrom.value = '';
    priceTo.value = '';
}

console.log(applyFilter());

for (let el of applyFilter()) {
    console.log(`
        ${el.mark}
        ${el.name}
        ${el.country}
        ${el.engine}
        ${el.power}
        ${el.overclocking}
        ${el.price}
    `)
}

filterButton.addEventListener('click', () => drawTable(applyFilter()));

removeFilterButton.addEventListener('click', removeTable);
removeFilterButton.addEventListener('click', () => drawTable(initialData));