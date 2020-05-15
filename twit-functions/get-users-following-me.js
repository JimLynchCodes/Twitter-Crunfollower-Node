const logger = require('./../logger')

const usersFollowingMe = async (Twitter) => {

    return new Promise( (resolve, reject) => {

        const params = {}

        Twitter.get('followers/ids', params, (err, data) => {

            if (err) {
                logger.info('error getting users following me: ' + err)
                reject(err)
            } 

            resolve(data.ids)

        })

    })

}

module.exports = usersFollowingMe

