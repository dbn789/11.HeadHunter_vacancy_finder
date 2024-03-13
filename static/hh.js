//const vacancyField = document.querySelectorAll('.job');

document.addEventListener('load', handler(''));
nextPage.addEventListener('click', () => handler('next'));
prevPage.addEventListener('click', () => handler('prev'));

async function handler(flag) {
    try {
        const response = await fetch(`http://localhost:5000/${flag}`);
        const [vacancy, counter, allVacancies] = await response.json();

        let prevPage = +pageCount.innerText?.match(/^\d+/) || 1;

        if (counter.page !== prevPage) {
            for (let i = 1; i <= 20; i++) {
                const vacancyElement = document.getElementById(`job${i}`);
                vacancyElement.innerHTML = 'WAIT...';
                vacancyElement.style.backgroundColor = 'white';
            }
            prevPage = counter.page;
        }

        console.log(counter);
        const allPages = Math.ceil(allVacancies / 20);
        pageCount.innerText = `${counter.page} / ${allPages}`;

        const elementID = counter.current - (counter.page - 1) * 20;
        //console.log(elementID);
        if (prevPage === counter.page && elementID <= 20) {
            const vacancyElement = document.getElementById(`job${elementID}`);
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
        }

        if (flag === '') await handler(flag);
    } catch (e) {
        console.log(e);
        await handler(flag);
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
