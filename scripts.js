// Завдання 1: Валідація форми
document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;
    const currentDate = new Date();
    const minimumAge = 18;

    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    document.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));

    // Перевірка ПІБ
    const pibPattern = /^[А-ЯҐЄІЇ][а-яґєії']+\s[А-ЯҐЄІЇ]\.[А-ЯҐЄІЇ]\.$/;
    const pib = document.getElementById('pib').value;
    if (!pibPattern.test(pib)) {
        valid = false;
        document.getElementById('pibError').textContent = 'Неправильний формат ПІБ';
        document.getElementById('pib').classList.add('invalid');
    }

    // Перевірка ID-карти
    const idPattern = /^[А-ЯҐЄІЇ]{2}\s№\d{6}$/;
    const idCard = document.getElementById('idcard').value;
    if (!idPattern.test(idCard)) {
        valid = false;
        document.getElementById('idcardError').textContent = 'Неправильний формат ID-карти';
        document.getElementById('idcard').classList.add('invalid');
    }

    // Перевірка факультету
    const facultyPattern = /^[А-ЯҐЄІЇ]{4}$/;
    const faculty = document.getElementById('faculty').value;
    if (!facultyPattern.test(faculty)) {
        valid = false;
        document.getElementById('facultyError').textContent = 'Неправильний формат факультету';
        document.getElementById('faculty').classList.add('invalid');
    }

    // Перевірка дати народження
    const dobPattern = /^\d{2}\.\d{2}\.\d{4}$/;
    const dob = document.getElementById('dob').value;
    if (!dobPattern.test(dob)) {
        valid = false;
        document.getElementById('dobError').textContent = 'Неправильний формат дати народження';
        document.getElementById('dob').classList.add('invalid');
    } else {
        const [day, month, year] = dob.split('.').map(Number);
        const birthDate = new Date(year, month - 1, day);

        if (birthDate > currentDate || birthDate.getFullYear() !== year || birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
            valid = false;
            document.getElementById('dobError').textContent = 'Неправильна дата народження';
            document.getElementById('dob').classList.add('invalid');
        } else {
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            if (age < minimumAge) {
                valid = false;
                document.getElementById('dobError').textContent = 'Вам повинно бути щонайменше 18 років';
                document.getElementById('dob').classList.add('invalid');
            }
        }
    }

    // Перевірка адреси
    const addressPattern = /^м\.\s[А-ЯҐЄІЇа-яґєії]{2,}$/;
    const address = document.getElementById('address').value;
    if (!addressPattern.test(address)) {
        valid = false;
        document.getElementById('addressError').textContent = 'Неправильний формат адреси';
        document.getElementById('address').classList.add('invalid');
    }

    if (valid) {
        // Якщо всі поля валідні, виводимо введену інформацію в окремому вікні
        const output = `
            <h3>Введена інформація:</h3>
            <p><strong>ПІБ:</strong> ${pib}</p>
            <p><strong>ID-карта:</strong> ${idCard}</p>
            <p><strong>Факультет:</strong> ${faculty}</p>
            <p><strong>Дата народження:</strong> ${dob}</p>
            <p><strong>Адреса:</strong> ${address}</p>
        `;

        const newWindow = window.open('', '_blank', 'width=400,height=400');
        newWindow.document.write(output);
        newWindow.document.close();
    }
});


// Завдання 2: Таблиця 6x6
const table = document.getElementById('myTable');
let variantNumber = 4;

// Заповнюємо таблицю числами від 1 до 36
let counter = 1;
for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 6; j++) {
        const cell = row.insertCell();
        cell.textContent = counter;
        cell.setAttribute('data-number', counter);
        counter++;
    }
}

// Функція для випадкової зміни кольору
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Вибираємо палітру для зміни кольору
const colorPicker = document.getElementById('colorPicker');

// Додаємо події до клітинки із варіантом 4
const variantCell = document.querySelector(`[data-number="${variantNumber}"]`);

// Наведення миші - змінюємо на випадковий колір
variantCell.addEventListener('mouseover', () => {
    variantCell.style.backgroundColor = getRandomColor();
});

// Натискання - змінюємо колір на обраний з палітри
variantCell.addEventListener('click', () => {
    variantCell.style.backgroundColor = colorPicker.value;
});

// Подвійне натискання - змінюємо колір побічної діагоналі
variantCell.addEventListener('dblclick', () => {
    const diagonalCells = [];

    // Знаходимо клітинки побічної діагоналі
    for (let i = 0; i < 6; i++) {
        const cell = table.rows[i].cells[5 - i];
        diagonalCells.push(cell);
    }

    // Змінюємо колір кожної клітинки побічної діагоналі
    diagonalCells.forEach(cell => {
        cell.style.backgroundColor = getRandomColor();
    });
});
