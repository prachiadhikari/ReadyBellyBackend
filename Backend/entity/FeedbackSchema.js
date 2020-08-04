var dbConfig = require('../databaseConfig/databaseConnection.js');
const UserSchema = require('./UserSchema.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var feedbackSchema = sequelize.define('feedback',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	message: {
		type: Sequelize.TEXT,
		allowNull: false	
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'feedback',
	underscored: true,
});

feedbackSchema.belongsTo(UserSchema.userSchema);

feedbackSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside feedbackSchema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {feedbackSchema};
