<template>
  <Form
    @submit="submitBorrowBook"
    :validation-schema="borrowBookFormSchema"
  >
    <div class="form-group">
      <label for="readerId">Mã độc giả</label>
      <div class="input-form">
        <Field
          name="readerId"
          type="text"
          class="form-control"
          v-model="borrowBookLocal.MADOCGIA"
        />
        <ErrorMessage name="readerId" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="bookId">Mã sách</label>
      <div class="input-form">
        <Field
          name="bookId"
          type="text"
          class="form-control"
          v-model="borrowBookLocal.MASACH"
        />
        <ErrorMessage name="bookId" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="note">Ghi chú</label>
      <div class="input-form">
        <Field
          name="note"
          type="text"
          class="form-control"
          v-model="borrowBookLocal.GHICHU"
        />
        <ErrorMessage name="note" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="borrowDate">Ngày mượn</label>
      <div class="input-form">
        <Field
          name="borrowDate"
          type="date"
          class="form-control"
          v-model="borrowBookLocal.NGAYMUON"
        />
        <ErrorMessage name="borrowDate" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="returnDate">Ngày trả</label>
      <div class="input-form">
        <Field
          name="returnDate"
          type="date"
          class="form-control"
          v-model="borrowBookLocal.NGAYTRA"
        />
        <ErrorMessage name="returnDate" class="error-feedback" />
      </div>
    </div>

    <div class="form-group add-button">
      <button class="btn btn-primary">{{ isEditMode ? 'Lưu thông tin' : 'Thêm' }}</button>
      <button v-if="isEditMode" type="button" class="ml-2 btn btn-danger" @click="deleteBorrowBook">Xóa Thông tin</button>
    </div>
  </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:borrowBook", "delete:borrowBook"],
  props: {
    borrowBook: { type: Object, required: true }
  },
  data() {
    const borrowBookFormSchema = yup.object().shape({
      readerId: yup
        .string()
        .required("Mã độc giả không được để trống"),
      bookId: yup
        .string()
        .required("Mã sách không được để trống"),
      note: yup.string(),
      borrowDate: yup.date().required("Ngày mượn không được để trống"),
      returnDate: yup.date().required("Ngày trả không được để trống"),
    });
    return {
      borrowBookLocal: { ...this.borrowBook },
      borrowBookFormSchema,
    };
  },
  computed: {
    isEditMode() {
      return !!this.borrowBookLocal._id;
    }
  },
  methods: {
    submitBorrowBook() {
      this.$emit("submit:borrowBook", this.borrowBookLocal);
    },
    deleteBorrowBook() {
      this.$emit("delete:borrowBook", this.borrowBookLocal._id);
    },
  },
};
</script>
