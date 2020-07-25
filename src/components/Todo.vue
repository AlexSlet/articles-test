<template>
  <div class="todo flex justify-between relative">
    <input class="todo-checkbox" type="checkbox" v-model="todo.done" :disabled="mainPage" />
    <span v-if="mainPage">{{todo.name}}</span>
    <input v-else class="todo-input" type="text" v-model="todo.name" @change="$emit('change')" />
    <Icons v-show="!mainPage" delete-icon @delete="dialog = true" />
    <ConfirmModal :dialog="dialog" @confirm="$emit('delete', todo.id)" @cancel="dialog = false" />
  </div>
</template>

<script>
import Icons from "./Icons";
import ConfirmModal from "./ConfirmModal";
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    mainPage: {
      type: Boolean,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  components: {
    Icons,
    ConfirmModal,
  },
};
</script>

<style>
.todo {
  padding: 5px 0;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.todo-input {
  border: none;
  outline: none;
  transition: all 0.3s;
  border-radius: 5px;
  padding: 5px;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
}
</style>