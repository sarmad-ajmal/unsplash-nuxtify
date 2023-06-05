<script setup>
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
</script>
<template>
  <v-app>
    <v-main>
      <div class="h-screen py-6 pa-8">
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
          <v-divider :thickness="3" vertical></v-divider>
          <v-btn variant="plain" class="text-body-2 ml-3"> Login </v-btn>
          <v-btn variant="outlined" size="small" class="text-body-2 text-grey">
            Submit a photo
          </v-btn>
          <!-- icon button -->
          <v-btn icon size="xs" variant="plain" class="ml-4">
            <!-- hamburger icon -->
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-row>
        <v-row class="mt-10 d-flex align-center">
          <v-btn
            variant="plain"
            :density="'compact'"
            class="text-body-2 mr-3 pa-0"
          >
            Editorial
          </v-btn>
          <v-divider :thickness="1" vertical></v-divider>
          <v-tabs style="max-width: calc(100vw - 150px)">
            <template v-for="tab in categoriesTabs" :key="tab?.id">
              <v-tab
                value="one"
                style="text-transform: capitalize"
                :href="tab.href"
                selected-class=""
                >{{ tab.name }}</v-tab
              >
            </template>
          </v-tabs>
        </v-row>
        <slot />
      </div>
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
</style>
