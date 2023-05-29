const jwtSecret = 'your-secret-key';

const minutesInHourCount = 60;
const secondsInMinuteCount = 60;
const millisecondsInSecondCount = 1000;
const hourInMilliseconds = minutesInHourCount
    * secondsInMinuteCount * millisecondsInSecondCount;

export default {jwtSecret, hourInMilliseconds};
