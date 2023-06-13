import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const me = ref({ fullName: "sarmad" });
  const updateMe = (newMe) => {
    me.value = newMe;
  };

  return {
    me,
    updateMe,
  };
});
