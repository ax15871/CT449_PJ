<template>
  <Form
    @submit="submitPublisher"
    :validation-schema="publisherFormSchema"
  >
    <div class="form-group">
      <label for="ID">Mã nhà xuất bản</label>
      <div class="input-form">
        <Field
          name="ID"
          type="text"
          class="form-control"
          v-model="publisherLocal.MANXB"
        />
        <ErrorMessage name="ID" class="error-feedback" />
      </div>
    </div>
	
	<div class="form-group">
      <label for="name">Tên nhà xuất bản</label>
        <div class="input-form">
        <Field
          name="name"
          type="text"
          class="form-control"
          v-model="publisherLocal.TENNXB"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
    </div>
	
	<div class="form-group">
      <label for="address">Địa chỉ nhà xuất bản</label>
        <div class="input-form">
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="publisherLocal.DIACHI"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>
    </div>

    <div class="admin-button mt-4">
      <button class="btn btn-primary">{{ isEditMode ? 'Lưu thông tin' : 'Thêm' }}</button>
      <button v-if="isEditMode" type="button" class="ml-2 btn btn-danger" @click="deletePublisher">Xóa nhà xuất bản</button>
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
  emits: ["submit:publisher", "delete:publisher"],
  props: {
    publisher: { type: Object, required: true }
  },
  data() {
    const publisherFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên nhà xuất bản không được để trống")
        .max(255, "Tên nhà xuất bản không quá 255 ký tự"),
      ID: yup
        .string()
        .required("Mã nhà xuất bản không được để trống")
        .max(255, "Mã nhà xuất bản không quá 255 ký tự"),
	  address: yup
		.string()
		.required("Địa chỉ nhà xuất bản không được để trống")
        .max(255, "Địa chỉ nhà xuất bản không quá 255 ký tự"),
    });
    return {
      publisherLocal: { ...this.publisher },
      publisherFormSchema,
    };
  },
  computed: {
    isEditMode() {
      return !!this.publisherLocal._id;
    }
  },
  methods: {
    submitPublisher() {
      this.$emit("submit:publisher", this.publisherLocal);
    },
    deletePublisher() {
      this.$emit("delete:publisher", this.publisherLocal._id);
    },
  },
};
</script>
