<template>
	<div class="update__container ">
		<div class="h-full">
			<div class="h-full">
				<span class="update__header">Updates</span>
				<CustomSpinner class="mt-60" v-if="updateStore.updatesLoading" ></CustomSpinner>
				<div v-else class="h-full flex flex-col justify-between">
					<div class="mt-5">
						<NotificationItem v-for="update in updateStore.updates" :key="update.id" :update="update">
						</NotificationItem>
					</div>
					<div v-if="updateStore.updates.length" class="flex justify-center items-center mb-5 mt-5">
						<BaseButton :class="{ update__btn_disabled: isPrevDisabled }" class="mr-5"
							@click="updateStore.fetchPrevPage()">
							<ArrowUpIcon class="-rotate-90"></ArrowUpIcon>
						</BaseButton>
						<BaseButton :class="{ update__btn_disabled: isNextDisabled }"
							@click="updateStore.fetchNextPage()">
							<ArrowUpIcon class="rotate-90"></ArrowUpIcon>
						</BaseButton>
					</div>
					<div v-if="updateStore.updates.length < 1"
						class="flex justify-center items-center text-start border border-solid border-stone-300 p-5 rounded-md mt-10">
						There is no update yet</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { useUpdateStore } from '../store/update';
import BaseButton from './baseComponents/BaseButton.vue';
import NotificationItem from './UpdateNotificationItem.vue';
import { mapStores } from 'pinia'
import ArrowUpIcon from './baseComponents/icons/ArrowUpIcon.vue';
import CustomSpinner from './CustomSpinner.vue';
import { defineComponent } from 'vue';
export default defineComponent({
	components: {
		BaseButton,
		NotificationItem,
		ArrowUpIcon,
		CustomSpinner
	},
	computed: {
		...mapStores(useUpdateStore),
		isPrevDisabled(): boolean {
			return this.updateStore.firstUpdate?.id === this.updateStore.updates[0]?.id
		},
		isNextDisabled(): boolean {
			return this.updateStore.isLastPage
		}
	},
	beforeMount() {
		this.updateStore.fetchUpdates()
	},
});
</script>
<style lang="css" scoped>
.update__container {
	@apply border-2 border-stone-300 rounded-md shadow-md bg-stone-50 p-10 w-1/2 h-[730px];
}

.update__header {
	@apply font-semibold text-lg text-primary-700 text-start border border-solid border-primary-700 p-2 rounded-md bg-primary-100;
}

.update__btn_disabled {
	@apply opacity-50 pointer-events-none;
}
</style>