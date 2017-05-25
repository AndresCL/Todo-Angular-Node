// TODO Module: Handles sequelize model
module.exports = {

  // Defining Todo Model
  model: function(){
    var model = this.sequelize.define('todo', {
      text: {
        type: this.Sequelize.TEXT
      },
      done: {
        type: this.Sequelize.BOOLEAN
      }
    })

    return model;
  },

  // Defining User Model
  usermodel: function(){
    var model = this.sequelize.define('users', {
      user: {
        type: this.Sequelize.TEXT
      },
      pass: {
        type: this.Sequelize.TEXT
      }
    })

    return model;
  }
  
}