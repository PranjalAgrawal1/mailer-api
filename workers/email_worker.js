const queue = require('../config/kue');

const new_mailer = require('../mailers/mailer');

queue.process('emails', function(job, done){
    console.log('emails workers is processing a job ', job.data);

    new_mailer.newEmail(job.data);

    done();
});

