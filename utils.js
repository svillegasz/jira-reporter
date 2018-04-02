const { getColombiaHolidaysByYear } = require('colombia-holidays');

const currentDate = new Date();
const project = 'Mediabrands Modeling & Optimization - Mediabrands';

const daily = {
    comment: 'Daily',
    timeSpentJIRA: '15m',
    issue: 'PTSR-14',
    project,
    startDate: currentDate.setHours(9, 30),
    tfstask: ''
}

const retro = {
    comment: 'Retrospective',
    timeSpentJIRA: '1h',
    issue: 'PTSR-17',
    project,
    startDate: currentDate.setHours(15, 0),
    tfstask: ''
}

const planning = {
    comment: 'Planning',
    timeSpentJIRA: '1h',
    issue: 'PTSR-6',
    project,
    startDate: currentDate.setHours(9, 30),
    tfstask: ''
}

const grooming = {
    comment: 'Grooming',
    timeSpentJIRA: '1h',
    issue: 'PTSR-3',
    project,
    startDate: currentDate.setHours(14, 0),
    tfstask: ''
}

const testing = {
    comment: 'Test automation',
    timeSpentJIRA: '9h',
    issue: 'PTSR-5',
    project,
    startDate: currentDate.setHours(8, 0),
    tfstask: ''
}

const getIssues = () => {
    const issues = [];
    switch (currentDate.getDay()) {
        case 1:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        case 2:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        case 3:
            issues.push(daily);
            issues.push(grooming);
            testing.timeSpentJIRA = '7.75h';
            issues.push(testing);
            break;
        case 4:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        case 5:
            issues.push(daily);
            testing.timeSpentJIRA = '8.75h';
            issues.push(testing);
            break;
        default:
            break;
    }
    return issues;
};

const isWorkingDay = () => {
    if (currentDate.getDay() === 6) {
        return false
    }
    if (currentDate.getDay() === 0) {
        return false
    }
    const isHoliday = getColombiaHolidaysByYear(currentDate.getFullYear())
        .map(holiday => holiday.holiday)
        .includes(currentDate.toISOString().split('T')[0]);
    return !isHoliday;
}

module.exports = {
    getIssues,
    isWorkingDay,
};
