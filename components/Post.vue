<template>
  <div class="group relative ">
     <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
    {{ post.id }} {{ post.title }}
    </h3>
    <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.body }}</p>
  </div>

</template>

<script lang="ts" setup>
import {defineProps} from 'vue';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const props = defineProps<{
  post: Post;
}>();
</script>