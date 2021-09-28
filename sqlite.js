const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./chat_app.db"
    },
    useNullAsDefault: true
});

// const selectUserById = async (id) => {
//     const users = await knex.select('*')
//         .from('users')
//         .where({ id })
//         .then(rows => rows)
//         .catch(function (error) { console.error(error); });

//     return users;
// }


const isUserExist = async (id) => {
    const UserExist = await knex.select('*')
        .from('users')
        .where({ id })
        .then(user => user.length > 0)
        .catch(function (error) { console.error(error); });

    return UserExist;
}

const saveUserPublicMessage = async (id, message, userName) => {
    return await knex('messages').insert({ message, from_user_id: id, from_user_name: userName, to_user_id: -1 });
}


const getMessages = async () => {
    // return await knex.select('*')
    //     .from('messages')
    //     .then(rows => rows)

    return await knex('messages')
        .join('users', 'messages.from_user_id', '=', 'users.id')
        .select('messages.message', 'users.name')
}




module.exports = {
    isUserExist,
    saveUserPublicMessage,
    getMessages
}