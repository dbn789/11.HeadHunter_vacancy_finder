const vacancyField = document.querySelectorAll('.job');
document.addEventListener('load', handler(''));
nextPage.addEventListener('click', () => handler('next'));
prevPage.addEventListener('click', () => handler('prev'));

async function handler(flag) {
    try {
        const response = await fetch(`http://localhost:5000/${flag}`);
        const [counter, allVacancies] = await response.json();
        console.log(counter);
        let prevPage = +pageCount.innerText?.match(/^\d+/) || 0;

        if (counter.page !== prevPage) {
            vacancyField.forEach((node) => {
                const children = Array.from(node.children);
                children.forEach((child) => {
                    child.innerHTML = '';
                });
            });
            for (let i = 0; i < 20; i++) {
                vacancyField[i].classList.remove('job-found');
                delete vacancyField[i].dataset.vacancyId;
                delete vacancyField[i].dataset.skills;
            }
            prevPage = counter.page;
        }

        const allPages = Math.ceil(allVacancies.length / 20);
        pageCount.innerText = `${counter.page} / ${allPages}`;

        const offset =
            allVacancies.length - counter.current >= 20
                ? counter.page * 20
                : (counter.page - 1) * 20 + (allVacancies.length % 20);

        for (let i = counter.current; i <= offset; i++) {
            const elementID = i - (counter.page - 1) * 20 - 1;
            vacancyField[elementID].dataset.vacancyId = allVacancies[i - 1][1];
            vacancyField[elementID].dataset.skills = allVacancies[
                i - 1
            ][3].replace(/[["\]]+/g, '');
            const vacancyTitle = allVacancies[i - 1][2].match(
                /(?<title>.+?) в компании.+?Зарплата: (?<price>[^.]+)(?<tail>.+)\./
            );
            const vacancyTail = vacancyTitle.groups.tail.replaceAll(
                '.',
                '<br/>'
            );
            let vacancyHeader = vacancyTitle.groups.title;
            if (vacancyHeader.length > 55)
                vacancyHeader = vacancyHeader.slice(0, 50) + '...';

            vacancyField[elementID].children[0].innerText = vacancyHeader;
            vacancyField[elementID].children[1].innerText =
                vacancyTitle.groups.price;
            vacancyField[elementID].children[2].innerHTML = vacancyTail;

            if (allVacancies[i - 1][0])
                vacancyField[elementID].classList.add('job-found');
        }

        if (flag === '') await handler(flag);
    } catch (e) {
        // console.log(e);
        await handler('');
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
        //console.log(skillsBlock);
        target.append(skillsBlock);
    }
    target.addEventListener('mouseleave', () => {
        if (target.lastElementChild.nodeName === 'TABLE')
            target.lastElementChild.remove();
    });
});
