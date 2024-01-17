<template>
  <div class='container m-auto'>
    <router-view></router-view>
  </div>
</template>
<script>
const urlCRUD = "https://crudcrud.com/api/ae0b9bc487ba43498e77a60f725eb0f2";

export default {
  data() {
    return {
      urlCRUD: urlCRUD,
      urlCRUDPost: urlCRUD + "/post",
    };
  },
};
</script>