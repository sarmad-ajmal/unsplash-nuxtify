<script setup>
const layout = "default";
const config = useRuntimeConfig();
const photos = ref([]);
const { unsplashAccessKey = "4SboObFgLiPLIhCr9dRkYA7FRmDicJbQhi6imu6LnbU" } =
  config || {};
const { unsplashBaseUrl = "" } = config.public || {};
const res = await useFetch(
  `${unsplashBaseUrl}/photos?client_id=${unsplashAccessKey}&per_page=30`
);
photos.value = res.data.value;

const load = () => {
  console.log("load");
};
</script>

<template>
  <NuxtLayout :name="layout">
    <div class="unsplash-masonry mt-13 px-16">
      <v-infinite-scroll 
      height="300"
    mode="manual"
    @load="load"
      >
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
      </v-infinite-scroll>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.unsplash-masonry {
  column-count: 3;
}
</style>
