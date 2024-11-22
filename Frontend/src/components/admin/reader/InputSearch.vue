<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },

    emits: ["submit", "update:modelValue"],
    methods: {
        updateSearchValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit", this.modelValue);
        },
    },
};
</script>

<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="Nhập tên độc giả hoặc mã độc giả cần tìm"
            :value="modelValue"
            @input="updateSearchValue"
            @keyup.enter="submit"   
        />

        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type="button"
                @click="submit"
            >
                <i class="fas fa-search"></i> Tìm kiếm   
            </button>
        </div>
    </div>
</template>
