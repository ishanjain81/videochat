
const development = {
    name: 'development',
    db: 'teamsClone',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.WEB_GMAIL_ID,  // Gmail Id
            pass: process.env.WEB_GMAIL_PASSWORD // Gmail Password
        }
    },
    google_client_id: process.env.WEB_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.WEB_GOOGLE_CLIENT_SECRET,
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
}

const production = {
    name: 'production',
    db: 'CloneProduction',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.WEB_GMAIL_ID,  // Gmail Id
            pass: process.env.WEB_GMAIL_PASSWORD // Gmail Password
        }
    },
    google_client_id: process.env.WEB_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.WEB_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.WEB_GOOGLE_CALLBACK_URL,
}

if(eval(process.env.NODE_ENV == undefined)){
    console.log('Running in Development Mode');
}
else{
    console.log('Running in Production Mode');
}


module.exports = eval(process.env.NODE_ENV) == undefined ? development: eval(process.env.NODE_ENV);