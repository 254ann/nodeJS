const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
// const { format } = require("date-fns");

const LogEvents = async (message) => {
    const logItem = {
        uuid: uuidv4(),
       // date: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        message
    };
    console.log(logItem);

    const logString = `${logItem.uuid} - ${logItem.date} - ${logItem.message}\n`;

    // Checking if the Logs folder exists, if it does not then we create it
    const Logs = path.join(__dirname, 'Logs');

    try {
        if (!fs.existsSync(Logs)) {
            fs.mkdirSync(Logs);
        }
    } catch (err) {
        console.error(err);
    }

    // Append logString to eventLogs.txt
    fs.appendFile(
        path.join(Logs, "eventLogs.txt"),
        logString,
        (err) => {
            if (err) throw err;
            console.log('Write was successful');
        }
    );
};

LogEvents("Message");
module.exports = LogEvents;
