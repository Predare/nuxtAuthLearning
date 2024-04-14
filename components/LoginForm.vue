<script setup lang="ts">
import { useForm } from 'vuestic-ui';

const form = reactive({
    email: '',
    password: '',
});

const { isValid, validate, reset, resetValidation } = useForm('formRef');

const formRef = ref(null);

const auth = useAuth();

const submit = async () => {
    console.log('ye');
    await auth.signIn(form, {callbackUrl: '/'});
};
</script>

<template>
    <VaForm ref="formRef" class="flex flex-col items-baseline gap-6">
        <VaInput v-model="form.email"
            :rules="[(value: string): boolean | string => (value && value.length > 0) || 'Login is required']"
            label="email" />
        <VaInput v-model="form.password" type="password"
            :rules="[(value: string): boolean | string => (value && value.length > 0) || 'Password is required']"
            label="password" />
        <VaButton @click="validate() && submit()">Submit</VaButton>
    </VaForm>
</template>