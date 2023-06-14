<script setup>
import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";

const categoriesTabs = [
  { id: "wallpapers", name: "Wallpapers", href: "/t/wallpapers" },
  { id: "3d-renders", name: "3D Renders", href: "/t/3d-renders" },
  { id: "nature", name: "Nature", href: "/t/nature" },
  { id: "travel", name: "Travel", href: "/t/travel" },
  {
    id: "architecture-interior",
    name: "Architecture & Interior",
    href: "/t/architecture-interior",
  },
  {
    id: "street-photography",
    name: "Street Photography",
    href: "/t/street-photography",
  },
  {
    id: "textures-patterns",
    name: "Textures & Patterns",
    href: "/t/textures-patterns",
  },
  { id: "film", name: "Film", href: "/t/film" },
  { id: "experimental", name: "Experimental", href: "/t/experimental" },
  { id: "animals", name: "Animals", href: "/t/animals" },
  { id: "fashion-beauty", name: "Fashion & Beauty", href: "/t/fashion-beauty" },
  { id: "business-work", name: "Business & Work", href: "/t/business-work" },
  { id: "food-drink", name: "Food & Drinks", href: "/t/food-drink" },
];
const config = useRuntimeConfig();
const { unsplashBaseUrl = "", unsplashAccessKey = "" } = config.public || {};
const headerPhoto = ref("");
const userName = ref("");
const userProfileLink = ref("");
const authStore = useAuthStore();
const { me } = storeToRefs(authStore);
const user = {
  initials: "SA",
  fullName: "John Doe",
  email: "john.doe@doe.com",
  image: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
};

const res = await useFetch(
  `${unsplashBaseUrl}/photos/random?client_id=${unsplashAccessKey}`
);
const { urls } = res.data.value || {};
const { regular } = urls || {};
headerPhoto.value = regular;
userName.value = res.data.value?.user?.first_name;
userProfileLink.value = res.data.value?.user?.portfolio_url;
</script>
<template>
  <v-app>
    <v-main>
      <v-sheet class="pt-6 pb-3 pa-8 position-sticky top-0" style="z-index: 5">
        <v-row class="align-center">
          <img
            class="mr-4"
            src="/images/unsplash-logo.svg"
            alt="unsplash"
            height="32"
            width="32"
          />
          <v-text-field
            density="compact"
            variant="solo-filled"
            label="Search high-resolution photos"
            prepend-inner-icon="mdi-magnify"
            append-inner-icon="mdi-qrcode"
            single-line
            hide-details
            rounded
            flat
          >
          </v-text-field>
          <v-btn variant="plain" class="text-body-2"> Explore </v-btn>
          <v-btn variant="plain" class="text-body-2"> Advertise </v-btn>
          <v-btn variant="plain" class="text-body-2 mr-3 unsplash-premium-btn">
            Unsplash+
          </v-btn>
          <v-divider v-if="!me" :thickness="3" vertical></v-divider>
          <v-btn
            v-if="!me"
            variant="plain"
            class="text-body-2 ml-3"
            href="/login"
          >
            Login
          </v-btn>
          <v-btn
            v-if="!!me"
            variant="outlined"
            size="small"
            class="text-body-2 text-grey"
          >
            Submit a photo
          </v-btn>
          <v-menu width="210px" location="bottom left" offset="10">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props" size="" class="ml-5">
                <v-avatar color="brown" size="small" :image="user.image">
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <div class="mx-auto text-left">
                <v-list density="compact">
                  <v-list-item>
                    <v-list-item-title>
                      <a
                        href="/profile"
                        class="text-body-2 text-grey-darken-3 decoration-none pointer-cursor"
                      >
                        View profile
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <a
                        href="/stats"
                        class="text-body-2 text-grey-darken-3 decoration-none pointer-cursor"
                      >
                        Stats
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <a
                        href="/settings"
                        class="text-body-2 text-grey-darken-3 decoration-none pointer-cursor"
                      >
                        Account Settings
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                  <v-divider class="my-3"></v-divider>
                  <v-list-item>
                    <v-list-item-title>
                      <a
                        href="/logout"
                        class="text-body-2 text-grey-darken-3 decoration-none pointer-cursor"
                      >
                        Logout
                      </a>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-menu>
        </v-row>
        <v-row class="mt-5 d-flex align-center mb-0">
          <v-btn
            variant="plain"
            :density="'compact'"
            class="text-body-2 mr-3 pa-0"
          >
            Editorial
          </v-btn>
          <v-divider :thickness="1" vertical></v-divider>
          <v-tabs
            style="max-width: calc(100vw - 140px)"
            show-arrows
            density="compact"
            hide-slider
          >
            <template v-for="tab in categoriesTabs" :key="tab?.id">
              <v-tab
                value="one"
                style="text-transform: capitalize; color: #767676"
                :href="tab.href"
                class="text-body-2"
                >{{ tab.name }}</v-tab
              >
            </template>
          </v-tabs>
        </v-row>
      </v-sheet>
      <div
        class="unsplash-hero position-relative w-100"
        style="height: calc(100vh - 110px); width: 100vw"
      >
        <img class="mr-4 hero-img" alt="unsplash" :src="headerPhoto" />
        <div
          class="position-absolute text-body-2 w-100 d-flex justify-space-between align-items-center footer-text"
        >
          <div>
            Photo by
            <a
              :href="userProfileLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-1"
              style="text-decoration: none; color: white; font-weight: bold"
              >{{ userName }}</a
            >
          </div>
          <div>
            <span class="text-grey">Read more about the </span
            ><span>
              <a
                href="https://unsplash.com/license"
                target="_blank"
                rel="noopener noreferrer"
                class="text-body-2 text-white text-decoration-none"
                >Unsplash License</a
              >
            </span>
          </div>
          <div></div>
        </div>
        <div class="hero-search">
          <h1>Unsplash</h1>
          <h5>The internet’s source for visuals.</h5>
          <h5>Powered by creators everywhere.</h5>
          <v-text-field
            class="mt-5"
            variant="solo-filled"
            label="Search high-resolution photos"
            prepend-inner-icon="mdi-magnify"
            append-inner-icon="mdi-qrcode"
            single-line
            hide-details
            flat
          >
          </v-text-field>
        </div>
      </div>
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.unsplash-premium-btn {
  background: linear-gradient(135deg, #fa00ff, #00e0ff 50%, #fa00ff);
  text-decoration-skip-ink: auto;
  transition: color 0.1s ease-in-out, opacity 0.1s ease-in-out;
  animation: vZKGD 3s linear infinite alternate-reverse;
  animation-play-state: paused;
  background-clip: text;
  background-size: 500%;
  color: #0000;
}
@keyframes vZKGD {
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 12% 100%;
  }
}

.footer-text {
  left: 10px;
  bottom: 0px;
  color: white;
  background-image: linear-gradient(
    to top,
    #94939383 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
.hero-img {
  object-fit: cover;
  object-position: center;
  height: 100%;
  width: 100%;
}
.hero-search {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;
  width: max(55%, 500px);
  color: white;
  z-index: 1;
}
.hero-search h1 {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 0;
}
.hero-search h5 {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0;
}

.unsplash-hero::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.17);
  z-index: 0;
  pointer-events: none;
}
</style>
