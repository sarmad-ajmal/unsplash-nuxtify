<script setup>
import InfiniteLoading from "v3-infinite-loading";

const config = useRuntimeConfig();
const photos = ref([]);
const router = useRouter();
const currentPage = ref(1);
const currentPageHeight = ref(null);

const { unsplashAccessKey = "4SboObFgLiPLIhCr9dRkYA7FRmDicJbQhi6imu6LnbU" } =
  config || {};
const { unsplashBaseUrl = "" } = config.public || {};
const res = await useFetch(
  `${unsplashBaseUrl}/search/photos?client_id=${unsplashAccessKey}&per_page=30&query=nuxt`
);
photos.value = res.data._rawValue;
const load = async () => {
  const res = await $fetch(
    `${unsplashBaseUrl}/search/photos?client_id=${unsplashAccessKey}&query=nuxt&per_page=30&page=${currentPage.value++}`
  );
  photos.value = [...photos.value, ...res];
};

onMounted(() => {
  currentPageHeight.value = window.innerHeight;
});
</script>

<template>
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
      <InfiniteLoading
        :distance="currentPageHeight / 2"
        :firstload="false"
        @infinite="load"
      />
    </client-only>
  </div>
</template>
<style scoped>
.unsplash-masonry {
  column-count: 3;
}
</style>
