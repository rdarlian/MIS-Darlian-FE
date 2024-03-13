<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="../assets/svgs/logo-type.svg" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign In</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Selamat datang pada aplikasi inventory <br />
      Silahkan Sign-in terlebih dahulu
    </p>
    <form v-on:submit.prevent="login" class="w-full card">
      <div class="form-group">
        <label for="" class="text-grey">Username</label>
        <input v-model="form.username" type="text" class="input-field" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input v-model="form.password" type="password" class="input-field" />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Sign In
      </button>
      <RouterLink to="/register" class="text-blue-400">register</RouterLink>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
import setAuthHeader from "@/utils/setAuthHeader";

const data = ref({
  //state loggedIn with localStorage
  loggedIn: localStorage.getItem("loggedIn"),
  //state token
  token: localStorage.getItem("token"),
  //state user
});

let error = ref("");

const form = reactive({
  username: "",
  password: "",
});

const login = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios.post("/api/login", form).then((response) => {
    if (response.data.meta.code == 200) {
      localStorage.setItem("token", response.data.result.access_token);
      localStorage.setItem("user", response.data.result.user.username);
      setAuthHeader(response.data.result.access_token);

      router.push("/");
    } else {
      error.value = response.data.message;
    }
  });
};
</script>
