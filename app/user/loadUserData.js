const users = [
    {
        name: 'Munna Tripathi',
        phone: '9876543210',
        email: 'mtripathi@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'mtripathi',
        password: 'mtripathi',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    },
    {
        name: 'Guddu Pandit',
        phone: '34567289012',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'gpandit',
        password: 'gpandit',
        createdDate: '1682559967',
        modifiedDate: '1682559967',
    },
    {
        name: 'Gajgamini Gupta',
        phone: '87654321098',
        email: 'ggupta@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'ggupta',
        password: 'ggupta',
        createdDate: '1686759945',
        modifiedDate: '1686759945',
    },
    {
        name: 'Kaleen Bhaiya',
        phone: '2345617809',
        email: 'kbhaiya@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'kbhaiya',
        password: 'kbhaiya',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    }

];

// This controller injects dummy users to DB.
exports.loadUserData = (req, res) => {
    require('../database.js').getDb().collection('user').insertMany(users)
    .then( 
        (data) => { res.json(data) },
        (error) => { 
            console.log("Could not load users to db!");  
            res.send(error);
        }
    )
}