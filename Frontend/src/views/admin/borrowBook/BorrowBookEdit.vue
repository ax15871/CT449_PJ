<template>
  <div v-if="borrowBook" class="row">
    <div class="col-md-3"></div>
    <div class="col card">
      <h4 class="edit-title mt-4 mb-5 fw-bold fs-3">HIỆU CHỈNH THÔNG TIN MƯỢN SÁCH</h4>
        <BorrowBookForm
          :borrowBook="borrowBook"
          @submit:borrowBook="updateBorrowBook"
          @delete:borrowBook="deleteBorrowBook"
        />
        <p>{{ message }}</p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import BorrowBookForm from '@/components/admin/borrowBook/BorrowBookForm.vue';
import BorrowBookService from "@/services/borrowBook.service";
import BookService from "@/services/book.service";

export default {
    components: {
        BorrowBookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            borrowBook: null,
            message: "",
        };
    },
    methods: {
        async getBorrowBook(id) {
            try {
                this.borrowBook = await BorrowBookService.getById(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$router.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateBorrowBook(data) {
            try {
                await BorrowBookService.update(this.borrowBook._id, data);
                
                const book = await BookService.getByMASACH(this.borrowBook.MASACH);
                book[0].SOQUYEN++;
                await BookService.updateByMASACH(this.borrowBook.MASACH, book[0]);    
                console.log(book[0].SOQUYEN)     
                alert("Sách đã được trả thành công");
                this.$router.push({ name: "borrowBook" });
            } catch (error) {
                console.log(error);
            }
        },


        async deleteBorrowBook() {
            if (confirm("Bạn muốn xóa thông tin mượn sách này?")) {
                try {
                    await BorrowBookService.delete(this.borrowBook._id);

                    const book = await BookService.getByMASACH(this.borrowBook.MASACH);
                    if(!this.borrowBook.NGAYTRA){
                        book[0].SOQUYEN++;
                        await BookService.updateByMASACH(this.borrowBook.MASACH, book[0]); 
                    } else{
                        await BookService.updateByMASACH(this.borrowBook.MASACH, book[0]); 
                    }   
                    alert("Thông tin mượn sách đã được xóa thành công");
                    this.$router.push({ name: "borrowBook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    
    created() {
        this.getBorrowBook(this.id);
        this.message = "";
    },
};
</script>
