const Backbone = require('backbone');
const _ = require('underscore');
const TodoTemplate = require('./templates/item.handlebars');
const ListTemplate = require('./templates/list.handlebars');
const StatsTemplate = require('./templates/stats.handlebars');

// View for individual Todo model
const TodoView = Backbone.View.extend({

  tagName: 'li',

  className: 'todo',

  template: TodoTemplate,

  events: {
    'click .todo-toggle': 'toggleTodo',
    'click .todo-remove': 'removeTodo',
    'dblclick .todo-desc': 'openTodo',
    'keypress .todo-edit': 'editTodo',
  },

  initialize() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'remove', this.remove);
  },

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  toggleTodo(e) {
    this.model.toggle();
  },

  removeTodo() {
    this.model.destroy();
  },

  openTodo(e) {
    $(e.target).hide();
    this.$('.todo-edit').show();
  },

  editTodo(e) {
    // ENTER key pressed, so save the modified todo
    if (e.charCode === 13) {
      const description = $(e.target).val().trim();
      this.model.edit(description);
    }
  },

});

// View for stats
const StatsView = Backbone.View.extend({

  template: StatsTemplate,

  initialize() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render() {
    const statsData = {
      totalTodos: this.collection.getTotal(),
      completedTodos: this.collection.getNumCompleted(),
      incompleteTodos: this.collection.getNumIncomplete(),
    };

    this.$el.html(this.template(statsData));

    return this;
  },

});

// View for TodoList collection
const TodoListView = Backbone.View.extend({

  className: 'todo-list',

  template: ListTemplate,

  events: {
    'keypress #todo-create': 'create',
    'click #todo-toggle-all': 'toggleAll',
    'click #todo-remove-all': 'removeAll',
  },

  initialize() {
    _.bindAll(this, 'addOne');

    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'change', this.toggleControls);
    this.listenTo(this.collection, 'remove', this.toggleControls);
  },

  render() {
    this.$el.html(this.template());
    this.$editor = this.$('#todo-create');
    this.$todoList = this.$('#todo-list');
    this.$footer = this.$('.todo-footer');
    this.addAll();
    this.statsView = new StatsView({
      el: this.$footer,
      collection: this.collection,
    });

    this.statsView.render();

    return this;
  },

  addOne(todoModel) {
    const todoView = new TodoView({ model: todoModel });
    this.$todoList.append(todoView.render().el);
  },

  addAll() {
    this.collection.each(this.addOne);
  },

  create(e) {
    // ENTER key pressed, so save the description
    if (e.keyCode === 13) {
      const desc = this.$editor.val().trim();
      this.collection.createTodo(desc);
      this.$editor.val('');
    }
  },

  toggleAll(e) {
    if (this.collection.getTotal() > 0) {
      this.collection.toggleAll();
    }
  },

  toggleControls() {
    const numCompleted = this.collection.getNumCompleted();
    const isCompleted = numCompleted > 0;
    const isAllCompleted = isCompleted && this.collection.getTotal() === numCompleted;
    const toggleMethod = isCompleted ? 'show' : 'hide';

    this.$('#todo-remove-all')[toggleMethod]();
    this.$('#todo-toggle-all').toggleClass('on', isAllCompleted);
  },

  removeAll() {
    this.collection.removeAllCompleted();
  },

});

module.exports = {
  TodoView,
  TodoListView,
  StatsView,
};
