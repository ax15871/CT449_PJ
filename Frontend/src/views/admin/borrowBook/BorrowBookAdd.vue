<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="add-title mt-4 mb-5 fw-bold fs-3">THÊM THÔNG TIN MƯỢN SÁCH</h4>
      <BorrowBookForm :borrowBook="{}" @submit:borrowBook="addBorrowBook" />
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>


<script>
import BorrowBookForm from '@/components/admin/borrowBook/BorrowBookForm.vue';
import BorrowBookService from "@/services/borrowBook.service";

export default {
  components: {
    BorrowBookForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addBorrowBook(data) {
      try {
        await BorrowBookService.create(data);
        alert("Thông tin mượn sách đã được thêm mới thành công");
        this.$router.push({ name: "borrowBook" });
      } catch (error) {
        console.log(error);
        alert("Thêm thông tin mượn sách không thành công");
      }
    },
  },
};
</script>

