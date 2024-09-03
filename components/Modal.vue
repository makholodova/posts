<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog class="relative z-10" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
                       leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form @submit.prevent="submitPost">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class=" sm:items-start">
                    <div class="mt-3 text-center  sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Create post</DialogTitle>

                      <div class="mt-2 w-full">
                        <div class="w-full ">
                          <label class="block text-sm font-medium leading-6 text-gray-900" for="about">Title</label>
                          <div class="mt-2">
                            <input id="title"
                                   v-model="newPost.title"
                                   class=" block w-full p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   name="title"
                            />
                          </div>
                        </div>
                        <div class=" w-full">
                          <label class="block text-sm font-medium leading-6 text-gray-900" for="about">Information</label>
                          <div class="mt-2">
                            <textarea id="body"
                                      v-model="newPost.body"
                                      class="block w-full p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      name="body"
                                      rows="3"/>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div class=" sm:flex bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                      type="submit"
                  >Save
                  </button>
                  <button ref="cancelButtonRef"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          type="button"
                          @click="close">Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close', 'submit']);

const newPost = ref({
  title: '',
  body: '',
});

const close = () => {
  emit('close');
};

const submitPost = () => {
  console.log('New Post:', newPost)
  emit('submit', newPost.value);
  close();
};


</script>