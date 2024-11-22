<template>
  <div v-if="reader" class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="edit-title mt-4 mb-5 fw-bold fs-3">HIỆU CHỈNH ĐỘC GIẢ</h4>
        <ReaderForm
            :reader="reader"
            @submit:reader="updateReader"
            @delete:reader="deleteReader"
        />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            reader: null,
            message: "",
        };
    },
    methods: {
        async getReader(id) {
            try {
                this.reader = await ReaderService.getById(id);
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

        async updateReader(data) {
            try {
                await ReaderService.update(this.reader._id, data);
                alert("Độc giả đã được cập nhật thành công");
                this.$router.push({ name: "reader" });
            } catch (error) {
                console.log(error);
            }
        },

        async deleteReader() {
            if (confirm("Bạn muốn xóa Độc giả này?")) {
                try {
                    await ReaderService.delete(this.reader._id);
                    alert("Độc giả đã được xóa thành công");
                    this.$router.push({ name: "reader" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    
    created() {
        this.getReader(this.id);
        this.message = "";
    },
};
</script>
