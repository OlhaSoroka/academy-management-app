<template> 
    <div class="mentor__container">
        <div class="mentor__header_container">
            <div class="flex items-center h-16">
                <h1 class="mentor__header mr-3">Mentors Dashboard
                </h1>
                <CustomSpinner v-if="mentorStore.isMentorsLoading" />
            </div>
            <div>
                <BaseButton :variant="'btn_blue'" @click="addMentor">Add new mentor</BaseButton>
            </div>
        </div>
        <div class="mentor_widget">
            <BaseTableEditable :column-defs="columnDefs" :row-data="mentorStore.mentors" uniq-identifier="id"
                @deleteRow="onMentorDelete($event)" />
        </div>
        <UserCreateModal :toggle-modal="isAddMentorModalOpen" :role="'mentor'" :header="'Add new mentor'">
        </UserCreateModal>
    </div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import UserCreateModal from '../components/modals/UserCreateModal.vue';
import BaseButton from '../components/baseComponents/BaseButton.vue';
import { useMentorStore } from '../store/mentors';
import BaseTableEditable from '../components/baseComponents/BaseTableEditable.vue';
import CustomSpinner from '../components/CustomSpinner.vue';
import { defineComponent } from 'vue';
 

export default defineComponent({
    components: { UserCreateModal, BaseButton, BaseTableEditable, CustomSpinner },
    mounted() {
        this.mentorStore.fetchMentors();
    },
    data() {
        return {
            isAddMentorModalOpen: false,
            columnDefs: [
                { field: "avatarUrl", headerName: "Profile image", width: 120,headerCentered:true, centered: true, image: true },
                { field: "fullName", headerName: "Name", sortable: true, editable: false, minWidth: 150, filter: true, width: 300 },
                { field: "email", headerName: "Email", sortable: true, editable: false, minWidth: 150, filter: true, width: 300 },
                { field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: true ,headerCentered:true },
            ],
        };
    },
    methods: {
        addMentor() {
            this.isAddMentorModalOpen = !this.isAddMentorModalOpen;
        },
        async onMentorDelete(mentorId: string) {
            this.mentorStore.deleteMentor(mentorId);
        }
    },
    computed: {
        ...mapStores(useMentorStore),
    }

});
</script>
<style lang="css" scoped>
.mentor__container {
    @apply p-10 bg-primary-100 min-h-full
}

.mentor__header_container {
    @apply flex justify-between items-center mb-6
}

.mentor__header {
    @apply font-semibold text-lg text-start text-primary-700;
}

.mentor_widget {
    @apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full
}
</style>