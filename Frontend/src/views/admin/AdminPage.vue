<script>
import BookService from "@/services/book.service";
import PublisherService from "@/services/publisher.service";
import ReaderService from "@/services/reader.service";
import StaffService from "@/services/staff.service";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import Book from "@/views/admin/book/Book.vue";
import { useRouter } from 'vue-router';
import BorrowBookService from "@/services/borrowBook.service";

export default {
  components: {
    AdminHeader,
    Book,
  },

  data() {
    return {
      bookCount: 0,
      publisherCount: 0,
      readerCount: 0,
      staffCount: 0,
    };
  },

  async created() {
    const isLoggedIn = localStorage.getItem('Admin_token');
    if (!isLoggedIn) {
      const router = useRouter();
      router.push('/admin/login'); 
      return; 
    }

    try {
      const books = await BookService.getAll();
      this.bookCount = books.length;
    } catch (error) {
      console.error("Error fetching books:", error);
    }

    try {
      const publishers = await PublisherService.getAll();
      this.publisherCount = publishers.length;
    } catch (error) {
      console.error("Error fetching publishers:", error);
    }

    try {
      const readers = await ReaderService.getAll();
      this.readerCount = readers.length;
    } catch (error) {
      console.error("Error fetching readers:", error);
    }

    try {
      const staffs = await StaffService.getAll();
      this.staffCount = staffs.length;
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
},

};
</script>

<template>
  <main>
<div class="container mt-4">
  <div class="row justify-content-center"> <!-- Thêm justify-content-center -->
    <div class="col-md-8"> <!-- Thêm col-md-8 để giới hạn độ rộng -->
      <div class="row">
        <!-- Hàng 1 -->
        <div class="col-md-6 mb-4">
          <div id="book-total" class="total bg-primary">
            <h4 class="text-center">Số lượng sách trong kho</h4>
            <div class="flex-total">
              <h4><i class="fa-solid fa-book me-2"></i>{{ bookCount }}</h4>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div id="publisher-total" class="total bg-danger">
            <h4 class="text-center">Nhà xuất bản</h4>
            <div class="flex-total">
              <h4><i class="fa-solid fa-home me-2"></i>{{ publisherCount }}</h4>
            </div>
          </div>
        </div>

        <!-- Hàng 2 -->
        <div class="col-md-6 mb-4">
          <div id="reader-total" class="total bg-warning">
            <h4 class="text-center">Số lượng độc giả</h4>
            <div class="flex-total">
              <h4><i class="fa-solid fa-users me-2"></i>{{ readerCount }}</h4>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div id="staff-total" class="total bg-secondary">
            <h4 class="text-center">Nhân viên</h4>
            <div class="flex-total">
              <h4><i class="fa-solid fa-user me-2"></i>{{ staffCount }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </main>
</template>
