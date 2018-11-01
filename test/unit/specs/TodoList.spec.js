// const { TodoListView } = require('@/views');
// const { TodoCollection } = require('@/models');
const TodoList = require('../../../src/TodoList.vue');
const { mount } = require('@vue/test-utils');

describe('TodoListView render method', () => {
  it('should render an empty list when empty', () => {
    const wrapper = mount(TodoList, {
      propsData: {
        todos: [],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  xit('should render a list when not empty', () => {
    const todoCollection = new TodoCollection([
      {
        completed: true,
        description: 'A completed task',
      },
      {
        completed: false,
        description: 'An incompete task',
      },
    ]);
    const todoListView = new TodoListView({ collection: todoCollection });
    todoListView.render();
    const html = todoListView.$el[0].outerHTML;
    expect(html).toMatchSnapshot();
  });
});
