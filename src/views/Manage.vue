<template>
  <div>
    <div>
      <div class="main-header flex justify-center align-center">
        <h1 v-if="todoId">Edit Article</h1>
        <h1 v-else>Create Article</h1>
      </div>
      <div class="flex justify-center">
        <button class="main-btn" @click="getPreviosState()">↶</button>
        <button class="main-btn" @click="getNextState()">↷</button>
      </div>
    </div>
    <div class="content">
      <div class="flex-column">
        <label>Article name</label>
        <input class="text-input" type="text" v-model="article.name" @change="saveState()" />
      </div>
      <div>
        <div class="relative">
          <h3>TODOS:</h3>
          <div class="absolute-block flex justify-end align-center">
            <Icons add-icon @add="addToDo()" />
          </div>
        </div>
        <template v-if="article.todos.length > 0">
          <Todo
            v-for="todo in article.todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo($event)"
            @change="saveState()"
          />
        </template>
      </div>
      <div>
        <template v-if="todoId">
          <button class="block-btn main-btn delete-btn" @click="dialog = true">Delete Article</button>
          <button
            class="block-btn main-btn"
            @click="changeArticle()"
            :disabled="articleFilled"
          >Edit Article</button>
        </template>
        <button
          v-else
          class="block-btn main-btn"
          :disabled="articleFilled"
          @click="createArticle()"
        >Create Article</button>
        <button class="block-btn main-btn" @click="$router.push('/')">Cancel</button>
      </div>
    </div>
    <ConfirmModal :dialog="dialog" @cancel="dialog = false" @confirm="removeArticle()"/>
  </div>
</template>

<script>
import Todo from "../components/Todo";
import { mapMutations, mapGetters, mapActions } from "vuex";
import Icons from "../components/Icons";
import ConfirmModal from "../components/ConfirmModal";

export default {
  name: "Manage",
  components: {
    Todo,
    Icons,
    ConfirmModal
  },
  data() {
    return {
      article: {
        name: "",
        todos: [],
      },
      states: [],
      state: 0,
      dialog: false
    };
  },
  computed: {
    ...mapGetters(["getArticlesById"]),
    emptyName() {
      return this.article.name.trim().length === 0;
    },
    emptyTodos() {
      return this.article.todos.length === 0;
    },
    todoId() {
      return this.$route.params.id;
    },
    todosFilled() {
      return this.article.todos.every((item) => item.name !== "");
    },
    articleFilled() {
      return this.emptyTodos || this.emptyName || !this.todosFilled;
    },
  },
  methods: {
    ...mapMutations(["addArticle", "deleteArticle", "editArticle"]),
    ...mapActions(["saveSessionArticles"]),
    createArticle() {
      this.article.id = Date.now();
      this.addArticle(this.article);
      this.$router.push("/");
      this.saveSessionArticles();
    },
    changeArticle() {
      this.editArticle(this.article);
      this.$router.push("/");
      this.saveSessionArticles();
    },
    removeArticle() {
      this.deleteArticle(this.article.id);
      this.$router.push("/");
      this.saveSessionArticles();
    },
    addToDo() {
      this.article.todos.push({
        id: Date.now(),
        name: "",
        done: false,
      });
      this.saveState();
    },
    deleteTodo(id) {
      this.article.todos = this.article.todos.filter((item) => item.id !== id);
      this.saveState();
    },
    saveState() {
      this.states = JSON.parse(
        JSON.stringify(this.states.slice(0, this.state + 1))
      );
      ++this.state;
      this.$set(
        this.states,
        this.states.length,
        JSON.parse(JSON.stringify(this.article))
      );
    },
    getPreviosState() {
      if (this.state <= 0) {
        this.article = JSON.parse(JSON.stringify(this.states[0]));
      } else {
        --this.state;
        this.article = JSON.parse(JSON.stringify(this.states[this.state]));
      }
    },
    getNextState() {
      if (this.state >= this.states.length - 1) return;
      ++this.state;
      this.article = JSON.parse(JSON.stringify(this.states[this.state]));
    },
  },
  created() {
    if (this.todoId) {
      this.article = this.getArticlesById(this.todoId);
    }
    this.$set(this.states, this.states.length, Object.assign({}, this.article));
  },
};
</script>

<style>
</style>
