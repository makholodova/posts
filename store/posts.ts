import { defineStore } from 'pinia'

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export const usePostsStore = defineStore('posts', {
	state: () => ({
		posts: [] as Post[],
		loading: false,
	}),
	actions: {
		async fetchPosts() {
			this.loading = true
			try {
				const res = await fetch('https://jsonplaceholder.typicode.com/posts')
				this.posts = await res.json()
			} catch (err) {
				console.error(err)
			} finally {
				this.loading = false
			}
		},
	},
})
