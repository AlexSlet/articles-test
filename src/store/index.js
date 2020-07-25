import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    addArticle(state, article) {
      state.articles = [...state.articles, article];
    },
    deleteArticle(state, id) {
      state.articles = state.articles.filter(item => item.id !== id);
    },
    editArticle(state, article) {
      const indx = state.articles.findIndex(item => item.id === article.id);
      if(!indx) return;
      state.articles[indx] = article;
    },
    saveArticles(state, articles) {
      state.articles = articles;
    }
  },
  actions: {
    saveSessionArticles({state}) {
      sessionStorage.setItem('articles', JSON.stringify(state.articles));
    },
    getSessionArticles({commit}) {
      const sessionArticles = JSON.parse(sessionStorage.getItem("articles"));
      if (!sessionArticles) return;
      commit('saveArticles', sessionArticles);
    }
  },
  getters: {
    getArticles: (state) => state.articles,
    getArticlesById: (state) => (id) => state.articles.find(item => item.id === +id),
  }
})
