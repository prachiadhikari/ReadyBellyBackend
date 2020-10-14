var dbConfig = require('../databaseConfig/databaseConnection.js');
var sequelize = dbConfig.sequelize;
var Sequelize = dbConfig.Sequelize;


var contactSchema = sequelize.define('contact',
// attributes
{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	yourname: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	youremail: {
		type: Sequelize.TEXT,
		allowNull: false	
	},
	yourfeedback: {
		type: Sequelize.TEXT,
		allowNull: false	
	}
}, {
	//Options
	paranoid: true,
	freezeTableName: false,
	tableName: 'contact',
	underscored: true,
});



contactSchema.sync({ /* stop forcing updating table */ force: false})
.then(function(result){
	console.log("inside contactSchema sync:: " + result);
})
.catch(function(err) {
	console.log(err);
});

module.exports = {contactSchema};
