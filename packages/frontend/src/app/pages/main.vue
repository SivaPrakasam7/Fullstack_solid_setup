<template>
    <div
        class="flex flex-col gap-5 items-center justify-center h-screen w-screen"
    >
        <h1 data-testId="INIT" className="text-3xl font-bold">
            {{ appName }}
        </h1>
        <p>
            {{
                isSignedIn
                    ? 'User logged  in successfully'
                    : 'User need to login'
            }}
        </p>
        <button v-if="isSignedIn" class="app-button" @click="logout">
            Logout
        </button>
        <button v-else class="app-button" @click="goToLogin">Login</button>
    </div>
</template>

<script lang="ts">
import { store } from 'src/store';
import { logout } from 'src/repository/authentication';

export default {
    name: 'MainPage',
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
            logout: logout,
        };
    },
    computed: {
        isSignedIn() {
            return !!store.state.user?.userId;
        },
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'signIn' });
        },
    },
};
</script>
