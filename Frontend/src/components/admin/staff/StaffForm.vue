<template>
  <Form
    @submit="submitStaff"
    :validation-schema="staffFormSchema"
  >
    <div class="form-group">
      <label for="name">Họ và tên</label>
        <div class="input-form">
        <Field
          name="name"
          type="text"
          class="form-control"
          v-model="staffLocal.HOTENNV"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="username">Tên đăng nhập</label>
      <div class="input-form">
        <Field
          name="username"
          type="text"
          class="form-control"
          v-model="staffLocal.USERNAME"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <div class="input-form">
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="staffLocal.PASSWORD"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="position">Chức vụ</label>
      <div class="input-form">
        <Field
          name="position"
          type="text"
          class="form-control"
          v-model="staffLocal.CHUCVU"
        />
        <ErrorMessage name="position" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <div class="input-form">
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="staffLocal.DIACHI"
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>
    </div>
    <div class="form-group">
      <label for="phone">Số điện thoại</label>
      <div class="input-form">
        <Field
          name="phone"
          type="text"
          class="form-control"
          v-model="staffLocal.SODIENTHOAI"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
    </div>

    <div class="form-group add-button">
      <button class="btn btn-primary">{{ isEditMode ? 'Lưu thông tin' : 'Thêm' }}</button>
      <button v-if="isEditMode" type="button" class="ml-2 btn btn-danger" @click="deleteStaff">Xóa nhân viên</button>
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
  emits: ["submit:staff", "delete:staff"],
  props: {
    staff: { type: Object, required: true }
  },
  data() {
    const staffFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Họ và tên không được để trống")
        .max(255, "Họ và tên không quá 255 ký tự"),
      username: yup
        .string()
        .required("Tên đăng nhập không được để trống")
        .max(255, "Tên đăng nhập không quá 255 ký tự"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      position: yup
        .string()
        .required("Chức vụ không được để trống")
        .max(255, "Chức vụ không quá 255 ký tự"),
      address: yup
        .string()
        .required("Địa chỉ không được để trống")
        .max(255, "Địa chỉ không quá 255 ký tự"),
      phone: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không quá 11 số")
    });
    return {
      staffLocal: { ...this.staff },
      staffFormSchema,
    };
  },
  computed: {
    isEditMode() {
      return !!this.staffLocal._id;
    }
  },
  methods: {
    submitStaff() {
      this.$emit("submit:staff", this.staffLocal);
    },
    deleteStaff() {
      this.$emit("delete:staff", this.staffLocal._id);
    },
  },
};
</script>


