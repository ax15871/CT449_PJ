<script>
export default {
    props: {
        staff: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <div class="p-2">
                <strong>Mã nhân viên:</strong>
                {{ staff.MSNV }}
            </div>
            <div class="p-2">
                <strong>Họ và tên:</strong>
                {{ staff.HOTENNV }}
            </div>
             <div class="p-2">
                <strong>Username:</strong>
                {{ staff.USERNAME }}
            </div>
             <div class="p-2">
                <strong>Password:</strong>
                {{ staff.PASSWORD }}
            </div>
            <div class="p-2">
                <strong>Chức vụ:</strong>
                {{ staff.CHUCVU }}
            </div>
            <div class="p-2">
                <strong>Địa chỉ:</strong>
                {{ staff.DIACHI }}
            </div>
            <div class="p-2">
                <strong>Số điện thoại:</strong>
                {{ staff.SODIENTHOAI }}
            </div>
        </div>

        <div class="col-md-6">
            <div class="p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" style="border-radius: 300px;">       
            </div>
        </div>
    </div>

</template>
