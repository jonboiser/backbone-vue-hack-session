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

  it('should render a list when not empty', () => {
    const todos = [
      {
        completed: true,
        description: 'A completed task',
      },
      {
        completed: false,
        description: 'An incompete task',
      },
    ];
    const wrapper = mount(TodoList, {
      propsData: { todos },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
