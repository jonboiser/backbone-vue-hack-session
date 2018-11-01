const $ = require('jquery');
const TodoRouter = require('./router');

// Run the app
$(() => {
  const todoApp = new TodoRouter();
});
