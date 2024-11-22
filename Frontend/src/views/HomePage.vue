<template>
  <main>
    <div class="banner">
      <img src="@/assets/images/banner.png" alt="" class="img-fluid">
    </div>
    <div class="container-lg py-2 item-child animate__animated main-page">
      <div class="input-group mt-5 search-input">
        <input type="text" v-model="searchKeyword" class="form-control" placeholder="Nhập tên sách để tìm kiếm" aria-label="Recipient's username" aria-describedby="basic-addon2" id="searchInput" name="name" @keydown.enter="search">
        <button @click="search" class="input-group-text" type="submit"><span class="" id="basic-addon2"><i class="fa-solid fa-magnifying-glass"></i></span></button>
        <button @click="resetSearch" class="input-group-text" type="button"><span class="" id="basic-addon2"><i class="fa-solid fa-redo"></i></span></button>
      </div>
	  <div class="item-list mb-3">
            <div class="container-lg py-2 item-child animate__animated" v-for="(books, category) in groupedBooks" :key="category">
                <h1 class="header_calalog text-center p-2">{{ category }}</h1>
                <swiper
                  :slides-per-view="4"
                  :space-between="30"
                  :navigation="books.length > 4"
                  :modules="books.length > 4 ? modules : []"
                  class="mySwiper"
                >
                  <swiper-slide v-for="book in books" :key="book._id">
                    <div class="col-12">
                      <div class="card my-2 product-item">
                        <router-link :to="{ name: 'book.detail', params: { id: book._id } }" class="text-black">
                          <img :src="book.HINHANH" class="card-img-top" alt="hinh anh">
                        </router-link>
                        <div class="card-body">
                          <h5 class="card-title text-center h2 type-product">{{ book.TENSACH }}</h5>
                          <div class="d-flex flex-column align-items-center">
                            <button class="btn btn-primary" @click="openModal(book)">Mượn</button>
                          </div>  
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
            </div>
	  </div>

      <div class="modal" :class="{ 'show': showModal }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Mượn sách: {{ selectedBook.TENSACH }}</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="note" class="form-label">Ghi chú:</label>
                <textarea class="form-control" id="note" v-model="note"></textarea>
              </div>
              <div class="mb-3">
                <label for="borrowDate" class="form-label">Ngày mượn:</label>
                <input type="date" class="form-control" id="borrowDate" v-model="borrowDate">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
              <button type="button" class="btn btn-primary" @click="borrowBook">Mượn sách</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BookService from "@/services/book.service";
import BorrowBookService from "@/services/borrowBook.service";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    AdminHeader,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      books: [],
      showModal: false,
      selectedBook: '',
      note: '',
      borrowDate: '',
      searchKeyword: '',
      modules: [Navigation],
    };
  },

  async created() {
    try {
      await this.fetchBooks();
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },

  methods: {
    async fetchBooks() {
      try {
        this.books = await BookService.getByName(this.searchKeyword);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },

    openModal(book) {
      if (!localStorage.getItem('MADOCGIA')) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
      } else{
        this.showModal = true;
        this.selectedBook = book;
      }
    },

    closeModal() {
      this.showModal = false;
      this.selectedBook = '';
      this.note = '';
      this.borrowDate = '';
    },
    
    async borrowBook() {
      try {
        if (!this.borrowDate) {
          this.showAlert("Vui lòng chọn ngày mượn", "warning");
          return;
        }

        if (this.selectedBook.SOQUYEN <= 0) {
          this.showAlert("Sách không còn trống để mượn", "warning");
          return;
        }

        const existingRecord = await BorrowBookService.getByMADOCGIA(localStorage.getItem('MADOCGIA'));
        const bookRecord = existingRecord.find(record => record.MASACH === this.selectedBook.MASACH);

        if (bookRecord) {
          this.showAlert("Bạn đã mượn sách này rồi", "warning");
          return;
        }

        const response = await BorrowBookService.create({
          MADOCGIA: localStorage.getItem('MADOCGIA'),
          MASACH: this.selectedBook.MASACH,
          GHICHU: this.note,
          NGAYMUON: this.borrowDate
        });

        await BookService.update(this.selectedBook._id, { SOQUYEN: this.selectedBook.SOQUYEN - 1 });
        this.showAlert("Mượn sách thành công", "success");
        this.closeModal();
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        this.showAlert("Đã xảy ra lỗi, vui lòng thử lại sau", "error");
      }
    },

    async search() {
      try {
        await this.fetchBooks(); 
      } catch (error) {
        console.error("Error searching books:", error);
      }
    },
    
    resetSearch() {
      this.searchKeyword = '';
      this.fetchBooks();
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        warning: "⚠️",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
    }
  },

  computed: {
    groupedBooks() {
      return this.books.reduce((groups, book) => {
        const category = book.THELOAI;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(book);
        return groups;
      }, {});
    }
  }
};
</script>
