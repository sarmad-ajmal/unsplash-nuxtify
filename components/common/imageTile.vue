<script setup lang="ts">
const props = defineProps<{
  id: string;
  imageUrl: string;
  first_name: string;
  last_name: string;
  user_id: string;
  user_picture: string;
}>();
</script>
<template>
  <div
    class="image-tile position-relative"
    @click="
      () => {
        $emit('showDialog', imageUrl);
      }
    "
  >
    <v-hover v-slot="{ isHovering, props: hoverProps }">
      <img :src="imageUrl" alt="" v-bind="hoverProps" />
      <div
        class="hover-content position-absolute h-100 w-100 flex-column justify-space-between"
      >
        <div class="action-buttons text-right mt-2 mr-2">
          <v-btn
            class="mr-2"
            :class="isHovering ? 'primary' : 'grey lighten-2'"
            size="small"
            flat
            @click.stop=""
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn
            class="mr-2"
            :class="isHovering ? 'primary' : 'grey lighten-2'"
            size="small"
            flat
            @click.stop=""
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div
          class="bottom-content ml-2 mb-2 d-flex justify-space-between align-center"
        >
          <div class="d-flex align-center">
            <v-avatar
              :image="user_picture"
              size="30"
              class="pb-0 cursor-pointer"
              @click.stop=""
            ></v-avatar>
            <div class="d-flex flex-column ml-2 cursor-pointer" @click.stop="">
              <span class="text-body-2 text-white">{{
                first_name + "" + last_name
              }}</span>
              <span class="text-caption text-grey-lighten-1 hire-me"
                >Available for hire</span
              >
            </div>
          </div>
          <a class="text-black" :href="imageUrl" download target="_blank">
            <v-btn
              class="mr-2"
              :class="isHovering ? 'primary' : 'grey lighten-2'"
              size="small"
              flat
              title="Download"
              @click.stop=""
            >
              <v-icon> mdi-download </v-icon>
            </v-btn>
          </a>
        </div>
      </div>
    </v-hover>
  </div>
</template>
<style scoped>
.image-tile {
  cursor: zoom-in;
}
.image-tile img {
  width: 100%;
  height: auto;
  margin: 0 0 1em;
  box-sizing: border-box;
  display: block;
}
.image-tile:hover .hover-content {
  display: flex;
}

.hover-content {
  display: none;
  left: 0;
  top: 0;
  z-index: 1;
}
.hover-content::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
  pointer-events: none;
}
</style>
