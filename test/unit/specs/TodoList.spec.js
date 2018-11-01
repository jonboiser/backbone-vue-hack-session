const { TodoListView } = require('@/views');
const { TodoCollection } = require('@/models');

describe('TodoListView render method', () => {
  it('should render an empty list when empty', () => {
    const todoCollection = new TodoCollection();
    const todoListView = new TodoListView({ collection: todoCollection });
    todoListView.render();
    const html = todoListView.$el[0].outerHTML;
    expect(html).toMatchSnapshot();
  });
  it('should render a list when not empty', () => {
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
