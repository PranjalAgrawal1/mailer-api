require('dotenv').config() // require .env 
const nodemailer = require('../config/nodemailer');


exports.newEmail = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/mail.ejs')
    nodemailer.transorter.sendMail({
        name: 'CodersConnect',
        from: 'contact@CodersConnect.in',
        to: process.env.TO_EMAIL,
        subject: "Contact us Email",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        return;

    });
}