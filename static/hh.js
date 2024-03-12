//const container = document.querySelector('.container');

document.addEventListener('load', handler(''));

async function handler(flag) {
    try {
        const [title, skills, price] = await fetch(
            `http://localhost:5000/${flag}`
        );
        console.log(title, skills, price);
    } catch (e) {
        console.log(e);
        //await handler(flag);
    }
}

container.addEventListener('click', (event) => {
    const target = event.target;

    //console.log(target);
});
