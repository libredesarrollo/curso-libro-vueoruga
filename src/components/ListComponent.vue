<template>
  <div>
    <o-modal v-model:active="confirmDeleteActive">
      <div class="p-4">
        <p>Are you sure you want to delete the selected record?</p>
      </div>

      <div class="flex flex-row-reverse gap-2 bg-gray-100 p-3">
        <o-button variant="danger" @click="deletePost()">Delete</o-button>
        <o-button @click="confirmDeleteActive = false">Cancel</o-button>
      </div>
    </o-modal>

    <h1>List</h1>

    <o-button iconLeft="plus" @click="$router.push({ name: 'save' })"
      >Create</o-button
    >

    <div class="mb-5"></div>

    <o-table
      :loading="isLoading"
      :data="posts.current_page && posts.length == 0 ? [] : posts"
    >
      <o-table-column field="id" label="ID" numeric v-slot="p">
        {{ p.row._id }}
      </o-table-column>
      <o-table-column field="title" label="Title" v-slot="p">
        {{ p.row.title }}
      </o-table-column>
      <o-table-column field="posted" label="Posted" v-slot="p">
        {{ p.row.posted }}
      </o-table-column>
      <o-table-column field="category" label="Category" v-slot="p">
        {{ p.row.category_id }}
      </o-table-column>
      <o-table-column field="_id" label="Actions" v-slot="p">
        <router-link
          class="mr-3"
          :to="{ name: 'save', params: { id: p.row._id } }"
          >Edit</router-link
        >

        <o-button
          iconLeft="delete"
          rounded
          size="small"
          variant="danger"
          @click="
            deletePostRow = p;
            confirmDeleteActive = true;
          "
          >Delete</o-button
        >
      </o-table-column>
    </o-table>

    <br />

    <o-pagination
      v-if="posts.current_page && posts.data.length > 0"
      @change="updatePage"
      :total="posts.total"
      v-model:current="currentPage"
      :range-before="2"
      :range-after="2"
      order="centered"
      size="small"
      :simple="false"
      :rounded="true"
      :per-page="posts.per_page"
    >
    </o-pagination>
  </div>
</template>

<script>
//posts.data row.id List.vue Save.vue /api/post/ resources/js/vu
export default {
  data() {
    return {
      posts: [],
      isLoading: true,
      currentPage: 1,
      confirmDeleteActive: false,
      deletePostRow: "",
    };
  },
  methods: {

    updatePage() {
      setTimeout(this.listPage, 100);
    },

    listPage() {
      this.isLoading = true;
      this.$axios.get(this.$root.urlCRUDPost+"?page=" + this.currentPage).then((res) => {
        this.posts = res.data;
        console.log(res.data);
        console.log(res);
        this.isLoading = false;
      });
    },
    deletePost() {
      this.confirmDeleteActive = false;
      this.posts.splice(this.deletePostRow.index, 1);
      this.$axios.delete(this.$root.urlCRUDPost +'/' + this.deletePostRow.row._id);
      this.$oruga.notification.open({
        message: "Deleted record",
        position: "bottom-right",
        variant: "danger",
        duration: 4000,
        closable: true,
      });
    },
  },

  async mounted() {
    this.listPage();
  },
};
</script>