import HomeView from "@/views/HomeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";
import FilmView from "@/views/FilmView.vue";

export const routes = [
  { path: '/', component: HomeView },
  { path: '/favorites', component: FavoriteView },
  { path: '/film/:id', component: FilmView },
]
