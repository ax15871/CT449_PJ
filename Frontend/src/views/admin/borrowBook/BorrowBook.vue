<template>
  <div>
    <div class="col-md-6">
        <InputSearch v-model="searchText" />
    </div>
    <div class="row mb-3">
        <div class="mt-3 col-md-6">
            <h4>
                Thông tin mượn sách
                <i class="fas fa-user-pen"></i>
            </h4>
            <div class="borrow-book-list-container">
                <BorrowBookList 
                    v-if="filteredBorrowBooksCount > 0"
                    :borrowBooks="filteredBorrowBooks"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có sách nào</p>
            </div>

            <div class="mt-3 button-click">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> 

                <button class="btn btn-sm btn-success" @click="gotoAddBorrowBook()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> 

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllBorrowBooks"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả    
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBorrowBook">
                <h4 style="padding-left: 0.5rem;">
                    Chi tiết mượn sách
                    <i class="fas fa-user-pen"></i>
                </h4>
                <BorrowBookDetail :borrowBook="activeBorrowBook" />
                <router-link
                    :to="{
                        name: 'borrowBook.edit',
                        params: { id: activeBorrowBook._id},
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
  </div>
</template>

<script>
import BorrowBookDetail from '@/components/admin/borrowBook/BorrowBookDetail.vue';
import InputSearch from '@/components/admin/borrowBook/InputSearch.vue';
import BorrowBookList from '@/components/admin/borrowBook/BorrowBookList.vue';
import BorrowBookService from "@/services/borrowBook.service";
import BookService from "@/services/book.service";
import { useRouter } from 'vue-router';

export default {
    components: {
        BorrowBookDetail,
        InputSearch,
        BorrowBookList,
    },

    data() {
        return {
            borrowBooks: [],
            activeIndex: -1,
            searchText: "",
        };
    },

	async created() {
		const isLoggedIn = localStorage.getItem('Admin_token');
		if (!isLoggedIn) {
		  const router = useRouter();
		  router.push('/admin/login'); 
		  return; 
		}
	},

    watch: {
        searchText(newVal) {
            this.searchBorrowBooks(newVal);
        },
    },
    
    computed: {
        borrowBookStrings() {
            return this.borrowBooks.map((borrowBook) => {
                const { MADOCGIA, MASACH } = borrowBook;
                return [MADOCGIA, MASACH].join("");
            });
        },
        filteredBorrowBooks() {
            if (!this.searchText) return this.borrowBooks;
            return this.borrowBooks.filter((_borrowBook, index) =>
                this.borrowBookStrings[index].includes(this.searchText)
            );
        },
        activeBorrowBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBorrowBooks[this.activeIndex];
        },
        filteredBorrowBooksCount() {
            return this.filteredBorrowBooks.length;
        },
    },

    methods: {
        async retrieveBorrowBooks() {
            try {
                this.borrowBooks = await BorrowBookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async searchBorrowBooks(searchText) {
            try {
                this.borrowBooks = await BorrowBookService.getByReaderIdOrBookId(searchText);
                this.activeIndex = -1; 
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBorrowBooks();
            this.activeIndex = -1;
        },

        async removeAllBorrowBooks() {
            if (confirm("Bạn muốn xóa tất cả thông tin mượn sách?")) {
                try {
                    const masachList = this.borrowBooks.map(borrowBook => borrowBook.MASACH);           
                    await BorrowBookService.deleteAll();
                    for (const MASACH of masachList) {
                        const book = await BookService.getByMASACH(MASACH);
                        if (book.length > 0 && !this.borrowBooks[0].NGAYTRA) {                     
                            book[0].SOQUYEN++;
                            await BookService.updateByMASACH(MASACH, book[0]);
                        }
                        else if(book.length > 0 && this.borrowBooks[0].NGAYTRA){
                            await BookService.updateByMASACH(MASACH, book[0]);
                        }
                    }

                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        gotoAddBorrowBook() {
            this.$router.push({ name: "borrowBook.add" });
        },    

        async submitBorrowBook(data) {
            try {
                if (data._id) {
                    await BorrowBookService.update(data._id, data);
                } else {
                    await BorrowBookService.create(data);
                }
                alert("Borrow Book submitted successfully");
                this.refreshList();
            } catch (error) {
                console.error(error);
            }
        },
    },
    
    mounted() {
        this.refreshList();
    },
};
</script>