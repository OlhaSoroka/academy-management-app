<template>
	<BaseModal
	  ref="baseDeleteModal"
	  :header="'Confirm delete'"
	>
	  <template #body>
		<div
		  v-if="targetValue"
		  class="max-w-md"
		>
		Are you sure you want to delete:
		  <span class="font-bold break-all">{{ targetValue }}</span>?
		</div>
		<div class="flex justify-evenly mt-5">
		  <div class="mx-2">
			<BaseButton
			  :variant="'btn_red_outlined'"
			  @click="submit()"
			>
			  Delete
			</BaseButton>
		  </div>
		  <div class="mx-2">
			<BaseButton :variant="'btn_blue_outlined'" @click="cancel">
			  Cancel
			</BaseButton>
		  </div>
		</div>
	  </template>
	</BaseModal>
  </template>
  
  <script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseModal from './BaseModal.vue';

  export default defineComponent({
	name: "BaseDeleteModal",
	components: { BaseModal, BaseButton },
	props: {
	  toggleModal: {
		type: Boolean,
		default: false,
	  },
	  targetValue: {
		type: [Object, Array, String],
		default: null,
	  },
	},
	data() {
	  return {
		test: {},
	  };
	},
	emits:["delete"],
	watch: {
	  toggleModal() {
		(this.$refs.baseDeleteModal as typeof BaseModal).openModal();
	  },
	},
	methods: {
	  submit() {
		this.$emit("delete");
		(this.$refs.baseDeleteModal as typeof BaseModal).closeModal();
	  },
	  cancel() {
		(this.$refs.baseDeleteModal as typeof BaseModal).closeModal();
	  },
	},
  });
  </script>
  