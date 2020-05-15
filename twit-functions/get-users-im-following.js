const logger = require('./../logger')

const usersImFollowing = async (Twitter) => {

    return new Promise( (resolve, reject) => {

        const params = {}

        Twitter.get('friends/ids', params, (err, data) => {

            if (err) {
                logger.info('error getting users I\'m following: ' + err)
                reject(err)
            } 

            resolve(data.ids)

        })

    })

}

module.exports = usersImFollowing

