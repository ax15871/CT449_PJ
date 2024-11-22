<template>
  <div id="app" :class="{ 'non-admin-background': !isAdminRoute }">
    <AppHeader v-if="!isAdminRoute"/> <!-- Sử dụng AppHeader nếu không phải trang Admin -->
    <AdminHeader v-if="isAdminRoute"/> <!-- Sử dụng Admin Header nếu là trang Admin -->
    <div class="" v-if="!isAdminRoute">
      <router-view />
    </div>
    <div class="container mt-3" v-if="isAdminRoute">
      <router-view />
    </div>
    <AppFooter v-if="!isAdminRoute"/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    AdminHeader,
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith("/admin");
    },
  },
};
</script>
