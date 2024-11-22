<script>
export default {
    props: {
        books: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    },
	async created() {
		const isLoggedIn = localStorage.getItem('Admin_token');
		if (!isLoggedIn) {
		  const router = useRouter();
		  router.push('/admin/login'); 
		  return; 
		}
	},
};
</script>

<template>
    <ul class="list-group pt-3">
        <li
            class="list-group-item d-flex align-items-center"
            v-for="(book, index) in books"
            :key="book._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            <img :src="book.HINHANH" alt="Book Image" class="mr-3" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">

            <div>
                <h5 class="mb-1">{{ book.TENSACH }}</h5>
                <p class="mb-1">Mã sách: {{ book.MASACH }}</p>
				<p class="mb-1 fw-bold">Tác giả: {{ book.TACGIA }}</p>
            </div>
        </li>
    </ul>
</template>
