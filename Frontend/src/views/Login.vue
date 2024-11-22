<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col">
      <div class="card bg-white" id="login-form-user">
        <h2 class="fw-bold fs-2" id="login-title-user">ĐĂNG NHẬP</h2>
        <LoginForm @login="handleLogin" />
        <div id="register-link">
          <p>Chưa có tài khoản? <span><router-link to="/register">Đăng ký</router-link></span></p>
		  <p>Hoặc <span><router-link to="/Admin/login">Đăng nhập bằng tài khoản nhân viên</router-link></span></p>
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
import LoginForm from '@/components/LoginForm.vue';
import ReaderService from '@/services/reader.service';

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      error: ''
    };
  },
  methods: {
    async handleLogin(credentials) {
      try {
        const response = await ReaderService.login(credentials);
        const { MADOCGIA } = response.user;

        localStorage.setItem('MADOCGIA', MADOCGIA);
        localStorage.setItem('User_token', true);

        this.showAlert("Bạn đã đăng nhập thành công", "success")
        console.log(MADOCGIA);
        this.$router.push({ name: 'homepage' }); 
      } catch (error) {
        this.error = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        console.error(error);
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


