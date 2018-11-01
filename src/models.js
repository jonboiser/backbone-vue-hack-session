const Backbone = require('backbone');
const _ = require('underscore');

// Model
const TodoModel = Backbone.Model.extend({

  defaults: {
    description: '',
    completed: false,
  },

  toggle() {
    const isCompleted = !this.get('completed');
    this.set({ completed: isCompleted });

    return isCompleted;
  },

  edit(description) {
    if (_.isString(description) && description.length > 0) {
      this.set({ description });
    }
  },

});

// Collection
const TodoCollection = Backbone.Collection.extend({

  model: TodoModel,

  getTotal() {
    return this.length;
  },

  getCompleted() {
    return this.where({ completed: true });
  },

  getNumCompleted() {
    return this.getCompleted().length;
  },

  getIncomplete() {
    return this.where({ completed: false });
  },

  getNumIncomplete() {
    return this.getIncomplete().length;
  },

  createTodo(description) {
    if (_.isString(description) && description.length > 0) {
      this.add(new this.model({ description }));
    }
  },

  toggleAll() {
    const incompleteTodos = this.where({ completed: false });

    // Set all incomplete todos to 'completed'
    if (incompleteTodos.length > 0) {
      _(incompleteTodos).each((todoModel) => {
        todoModel.set({ completed: true });
      }, this);
    }

    // All todos completed, so unset the completed status for all
    else {
      this.each((todoModel) => {
        todoModel.set({ completed: false });
      }, this);
    }
  },

  removeAllCompleted() {
    this.remove(this.getCompleted());
  },

});

module.exports = {
  TodoModel,
  TodoCollection,
};
