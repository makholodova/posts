<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
         href="#">Previous</a>
      <a class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
         href="#">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium"> {{ currentPage }}</span>
          to
          <span class="font-medium">{{ postsPerPage }}</span>
          of
          <span class="font-medium">{{ totalPosts }}</span>
          results
        </p>
      </div>
      <div>
        <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
          <a class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
             href="#"
             @click.prevent="previousPage">
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon aria-hidden="true" class="h-5 w-5"/>
          </a>
          <a v-for="page in totalPagesArray"
             :key="page"
             :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold', 
                    page === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer']"
             @click.prevent="goToPage(page)">
            {{ page }}
          </a>

          <a class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
             href="#"
             @click.prevent="nextPage">
            <span class="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" class="h-5 w-5"/>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/20/solid";
import {computed} from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  totalPosts: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();

const totalPagesArray = computed(() => {
  const pages = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }
  return pages;
});


const goToPage = (page: number) => {
  emit('page-change', page);
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
};

</script>