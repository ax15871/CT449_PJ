<template>
  <Form
    @submit="submitReader"
    :validation-schema="readerFormSchema"
  >
    <div class="form-group">
      <label for="username">Tên đăng nhập</label>
        <div class="input-form">
        <Field
          name="username"
          type="text"
          class="form-control"
          v-model="readerLocal.USERNAME"
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
          v-model="readerLocal.PASSWORD"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="hoLot">Họ lót</label>
      <div class="input-form">
        <input
          name="hoLot"
          type="text"
          class="form-control"
          v-model="readerLocal.HOLOT"
        />
      </div>
    </div>
    
    <div class="form-group">
      <label for="ten">Tên</label>
      <div class="input-form">
        <Field
          name="ten"
          type="text"
          class="form-control"
          v-model="readerLocal.TEN"
        />
        <ErrorMessage name="ten" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="ngaySinh">Ngày sinh</label>
      <div class="input-form">
        <Field
          name="ngaySinh"
          type="date"
          class="form-control"
          v-model="readerLocal.NGAYSINH"
        />
        <ErrorMessage name="ngaySinh" class="error-feedback" />
      </div>
    </div>

    <div class="form-group">
      <label for="phai">Giới tính</label>
      <div class="input-form">
        <div class="gender">
          <div>     
              <input type="radio" name="phai" value="Nam" v-model="readerLocal.PHAI" reqiured>
              Nam
          </div>
          <div>
              <input type="radio" name="phai" value="Nữ" v-model="readerLocal.PHAI">
              Nữ
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="diaChi">Địa chỉ</label>
      <div class="input-form">
        <Field
          name="diaChi"
          type="text"
          class="form-control"
          v-model="readerLocal.DIACHI"
        />
        <ErrorMessage name="diaChi" class="error-feedback" />
      </div>  
    </div>

    <div class="form-group">
      <label for="dienThoai">Điện thoại</label>
      <div class="input-form">
        <Field
          name="dienThoai"
          type="text"
          class="form-control"
          v-model="readerLocal.DIENTHOAI"
        />
        <ErrorMessage name="dienThoai" class="error-feedback" />
      </div>
    </div>

    <div class="admin-button mt-4">
      <button class="btn btn-primary">{{ isEditMode ? 'Lưu thông tin' : 'Thêm' }}</button>
      <button v-if="isEditMode" type="button" class="ml-2 btn btn-danger" @click="deleteReader">Xóa độc giả</button>
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
  emits: ["submit:reader", "delete:reader"],
  props: {
    reader: { type: Object, required: true }
  },
  data() {
    const readerFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên đăng nhập không được để trống")
        .max(255, "Tên đăng nhập không quá 30 ký tự"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      ten: yup
        .string()
        .required("Tên không được để trống")
        .max(255, "Tên không quá 30 ký tự"),
      ngaySinh: yup
        .date()
        .required("Ngày sinh không được để trống"),
      diaChi: yup
        .string()
        .required("Địa chỉ không được để trống")
        .max(255, "Địa chỉ không quá 50 ký tự"),
      dienThoai: yup
        .string()
        .required("Điện thoại không được để trống")
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không quá 11 số"),
    });
    return {
      readerLocal: { ...this.reader },
      readerFormSchema,
    };
  },
  computed: {
    isEditMode() {
      return !!this.readerLocal._id;
    }
  },
  methods: {
    submitReader() {
      this.$emit("submit:reader", this.readerLocal);
    },
    deleteReader() {
      this.$emit("delete:reader", this.readerLocal._id);
    },
  },
};
</script>
