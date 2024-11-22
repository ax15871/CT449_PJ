<script>
export default {
    props: {
        staffs: { type: Array, default: [] },
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
            v-for="(staff, index) in staffs"
            :key="staff._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            <div>
                <h5 class="mb-1">{{ staff.HOTENNV }}</h5>
                <p class="mb-1">Mã nhân viên: {{ staff.MSNV }}</p>
            </div>
        </li>
    </ul>
</template>