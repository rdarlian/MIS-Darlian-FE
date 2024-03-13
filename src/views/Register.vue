<template>
  <div>
    <div class="pt-[50px] md:px-[50px] flex justify-between items-center px-4">
      <RouterLink to="/"> INVENTORY </RouterLink>
      <a href="#" onclick="history.back()"> back </a>
    </div>
    <section class="py-[70px] flex flex-col items-center justify-center px-4">
      <div class="text-[32px] font-semibold text-dark">Tambah Data Barang</div>
      <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
        Tambah data barang <br />
        Inventory
      </p>
      <form class="w-full card" @submit.prevent="onHandleSubmit">
        <div class="mb-[2px] mx-auto"></div>
        <div class="form-group">
          <label for="" class="text-grey">Username</label>
          <input
            type="text"
            v-model="username"
            class="input-field disabled:bg-grey disabled:outline-none"
            value=""
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Password</label>
          <input
            type="password"
            v-model="password"
            class="input-field"
            value=""
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama</label>
          <input type="text" v-model="name" class="input-field" value="" />
        </div>

        <button type="submit" class="w-full btn btn-primary mt-[14px]">
          Continue
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataUser = localStorage.getItem("user");

const username = ref("");
const password = ref("");
const name = ref("");

const clearInput = () => {
  username.value = "";
  password.value = "";
  name.value = "";
};

const onHandleSubmit = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios.post("/api/register", {
    username: username.value,
    password: password.value,
    name: name.value,
  });

  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
