const vacancyField = document.querySelectorAll('.job');

document.addEventListener('load', handler(''));
nextPage.addEventListener('click', () => handler('next'));
prevPage.addEventListener('click', () => handler('prev'));

container.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.id) target = target.parentElement;

    window.open(
        `https://krasnoyarsk.hh.ru/vacancy/${target.dataset.vacancyId}`,
        '_blank'
    );
});

container.addEventListener('mouseover', (event) => {
    let target = event.target;
    if (!target.id) target = target.parentElement;

    if (target.dataset.skills) {
        const skills = target.dataset.skills.split(',');
        const skillsBlock = document.createElement('table');
        for (let i = 0; i < skills.length; i++) {
            skillsBlock.innerHTML += `<tr><th>${skills[i]}</th></tr>`;
        }
        skillsBlock.setAttribute('border', '');
        target.append(skillsBlock);
    }
    target.addEventListener('mouseleave', () => {
        if (target.lastElementChild.nodeName === 'TABLE')
            target.lastElementChild.remove();
    });
});

async function handler(flag) {
    try {
        const response = await fetch(`http://localhost:5000/${flag}`);
        const [counter, allVacancies] = await response.json();

        let prevPage = +pageCount.innerText?.match(/^\d+/) || 0;

        if (counter.page !== prevPage) {
            clearNodes();
            prevPage = counter.page;
        }

        const allPages = Math.ceil(allVacancies.length / 20);
        pageCount.innerText = `${counter.page} / ${allPages}`;

        const start = (counter.page - 1) * 20;
        const end =
            allVacancies.length > counter.page * 20
                ? counter.page * 20
                : (counter.page - 1) * 20 + (allVacancies.length % 20);

        for (let i = start; i < end; i++) {
            const elementId = i - (counter.page - 1) * 20;
            const vacancyTitle = vacancyField[elementId].children[0].innerText;

            if (!vacancyTitle) {
                pushVacancyData(elementId, i, allVacancies);
            }
        }

        if (flag === '') await handler(flag);
    } catch (e) {
        // console.log(e);
        await handler('');
    }
}

function clearNodes() {
    vacancyField.forEach((node) => {
        node.classList.remove('job-found');
        delete node.dataset.vacancyId;
        delete node.dataset.skills;
        const children = Array.from(node.children);
        children.forEach((child) => {
            child.innerHTML = '';
        });
    });
}

function pushVacancyData(elementId, current, array) {
    vacancyField[elementId].dataset.vacancyId = array[current][1];
    if (array[current][3].length) {
        vacancyField[elementId].dataset.skills = array[current][3].replace(
            /[["\]]+/g,
            ''
        );
    }

    const vacancyTitle = array[current][2].match(
        /(?<title>.+?) в компании.+?Зарплата: (?<price>[^.]+)(?<tail>.+)\./
    );
    const vacancyTail = vacancyTitle.groups.tail.replaceAll('.', '<br/>');
    let vacancyHeader = vacancyTitle.groups.title;
    if (vacancyHeader.length > 50)
        vacancyHeader = vacancyHeader.slice(0, 50) + '...';

    vacancyField[elementId].children[0].innerText = vacancyHeader;
    vacancyField[elementId].children[1].innerText = vacancyTitle.groups.price;
    vacancyField[elementId].children[2].innerHTML = vacancyTail;

    if (array[current][0]) vacancyField[elementId].classList.add('job-found');
}
