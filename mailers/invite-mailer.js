const nodeMailer = require('../config/nodemailer');

exports.inviteLink = (data) => {
    // console.log('Inside Invite Link Mailer');
    let htmlString = nodeMailer.renderTemplate({data: data},'/new_invite.ejs');

    nodeMailer.transporter.sendMail({
        from: 'icoolishan2000@gmail.com',
        to: data.email,
        subject: "Invite To a Call",
        html: htmlString
    },(err,info) => {
        if(err){console.log('Error in Sending Mail',err); return}

        console.log('Mail Sent', info);
        return;
    });
}