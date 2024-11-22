<template>
  <header id="header-user">
	<div class="col-md-12 banner"></div>
    <div class="bg-white">
      <div class="row">
        <div class="col-md-2 icon-div">
          <router-link to="/">
            <img src="@/assets/images/logosach.jpg" class="icon" height="100">
          </router-link>
        </div>                 
        <div class="col-md-10 header-menu">
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <router-link to="/" class="nav-link fw-bold fs-5">TRANG CHỦ</router-link>
                  </li>
				  <li>
					<router-link to="/borrowBookHistory" class="nav-link dropdown-item fw-bold fs-5 mb-2" @click="openModal(book)">LỊCH SỬ MƯỢN SÁCH</router-link>
				  </li>
                </ul>
              </div>
            </div>
          </nav>        
          <div v-if="isLoggedIn" class="d-flex align-items-center dropup-center dropup">       
            <button class="btn btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-user fa-2x header-icon" id="user-icon"></i>
            </button>
            <ul class="dropdown-menu text-center">
              <li><router-link to="/readerInformation" class="nav-link dropdown-item fw-bold fs-5 mb-2">Thông tin người dùng</router-link></li>
              <li><button @click="logout" class="nav-link dropdown-item fw-bold fs-5 mb-2">Đăng xuất</button></li>
            </ul>   
          </div> 
          <div v-else class="d-flex align-items-center dropup-center dropup">     
            <button class="btn btn border-0" type="button" data-bs-toggle="dropdown">
              <i class="fa-solid fa-user fa-2x header-icon" id="user-icon"></i>
            </button>
            <ul class="dropdown-menu text-center">
              <li><router-link to="/login" class="nav-link dropdown-item fw-bold fs-5 mb-2">Đăng nhập</router-link></li>
              <li><router-link to="/register" class="nav-link dropdown-item fw-bold fs-5 mb-2">Đăng ký</router-link></li>
            </ul>    
          </div>  
        </div> 
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('User_token');
      localStorage.removeItem('MADOCGIA');
      this.isLoggedIn = false;
      this.showAlert("Bạn đã đăng xuất thành công", "success")
      this.$router.push({ name: 'homepage' });
    },

    checkLoginStatus() {
      const token = localStorage.getItem("User_token");
      this.isLoggedIn = !!token;
    },

    openModal(book) {
      if (!localStorage.getItem('MADOCGIA')) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
      } else{
        this.showModal = true;
        this.selectedBook = book;
      }
    },

    closeModal() {
      this.showModal = false;
      this.selectedBook = '';
      this.note = '';
      this.borrowDate = '';
    },

    showAlert(message, type) {
      const icon = {
        success: "✅",
        error: "❌"
      }[type];

      alert(`${icon} ${message}`);
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