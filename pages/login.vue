<script setup>
import { useAuthStore } from "~/store/auth";
definePageMeta({
  layout: "full-center",
});
const router = useRouter();
const formRef = ref(null);
const authStore = useAuthStore();
const { updateMe } = authStore;

const fromRules = {
  email: (v) => /.+@.+\..+/.test(v) || "Email must be valid",
  required: (v) => !!v || "Required",
  minLength: (v) => v.length >= 6 || "Min 6 characters",
  maxLength: (v) => v.length <= 18 || "Max 18 characters",
};

const login = async (values) => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    updateMe({ user: { name: "test", email: "test@test.com" } });
    router.push("/");
  }
};
</script>
<template>
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
      <v-form @submit.prevent="login" ref="formRef">
        <div>
          <v-btn class="bg-blue-accent-3 w-100 py-6 d-flex" rounded="0" flat>
            <v-icon left>mdi-facebook</v-icon>
            <span class="ml-3 text-capitalize">Continue with Facebook</span>
          </v-btn>
          <div class="my-5 text-center text-caption">OR</div>
          <div>
            <label class="text-body-1 mb-2">Email</label>
            <v-text-field
              name="email"
              placeholder="Email"
              variant="outlined"
              dense
              density="compact"
              class="mb-5 mt-2"
              :rules="[fromRules.required, fromRules.email]"
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
              name="password"
              placeholder="Password"
              density="compact"
              variant="outlined"
              dense
              class="mb-0"
              :rules="[
                fromRules.required,
                fromRules.minLength,
                fromRules.maxLength,
              ]"
            ></v-text-field>
          </div>
          <v-btn
            class="bg-black w-100 py-6 d-flex mt-5"
            rounded="0"
            flat
            type="submit"
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
</template>
