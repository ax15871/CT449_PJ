<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col">
      <div class="card bg-white" id="register-form-user">
        <h2 class="fw-bold fs-2" id="register-title-user">ĐĂNG KÝ TÀI KHOẢN</h2>
        <RegisterForm @register="handleRegister" />
        <div id="login-link">
          <p>Đã có tài khoản? <span><router-link to="/login">Đăng nhập</router-link></span></p>
        </div>
        <div class="error-text">
          <p v-if="error" class="text-danger">{{ error }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";
import ReaderService from "@/services/reader.service";

export default {
  components: {
    RegisterForm,
  },
  methods: {
    async handleRegister(data) {
      try {
        await ReaderService.register(data);
        this.showAlert("Đăng ký thành công", "success")
        this.$router.push({ name: "homepage" });
      } catch (error) {
        console.log(error);
        this.showAlert("Đăng ký thất bại", "error")
      }
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        error: "❌"
      }[type];
      
      alert(`${icon} ${message}`);
    }
  },
};
</script>


