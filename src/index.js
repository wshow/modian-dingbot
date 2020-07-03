const { CronJob } = require('cron');
const check = require('./check');

const job = (cron, fn, complete = null) => new CronJob(cron, fn, complete, true, 'Asia/Shanghai', null, true);

// 每隔1小时执行一次, 汇报心跳
job('1 1 */1 * * *', check);
