<script>
export default {
    props: {
        borrowBook: { type: Object, required: true },
    },
};
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <div class="p-2">
                <strong>Mã độc giả:</strong>
                {{ borrowBook.MADOCGIA }}
            </div>
            <div class="p-2">
                <strong>Mã sách:</strong>
                {{ borrowBook.MASACH }}
            </div>
            <div class="p-2">
                <strong>Ghi chú:</strong>
                {{ borrowBook.GHICHU }}
            </div>
            <div class="p-2">
                <strong>Ngày mượn:</strong>
                {{ borrowBook.NGAYMUON }}
            </div>
            <div class="p-2">
                <strong>Ngày trả:</strong>
                {{ borrowBook.NGAYTRA }}
            </div> 
            <div v-if="borrowBook.NGAYTRA" class="p-2">
                <strong >Trạng thái:</strong> Đã trả <i class="fa-solid fa-check px-1 text-success "></i> 
            </div>    
            <div v-else class="p-2">
                <strong>Trạng thái:</strong> Chưa trả <i class="fa-solid fa-close px-1 text-danger"></i>
            </div>
        </div>
    </div>
</template>