const express = require('express');
const app = express();
const http = require('http').createServer(app);

const cors = require('cors');

const events = require('events');
const emitter = new events.EventEmitter();

const options = require('./src/options');
const PORT = 5000;
let flag = true,
    counter;
const jsVacancyArray = [];

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

const getData = async (url, options = null) => {
    try {
        const response = await fetch(url, options);
        const data = await response.text();
        return data;
        // console.log(data);
    } catch (e) {
        console.log('Data not loading!');
    }
};

const getListVacancies = async (page) => {
    const reg = /"userLabelsForVacancies":{.+?}/;
    try {
        const data = await getData(
            `https://krasnoyarsk.hh.ru/vacancy?search_field=name&search_field=company_name&search_field=description&enable_snippets=false&schedule=remote&professional_role=156&professional_role=160&professional_role=10&professional_role=12&professional_role=150&professional_role=25&professional_role=165&professional_role=34&professional_role=36&professional_role=73&professional_role=155&professional_role=96&professional_role=164&professional_role=104&professional_role=157&professional_role=107&professional_role=112&professional_role=113&professional_role=148&professional_role=114&professional_role=116&professional_role=121&professional_role=124&professional_role=125&professional_role=126&page=${page}`,
            options
        );
        const result = data
            .match(reg)[0]
            .replace('"userLabelsForVacancies":', '');

        const arrayOfVacancies = Object.keys(JSON.parse(result));
        return arrayOfVacancies;
    } catch (e) {}
};

const parseVacancy = async (vacancyId) => {
    const url = `https://krasnoyarsk.hh.ru/vacancy/${vacancyId}`;
    const reg = /"keySkill":.?[^}]+/;
    const regTitle =
        /name="description" content="Вакансия(?<title>.+?(занятость.))/;
    try {
        const data = await getData(url, options);
        const skillsArray = data.match(reg)[0].replace('"keySkill":', '');

        const title = data.match(regTitle).groups.title;
        console.log(title);
        console.log(skillsArray);

        if (
            skillsArray.includes('JavaScript') ||
            skillsArray.includes('Node.js')
        )
            return [true, vacancyId, title, skillsArray];
        else return [false, vacancyId, title, skillsArray];
        // else throw Error;
    } catch (e) {
        //console.log('Error');
    }
};

const findJsVacancy = async (page) => {
    //const promiseArray = [];
    try {
        const array = (await getListVacancies(page)) || [];
        console.log(array);

        for (let id of array) {
            const vacancyInfo = await parseVacancy(id);
            if (vacancyInfo) {
                //console.log('NEW-VACANCY', skillsArray, 'COUNTER', counter);
                emitter.emit('new-vacancy', vacancyInfo);
            }
        }
    } catch (e) {
        console.log('Vacancy not found');
    }
};

const run = () => {
    let page = 0;
    findJsVacancy(page);
    let intervalId = setInterval(async () => {
        await findJsVacancy(++page);
    }, 60000);
};

app.get('/', (req, res) => {
    if (flag) {
        counter = 0;
        res.sendFile(__dirname + '/static/hh.html');
        console.log('HTML file loaded!');
        flag = false;
        run();
    } else {
        emitter.once('new-vacancy', (newVacancy) => {
            if (newVacancy[0]) jsVacancyArray.push(newVacancy);
            res.status(200);
            res.json([newVacancy, counter, jsVacancyArray.length]);
            counter++;
        });
    }
});

http.listen(PORT, () => console.log(`Server run to ${PORT} port!`));
