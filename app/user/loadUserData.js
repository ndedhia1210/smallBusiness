const users = [
    {
        name: 'Munna Tripathi',
        phoneNumber: '9876543210',
        email: 'mtripathi@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'mtripathi',
        password: 'mtripathi',
        isApproved: true,
        deviceId: '',
        createdDate: '1682559945',
        createdBy: '475ad8d00d1b6786a101cd8s',
        modifiedDate: '1682559945',
        lastModifiedBy: '644ad8d00d1b6786a101cd8s'
    },
    {
        name: 'Guddu Pandit',
        phoneNumber: '34567289012',
        email: 'gpandit@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'gpandit',
        password: 'gpandit',
        isApproved: true,
        createdDate: '1682559967',
        createdBy: '475ad8d00d1b6786a101cd8s',
        modifiedDate: '1682559967',
        lastModifiedBy: '644ad8d00d1b6786a101cd6s'
    },
    {
        name: 'Gajgamini Gupta',
        phoneNumber: '87654321098',
        email: 'ggupta@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'ggupta',
        password: 'ggupta',
        isApproved: true,
        createdDate: '1686759945',
        createdBy: '475ad8d00d1b6786a101cd8s',
        modifiedDate: '1686759945',
        lastModifiedBy: '644ad8d00d1b6786a321cd8s'
    },
    {
        name: 'Kaleen Bhaiya',
        phoneNumber: '2345617809',
        email: 'kbhaiya@mirzapur.com',
        address: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
        username: 'kbhaiya',
        password: 'kbhaiya',
        isApproved: false,
        createdDate: '1682559945',
        createdBy: '475ad8d00d1b6786a101cd8s',
        modifiedDate: '1682559945',
        lastModifiedBy: '644ad8d00d1b6786a301cd8s'
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