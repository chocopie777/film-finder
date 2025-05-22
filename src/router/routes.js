import HomeView from "@/views/HomeView.vue";
import FavoriteView from "@/views/FavoriteView.vue";

export const routes = [
  { path: '/', component: HomeView },
  { path: '/favorites', component: FavoriteView },
]
