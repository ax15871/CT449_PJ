<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
	
  async created() {
    const isLoggedIn = localStorage.getItem('Admin_token');
    if (!isLoggedIn) {
      const router = useRouter();
      router.push('/admin/login'); 
      return; 
    }
  },
};
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <div class="p-2">
                <strong>Mã sách:</strong>
                {{ book.MASACH }}
            </div>
            <div class="p-2">
                <strong>Tên sách:</strong>
                {{ book.TENSACH }}
            </div>
            <div class="p-2">
                <strong>Đơn giá:</strong>
                {{ book.DONGIA }}
            </div>
            <div class="p-2">
                <strong>Số lượng:</strong>
                {{ book.SOQUYEN }}
            </div>
            <div class="p-2">
                <strong>Năm xuất bản:</strong>
                {{ book.NAMXUATBAN }}
            </div>
            <div class="p-2">
                <strong>Mã NXB:</strong>
                {{ book.MANXB }}
            </div>
			<div class="p-2">
                <strong>Tên NXB:</strong>
                {{ book.TENNXB }}
            </div>
            <div class="p-2">
                <strong>Tác giả:</strong>
                {{ book.TACGIA }}
            </div>
            <div class="p-2">
                <strong>Thể loại:</strong>
                {{ book.THELOAI }}
            </div>
        </div>

        <div class="col-md-6">
            <div class="p-2">
                <img :src="book.HINHANH" alt="" class="book-detail-img">       
            </div>
        </div>
    </div>
</template>

<style>
.book-detail-img{
    border: 2px solid whitesmoke;
    height: 80%;
    width: 100%;
}
</style>
