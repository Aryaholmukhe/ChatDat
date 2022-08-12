const users = [];

// adds all connected users to the users array as a JS object
function joinUsers(id, username, room) {
    const user = { id, username, room };
    users.push(user);

    return user;
};

// used to check if id parameter is equal to user id
function getUser(id) {
    return users.find(user => user.id === id)
};


function leftUser(id) {
    // gets the index of user which matches
    const index = users.findIndex(user => user.id === id);

    // if index exists
    if(index != -1){ //-1 is returned when no results are found
        //remove the user
        return users.splice(index, 1)[0];
    }
}
 

module.exports = {
    joinUsers,
    getUser,
    leftUser
};