<script setup lang="ts">
import CustomTextInput from '../CustomTextInput.vue';
import CustomSelect from '../CustomSelect.vue';
import car_brands from '../../static/cars.json';
import { max } from '../../utils/validations/max';
import { min } from '../../utils/validations/min';
import { initialFormValue } from './FormElement.utils';
import { ref, computed } from 'vue';

components: {
    CustomTextInput;
    CustomSelect;
}

const customer_name = ref('');
const brand_name = ref('');
const form_state = ref(initialFormValue);

const cars_data = computed(() =>
    car_brands.filter((brand) => brand.name.toUpperCase())
);

function sendForm() {
    alert(`${customer_name.value} - ${brand_name.value}`);
}

function focusFn() {
    console.log('Test - Focus');
}

function handleValidateName(e: FocusEvent) {
    const v = (e.target as HTMLInputElement).value;

    const validationErrors = [
        max({
            max: 16,
            msg: 'Name can have up to 16 characters',
            v,
        }),
        min({ min: 3, msg: 'Name requires min 3 characters', v }),
    ];

    form_state.value.customer_name.touched = true;
    form_state.value.customer_name.error = validationErrors.join('');
}

function handleValidateBrand(e: FocusEvent) {
    form_state.value.brand_name.error = min({
        min: 1,
        msg: 'Choose at least one option',
        v: (e.target as HTMLInputElement).value,
    });

    form_state.value.brand_name.touched = true;
}
</script>

<template>
    <div class="card">
        <CustomTextInput
            v-model="customer_name"
            @focus="focusFn"
            @blur="handleValidateName"
            :error="form_state.customer_name.error"
        />
        <CustomSelect
            v-model="brand_name"
            label="Car brand"
            :items="cars_data"
            ref="select_input"
            @blur="handleValidateBrand"
            @focus="focusFn"
            placeholder="Wybierz"
            :error="form_state.brand_name.error"
        />
        <div class="button-group">
            <button
                @click="sendForm"
                :disabled="
                    !!Object.values(form_state)
                        .map(({ error, touched }) => error || !touched)
                        .filter(Boolean).length
                "
            >
                Submit
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../../assets/variables.css';

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 350px;
    min-height: 350px;
    background: var(--color-background);
    padding: 40px;
    margin-top: 40px;
    border-radius: 4px;
    border: 3px solid var(--color-shadow, currentColor);
    box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);

    *:first-child {
        margin-top: 0;
    }
}

.button-group {
    margin-top: 25px;
}

button {
    color: currentColor;
    padding: 10px 20px;
    background: var(--color-accent);
    border: none;
    border-radius: 4px;
    font-weight: 900;
    outline: none;

    &[disabled] {
        cursor: not-allowed;
        color: var(--color-disabled);
        background: var(--color-error);
    }
}

button + button {
    margin-left: calc(10px * 2);
}
</style>
