const logger = require('./logger')
const initializeWithCreds = require('./twit-functions/initilize-with-creds')
const getNewestUnlikedMatchingTweet = require('./twit-functions/get-newest-unliked-matching-tweet')
const likeTweet = require('./twit-functions/like-tweet')
const retweetTweet = require('./twit-functions/retweet-tweet')
const followUser = require('./twit-functions/follow-user')
const config = require('./config.js')
const constants = require('./constants')

unfollow = async () => {

    return new Promise(async resolve => {
        try {
            resolve("foobar")
        }
        catch (err) {
            return Promise.reject(err)
        }

    })

}

module.exports = {
    unfollow
}