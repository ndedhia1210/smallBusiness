const categories = [
    {
        name: 'Dry fruits',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    },
    {
        name: 'Spices',
        createdDate: '1682559967',
        modifiedDate: '1682559967',
    },
    {
        name: 'Pulses, Grains & Lentils',
        createdDate: '1686759945',
        modifiedDate: '1686759945',
    },
    {
        name: 'Snacks',
        createdDate: '1686759945',
        modifiedDate: '1686759945',
    },
    {
        name: 'Other',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    }

];

// This controller injects dummy categories to DB.
exports.loadCategoryData = (req, res, next) => {
    require('../database.js').getDb().collection('category').insertMany(categories)
    .then( 
        (data) => { res.json(data) },
        (error) => { 
            console.log("Could not load categories to db!");  
            res.send(error);
        }
    )
}