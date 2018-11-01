<template>

  <div class="todo-list">
  <section id="app" class="todo-container">
    <h2 class="todo-headline">Todos</h2>
    <div class="todo-init">

      <input
        id="todo-create"
        class="todo-input"
        type="text"
        placeholder="What needs to be done?"
        autofocus
      >

      <span
        id="todo-toggle-all"
        class="todo-toggle todo-toggle-all glyphicon glyphicon-ok-sign"
        title="Toggle all todos"
      />

      <span
        id="todo-remove-all"
        class="todo-remove todo-remove-all glyphicon glyphicon-remove-circle"
        title="Remove all completed todos"
      />
    </div>

    <ul id="todo-list" class="todo-list">
      <Todo
        v-for="(t, idx) in todos"
        :key="idx"
        :description="t.description"
        :completed="t.completed"
      />
    </ul>
    <footer class="todo-footer">
      <Stats :todos="todos" />
    </footer>
  </section>
</div>


</template>


<script>

import Stats from './Stats';
import Todo from './Todo';

export default {
  name: '',
  components: {
    Stats,
    Todo,
  },
  props: ['todos'],
  computed: {

  },
  methods: {
    create() {},
    toggleAll() {},
    removeAll() {},
    addOne() {},
    toggleControls() {},
  },
  $trs: {

  },
};

</script>


<style lang="scss" scoped></style>
