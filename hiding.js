const sortFirst = document.getElementById('sortFirst');
const sortSecond = document.getElementById('sortSecond');
const sortThird = document.getElementById('sortThird');

const hide = () => {
    for (const element of sortFirst) {
        element.removeAttribute('hidden');
    }
    for (const element of sortSecond) {
        element.removeAttribute('hidden');
    }
    for (const element of sortThird) {
        element.removeAttribute('hidden');
    }

    let value1 = sortFirst.value;
    let value2 = sortSecond.value;
    let value3 = sortThird.value;

    if (value1 != 'none') {
        for (const el of sortSecond) {
            if (el.value == value1) {
                el.setAttribute('hidden', '');
            }
        }
        for (const el of sortThird) {
            if (el.value == value1) {
                el.setAttribute('hidden', '');
            }
        }
    }

    if (value2 != 'none') {
        for (const el of sortFirst) {
            if (el.value == value2) {
                el.setAttribute('hidden', '');
            }
        }
        for (const el of sortThird) {
            if (el.value == value2) {
                el.setAttribute('hidden', '');
            }
        }
    }

    if (value3 != 'none') {
        for (const el of sortFirst) {
            if (el.value == value3) {
                el.setAttribute('hidden', '');
            }
        }
        for (const el of sortSecond) {
            if (el.value == value3) {
                el.setAttribute('hidden', '');
            }
        }
    }
}

sortFirst.addEventListener('change', hide);
sortSecond.addEventListener('change', hide);
sortThird.addEventListener('change', hide);