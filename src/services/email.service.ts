import { Guest } from "../models/guest";

var nodemailer = require('nodemailer');

export class EmailService {
    sendEmail(guest: Guest) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'filip.licenta@gmail.com',
                pass: 'FilipLicenta123'
            },
            tls: {
                rejectUnauthorize: false
            }
        });

        var guestName = `<p><b>${guest.name}</b> - ${guest.isChild ? 'Copil' : 'Adult'}</p>`;
        var guestMessage = `${guest.message ? "<p> Mesajul primit: " + guest.message + "</p>" : ""}`;

        var mailOptions = {
            from: 'filip.licenta@gmail.com',
            to: 'filipmihalut@gmail.com, mihaianamaria250@gmail.com',
            subject: 'Confirmare nunta',
            html: "<p>Vesti bune. A mai confirmat inca o persoana.</p>" + guestName + guestMessage
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            
        });
    }

}