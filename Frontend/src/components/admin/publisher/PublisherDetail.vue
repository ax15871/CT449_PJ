<script>
export default {
    props: {
        publisher: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <div class="p-2">
                <strong>Mã nhà xuất bản:</strong>
                {{ publisher.MANXB }}
            </div>
            <div class="p-2">
                <strong>Tên nhà xuất bản:</strong>
                {{ publisher.TENNXB }}
            </div>
            <div class="p-2">
                <strong>Địa chỉ:</strong>
                {{ publisher.DIACHI }}
            </div>
        </div>
    </div>
</template>
