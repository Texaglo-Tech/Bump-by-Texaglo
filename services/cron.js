
const cron = require('node-cron');
const { checkPaymentNFT } = require('../utils/crossmint');

cron.schedule('*/30 * * * * *', async () => {
    // console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
    checkPaymentNFT();
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});