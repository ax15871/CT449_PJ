<template>
    <div class="col-md-6">
        <InputSearch v-model="searchText" />
    </div>
    <div class="row mb-3">
        <div class="mt-3 col-md-6">
            <h4>
                Độc giả
                <i class="fas fa-users"></i>
            </h4>
            <div class="reader-list-container">
                <ReaderList 
                    v-if="filteredReadersCount > 0"
                    :readers="filteredReaders"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có độc giả nào</p>
            </div>

            <div class="mt-3 button-click">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> 

                <button class="btn btn-sm btn-success" @click="gotoAddReader()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> 

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllReaders"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả    
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeReader">
                <h4 style="padding-left: 0.5rem;">
                    Chi tiết độc giả
                    <i class="fas fa-users"></i>
                </h4>
                <ReaderDetail :reader="activeReader" />
                <router-link
                    :to="{
                        name: 'reader.edit',
                        params: { id: activeReader._id},
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
import ReaderDetail from '@/components/admin/reader/ReaderDetail.vue';
import InputSearch from '@/components/admin/reader/InputSearch.vue';
import ReaderList from '@/components/admin/reader/ReaderList.vue';
import ReaderService from "@/services/reader.service";
import { useRouter } from 'vue-router';

export default {
    components: {
        ReaderDetail,
        InputSearch,
        ReaderList,
    },

    data() {
        return {
            readers: [],
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
            this.searchReaders(newVal);
        },
    },
    
    computed: {
        readerStrings() {
            return this.readers.map((reader) => {
                const { HOLOT, TEN, MADOCGIA} = reader;
                return [HOLOT, TEN, MADOCGIA].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) =>
                this.readerStrings[index].includes(this.searchText)
            );
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },

    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async searchReaders(searchText) {
            try {
                this.readers = await ReaderService.getByName(searchText);
                this.activeIndex = -1;
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },

        async removeAllReaders() {
            if (confirm("Bạn muốn xóa tất cả Độc giả?")) {
                try {
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        gotoAddReader() {
            this.$router.push({ name: "reader.add" });
        },    
    },
    
    mounted() {
        this.refreshList();
    },
};
</script>