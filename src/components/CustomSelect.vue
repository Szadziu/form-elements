<template>
    <div class="input__wrapper">
        <label class="input">
            <select
                class="input__field"
                :class="{
                    'input__field--error': error,
                    'input__field--disabled': disabled,
                }"
                type="text"
                @input="updateValue"
                :value="modelValue"
                :disabled="disabled"
                v-bind="$attrs"
            >
                <option value="">{{ placeholder }}</option>
                <option v-for="{ name } in items" :key="name" :value="name">
                    {{ name }}
                </option>
            </select>
            <span class="input__label">{{ label }}</span>
        </label>
        <div v-if="error" class="input__field--error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        modelValue: string;
        label: string;
        placeholder?: string;
        items: Array<{ name: string }>;
        disabled?: boolean;
        error?: string;
    }>(),
    {
        placeholder: 'Select',
    }
);
const emit = defineEmits(['update:modelValue']);

function updateValue(e: Event) {
    emit('update:modelValue', (e.target as HTMLSelectElement).value);
}
</script>

<style lang="scss" scoped>
@import url('https://rsms.me/inter/inter.css');
@import '../assets/variables.css';

.input__wrapper {
    width: 100%;
    height: 50px;
    line-height: 1.4;
    font-family: 'Inter', sans-serif;
    font-size: calc(0.6rem + 0.4vw);
    color: var(--color-text);
    background: var(--color-background);
    font-weight: 300;
    padding: 20px;
}

h2 {
    font-weight: 900;
}

.input {
    position: relative;

    &__label {
        position: absolute;
        left: 0;
        top: 0;
        padding: 5px;
        margin: 5px;
        white-space: nowrap;
        transform: translate(0, 0);
        transform-origin: 0 0;
        background: var(--color-background);
        transition: transform 120ms ease-in;
        font-weight: bold;
        line-height: 1.2;
    }

    &__field {
        box-sizing: border-box;
        display: block;
        width: 100%;
        border: 3px solid var(--color-dark);
        padding: 10px;
        color: var(--color-dark);
        background: transparent;
        border-radius: 4px;
        outline: none;

        & + .input__label {
            transform: translate(0.25rem, -65%) scale(0.8);
        }

        &:focus {
            & + .input__label {
                color: var(--color-accent);
            }
        }

        &--error {
            text-align: left;
            border-color: var(--color-error);
        }

        &--disabled {
            border-color: lightgray;
            cursor: not-allowed;
            & + .input__label {
                color: lightgray;
            }
        }
    }
}
</style>
