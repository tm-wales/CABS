const config = {
    email: {
        service: 'Outlook365',
        auth: {
            user: 'webcontact@techmeleon.co.uk',
            password: 't3chm3leon@2'
        }
    }
}

exports.get = () => {
    return config
}
