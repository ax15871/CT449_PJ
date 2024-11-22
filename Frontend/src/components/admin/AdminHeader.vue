<template>
  <header id="header-admin">
    <nav class="navbar bg-secondary p-3">
      <div class="container">
        <router-link to="/admin" class="navbar-brand fw-bold fs-5">HOME</router-link>
        <button class="navbar-toggler me-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>  
    
    <div class="offcanvas offcanvas-start text-bg-secondary" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title fw-bold" id="offcanvasWithBackdropLabel">Chức năng</h5>
        <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
            <li class="nav-item" :class="{ 'active': $route.path === '/admin' }" @click="closeOffcanvas">
              <router-link to="/admin" class="nav-link fw-bold"><i class="fa-solid fa-home"></i>Trang chủ</router-link>
            </li>  
            <li class="nav-item" :class="{ 'active': $route.path === '/admin/book' }" @click="closeOffcanvas">
              <router-link to="/admin/book" class="nav-link fw-bold"><i class="fa-solid fa-book"></i>Quản lý kho sách</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin/publisher' }" @click="closeOffcanvas">
              <router-link to="/admin/publisher" class="nav-link fw-bold"><i class="fa-solid fa-shop"></i>Thông tin nhà xuất bản</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin/reader' }" @click="closeOffcanvas">
              <router-link to="/admin/reader" class="nav-link fw-bold"><i class="fa-solid fa-users"></i>Thông tin độc giả</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin/staff' }" @click="closeOffcanvas">
              <router-link to="/admin/staff" class="nav-link fw-bold"><i class="fa-solid fa-user"></i>Quản lý nhân viên</router-link>
            </li>
            <li class="nav-item" :class="{ 'active': $route.path === '/admin/borrowBook' }" @click="closeOffcanvas">
              <router-link to="/admin/borrowBook" class="nav-link fw-bold"><i class="fa-solid fa-check"></i>Quản lý mượn và trả sách</router-link>
            </li>
            <hr>
            <template v-if="isLoggedIn">
                <li class="nav-item" @click="logout">
                    <a href="#" class="nav-link fw-bold"><i class="fa-solid fa-sign-out"></i>Đăng xuất</a>
                </li>
            </template>
          
            <template v-else>
                <li class="nav-item" :class="{ 'active': $route.path === '/admin/login' }" @click="closeOffcanvas">
                    <router-link to="/admin/login" class="nav-link fw-bold"><i class="fa-solid fa-right-to-bracket"></i>Đăng nhập</router-link>
                </li>
            </template>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AdminHeader",
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("Admin_token");
      this.isLoggedIn = false;
      alert("Bạn đã đăng xuất thành công");
      this.$router.push("/admin/login");
    },

    checkLoginStatus() {
      const token = localStorage.getItem("Admin_token");
      this.isLoggedIn = !!token;
    },

    closeOffcanvas() {
      const offcanvasElement = document.getElementById('offcanvasWithBackdrop');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      offcanvas.hide();
    }
  },

  mounted() {
    this.checkLoginStatus();
  },

  watch: {
    '$route'() {
      this.checkLoginStatus();
    }
  }
};
</script>

<style scoped>
header .offcanvas-start {
  width: 250px; 
}
</style>
