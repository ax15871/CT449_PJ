<template>
  <form @submit.prevent="register">
    <div class="form-group">
      <input type="text" id="username" v-model="username" class="form-control" placeholder="Tên tài khoản" maxlength="30" required>
    </div>
    <div class="form-group">
      <input type="password" id="password" v-model="password" class="form-control" placeholder="Mật khẩu" minlength="6" required>
    </div>
    <div class="form-group">
      <input type="text" id="hoLot" v-model="hoLot" class="form-control" placeholder="Họ lót">
    </div>
    <div class="form-group">
      <input type="text" id="ten" v-model="ten" class="form-control" placeholder="Tên" required>
    </div>
    <div class="form-group">
      <label for="ngaySinh">Ngày sinh</label>
      <input type="date" id="ngaySinh" v-model="ngaySinh" class="form-control" placeholder="Ngày sinh" required>
    </div>
    <div class="mb-3 form-group" id="gender-radio">
            <label for="phai">Giới tính</label>
            <div class="input-form">
              <div class="gender">
                <div>     
                    <input type="radio" name="phai" value="Nam" v-model="phai" required>
                    Nam
                </div>
                <div>
                    <input type="radio" name="phai" value="Nữ" v-model="phai" required>
                    Nữ
                </div>
              </div>
            </div>
          </div>
    <div class="form-group">

      <input type="text" id="diaChi" v-model="diaChi" class="form-control" placeholder="Địa chỉ" required>
    </div>
    <div class="form-group">
      <input type="tel" id="dienThoai" v-model="dienThoai" class="form-control" placeholder="Số điện thoại"pattern="(09|03|07|08|05)\d{8}" 
      title="Số điện thoại phải chứa 10 chữ số và bắt đầu bằng 09, 03, 07, 08, 05" maxlength="10" required>
    </div>
    <div id="register-button">
      <button type="submit" class="btn btn-success">Đăng ký</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      hoLot: '',
      ten: '',
      ngaySinh: '',
      phai: '',
      diaChi: '',
      dienThoai: ''
    };
  },
  methods: {
    register() {
      this.$emit('register', {
        USERNAME: this.username,
        PASSWORD: this.password,
        HOLOT: this.hoLot,
        TEN: this.ten,
        NGAYSINH: this.ngaySinh,
        PHAI: this.phai,
        DIACHI: this.diaChi,
        DIENTHOAI: this.dienThoai
      });
    }
  }
};
</script>


