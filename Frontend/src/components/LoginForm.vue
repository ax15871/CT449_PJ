<template>
  <form @submit.prevent="login">
    <div class="form-group">
      <input type="text" class="form-control" id="username" v-model="username" maxlength="30" title="Tên tài khoản có độ dài ít hơn 30 kí tự" placeholder="Tên tài khoản" required>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="password" v-model="password" minlength="6" title="Mật khẩu phải lớn hơn hoặc bằng 6 kí tự" placeholder="Mật khẩu" required>
    </div>
    <div id="login-button">
      <button type="submit" class="btn btn-success">Đăng nhập</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$emit('login', {
        USERNAME: this.username,
        PASSWORD: this.password
      });
    }
  }
};
</script>