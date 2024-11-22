<script>
export default {
    props: {
        publishers: { type: Array, default: [] },
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
            class="list-group-item d-flex align-items-center"
            v-for="(publisher, index) in publishers"
            :key="publisher._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            <div>
                <h5 class="mb-1">{{ publisher.TENNXB }}</h5>
                <p class="mb-1">Mã NXB: {{ publisher.MANXB }}</p>
            </div>
        </li>
    </ul>
</template>
