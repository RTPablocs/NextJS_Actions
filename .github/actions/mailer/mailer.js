const mailer = require('nodemailer')
const core = require('@actions/core')
const fetch = require('node-fetch')

let data = {}
let status = []

const result = fetch(`https://api.github.com/repos/RTPablocs/NextJS_Actions/actions/runs/${core.getInput('id')}/jobs`, {method: 'GET'})
    .then(data => data.json())
    .then(json => data = json)


data.jobs.forEach(job => {
    status.push(job.status)
})

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
    text: `linter_job: ${status[0]} \n
    cypress_job: ${status[1]} \n
    badge_job: ${status[2]} \n
    deploy_job: ${status[3]}`
};


transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
