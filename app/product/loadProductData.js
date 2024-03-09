const { ObjectId } = require("mongodb");

exports.UNIT_OF_MEASURE = {
	KG: 'kg',
	GMS: 'gms',
	LBS: 'lbs',
	L: 'l',
    ML: 'ml',
    COUNT: 'count'
}

const categories = [
    {
        name: 'Whole Cashews',
        description: 'Whole Cashews 1LB',
        sku: 'CASHEW-1LB-WH',
        categoryId:  new ObjectId('644accd450a5d85079dafdea'),
        unitMeasure: this.UNIT_OF_MEASURE.KG,
        totalQuantity: 500,
        remainingQuantity: 350,
        minimumQuantity: 1,
        unitPrice: 500,
        currency: 'RS',
        imageReference: './cashew.png',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    },
    {
        name: 'Almond',
        description: 'Almonds 1LB',
        sku: 'ALMOND-1LB-WH',
        categoryId:  new ObjectId('644accd450a5d85079dafdea'),
        unitMeasure: this.UNIT_OF_MEASURE.KG,
        totalQuantity: 300,
        remainingQuantity: 150,
        minimumQuantity: 1,
        unitPrice: 1000,
        currency: 'RS',
        imageReference: './almond.png',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    },
    {
        name: 'Red Chilli Powder',
        description: 'Red Chilli Powder 200gm',
        sku: 'REDCHILLI-100GM-RD',
        categoryId:  new ObjectId('644accd450a5d85079dafdeb'),
        unitMeasure: this.UNIT_OF_MEASURE.GMS,
        totalQuantity: 3000,
        remainingQuantity: 800,
        minimumQuantity: 200,
        unitPrice: 1000,
        currency: 'RS',
        imageReference: './chillipwd.png',
        createdDate: '1682559945',
        modifiedDate: '1682559945',
    }
];

// This controller injects dummy products to DB.
exports.loadProductData = (req, res, next) => {
    require('../database.js').getDb().collection('product').insertMany(categories)
    .then( 
        (data) => { res.json(data) },
        (error) => { 
            console.log("Could not load products to db!");  
            res.send(error);
        }
    )
}