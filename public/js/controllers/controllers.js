'use strict';

/*================================================
Module - for the Controllers
================================================ */
angular.module('postgreDbApp.controllers', ['angular-md5', 'ui.event', 'ui.bootstrap'])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService, $location) {

	$scope.formData = {};
	$scope.todos={};

	$scope.user = {};

	// Handle login status via localStorage data
	if(localStorage.userAuthenticated === "true") {
		$scope.user.authenticated = localStorage.userAuthenticated;
		$scope.user.name = localStorage.userName;
	} else {

		// Redirect to home
		$location.path('/login');
	}

	/*
	 * Get Todos
	 */
	getTodosService.getTodos()
		.then(function(answer) {
			$scope.todos = answer.data;
		},
		function(error) {
			console.log("OOPS!!!! " + JSON.stringify(error));
		}
  	);


	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {
		createTodoService.createTodo($scope.formData)
			.then(function(answer) {
				$scope.todos = answer.data;
			},
			function(error) {
				console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
			}
	  	);
	};

	// Update todo on blur callback using ui.event
	$scope.blurCallback = function(todo) {
		
		var updateData = {"text":todo.text, "done": todo.done};

		updateTodoService.updateTodo(todo.id, updateData)
			.then(function(answer) {
				$scope.todos = answer.data;
			},
			function(error) {
				console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
			}
	  	);
	};

	/*
	 * Update a Todo
	 */
	// $scope.editTodo = function(id, txt, isDone) {

	// 	var updateData = {"text":txt, "done": isDone};

	// 	updateTodoService.updateTodo(id, updateData)
	// 		.then(function(answer) {
	// 			$scope.todos = answer;
	// 		},
	// 		function(error) {
	// 			console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
	// 		}
	//   	);
	// };


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id) 
	{
		deleteTodoService.deleteTodo(id)
			.then(function(answer) {
				$scope.todos = answer.data;
			},
			function(error) {
				console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
			});

	};

	// Logout User
	$scope.logout = function(){

		// Reseting status in localStorage
		localStorage.userName = '';
		localStorage.userAuthenticated = false;

		// Redirect to home
		$location.path('/login');

	}


})


// Controller - LoginCtrl
.controller('LoginCtrl', function($scope, $q, loginTodoService, md5, $location) {

	// Handle login status via localStorage data
	if(localStorage.userAuthenticated === "true") {

		// Redirect to todo
		$location.path('/todo');
	} 

	$scope.user = {};
	$scope.user.login = { error: false, msg: '' };

	// User Login
	$scope.loginUser = function() {

		// Hashing pass
		var pass = md5.createHash($scope.user.pass || '')

		// Creating login data
		var loginData = {user: $scope.user.username, pass: pass}

		// Calling service
		loginTodoService.loginUser(loginData)
			.then(function(data) {

				if(data.data.status !== 'success'){
					// Handling error
					$scope.user.login.error = true;
					$scope.user.login.msg = 'There was an error trying to login. Check your username and pass.';
				}
				else{
					
					// Saving user & login status in localStorage
					localStorage.userName = data.data.name;
					localStorage.userAuthenticated = true;

					// Change path
					$location.path('/todo');
				}
				
			},
			function(error) {
				// Handling error
				$scope.user.login.error = true;
				$scope.user.login.msg = 'There was an error trying to login. Check your username and pass. Error: ' + 
																JSON.stringify(error);
			}
	  	);
	};
	
});