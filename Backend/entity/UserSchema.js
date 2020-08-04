var dbConfig = require('../databaseConfig/databaseConnection.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var userSchema = sequelize.define('user',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	password: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	fullname: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	restaurantname: {
		type: Sequelize.TEXT,
		allowNull: true	
	},
	user_type: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	address1:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	phone:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	mobile:{
		type: Sequelize.TEXT,
		allowNull: false
	},
	image_path:{
		type: Sequelize.TEXT,
		allowNull: true
	},
	isApproved:{
		type: Sequelize.BOOLEAN,
		allowNull:false,
		defaultValue: false
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'users',
	underscored: true
});

userSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside userschema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {userSchema};
