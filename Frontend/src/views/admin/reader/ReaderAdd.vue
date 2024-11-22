<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="add-title mt-4 mb-5 fw-bold fs-3">THÊM ĐỘC GIẢ MỚI</h4>
      <ReaderForm :reader="{}" @submit:reader="addReader" />
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import ReaderForm from '@/components/admin/reader/ReaderForm.vue';
import ReaderService from "@/services/reader.service";

export default {
  components: {
    ReaderForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addReader(data) {
      try {
        await ReaderService.register(data);
        alert("Độc giả đã được thêm mới thành công");
        this.$router.push({ name: "reader" });
      } catch (error) {
        console.log(error);
        alert("Thêm mới độc giả không thành công, tên đăng nhập đã tồn tại");
      }
    },
  },
};
</script>
