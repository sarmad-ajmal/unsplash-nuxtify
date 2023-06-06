<script setup>
const layout = "full-center";

const fromRules = {
  required: (v) => !!v || "Required",
};

const login = () => {
  if (this.$refs.loginForm.validate()) {
  }
};
</script>
<template>
  <NuxtLayout :name="layout">
    <v-row justify="center" class="flex-grow-0 h-100" style="width: 35%">
      <v-col cols="12" sm="12" justify="center">
        <div class="mb-10 d-flex flex-column align-center">
          <img
            src="/images/unsplash-logo.svg"
            alt="unsplash"
            height="64"
            width="64"
            class="mb-3"
          />
          <h3 class="mb-0">Login</h3>
          <span>Welcome back.</span>
        </div>
        <v-form ref="loginForm">
          <div>
            <v-btn class="bg-blue-accent-3 w-100 py-6 d-flex" rounded="0" flat>
              <v-icon left>mdi-facebook</v-icon>
              <span class="ml-3 text-capitalize">Continue with Facebook</span>
            </v-btn>
            <div class="my-5 text-center text-caption">OR</div>
            <div>
              <label class="text-body-1 mb-2">Email</label>
              <v-text-field
                placeholder="Email"
                variant="outlined"
                dense
                density="compact"
                class="mb-5 mt-2"
                :rules="[fromRules.required]"
              ></v-text-field>
            </div>
            <div>
              <div class="d-flex justify-space-between">
                <label class="text-body-1 mb-2">Password</label>
                <span class="text-grey text-decoration-underline pointer"
                  >Forgot your password?</span
                >
              </div>
              <v-text-field
                placeholder="Password"
                density="compact"
                variant="outlined"
                dense
                class="mb-0"
              ></v-text-field>
            </div>
            <v-btn
              class="bg-black w-100 py-6 d-flex"
              rounded="0"
              flat
              @onClick="login()"
            >
              Login</v-btn
            >
            <v-sheet
              class="mt-4 d-flex justify-center align-center"
              :height="90"
              style="border-width: 2px"
            >
              <span>Don't have an account?</span>&nbsp;
              <span class="text-grey text-decoration-underline pointer"
                >Join Unsplash</span
              >
            </v-sheet>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </NuxtLayout>
</template>
