<script setup>
const router = useRouter();
const { slug } = router.currentRoute.value.params;
</script>
<template>
  <image-gallery :query="slug" />
</template>
