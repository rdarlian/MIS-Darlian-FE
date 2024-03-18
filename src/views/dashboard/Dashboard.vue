<template>
  <!-- Sidebar -->
  <div
    class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex items-center justify-between">
        <a href="#" class="flex justify-center text-center text-lg font-bold">
          INVENTORY
        </a>
        <a href="#" id="toggleCloseSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </a>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Inventory</div>
        <RouterLink to="/" class="nav-link active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17 2H7c-1.1 0-2 .9-2 2v15a2 2 0 0 0 2 2v1h2v-1h6v1h2v-1c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2m-7 16H8v-3h2zm6 0h-2v-3h2zm1-6H7V9h10zm0-5H7V4h10z"
            />
          </svg>
          Inventory
        </RouterLink>
      </div>
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Others</div>
        <button @click="logout" class="nav-link">
          <img src="" alt="" />
          Logout
        </button>
      </div>
    </div>
  </div>
  <!-- Main Content -->
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </a>
        <div class="text-[32px] font-semibold text-dark">Overview</div>
      </div>
      <div class="flex items-center gap-4">
        <a
          href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
        >
          <img src="../assets/svgs/ic-bell.svg" alt="" />
        </a>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
            <p class="text-grey">Your business growth</p>
          </div>
          <RouterLink
            to="/create-barang"
            class="px-6 bg-primary py-3 text-white font-semibold text-base rounded-2xl"
            >Tambah Data</RouterLink
          >
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg">
        <DataTable
          :columns="columns"
          :options="{
            paging: true,
            searching: true,
            serverSide: true,
          }"
          :ajax="getData"
          :order="defaultOrder"
          class="display stripe hover table-auto w-full text-left cell-border compact stripe text-lg"
        >
          <template #action="props">
            <button @click="editBarang(props.rowData)" class="me-2">
              Edit
            </button>
            <button @click="deleteBarang(props.rowData)" href="">delete</button>
          </template>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Stok</th>
              <th>Harga</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </section>
  </div>
</template>

<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import "datatables.net-select";
import "datatables.net-responsive";
import { onMounted, ref, render } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import setAuthHeader from "@/utils/setAuthHeader";
import EditBarang from "./EditBarang.vue";

import $ from "jquery";

DataTable.use(DataTablesCore);

const router = useRouter();
const products = ref([]);

const columns = [
  // {
  //   title: "NO",
  //   data: null,
  //   render: function (data, type, row, meta) {
  //     return meta.row + 1;
  //   },
  // },
  { title: "ID", data: "id" },
  { title: "Nama Barang", data: "nama_barang" },
  { title: "Kode Barang", data: "kode_barang" },
  { title: "Stok", data: "stok" },
  { title: "Harga", data: "harga" },
  { title: "User", data: "user" },
  { title: "Created At", data: "created_at" },
  { title: "Updated At", data: "updated_at" },
  {
    data: null,
    render: {
      _: "id",
      display: "#action",
    },
    title: "Action",
  },
];

const defaultOrder = [[0, "asc"]];

const token = localStorage.getItem("token");
const headers = {
  headers: { Authorization: `Bearer ${token}` },
};

const getInventory = async () => {
  const response = await axios.get("/api/barang", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  products.value = response.data.result.data;
};
onMounted(() => {
  getInventory();
});

const editBarang = (id) => {
  router.push({ path: `/edit-barang/${id.id}` });
};

const deleteBarang = async (id) => {
  await axios.delete("/api/barang/" + id.id, headers);
  window.location.reload();
};

const logout = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  await axios.post("/api/logout").then((response) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  });
};

async function getData(data, callback, settings) {
  try {
    const response = await axios.get("/api/barang", {
      params: {
        draw: data.draw,
        start: data.start,
        length: data.length,
        search: data.search.value,
        order: data.order,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);

    callback({
      draw: response.data.draw,
      recordsFiltered: response.data.recordsFiltered,
      recordsTotal: response.data.recordsTotal,
      data: response.data.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
</script>

<style lang="scss" scoped></style>
