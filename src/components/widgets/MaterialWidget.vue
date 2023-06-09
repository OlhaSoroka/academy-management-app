<template>
	<div class="material__container ">
		<div class="flex align-middle justify-between">
			<div class="flex items-center">
				<h2 class="material__header mr-3">Materials</h2>
				<CustomSpinner v-if="courseDetailsStore.materialsWidgetLoading"/>
			</div>
			<div>
				<BaseButton v-if="userStore.isAdmin || userStore.isMentor" @click="openModal()">
					Add
				</BaseButton>
			</div>
		</div>
		<div class="mt-5">
			<BaseTableEditable :column-defs="columnDefs" :row-data="courseDetailsStore.materials"
				:uniq-identifier="uniqIdentifier" @cellValueChanged="onCellEdit($event)"
				@deleteRow="onMaterialDelete($event)" />
		</div>
		<CreateMaterialModal :toggle-modal="isModalOpen" @materialAdded="onNewMaterialAdded" />
	</div>
</template>

<script lang="ts">
import BaseTableEditable from "../baseComponents/BaseTableEditable.vue";
import { mapStores } from 'pinia';
import { useUserStore } from '../../store/user';
import { defineComponent, PropType } from "vue";
import { Course } from "../../api/models/course.model";
import BaseButton from "../baseComponents/BaseButton.vue";
import CreateMaterialModal from "../modals/CourseDetailsModals/CreateMaterialModal.vue";
import { deleteMaterial,updateMaterialById } from "../../api/materials";
import { Material } from "../../api/models/material.model";
import { useCourseDetailsStore } from "../../store/course-details.store";
import CustomSpinner from "../CustomSpinner.vue";
export default defineComponent({
	components: {
    BaseTableEditable,
    BaseButton,
    CreateMaterialModal,
    CustomSpinner
},
	props: {
		currentCourse: {
			type: Object as PropType<Course>
		}
	},
	data(): {
		columnDefs: any,
		uniqIdentifier: any,
		isModalOpen: boolean,
	} {
		return {
			columnDefs: [],
			uniqIdentifier: 'id',
			isModalOpen: true,
		};
	},
	computed: {
		...mapStores(useUserStore, useCourseDetailsStore),
	},
	beforeMount() {
		if (this.userStore.isStudent) {
			this.columnDefs = [
				{ field: "name", headerName: "Name", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, width: 400, filter:true },
				{ field: "link", headerName: "Link", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, link:true,  width: 400 },
			]
		}
		if (this.userStore.isAdmin || this.userStore.isMentor) {
			this.columnDefs = [
				{ field: "name", headerName: "Name", sortable: false, editable:this.userStore.isAdmin || this.userStore.isMentor, width: 400 , filter:true  },
				{ field: "link", headerName: "Link", sortable: false, editable: this.userStore.isAdmin || this.userStore.isMentor, link:true,  width: 400 },
				{ field: "", headerName: "Delete", sortable: false, editable: false, width: 120, actionColumn: true, delete: this.userStore.isAdmin || this.userStore.isMentor ,headerCentered:true  },
			]
		}
	},
	methods: {
		async onCellEdit(event: { uniqIdentifier: string, data: Material }) {
			await updateMaterialById(event.uniqIdentifier, event.data);
			this.courseDetailsStore.updatedMaterials();
		},
		openModal() {
			this.isModalOpen = !this.isModalOpen;
		},
		onNewMaterialAdded() {
			this.courseDetailsStore.updatedMaterials();
		},
		async onMaterialDelete(materialId: string) {
			await deleteMaterial(materialId);
			this.courseDetailsStore.updatedMaterials();
		}
	}
});
</script>
  
<style lang="scss" scoped>
.material__container {
	@apply shadow-md bg-stone-50 border border-stone-300 rounded-md p-14 w-full;
}

.material__header {
	@apply text-xl text-gray-700
}
</style>
  