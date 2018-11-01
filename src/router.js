const Backbone = require('backbone');
const { TodoCollection } = require('./models');
const { TodoListView } = require('./views');


const TodoRouter = Backbone.Router.extend({

  initialize() {
    const todoCollection = new TodoCollection();
    const todoListView = new TodoListView({
      collection: todoCollection,
      el: '#app',
    });
  },

});

module.exports = TodoRouter;
