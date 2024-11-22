<template>
    <div class="col-md-6">
        <InputSearch v-model="searchText" />
    </div>
    <div class="row mb-3">
        <div class="mt-3 col-md-6">
            <h4>
                Nhà xuất bản
                <i class="fas fa-shop"></i>
            </h4>
            <div class="publisher-list-container">
                <PublisherList 
                    v-if="filteredPublishersCount > 0"
                    :publishers="filteredPublishers"
                    v-model:activeIndex="activeIndex"
                />
                <p v-else>Không có nhà xuất bản nào</p>
            </div>

            <div class="mt-3 button-click">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button> 

                <button class="btn btn-sm btn-success" @click="gotoAddPublisher()">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> 

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllPublishers"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả    
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activePublisher">
                <h4 style="padding-left: 0.5rem;">
                    Chi tiết nhà xuất bản
                    <i class="fas fa-shop"></i>
                </h4>
                <PublisherDetail :publisher="activePublisher" />
                <router-link
                    :to="{
                        name: 'publisher.edit',
                        params: { id: activePublisher._id},
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
import PublisherDetail from '@/components/admin/publisher/PublisherDetail.vue';
import InputSearch from '@/components/admin/publisher/InputSearch.vue';
import PublisherList from '@/components/admin/publisher/PublisherList.vue';
import PublisherService from "@/services/publisher.service";
import { useRouter } from 'vue-router';

export default {
    components: {
        PublisherDetail,
        InputSearch,
        PublisherList,
    },

    data() {
        return {
            publishers: [],
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
            this.searchPublishers(newVal);
        },
    },
    
    computed: {
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { TENNXB, MANXB } = publisher;
                return [TENNXB, MANXB].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText)
            );
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },

    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async searchPublishers(searchText) {
            try {
                this.publishers = await PublisherService.getByNameOrPublisherId(searchText);
                this.activeIndex = -1;
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },

        async removeAllPublishers() {
            if (confirm("Bạn muốn xóa tất cả Nhà xuất bản?")) {
                try {
                    await PublisherService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        gotoAddPublisher() {
            this.$router.push({ name: "publisher.add" });
        },    
    },
    
    mounted() {
        this.refreshList();
    },
};
</script>