<template>
  <div class="container">
    <div class="card mt-5 mb-5 bg-white">
        <div class="row">
            <div class="col image-detail">
				<img :src="book.HINHANH" class="card-img-top img-fluid" alt="Book Image" style="width: 520px; height: 520px;">
			</div>
            <div class="col">
                <div class="card-body">
                    <p class="card-title fw-bold fs-4 ">{{ book.TENSACH }}</p>
                    <p class="card-text">Tác giả: {{ book.TACGIA }}</p>
					<p class="card-text">Thể loại: {{ book.THELOAI }}</p>
					<p class="card-text">Nhà xuất bản: {{ book.TENNXB }}</p>
					<p class="card-text">Năm xuất bản: {{ book.NAMXUATBAN }}</p>
                    <p class="card-text">Đơn giá: {{ book.DONGIA }}đ</p>
                    <p class="card-text">Số quyển: {{ book.SOQUYEN }}</p>
                    <div class="mt-3 d-flex gap-2">
                        <button class="btn btn-primary" @click="openModal">Mượn</button>
                        <button class="btn btn-secondary" @click="goBack">
                            <i class="fas fa-arrow-left"></i> Quay lại
                        </button>
                    </div>
                </div>
            </div>
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
</template>

<script>
import BookService from "@/services/book.service";
import BorrowBookService from "@/services/borrowBook.service";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import PublisherService from "@/services/publisher.service";

export default {
  data() {
    return {
      book: [],
      showModal: false,
      selectedBook: '',
      note: '',
      borrowDate: '',
      publisher: null 
    };
  },
  async created() {
    try {
      const bookId = this.$route.params.id;
      this.book = await BookService.getById(bookId);

      const publishers = await PublisherService.getAll();

      this.publisher = publishers.find(pub => pub.MANXB === this.book.MANXB);
      
      if (!this.publisher || this.publisher.MANXB !== this.book.MANXB) {
        this.publisher = { TENNXB: null };
      }
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  },
  methods: {
    openModal() {
      if (!localStorage.getItem('MADOCGIA')) {
        alert("Bạn chưa đăng nhập");
      } else{
        this.showModal = true;
        this.selectedBook = this.book;
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
        console.error("Error borrowing book:", error);
        this.showAlert("Đã xảy ra lỗi, vui lòng thử lại sau", "error");
      }
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        warning: "⚠️",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
    },

    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

