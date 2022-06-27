require('dotenv').config() // require .env 
const queue = require('../config/kue');
const commentsMailer = require('../mailers/mailer');
const commentEmailWorker = require('../workers/email_worker');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')

module.exports.send = async (req, res) => {
    try {
        let comment = req.query;
        if (Object.keys(comment).length) {

            // console.log(comment);


            // let transorter = nodemailer.createTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     port: 587,
            //     secure: false,
            //     auth: {
            //         user: process.env.FROM_EMAIL,
            //         pass: process.env.PASSWORD
            //     }
            // })

            // let renderTemplate = (data, relativePath) => {
            //     let mailHtml;
            //     ejs.renderFile(
            //         path.join(__dirname, '../views', relativePath),
            //         data,
            //         function (err, template) {
            //             if (err) {
            //                 console.log(err);
            //                 return;
            //             }
            //             mailHtml = template;
            //         }
            //     )
            //     return mailHtml;
            // }


            // let htmlString = await renderTemplate({ comment: comment }, '/mail.ejs')
            // await transorter.sendMail({
            //     name: 'CodersConnect',
            //     from: 'contact@CodersConnect.in',
            //     to: process.env.TO_EMAIL,
            //     subject: "Contact us Email",
            //     html: htmlString
            // }, (err, info) => {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     return;
            // });



            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('job enqueued', job.id);
            })

            res.status(201).json({ message: "Response Send successfully" });
        } else {
            res.status(400).json({ message: "cannot send response" });
        }

    } catch (err) {
        // console.log(err);
        res.status(400).json({ message: "cannot send response" });
    }
}