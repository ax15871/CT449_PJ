<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="add-title mt-4 mb-5 fw-bold fs-3">THÊM NHÂN VIÊN MỚI</h4>
      <StaffForm :staff="{}" @submit:staff="addStaff" />
      <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import StaffForm from '@/components/admin/staff/StaffForm.vue';
import StaffService from "@/services/staff.service";

export default {
  components: {
    StaffForm,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async addStaff(data) {
      try {
        await StaffService.create(data);
        alert("Nhân viên đã được thêm mới thành công");
        this.$router.push({ name: "staff" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
