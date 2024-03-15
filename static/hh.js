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
                vacancyElement.childNodes.forEach((node) => {
                    node.innerHTML = '';
                });
                vacancyElement.classList.remove('job-found');
                delete vacancyElement.dataset.vacancyId;
                delete vacancyElement.dataset.skills;
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
            vacancyElement.dataset.skills = vacancy[3].replace(/[["\]]+/g, '');
            const vacancyTitle = vacancy[2].match(
                /(?<title>.+?) в компании.+?Зарплата: (?<price>[^.]+)(?<tail>.+)\./
            );
            const vacancyTail = vacancyTitle.groups.tail.replaceAll(
                '.',
                '<br/>'
            );
            let vacancyHeader = vacancyTitle.groups.title;
            if (vacancyHeader.length > 55)
                vacancyHeader = vacancyHeader.slice(0, 55) + '...';
            vacancyElement.children[0].innerText = vacancyHeader;
            vacancyElement.children[1].innerText = vacancyTitle.groups.price;
            vacancyElement.children[2].innerHTML = vacancyTail;

            if (vacancy[0]) vacancyElement.classList.add('job-found');
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
        console.log(skillsBlock);
        target.append(skillsBlock);
    }
    target.addEventListener('mouseleave', () => {
        if (target.lastElementChild.nodeName === 'TABLE')
            target.lastElementChild.remove();
    });
});
