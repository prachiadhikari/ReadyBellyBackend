var dbConfig = require('../databaseConfig/databaseConnection.js');
const UserSchema = require('./UserSchema.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var productSchema = sequelize.define('products',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	price: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
    type: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	desc: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	offer: {
		type: Sequelize.FLOAT,
		allowNull: false
    },
    size: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	image: {
		type: Sequelize.TEXT,
		allowNull: true
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'products',
	underscored: true,
});

productSchema.belongsTo(UserSchema.userSchema);

productSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside productSchema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {productSchema};
