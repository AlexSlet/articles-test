<template>
  <div>
    <div class="article">
      <div class="flex-column justify-center align-center relative">
        <h3>{{article.name}}</h3>
        <div class="absolute-block flex justify-end align-center">
          <Icons edit-icon delete-icon @edit="$emit('edit', article.id)" @delete="dialog = true;"/>
        </div>
        <span class="separator"></span>
      </div>
      <div v-for="todo in getTodos" :key="todo.id">
        <Todo :todo="todo" main-page/>
      </div>
    </div>
    <span v-if="getTodos.length < article.todos.length">...</span>
    <ConfirmModal :dialog="dialog" @cancel="dialog = false" @confirm="removeArticle()"/>
  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import Icons from "./Icons";
import ConfirmModal from "./ConfirmModal"
import Todo from "./Todo"
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean
    },
    isHome: {
      type: Boolean
    }
  },
  data(){
    return {
      dialog: false
    }
  },
  components: {
    Icons,
    ConfirmModal,
    Todo
  },
  computed: {
    getTodos() {
      return this.isHome ? this.article.todos.slice(0, 3) : this.article.todos;
    }
  },
  methods: {
    ...mapActions(["saveSessionArticles"]),
    ...mapMutations(['deleteArticle']),
    removeArticle() {
      this.deleteArticle(this.article.id);
      this.saveSessionArticles();
    }
  }
};
</script>

<style>
</style>