const request = require('request-promise');

const USERNAME = process.env.JIRA_USERNAME;
const PASSWORD = process.env.JIRA_PASSWORD;
const URI = 'https://mercurio.psl.com.co/jira/rest/psl-worklog/1.0/psl-worklog'

const startDate = new Date()
startDate.setHours(8, 0);

const json = {
    comment: 'Test automation',
    timeSpentJIRA: '9h',
    issue: 'PTSR-5',
    project: 'Mediabrands Modeling & Optimization - Mediabrands',
    startDate,
    tfstask: ''
};

const auth = {
    user: USERNAME,
    pass: PASSWORD,
};

request
    .post(URI, { auth, json })
    .then((res) => {
        console.log('Success!!!')
    })
    .catch((err) => {
        console.error(`Error: ${err.error.message}`);
    });
