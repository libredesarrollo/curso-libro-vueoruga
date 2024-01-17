<template>
  <h1 v-if="post">
    Update Post <span class="font-bold">{{ post.title }}</span>
  </h1>
  <h1 v-else>Create Post</h1>

  <form @submit.prevent="submit">
    <div class="grid grid-cols-2 gap-3">
      <div class="col-span-2">
        <o-field
          label="Title"
          :variant="errors.title ? 'danger' : 'primary'"
          :message="errors.title"
        >
          <o-input v-model="form.title" ></o-input>
        </o-field>
      </div>

      <o-field
        :variant="errors.description ? 'danger' : 'primary'"
        :message="errors.description"
        label="Description"
      >
        <o-input v-model="form.description" type="textarea" ></o-input>
      </o-field>

      <o-field
        :variant="errors.content ? 'danger' : 'primary'"
        :message="errors.content"
        label="Content"
      >
        <o-input v-model="form.content" type="textarea" ></o-input>
      </o-field>
      <o-field
        :variant="errors.category_id ? 'danger' : 'primary'"
        :message="errors.category_id"
        label="Category"
      >
        <o-select
          v-model="form.category_id"
          placeholder="Select a category"
        >
          <option v-for="c in categories" v-bind:key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </o-select>
      </o-field>
      <o-field
        :variant="errors.posted ? 'danger' : 'primary'"
        :message="errors.posted"
        label="Posted"
      >
        <o-select v-model="form.posted" placeholder="Select a state">
          <option value="yes">Yes</option>
          <option value="not">Not</option>
        </o-select>
      </o-field>

      <div class="flex gap-2" v-if="post">
        <o-field :message="fileError">
          <o-upload v-model="file">
            <o-button tag="a" variant="primary">
              <o-icon icon="upload"></o-icon>
              <span>Click to upload</span>
            </o-button>
          </o-upload>
        </o-field>
        <o-button icon-left="upload" @click="upload"> Upload </o-button>
      </div>
      <div class="flex gap-2" v-if="post">
        <o-field :message="fileError">
          <o-upload v-model="filesDaD" multiple drag-drop>
            <section>
              <o-icon icon="upload"></o-icon>
              <span>Drag and Drop to upload</span>
            </section>
          </o-upload>
        </o-field>
        <span v-for="(file, index) in filesDaD" :key="index">
          {{ file.name }}
        </span>
      </div>
    </div>
    <br />
    <o-button variant="primary" native-type="submit">Send</o-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      form: {
        title: "",
        description: "",
        content: "",
        category_id: "1",
        posted: "yes",
      },
      errors: {
        title: "",
        description: "",
        content: "",
        category_id: "",
        posted: "",
      },
      post: "",
      file: null,
      filesDaD: [],
      fileError: "",
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.getPost();
      this.initPost();
    }
    this.getCategory();
  },
  methods: {
    cleanErrorsForm() {
      this.errors.title = "";
      this.errors.description = "";
      this.errors.category_id = "";
      this.errors.content = "";
      this.errors.posted = "";
    },
    submit() {
      this.cleanErrorsForm();

      if (this.post == "")
        return this.$axios
          .post(this.$root.urlCRUDPost, this.form)
          .then(() => {
            this.$oruga.notification.open({
              message: "Created",
              position: "bottom-right",
              duration: 4000,
              closable: true,
            });
          })
          .catch((error) => {
            console.log(error.response.data);

            if (error.response.data.title)
              this.errors.title = error.response.data.title[0];

            if (error.response.data.description)
              this.errors.description = error.response.data.description[0];

            if (error.response.data.category_id)
              this.errors.category_id = error.response.data.category_id[0];

            if (error.response.data.posted)
              this.errors.posted = error.response.data.posted[0];

            if (error.response.data.content)
              this.errors.content = error.response.data.content[0];
          });
      // actualizar
      this.$axios
        .put(this.$root.urlCRUDPost +'/'+ this.$route.params.id, this.form)
        .then(() => {
          this.$oruga.notification.open({
            message: "Created",
            position: "bottom-right",
            duration: 4000,
            closable: true,
          });
        })
        .catch((error) => {
          console.log(error.response.data);

          if (error.response.data.title)
            this.errors.title = error.response.data.title[0];

          if (error.response.data.description)
            this.errors.description = error.response.data.description[0];

          if (error.response.data.category_id)
            this.errors.category_id = error.response.data.category_id[0];

          if (error.response.data.posted)
            this.errors.posted = error.response.data.posted[0];

          if (error.response.data.content)
            this.errors.content = error.response.data.content[0];
        });
    },
    upload() {
      //return console.log(this.file)
      this.fileError = ""
      const formData = new FormData();
      formData.append("image", this.file);
      this.$axios
        .post("https://crudcrud.com/api/post/upload/" + this.post.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          this.fileError = error.response.data.message;
        });
    },
    getCategory() {
      this.categories = [
        {
          id:1,
          title:'Cate 1'
        },
        {
          id:2,
          title:'Cate 2'
        },
      ]
    },
    async getPost() {
      this.post = await this.$axios.get(
        this.$root.urlCRUDPost +'/'+ this.$route.params.id
      );
      this.post = this.post.data;
    },
    initPost() {
      this.form.title = this.post.title;
      this.form.description = this.post.description;
      this.form.content = this.post.content;
      this.form.category_id = this.post.category_id;
      this.form.posted = this.post.posted;
    },
  },
  watch: {
    filesDaD: {
      handler(val) {
        //return console.log(val[val.length - 1]);
        this.fileError = ""
        const formData = new FormData();
        formData.append("image", val[val.length - 1]);
        this.$axios
          .post("https://crudcrud.com/api/post/upload/" + this.post.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            this.fileError = error.response.data.message;
          });
      },
      deep: true,
    },
  },
};
</script>