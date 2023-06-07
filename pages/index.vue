<script setup>
import InfiniteLoading from "v3-infinite-loading";

const layout = "default";
const config = useRuntimeConfig();
const photos = ref([]);
const currentPage = ref(1);

const { unsplashAccessKey = "4SboObFgLiPLIhCr9dRkYA7FRmDicJbQhi6imu6LnbU" } =
  config || {};
const { unsplashBaseUrl = "" } = config.public || {};
const res = await useFetch(
  `${unsplashBaseUrl}/photos?client_id=${unsplashAccessKey}&per_page=30`
);
photos.value = res.data._rawValue;
// const midOfPage = computed(() => {
//   if (document && document.body) {
//     return document.body.clientHeight / 2;
//   }
// });
// console.log("midOfPage:", midOfPage.value);

const load = async () => {
  const res = await $fetch(
    `${unsplashBaseUrl}/photos?client_id=${unsplashAccessKey}&per_page=30&page=${currentPage.value++}`
  );
  console.log("load:", currentPage.value);
  photos.value = [...photos.value, ...res];
};
// console.log(process.client, process.browser);
</script>
<template>
  <NuxtLayout :name="layout">
    <div class="unsplash-masonry mt-13 px-16">
      <client-only>
        <template v-for="image in photos" :key="image.id">
          <common-image-tile
            :image-url="image.urls.regular"
            :id="image.id"
            :first_name="image.user && image.user.first_name"
            :last_name="(image.user && image.user.last_name) || ''"
            :user_id="image.user && image?.user?.id"
            :user_picture="
              image.user &&
              image.user.profile_image &&
              image?.user?.profile_image?.small
            "
          />
        </template>
        <InfiniteLoading distance="500" firstload="{false}" @infinite="load" />
      </client-only>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.unsplash-masonry {
  column-count: 3;
}
</style>
