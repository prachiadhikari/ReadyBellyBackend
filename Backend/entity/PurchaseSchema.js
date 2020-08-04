var dbConfig = require('../databaseConfig/databaseConnection.js');
const UserSchema = require('./UserSchema.js');
const ProductSchema = require('./ProductSchema.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var purchaseSchema = sequelize.define('purchase',
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false	
    },
    price: {
		type: Sequelize.FLOAT,
		allowNull: false	
    },
    userRemarks: {
		type: Sequelize.TEXT,
		allowNull: true	
    },
    vendorRemarks: {
		type: Sequelize.TEXT,
		allowNull: true	
	},
	status: {
		type: Sequelize.TEXT,
		allowNull: false	
    }
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
    tableName: 'purchase',
	underscored: true
});

purchaseSchema.belongsTo(UserSchema.userSchema);
purchaseSchema.belongsTo(ProductSchema.productSchema);

purchaseSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside purchase schema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {purchaseSchema};
