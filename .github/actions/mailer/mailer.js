const mailer = require('nodemailer')
const core = require('@actions/core')


const transporter = mailer.createTransport({
    host: 'smtp.ionos.es',
    port: 587,
    auth: {
        user: core.getInput('mail_sender'),
        pass: core.getInput('mail_password')
    }
});

const mailOptions = {
    from: core.getInput('mail_sender'),
    to: core.getInput('mail_reciever'),
    subject: 'Resultado de la action de NextJS',
    text: `linter_job: ${core.getInput('stauts_A')} \n
    cypress_job: ${core.getInput('status_B')} \n
    badge_job: ${core.getInput('status_C')} \n
    deploy_job: ${core.getInput('status_D')}`
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
