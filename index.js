
const initializeWithCreds = require('./twit-functions/initilize-with-creds')
const getUsersFollowingMe = require('./twit-functions/get-users-following-me')
const getUsersImFollowing = require('./twit-functions/get-users-im-following')
const unfollowUser = require('./twit-functions/unfollow-user')
const constants = require('./constants')
const logger = require('./logger')
var os = require('os-utils');

const main = async () => {

    const quietFlag = process.argv.slice(2).find(arg => arg.includes(constants.QUIET_FLAG))

    if (quietFlag) {
        logger.info('Starting twitter unfollower in quiet mode...')
        logger.pause()
    }

    else
        logger.info('Starting Twitter Unfollower!\n')

    logger.info('Current date & time in New York: ' + new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))

    const Twitter = initializeWithCreds()

    const usersFollowingMe = await getUsersFollowingMe(Twitter)
    logger.info('users following me: ' + usersFollowingMe.length)
    logger.info('first user following me: ' + usersFollowingMe[0])

    const usersImFollowing = await getUsersImFollowing(Twitter)
    logger.info('users I\'m following: ' + usersImFollowing.length)
    logger.info('first user  I\'m following: ' + usersImFollowing[0])

    // Only consider users who aren't following you back.
    const unLoyalUsersImFollowing = usersImFollowing.filter(userImFollowing => {

        return !usersFollowingMe.includes(userImFollowing)

    })

    logger.info('# of unloyal users Im following ' + unLoyalUsersImFollowing.length)

    const randomUnloyalUserIndex = Math.floor(Math.random() * unLoyalUsersImFollowing.length)

    const randomUnloyalUserId = unLoyalUsersImFollowing[randomUnloyalUserIndex]

    logger.info(`Sanity check, user appears in usersImFollowing: ${usersImFollowing.includes(randomUnloyalUserId)}, usersFollowingMe:  ${usersFollowingMe.includes(randomUnloyalUserId)}`)

    logger.info(`Unfollowing user: https://twitter.com/intent/user?user_id=${randomUnloyalUserId}`)

    const unfollowResult = await unfollowUser(Twitter, randomUnloyalUserId)

    logger.info(`Unfollowed ${unfollowResult.screen_name}`)

    logger.info('\n\nTwitter Unfollower has completed successfully! 🤖\n')

    const memUsage = process.memoryUsage()

    logger.info('mem used: ' + (memUsage.rss / 1024 / 1024).toFixed(1) + "mb")

    return os.cpuUsage((v) => {
        logger.info('CPU Usage (%): ' + v.toFixed(2));
    });

}

main().catch(err => {
    logger.error('Any errors: ' + err)
})