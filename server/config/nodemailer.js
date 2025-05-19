import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({

    // host: 'smtp.ethereal.email',
    service: 'gmail',
    // port: 587,
    secure: false,
    auth :{
        user: 'muhammadzain6787@gmail.com',
        pass: 'wbwsypxajiegfdet'
    }
});

export default transporter;