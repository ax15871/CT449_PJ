<template>
  <div v-if="staff" class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="edit-title mt-4 mb-5 fw-bold fs-3">HIỆU CHỈNH NHÂN VIÊN</h4>
        <StaffForm
            :staff="staff"
            @submit:staff="updateStaff"
            @delete:staff="deleteStaff"
        />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            staff: null,
            message: "",
        };
    },
    methods: {
        async getStaff(id) {
            try {
                this.staff = await StaffService.getById(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$router.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateStaff(data) {
            try {
                await StaffService.update(this.staff._id, data);
                alert("Nhân viên đã được cập nhật thành công");
                this.$router.push({ name: "staff" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteStaff() {
            if (confirm("Bạn muốn xóa Nhân viên này?")) {
                try {
                    await StaffService.delete(this.staff._id);
                    alert("Nhân viên đã được xóa thành công");
                    this.$router.push({ name: "staff" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    
    created() {
        this.getStaff(this.id);
        this.message = "";
    },
};
</script>
