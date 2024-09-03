<template>
  <div class="bg-white py-12 sm:py-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
      </div>
      <div class=" flex justify-between items-end ">
        <div class="  flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
             @click="toggleSortDirection">
          <ArrowsUpDownIcon aria-hidden="true" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"/>
        </div>
        <Button label="Create Post" @click="openModal"/>
        <Modal :isOpen="isModalOpen" @close="closeModal" @submit="handleSubmit"/>

      </div>


      <div v-if="loading" class="text-center mt-10">
        <span class="loader">Loading...</span>
      </div>
      <div v-else
           class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-12 sm:pt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <Post v-for="post in paginatedPosts" :key="post.id" :post="post" class="flex max-w-xl flex-col items-start justify-between"/>
      </div>
    </div>
  </div>

  <Pagination
      :currentPage="currentPage"
      :postsPerPage="postsPerPage"
      :totalPages="totalPages"
      :totalPosts="posts.length"
      @page-change="handlePageChange"
  />

</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue'
import {usePostsStore} from '@/store/posts'
import {ArrowsUpDownIcon} from "@heroicons/vue/24/outline";
import Post from "~/components/Post.vue";
import Pagination from "~/components/Pagination.vue";
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";

const isModalOpen = ref(false);
const store = usePostsStore()
const posts = computed(() => store.posts)
const loading = computed(() => store.loading)

const currentPage = ref(1)
const postsPerPage = 10

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return sortedPosts.value.slice(start, start + postsPerPage);
})

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / postsPerPage)
})

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = (newPost: { title: string; body: string }) => {
  console.log('New Post:', newPost);
  closeModal();
};


const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
};

const sortDirection = ref<'asc' | 'desc'>('asc');

const sortedPosts = computed(() => {
  const postsCopy = [...posts.value];
  return postsCopy.sort((a, b) => {
    if (sortDirection.value === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
});


watch(currentPage, store.fetchPosts);
onMounted(() => {
  store.fetchPosts()
})
</script>