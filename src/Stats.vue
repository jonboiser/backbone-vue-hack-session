<template>

  <table id="todo-stats" class="todo-stats">
    <tbody>
      <tr>
        <th>Total</th>
        <th>Completed</th>
        <th>Incomplete</th>
      </tr>
      <tr>
        <td>{{totalTodos}}</td>
        <td>{{completedTodos}}</td>
        <td>{{incompleteTodos}}</td>
      </tr>
    </tbody>
  </table>

</template>


<script>

export default {
  name: '',
  components: {

  },
  props: ['todos'],
  computed: {
    totalTodos() {
      return this.todos.length;
    },
    completedTodos() {
      return this.todos.filter(t => t.completed).length;
    },
    incompleteTodos() {
      return this.totalTodos - this.completedTodos;
    },
  },
  methods: {

  },
  $trs: {

  },
};

</script>


<style lang="scss" scoped></style>
