<template>
    <div class="col-md-6">
        <InputSearch v-model="searchText" />
    </div>
    <div class="row mb-3">
        <div class="mt-3 col-md-6">
            <h4>
                Nhân viên
                <i class="fas fa-user"></i>
            </h4>
            <div class="staff-list-container">
                <StaffList 
                    v-if="filteredStaffCount > 0"
                    :staffs="filteredStaff"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có nhân viên nào</p>
            </div>

            <div class="mt-3 button-click">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> 

                <button class="btn btn-sm btn-success" @click="gotoAddStaff()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> 

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllStaffs"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả    
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeStaff">
                <h4 style="padding-left: 0.5rem;">
                    Chi tiết nhân viên
                    <i class="fas fa-user"></i>
                </h4>
                <StaffDetail :staff="activeStaff" />
                <router-link
                    :to="{
                        name: 'staff.edit',
                        params: { id: activeStaff._id},
                    }"
                >   
                    <span class="mt-2 btn btn-warning">
                        <i class="fas fa-edit"></i> 
                        Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import StaffDetail from '@/components/admin/staff/StaffDetail.vue';
import InputSearch from '@/components/admin/staff/InputSearch.vue';
import StaffList from '@/components/admin/staff/StaffList.vue';
import StaffService from "@/services/staff.service";
import { useRouter } from 'vue-router';

export default {
    components: {
        StaffDetail,
        InputSearch,
        StaffList,
    },

    data() {
        return {
            staffs: [],
            activeIndex: -1,
            searchText: "",
        };
    },

	async created() {
		const isLoggedIn = localStorage.getItem('Admin_token');
		if (!isLoggedIn) {
		  const router = useRouter();
		  router.push('/admin/login'); 
		  return; 
		}
	},

    watch: {
        searchText(newVal) {
            this.searchStaffs(newVal);
        },
    },
    
    computed: {
        staffStrings() {
            return this.staffs.map((staff) => {
                const { HOTENNV, MSNV } = staff;
                return [HOTENNV, MSNV].join("");
            });
        },
        filteredStaff() {
            if (!this.searchText) return this.staffs;
            return this.staffs.filter((_staff, index) =>
                this.staffStrings[index].includes(this.searchText)
            );
        },
        activeStaff() {
            if (this.activeIndex < 0) return null;
            return this.filteredStaff[this.activeIndex];
        },
        filteredStaffCount() {
            return this.filteredStaff.length;
        },
    },

    methods: {
        async retrieveStaffs() {
            try {
                this.staffs = await StaffService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async searchStaffs(searchText) {
            try {
                this.staffs = await StaffService.getByName(searchText);
                this.activeIndex = -1; // Reset active index after search
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveStaffs();
            this.activeIndex = -1;
        },

        async removeAllStaffs() {
            if (confirm("Bạn muốn xóa tất cả Nhân viên?")) {
                try {
                    await StaffService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        gotoAddStaff() {
            this.$router.push({ name: "staff.add" });
        },    
    },
    
    mounted() {
        this.refreshList();
    },
};
</script>