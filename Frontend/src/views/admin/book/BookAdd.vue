<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="add-title mt-4 mb-5 fw-bold fs-3">THÊM SÁCH MỚI</h4>
      <BookForm :book="{}" @submit:book="addBook" />
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import BookForm from '@/components/admin/book/BookForm.vue';
import BookService from "@/services/book.service";

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addBook(data) {
      try {
        await BookService.create(data);
        alert("Sách đã được thêm mới thành công");
        this.$router.push({ name: "book" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

