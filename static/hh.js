//const vacancyField = document.querySelectorAll('.job');

document.addEventListener('load', handler('', 0));

async function handler(flag, counter) {
    try {
        const response = await fetch(`http://localhost:5000/${flag}`);
        const [vacancy, counter, allJsVacancies] = await response.json();
        if (counter <= 20) {
            const vacancyElement = document.getElementById(`job${counter + 1}`);
            vacancyElement.dataset.vacancyId = vacancy[1];
            const vacancyTitle = vacancy[2].match(
                /(?<title>.+?) в компании.+?Зарплата: (?<price>[^.]+)(?<tail>.+)\./
            );
            const vacancyTail = vacancyTitle.groups.tail.replaceAll(
                '.',
                '<br/>'
            );
            vacancyElement.innerHTML = `<h3>${vacancyTitle.groups.title}</h3><br/><h2>${vacancyTitle.groups.price}</h2>${vacancyTail}`;
            if (vacancy[0])
                vacancyElement.style.backgroundColor = 'rgb(154, 248, 248)';
            //console.log(vacancyTitle.groups.tail);
        } else {
        }
        // console.log(vacancy);
        // console.log(allJsVacancies, counter);

        if (flag === '') await handler(flag, counter);
    } catch (e) {
        console.log(e);
        await handler(flag, counter);
    }
}

container.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.id) target = target.parentElement;
    //console.log(target.dataset.vacancyId);
    window.open(
        `https://krasnoyarsk.hh.ru/vacancy/${target.dataset.vacancyId}`,
        '_blank'
    );
});
