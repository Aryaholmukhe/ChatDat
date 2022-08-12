// formats message into a JS object
function formatMessage(username, text) {
    return {
        username,
        text
    }
}
module.exports = formatMessage;