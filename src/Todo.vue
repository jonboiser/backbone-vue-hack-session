<template>

  <li>
    <span
      class="todo-toggle glyphicon glyphicon-ok"
      :class="todoToggleClass"
      @click="toggleTodo"
    >
    </span>
    <input
      class="todo-input todo-edit"
      type="text"
      :value="description"
      @keypress="editTodo"
    >
    <label
      class="todo-desc"
      @click="openTodo"
    >
      {{ description }}
    </label>
    <span
      class="todo-remove glyphicon glyphicon-remove"
      @click="removeTodo"
    ></span>
  </li>

</template>


<script>

export default {
  name: 'Todo',
  components: {

  },
  props: ['completed', 'description'],
  computed: {
    todoToggleClass() {
      if (this.completed) {
        return ['todo-toggle-compete'];
      }
      return [];
    },
  },
  methods: {
    toggleTodo() {},
    removeTodo() {},
    openTodo() {},
    editTodo() {},
  },
  $trs: {

  },
};

</script>


<style lang="scss" scoped></style>
