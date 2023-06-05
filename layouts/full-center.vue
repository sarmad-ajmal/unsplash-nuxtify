<script setup>
onBeforeMount(() => {
  document.getElementsByTagName("html")[0].classList.add("overflow-hidden");
});
onBeforeUnmount(() => {
  document.getElementsByTagName("html")[0].classList.remove("overflow-hidden");
});
</script>
<template>
  <v-app>
    <v-main>
      <div class="d-flex align-center justify-center ma-5 h-screen">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>
