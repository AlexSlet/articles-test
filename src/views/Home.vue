<template>
  <div class="home">
    <div class="main-header flex justify-center align-center relative">
      <h1>Articles</h1>
      <div class="absolute-block flex justify-end align-center">
        <Icons add-icon @add="$router.push('/manage')" />
      </div>
    </div>
    <div class="articles content">
      <h3 v-if="isNoArticles">No articles yet, please add.</h3>
      <Article
        v-else
        v-for="article in articles"
        :key="article.id"
        :article="article"
        disabled
        isHome
        @edit="editArticle($event)"
      />
    </div>
  </div>
</template>

<script>
import Article from "../components/Article";
import Icons from "../components/Icons";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Article,
    Icons,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      articles: "getArticles",
    }),
    isNoArticles() {
      return this.articles.length === 0;
    },
  },
  methods: {
    editArticle(id) {
      this.$router.push(`manage/${id}`);
    },
  },
};
</script>

<style scoped>
.home {
  border: 1px solid #1e1e1e;
  border-radius: 5px;
}

.articles::-webkit-scrollbar {
  width: 5px;
}

.articles::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.articles::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
