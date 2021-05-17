import { format, getTimezoneOffset, toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { } from 'date-fns';


const date = new Date();
const date2 = new Date(date.getTime())

const convertedDate = utcToZonedTime(date2, 'America/New_York');


console.log(format(date, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/Paris' }));
console.log(format(convertedDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/Paris' }));

console.log(getTimezoneOffset('Europe/London', date) / 1000 / 60 / 60);

// console.log(new Date(), '\n', convertedDate, '\n', zonedTimeToUtc(convertedDate, 'America/New_York'));

// console.log(date.getTime() === zonedTimeToUtc(convertedDate, 'America/New_York').getTime());

// console.log(new Date());




