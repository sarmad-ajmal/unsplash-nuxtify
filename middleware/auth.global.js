import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to, from) => {
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  const authStore = useAuthStore();
  const { me } = storeToRefs(authStore);

  if (to.path !== "/") {
  }
});
