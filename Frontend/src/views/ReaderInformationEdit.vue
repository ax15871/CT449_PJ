<template>
  <div class="container">  
    <div class="row">
      <div class=col-md-3></div>
      <div class="col-md-6 card bg-white">
        <p class="mt-4 mb-5 fw-bold fs-2 text-center">THAY ĐỔI THÔNG TIN</p>
        <form @submit.prevent="updateReader">
          <div class="mb-3 form-group mx-5">
            <label for="hoTen" class="form-label">Tên</label>
            <input type="text" class="form-control" id="Ten" v-model="editedReader.TEN" required>
          </div>
          <div class="mb-3 form-group mx-5">
            <label for="hoTen" class="form-label">Họ lót</label>
            <input type="text" class="form-control" id="Holot" v-model="editedReader.HOLOT" required>
          </div>
          <div class="mb-3 form-group mx-5">
            <label for="ngaySinh" class="form-label">Ngày sinh</label>
            <input type="date" class="form-control" id="ngaySinh" v-model="editedReader.NGAYSINH" required>
          </div>
          <div class="mb-3 form-group mx-5" id="gender-radio">
            <label for="phai">Giới tính</label>
            <div class="input-form">
              <div class="gender">
                <div>     
                    <input type="radio" name="phai" value="Nam" v-model="editedReader.PHAI">
                    Nam
                </div>
                <div>
                    <input type="radio" name="phai" value="Nữ" v-model="editedReader.PHAI">
                    Nữ
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3 form-group mx-5">
            <label for="diaChi" class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" id="diaChi" v-model="editedReader.DIACHI" required>
          </div>
          <div class="mb-3 form-group mx-5">
            <label for="dienThoai" class="form-label">Điện thoại</label>
            <input type="text" class="form-control" id="dienThoai" v-model="editedReader.DIENTHOAI" maxlength="10" required>
          </div>
          <div class="text-center mt-5">
            <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
          </div>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/reader.service";

export default {
  data() {
    return {
      editedReader: {
        TEN: "",
        HOLOT: "",
        NGAYSINH: "",
        PHAI: "",
        DIACHI: "",
        DIENTHOAI: ""
      }
    };
  },
  async created() {
    try {
      const MADOCGIA = localStorage.getItem("MADOCGIA");
      if (!MADOCGIA) {
        console.error("Không tìm thấy mã độc giả");
        return;
      }
      this.reader = await ReaderService.getByMADOCGIA(MADOCGIA);
      this.editedReader = { ...this.reader[0] };
    } catch (error) {
      console.error("Xảy ra lỗi khi truy xuất thông tin độc giả:", error);
    }
  },
  methods: {
    async updateReader() {
      try {
        await ReaderService.update(this.editedReader._id, this.editedReader);
        this.showAlert("Thay đổi thông tin thành công", "success");
        this.$router.push({ name: "reader.information", params: { MADOCGIA: this.editedReader._id } });
      } catch (error) {
        console.error("Xảy ra lỗi khi cập nhật thông tin độc giả:", error);
        this.showAlert("Xảy ra lỗi khi thay đổi thông tin", "error");
      }
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
    }
  }
};
</script>
