<template>
    <div class="admin__container">
        <div class="admin__header_container">
            <div class="flex items-center h-16">
                <h1 class="admin__header mr-3">Admins Dashboard
                </h1>
                <CustomSpinner v-if="adminStore.isAdminsLoading" />
            </div>
            <div>
                <BaseButton :variant="'btn_blue'" @click="addAdmin">Add new admin</BaseButton>
            </div>
        </div>
        <div class="admin_widget min-h-40">
            <BaseTableEditable :column-defs="columnDefs" :row-data="adminStore.admins" uniq-identifier="id" />
        </div>
        <UserCreateModal :toggle-modal="isAddAdminModalOpen" :role="'admin'" :header="'Add new admin'">
        </UserCreateModal>
    </div>
</template> 
<script lang="ts">
import { mapStores } from 'pinia';
import UserCreateModal from '../components/modals/UserCreateModal.vue';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import { useAdminStore } from '../store/admins';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import { defineComponent } from 'vue';
import CustomSpinner from '../components/CustomSpinner.vue';


export default defineComponent({
    components: { UserCreateModal, BaseButton, BaseTableEditable, CustomSpinner },
    mounted() {
        this.adminStore.fetchAdmins();
    },
    data() {
        return {
            isAddAdminModalOpen: false,
            columnDefs: [
                { field: "avatarUrl",headerName: "Profile image", width: 120, headerCentered:true, centered: true, image: true },
                { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, filter: true, width: 300 },
                { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, filter: true, width: 300 },
                { field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: true ,headerCentered:true },
            ],
        };
    },
    methods: {
        addAdmin() {
            this.isAddAdminModalOpen = !this.isAddAdminModalOpen;
        }
    },
    computed: {
        ...mapStores(useAdminStore),
    }

});
</script>
<style lang="css" scoped>
.admin__container {
    @apply p-10 bg-primary-100 min-h-full
}

.admin__header_container {
    @apply flex justify-between items-center mb-6
}

.admin__header {
    @apply font-semibold text-lg text-start text-primary-700;
}

.admin_widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>