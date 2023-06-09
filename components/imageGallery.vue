<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import queryString from "query-string";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import { FetchError } from "ofetch";

const props = defineProps<{
  query: string;
}>();
const config = useRuntimeConfig();
const photos = ref<IUnsplashPhoto[]>([]);
const currentPage = ref(1);
const currentPageHeight = ref(300);
const dialog = ref(false);
const selectedPhotoURL = ref(null);

const { unsplashAccessKey = "4SboObFgLiPLIhCr9dRkYA7FRmDicJbQhi6imu6LnbU" } =
  config || {};
const { unsplashBaseUrl = "" } = config.public || {};

const computedUrl = computed(() => {
  const params = queryString.stringify({
    client_id: unsplashAccessKey,
    per_page: 30,
    query: props.query,
  });
  if (props.query) {
    return `${unsplashBaseUrl}/search/photos?${params}`;
  }
  return `${unsplashBaseUrl}/photos?${params}`;
});
const toggleDialog = (data: any) => {
  dialog.value = true;
  selectedPhotoURL.value = data;
};
const parseResults = (
  res: _AsyncData<IUnsplashPhoto[] | null, FetchError<any> | null>
) => {
  if (props.query) {
    // @ts-ignore
    return res.data.value.results as unknown as IUnsplashPhoto[];
  }
  return res.data.value as IUnsplashPhoto[];
};
const res = await useFetch<IUnsplashPhoto[]>(computedUrl.value);
photos.value = parseResults(res);

const load = async () => {
  currentPage.value += 1;
  const res: IUnsplashPhoto[] = await $fetch(computedUrl.value);
  photos.value = [...photos.value, ...res];
};

onMounted(() => {
  currentPageHeight.value = window.innerHeight;
});
</script>

<template>
  <v-btn @click="dialog = !dialog">Show {{ dialog }}</v-btn>
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
          @showDialog="toggleDialog"
        />
      </template>

      <InfiniteLoading
        :distance="currentPageHeight / 2"
        :firstload="false"
        @infinite="load"
      />
      <v-dialog
        v-model="dialog"
        fullscreen
        style="backdrop-filter: blur(2px); background: rgb(0 0 0 / 0.7)"
        class="fullscreen"
      >
        <v-row
          row
          wrap
          class="justify-center align-center position-relative"
          style="max-width: 100vw; max-height: 100vh"
        >
          <v-hover v-slot="{ isHovering, props: hoverProps }">
            <div
              v-bind="hoverProps"
              class="position-absolute cursor-pointer top-0 right-0 mt-10 mr-5"
              @click="dialog = false"
            >
              <v-icon
                size="x-large"
                :class="{
                  'text-grey-lighten-2': isHovering,
                  'text-grey': !isHovering,
                }"
              >
                mdi-close
              </v-icon>
            </div>
          </v-hover>
          <v-col sm="8">
            <v-sheet v-if="selectedPhotoURL" color="transparent">
              <img
                :src="selectedPhotoURL"
                alt="image"
                height="600"
                style="width: 100%; object-fit: cover"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-dialog>
    </client-only>
  </div>
</template>
<style scoped>
.unsplash-masonry {
  column-count: 3;
}
</style>
