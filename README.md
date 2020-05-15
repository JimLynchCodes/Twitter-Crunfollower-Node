# Twitter-Unfollower-Node
A node script meant to run as a cron job that unfollows someone you're following who isn't following you back.


## Usage

Please use node v13.13.0
```
nvm use
```

Install dependencies:
```
npm i
```

Run the script:
```
npm start
```

## Node Process Logs

All logging should be done with the `winston` library using the _logger_ we've created for this project in `./logger.js`.
```
const logger = require('./logger')

logger.info('Logging something...')
```

The logs will be written to a file that incorporates the current date, forms like this:
```
./logs/twitter-cli-logs-YYYY-MM-DD.log
```

A similar one gets created for erros:
```
./logs/twitter-cli-errors-YYYY-MM-DD.log
```


## Scheduling as a Cron Job

Open a new shell within the the server of machine on which you would like the cron jobs to run. On linux / mac:
```
crontab -e
```

This will allow you to "edit your crontab" where the crontab refers to a text file in which you enter the cron schedule and the command to run for each job.

On a new line, add a schedule for this script. 

For example, this one will run the command "echo foobar" every 47 minutes:
```
*/47 * * * * echo foobar
```

Keep in mind what each number of the cron expression represents:
```
(minute) (hour) (day of month) (month) (day of week)

*	any value
,	value list separator
-	range of values
/	step values
```

I like to also forward output to another logs file named something like this:
```
~/Git-Projects/Twitter-Unfollower-Node/logs/twitter-unfollower-cron-YYYY-MM-DD.log
```

Note that you'll probably need to use a full path in the crontab. The `2?>1` means to use both the standard output and the errors, `>>` appends to the existing log file (or creates one if it doesn't exist), and then we give the full path to the logs file (where ~ represents the current user's hoem folder).
```
*/47 * * * * echo foobar >> ~/Git-Projects/Plug-N-Play-Twitter-Engager/logs/cron-logs_`date +\%Y-\%m-\%d`.log 2>&1
```

## Bash Script
When running this on a remote Ubuntu server we found that the cron scripts were running in a new shell that was not loading nvm via the .bashrc and .bash_profile scripts. If this happens to you we'd recommend running the script via the `run-unfollow.sh` file.

First, allow it to be executed by your current user:
```
chmod +x ./run-unfollower.sh
```

Then run the file:
```
./run-unfollower.sh
```

This should run the script just like `npm start` (after all, it is just calling npm start at the end)!

Putting it all together, here's how you can schedule the bash script as a cron job:
```
*/42 * * * * ~/Git-Projects/Twitter-Unfollower/run-unfollower.sh >> ~/Git-Projects/Twitter-Unfollower/logs/cron-logs_`date +\%Y-\%m-\%d`.log 2>&1
```


## Shoutouts

Shoutout to Matt Gabor for inpiring me to build a ClojureScript lambda function one time with similar functionality. 👍

Shoutout to the creators of the library Twit which is leveraged in this project. 👍

Shoutout to all the alsome developers of Node.js itself- the syntax, the runtime, and the awesome community. 👍

