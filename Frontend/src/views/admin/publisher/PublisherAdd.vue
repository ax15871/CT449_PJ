<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="add-title mt-4 mb-5 fw-bold fs-3">THÊM NHÀ XUẤT BẢN MỚI</h4>
      <PublisherForm :publisher="{}" @submit:publisher="addPublisher" />
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>


<script>
import PublisherForm from '@/components/admin/publisher/PublisherForm.vue';
import PublisherService from "@/services/publisher.service";

export default {
  components: {
    PublisherForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addPublisher(data) {
      try {
        await PublisherService.create(data);
        alert("Nhà xuất bản đã được thêm mới thành công");
        this.$router.push({ name: "publisher" });
      } catch (error) {
        console.log(error);
        alert("Thêm mới nhà xuất bản không thành công");
      }
    },
  },
};
</script>
