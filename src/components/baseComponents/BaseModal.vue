<template>
	<div>
	  <transition name="fade">
		<div
		  v-if="show"
		  class="modal"
		>
		  <div
			class="modal__backdrop"
			@click="closeModal()"
		  />
		  <div class="modal__dialog">
			<div class="modal__header">
			  {{ header }}
			</div>
			<div class="modal__body">
			  <slot name="body" />
			</div>
			<div class="modal__footer">
			  <slot name="footer" />
			</div>
		  </div>
		</div>
	  </transition>
	</div>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent ({
	name: "BaseModal",
	props: {
	  header: {
		type: String,
		required: true,
	  },
	},
	data() {
	  return {
		show: false,
	  };
	},
  emits:["isClosed"],
	methods: {
	  closeModal() {
		this.show = false;
		this.$emit("isClosed");
	  },
	  openModal() {
		this.show = true;
		const body = document.querySelector("body");
		if (body) {
			body.classList.add("overflow-hidden");
		}
		
	  },
	},
  });
  /* 
   use example: 
	<div @click="$refs.modal.openModal()">LoginView</div>     ===>   use $ref to open or close modal 
	<BaseModal :header="'Custom Header' ref="modal">           ===>   header text comes from props
	  <template v-slot:body><h1>Custom content</h1></template>  ===>   slot for custom content
	  <template v-slot:footer>                                      
		<div class="mx-2 inline-block">
		  <BaseButton @click="confirm" :variant="'btn_green'>Yes</BaseButton> ===> slot for adding buttons with custom methods
		</div>
		<div class="mx-2 inline-block">
		  <BaseButton @click="cancel" :variant="'btn_red'">No</BaseButton>     
		</div>
	  </template>
	</BaseModal>
  */
  </script>
  <style lang="scss" scoped>
  .modal {
	@apply overflow-x-hidden overflow-y-auto fixed top-0 right-0 bottom-0 left-0  z-20 flex justify-center items-center mt-10 ;
  }
  .modal__backdrop {
	@apply bg-black opacity-30 fixed top-0 right-0 bottom-0 left-0 z-10 p-2;
  }
  .modal__dialog {
	@apply bg-white absolute w-fit /* mt-[50vh] -translate-y-1/2 ml-[50vw] -translate-x-1/2 */ flex flex-col rounded-md z-20;
  }
  .modal__header {
	@apply px-5 pt-3.5 flex align-middle justify-start font-semibold text-xl;
	border-bottom: 1px solid rgb(168 162 158);
  }
  .modal_divider {
	width: 1px;
	background-color: black;

  }
  .modal__body {
	@apply px-5 flex flex-col items-center overflow-auto p-1;
  }
  .modal__footer {
	@apply px-5 pt-2.5;
  }
  .fade-enter-active,
  .fade-leave-active {
	transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
	opacity: 0;
  }
  </style>