<script>
export default {
    props: {
        reader: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <div class="p-2">
                <strong>Mã độc giả:</strong>
                {{ reader.MADOCGIA }} 
            </div>
            <div class="p-2">
                <strong>Tài khoản:</strong>
                {{ reader.USERNAME }} 
            </div>
            <div class="p-2">
                <strong>Mật khẩu:</strong>
                {{ reader.PASSWORD }} 
            </div>
            <div class="p-2">
                <strong>Họ và tên:</strong>
                {{ reader.HOLOT }} {{ reader.TEN }}
            </div>
            <div class="p-2">
                <strong>Ngày sinh:</strong>
                {{ reader.NGAYSINH }} 
            </div>
            <div class="p-2">
                <strong>Giới tính:</strong>
                {{ reader.PHAI }} 
            </div>
            <div class="p-2">
                <strong>Địa chỉ:</strong>
                {{ reader.DIACHI }} 
            </div>
            <div class="p-2">
                <strong>Số điện thoại:</strong>
                {{ reader.DIENTHOAI }}
            </div>
            <!-- Display other reader details accordingly -->
        </div>

        <div class="col-md-6">
            <div class="p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" style="border-radius: 300px;">       
            </div>
        </div>
    </div>

</template>
