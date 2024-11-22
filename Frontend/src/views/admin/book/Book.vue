<template>
    <div class="col-md-6">
        <InputSearch v-model="searchText" />
    </div>
    <div class="row mb-3">
        <div class="mt-3 col-md-6">
            <h4>
                Sách
                <i class="fas fa-book"></i>
            </h4>
            <div class="book-list-container">
                <BookList 
                    v-if="filteredBooksCount > 0"
                    :books="filteredBooks"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có sách nào</p>
            </div>

            <div class="mt-3 button-click">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> 

                <button class="btn btn-sm btn-success" @click="gotoAddBook()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> 

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllBooks"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả    
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4 style="padding-left: 0.5rem;">
                    Chi tiết sách
                    <i class="fas fa-book"></i>
                </h4>
                <BookDetail :book="activeBook" />
                <router-link
                    :to="{
                        name: 'book.edit',
                        params: { id: activeBook._id},
                    }"
                >   
                    <span class="mt-2 btn btn-warning">
                        <i class="fas fa-edit"></i> 
                        Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BookDetail from '@/components/admin/book/BookDetail.vue';
import InputSearch from '@/components/admin/book/InputSearch.vue';
import BookList from '@/components/admin/book/BookList.vue';
import BookService from "@/services/book.service";
import { useRouter } from 'vue-router';

export default {
    components: {
        BookDetail,
        InputSearch,
        BookList,
    },

	async created() {
		const isLoggedIn = localStorage.getItem('Admin_token');
		if (!isLoggedIn) {
		  const router = useRouter();
		  router.push('/admin/login'); 
		  return; 
		}
	},

    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },

    watch: {
        searchText(newVal) {
            this.searchBooks(newVal);
        },
    },
    
    computed: {
        bookStrings() {
            return this.books.map((book) => {
                const { TENSACH, TACGIA, MASACH } = book;
                return [TENSACH, TACGIA, MASACH].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },

    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async searchBooks(searchText) {
            try {
                this.books = await BookService.getByNameOrAuthorOrBookId(searchText);
                this.activeIndex = -1;
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },

        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sách?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        gotoAddBook() {
            this.$router.push({ name: "book.add" });
        },    
    },
    
    mounted() {
        this.refreshList();
    },
};
</script>