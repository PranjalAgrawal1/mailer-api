require('dotenv').config()

const nodemailer = require('nodemailer');
const ejs = require('ejs');

const path = require('path')


let transorter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD
    }
})

let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log(err);
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}



module.exports = {
    transorter: transorter,
    renderTemplate: renderTemplate
}