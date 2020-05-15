const logger = require('./../logger')

const unfollowUser = async (Twitter, userId) => {

    return new Promise( (resolve, reject) => {

        const params = {
            'user_id': userId
        }

        Twitter.post('friendships/destroy', params, (err, data) => {

            if (err) {
                logger.info('error unfollowing user: ' + err)
                reject(err)
            } 

            logger.info('user unfollowed! ' + data)

            resolve(data)

        })

    })

}

module.exports = unfollowUser

