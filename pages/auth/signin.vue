<template>
    <div class="d-flex align-center justify-center" style="height: 100vh;">
        <v-card width="500" class="pa-8 text-center">
            <h1 class="my-4">Login Page</h1>
            <v-form>
                <v-text-field label="Email" outlined prepend-inner-icon="mdi-email"></v-text-field>
                <v-text-field label="Password" outlined type="password" prepend-inner-icon="mdi-lock"></v-text-field>
                <v-btn color="primary" block>Login</v-btn>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    layout: "auth"
}
</script>
