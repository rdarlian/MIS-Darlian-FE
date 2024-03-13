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
            v-model="dataUser"
            class="input-field disabled:bg-grey disabled:outline-none"
            value=""
            disabled
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Barang</label>
          <input
            type="text"
            v-model="nama_barang"
            class="input-field"
            value=""
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Kode Barang</label>
          <input
            type="text"
            v-model="kode_barang"
            class="input-field"
            value=""
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Stok</label>
          <input type="number" v-model="stok" class="input-field" value="" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Harga Barang</label>
          <input type="number" v-model="harga" class="input-field" value="" />
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

const nama_barang = ref("");
const kode_barang = ref("");
const stok = ref("");
const harga = ref("");

const clearInput = () => {
  nama_barang.value = "";
  kode_barang.value = "";
  stok.value = "";
  harga.value = "";
};

const token = localStorage.getItem("token");
const headers = {
  headers: { Authorization: `Bearer ${token}` },
};
const onHandleSubmit = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios.post(
    "/api/barang",
    {
      nama_barang: nama_barang.value,
      kode_barang: kode_barang.value,
      stok: stok.value,
      harga: harga.value,
      user: dataUser,
    },
    headers
  );

  clearInput();
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
