/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

PostgreSQL DB table name is: 'todos'
=================================================================*/

var pg = require('pg');

// Require Sequelize
var Sequelize = require('sequelize');

// Db connection
var database = require('../config/database.js');
var conString = database.conString;

// Init Sequelize connection
var sequelize = new Sequelize(conString);

// Require Todo Module
var todoModule = require('../module/todo.module.js');
todoModule.sequelize = sequelize; // setting sequelize connection instance
todoModule.Sequelize = Sequelize; // passing Sequelize object

// Getting todo Model
var todo = todoModule.model();

// Getting user Model
var user = todoModule.usermodel();

var results = [];

var self = module.exports = {

	/*================================================================
	CREATE - $http post
	=================================================================*/
	// create todo and send back all todos after creation
	createTodo : function(req, res) {

		// Data to be saved to the DB - taken from $http request packet
		var data = {
			text : req.body.text,
			done : false
		};

		// Load model no force as we want to keep data
		todo.sync().then(() => {
			
			// After table created/initialized we create the user
			return todo.create({
				text: data.text,
				done: data.done
			});

		}).then(function(){

			// Calling method to get all todos tasks
			self.getTodos(req, res);

		});

  },


	/*================================================================
	READ - $http get
	=================================================================*/
	//Get all todos in the database
	getTodos : function(req, res) {

		// Recovering all todos tasks
		todo.findAll({raw: true, order:sequelize.col('done')}).then(todostasks => {

			// Returning all items
			return res.json(todostasks);
			
		});

	},


	/*================================================================
	UPDATE - $http put
	=================================================================*/
	updateTodo : function(req, res) {

  	var id = req.params.todo_id;

		// Data to be saved to the DB - taken from $http request packet
		var data = {
			text : req.body.text,
			done: req.body.done
		};

		// Updating todo
		todo.update(
			{
				text: data.text,
				done: data.done
			}, 
			{
				where: {
					id: id
				}
		}).then(function(){

			// Calling method to get all todos tasks
			self.getTodos(req, res);

		});
	
  },

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	deleteTodo : function(req, res) {

		// ID to be used to delete
		var id = req.params.todo_id;

		todo.destroy({
			where: {
				id: id
			}
		}).then(function(){

			// Calling method to get all todos tasks
			self.getTodos(req, res);

		});

	},

	/*================================================================
	LOGIN - $http post
	=================================================================*/
	// user login
	loginUser : function(req, res) {

		// Data to be saved to the DB - taken from $http request packet
		var data = {
			user : req.body.user,
			pass : req.body.pass
		};

		// Finding user with that name and pass
		user.findOne({ where: { user: data.user, pass:data.pass} }).then(
			function(user) {  
				// Returning username
				return res.json({status:'success', name: user.user});
			},
			function(err) { 
				// Returning error
				return res.json(err);
			}
		);

  }

};