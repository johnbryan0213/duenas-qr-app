<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card width="300" class="card-outline px-8 py-10 text-center">
      <h2 class="text-center my-6 hr-sect mb-8">Login Page</h2>
      <v-form>
        <v-text-field
          label="Username"
          outlined
          rounded
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          label="Password"
          rounded
          outlined
          type="password"
          prepend-inner-icon="mdi-lock"
        ></v-text-field>

        <v-btn color="primary" class="text capitalize" rounded block
          >Login</v-btn
        >
        <div class="hr-sect my-5">OR</div>
        <v-btn
          color="error"
          @click="signinWithGoogle()"
          class="text-capitalize"
          rounded
          block
          ><v-icon left>mdi-google</v-icon> Sign in with google</v-btn
        >
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
    layout: "auth",
    middleware: "guest",
    methods: {
        signinWithGoogle() {
            this.$auth.loginWith('google')
        }
    }
}
</script>
<style scoped>
.hr-sect {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  /* color: rgba(0, 0, 0, 0.9); */
  margin: 8px 0;
}

.hr-sect::before,
.hr-sect::after {
  content: "";
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.15);
  height: 1px;
  font-size: 0;
  line-height: 0;
  margin: 0 8px;
}
.card-outline {
  border-radius: 20px;
}
</style>
