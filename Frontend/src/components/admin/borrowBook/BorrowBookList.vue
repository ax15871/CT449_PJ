<script>
export default {
    props: {
        borrowBooks: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
  <ul class="list-group pt-3">
    <li
      class="list-group-item"
      v-for="(borrowBook, index) in borrowBooks"
      :key="borrowBook._id"
      :class="{ active: index === activeIndex}"
      @click="updateActiveIndex(index)"
    >
      <div class="borrowBook-list">
        <div>
          <h5 class="mb-1">Mã độc giả: {{ borrowBook.MADOCGIA }}</h5>
          <h5 class="mb-1">Mã sách: {{ borrowBook.MASACH }}</h5>
        </div>
        <div v-if="borrowBook.NGAYTRA" class="check-icon">
          <i class="fa-solid fa-check fa-3x text-success"></i>
        </div>
      </div>
    </li>
  </ul>
</template>

