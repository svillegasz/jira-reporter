const { getColombiaHolidaysByYear } = require('colombia-holidays');
const moment = require('moment');

const currentDate = moment().utcOffset(-5);

const issue = {
    comment: '',
    timeSpentJIRA: null,
    issue: '',
    project: 'BrightInsight Platform - BrightInsight',
    place: 'Sede PSL',
    startDate: null,
    tfstask: ''
}

const daily = Object.assign({}, issue, {
    issue: 'PTSR-23',
    timeSpentJIRA: '30m',
})

const qa_offshore_daily = Object.assign({}, daily, {
    comment: 'Daily with the qe offshore team',
    startDate: currentDate.set({ 'hour': 7, 'minute': 30 }).toISOString(),
})

const psl_daily = Object.assign({}, daily, {
    comment: 'Daily with the PSL team',
    startDate: currentDate.set({ 'hour': 10, 'minute': 30 }).toISOString(),
})

const qa_daily = Object.assign({}, daily, {
    comment: 'Daily with the QE team',
    startDate: currentDate.set({ 'hour': 16, 'minute': 15 }).toISOString(),
})

const configuration_daily = Object.assign({}, daily, {
    comment: 'Daily with the configuration service team',
    startDate: currentDate.set({ 'hour': 13, 'minute': 00 }).toISOString(),
})

const retro = Object.assign({}, issue, {
    comment: 'Retrospective inside PSL',
    timeSpentJIRA: '1h',
    issue: 'PTSR-23',
    startDate: currentDate.set({ 'hour': 15, 'minute': 0 }).toISOString(),
})

const planning = Object.assign({}, issue, {
    comment: 'Planning and demo for platform',
    timeSpentJIRA: '1h',
    issue: 'PTSR-23',
    startDate: currentDate.set({ 'hour': 12, 'minute': 30 }).toISOString(),
})

const grooming = Object.assign({}, issue, {
    comment: 'Grooming for configuration service',
    timeSpentJIRA: '1h',
    issue: 'PTSR-3',
    startDate: currentDate.set({ 'hour': 11, 'minute': 0 }).toISOString(),
})

const testing = Object.assign({}, issue, {
    comment: 'Automation for component and contract testing',
    timeSpentJIRA: '9h',
    issue: 'PTSR-5',
    startDate: currentDate.set({ 'hour': 8, 'minute': 0 }).toISOString(),
})

const getIssues = () => {
    const issues = [];
    if (!isWorkingDay) return issues;
    switch (currentDate.day()) {
        case 1:
            issues.push(qa_offshore_daily);
            issues.push(psl_daily);
            issues.push(qa_daily);
            issues.push(configuration_daily);
            testing.timeSpentJIRA = '7h';
            issues.push(testing);
            break;
        case 2:
            issues.push(psl_daily);
            issues.push(configuration_daily);
            testing.timeSpentJIRA = '8h';
            issues.push(testing);
            break;
        case 3:
            if (currentDate.week() % 2 === 0) {
                issues.push(planning);
                issues.push(retro);
                testing.timeSpentJIRA = '5.5h';
            } else {
                testing.timeSpentJIRA = '7.5h';
            }
            issues.push(qa_offshore_daily);
            issues.push(psl_daily);
            issues.push(qa_daily);
            issues.push(testing);
            break;
        case 4:
            issues.push(qa_offshore_daily);
            issues.push(psl_daily);
            issues.push(configuration_daily);
            testing.timeSpentJIRA = '7.5h';
            issues.push(testing);
            break;
        case 5:
            issues.push(qa_daily);
            issues.push(psl_daily);
            issues.push(grooming);
            testing.timeSpentJIRA = '7h';
            issues.push(testing);
            break;
        default:
            break;
    }
    return issues;
};

const isWorkingDay = () => {
    const isHoliday = getColombiaHolidaysByYear(currentDate.year())
        .map(holiday => holiday.holiday)
        .includes(currentDate.format('YYYY-MM-DD'));
    return !isHoliday && currentDate.day() !== 0 && currentDate.day() !== 6;
}

module.exports = {
    getIssues,
    isWorkingDay
};
