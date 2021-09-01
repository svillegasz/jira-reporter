const request = require('request-promise');
const { getIssues, isWorkingDay } = require('./utils');

const USERNAME = process.env.JIRA_USERNAME;
const PASSWORD = process.env.JIRA_PASSWORD;
const URI = 'https://mercurio.psl.com.co/jira/rest/psl-worklog/1.0/psl-worklog';
const auth = {
    user: USERNAME,
    pass: PASSWORD,
};

const reportJira = async () => {
    if (isWorkingDay()) {
        const issues = await getIssues();
        issues.forEach(async (json) => {
            try {
                await request.post(URI, { auth, json });
                console.log('Success!!!');
            } catch (error) {
                console.error(error);
            }
        });
    }
}

reportJira();
