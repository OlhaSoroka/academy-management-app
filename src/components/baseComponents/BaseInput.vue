<template>
  <div>
    <label v-if="label" class="ml-1 block text-base font-semibold mt-3 mb-1">
      {{ label }}
    </label>
    <Field v-bind="$attrs" :type="type" :value="value" :placeholder="placeholder" @input="updateInput" class="base-input"
      :rules="combinedRules" :name="label" :validate-on-input="true" />
    <ErrorMessage :name="label" class="base-input-error-text" />
  </div>
</template>

<script lang="ts">
import { Field, defineRule, ErrorMessage } from "vee-validate";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseInput",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    additionalRules: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      emailRules: "email",
      passwordRules: "min:6|regex:[A-Za-z]+[0-9]+",
      numberRules: "min_value:0",
    };
  },
  emits: ["update:modelValue"],
  computed: {
    combinedRules() {
      switch (this.type) {
        case "email":
          return `${this.emailRules}|${this.additionalRules}`;
        case "password":
          return `${this.passwordRules}|${this.additionalRules}`;
        case "number":
          return `${this.numberRules}|${this.additionalRules}`;
        default:
          return `${this.additionalRules}`;
      }
    },
  },
  methods: {
    updateInput(event: any) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
});
</script>

<style lang="scss">
// .base-input {
//   @apply relative block w-full rounded-sm border-2 border-primary-600 p-1 font-mono text-sm placeholder:text-slate-400 hover:bg-stone-50 focus:border-slate-500 focus:bg-stone-50 focus:outline-none focus:drop-shadow-md;
// }

// .base-input:disabled {
//   @apply border-gray-300 bg-gray-50;
// }

// .base-input-error-text {
//   @apply  text-[10px] text-red-500 ml-1 mb-8;
// }
// .base-input-container {
//   @apply flex flex-col mt-3
// }
</style>
