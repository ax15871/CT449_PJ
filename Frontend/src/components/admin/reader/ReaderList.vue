<script>
export default {
    props: {
        readers: { type: Array, default: [] },
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
            v-for="(reader, index) in readers"
            :key="reader._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >

            <div>
                <h5 class="mb-1">{{ reader.HOLOT }} {{ reader.TEN }}</h5>
                <p class="mb-1">Mã độc giả: {{ reader.MADOCGIA }}</p>
            </div>
        </li>
    </ul>
</template>
