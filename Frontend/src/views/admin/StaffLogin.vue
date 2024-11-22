<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col">
      <div class="card bg-white login-form">
        <h2 class="fw-bold fs-2 login-title">ĐĂNG NHẬP</h2>
        <LoginForm @login="handleLogin" />
		<div id="register-link">
			<p>Hoặc <span><router-link to="/login">Đăng nhập bằng tài khoản độc giả</router-link></span></p>
		</div>
        <p v-if="error" class="text-danger">{{ error }}</p>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import LoginForm from '@/components/admin/LoginForm.vue';
import StaffService from '@/services/staff.service';

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
        await StaffService.login(credentials);
        localStorage.setItem('Admin_token', true);
        this.isLoggedIn = true;
        alert("Bạn đã đăng nhập thành công");
        this.$router.push({ name: 'adminPage' }); 
      } catch (error) {
        this.error = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        console.error(error);
      }
    }
  }
};
</script>

