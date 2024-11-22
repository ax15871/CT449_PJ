<template>
  <Form
    @submit="submitBook"
    :validation-schema="bookFormSchema"
  >
	<div class="form-group">
      <label for="ID">Mã sách</label>
      <div class="input-form">
        <Field
          name="ID"
          type="text"
          class="form-control"
          v-model="bookLocal.MASACH"
        />
        <ErrorMessage name="ID" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="title">Tên sách</label>
      <div class="input-form">
        <Field
          name="title"
          type="text"
          class="form-control"
          v-model="bookLocal.TENSACH"
        />
        <ErrorMessage name="title" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="price">Đơn giá</label>
      <div class="input-form">
        <Field
          name="price"
          type="number"
          class="form-control"
          v-model.number="bookLocal.DONGIA"
        />
        <ErrorMessage name="price" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="quantity">Số lượng</label>
      <div class="input-form">
        <Field
        name="quantity"
        type="number"
        class="form-control"
        v-model.number="bookLocal.SOQUYEN"
        />
        <ErrorMessage name="quantity" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="year">Năm xuất bản</label>
      <div class="input-form">
        <Field
          name="year"
          type="number"
          class="form-control"
          v-model.number="bookLocal.NAMXUATBAN"
        />
        <ErrorMessage name="year" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="publisherID">Mã NXB</label>
      <div class="input-form">
        <Field
          name="publisherID"
          type="text"
          class="form-control"
          v-model="bookLocal.MANXB"
        />
        <ErrorMessage name="publisherID" class="error-feedback" />
      </div>
    </div>
	<div class="form-group">
      <label for="publisher">Tên nhà xuất bản</label>
      <div class="input-form">
        <Field
          name="publisher"
          type="text"
          class="form-control"
          v-model="bookLocal.TENNXB"
        />
        <ErrorMessage name="publisher" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="author">Tác giả</label>
      <div class="input-form">
        <Field
          name="author"
          type="text"
          class="form-control"
          v-model="bookLocal.TACGIA"
        />
        <ErrorMessage name="author" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="theloai">Thể loại</label>
      <div class="input-form">
        <Field
          name="theloai"
          type="text"
          class="form-control"
          v-model="bookLocal.THELOAI"
        />
      </div>
    </div>
    <div class="form-group">
      <label for="image">Hình ảnh</label>
      <div class="input-form">
        <input name="image" type="text" class="form-control" v-model="bookLocal.HINHANH"/>
      </div>
    </div>

    <div class="admin-button mt-4">
      <button class="btn btn-primary">{{ isEditMode ? 'Lưu thông tin' : 'Thêm' }}</button>
      <button v-if="isEditMode" type="button" class="ml-2 btn btn-danger" @click="deleteBook">Xóa sách</button>
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
  emits: ["submit:book", "delete:book"],
  props: {
    book: { type: Object, required: true }
  },
  data() {
    const bookFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tên sách không được để trống")
        .max(255, "Tên sách không quá 255 ký tự"),
      price: yup
        .number()
        .required("Đơn giá không được để trống")
        .min(0, "Đơn giá không hợp lệ"),
      quantity: yup
        .number()
        .required("Số lượng không được để trống")
        .min(0, "Số lượng không hợp lệ"),
      year: yup
        .number()
        .required("Năm xuất bản không được để trống")
        .min(1000, "Năm xuất bản không hợp lệ")
        .max(new Date().getFullYear(), "Năm xuất bản không hợp lệ"),
      publisher: yup
        .string()
        .required("Mã NXB không được để trống")
        .max(50, "Mã NXB không quá 50 ký tự"),
      author: yup
        .string()
        .required("Tác giả không được để trống")
        .max(255, "Tác giả không quá 255 ký tự"),
    });
    
    return {
      bookLocal: { ...this.book },
      bookFormSchema,
    };
  },
  computed: {
    isEditMode() {
      return !!this.bookLocal._id;
    }
  },
  methods: {
    submitBook() {
      this.$emit("submit:book", this.bookLocal);
    },
    deleteBook() {
      this.$emit("delete:book", this.bookLocal._id);
    },
  },
};
</script>