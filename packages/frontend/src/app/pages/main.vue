<template>
    <div
        class="flex flex-col gap-5 items-center justify-center h-screen w-screen"
    >
        <h1 data-testId="INIT" className="text-3xl font-bold">
            {{ appName }}
        </h1>
        <button class="app-button" @click="goToLogin">Login</button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'MainPage',
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
        };
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'signIn' });
        },
    },
};
</script>
