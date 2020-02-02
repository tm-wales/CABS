const express = require('express')
const app = express()
const router = express.Router()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
var path = require('path')
const port = 3000
const log = require('./server/utils/logger.js')
const mailer = require('./server/utils/nodemailer.js')

log.info('Initialising')
log.debug('Overriding Express logger')
app.use(morgan('tiny', { stream: log.stream }))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', 'dist/')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/dist')))
app.use(methodOverride('_method'))

log.info('Defaults completed')

app.get('/contact-us', (request, response) => {
    response.render('index')
})

app.get('*', (request, response) => {
    log.debug('Sending INDEX')
    response.render('index')
})

log.info('routing to *')

app.post('/contact-us', (req, res) => {
    console.log(req.body)

    let data = {
        name: req.body.data.name,
        email: req.body.data.email,
        telephone: req.body.data.phone,
        message: req.body.data.message,
        company: req.body.data.company,
        honey: req.body.data.website,
        createDate: Date.now()
    }

    // Send mail
    let mailOptions = {
        from: 'webcontact@techmeleon.co.uk',
        to: 'sales@candbs.co.uk',
        subject: `Contact Request from ${data.name} @ ${data.company}`,
        text: `${data.name} @ ${data.company} (email:${data.email}) (tel:${
            data.telephone
        }) says: ${data.message}`,
        html: `${data.name} @ ${data.company}<br><br>Email:<a href="emailTo:${
            data.email
        }">${data.email}</a><br>tel:<a href="tel:${data.telephone}">${
            data.telephone
        }</a><br><br>says:</br>${data.message}`
    }

    mailer.sendMail(mailOptions, function(error, info) {
        if (error) {
            log.error(error)
        } else {
            log.info('Email Sent')
        }

        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ success: !error }))
    })
})

app.listen(port, err => {
    if (err) {
        return `error listening ${err}`
    }

    log.info(`server is listening on ${port}`)
})
