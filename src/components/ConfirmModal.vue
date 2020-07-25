<template>
  <div v-if="dialog" class="modal flex-column justify-around">
    <div class="flex justify-center align-center">
      <h2>Are you sure?</h2>
    </div>
    <div class="flex justify-around align-center">
      <button class="main-btn main-btn-big" @click="$emit('cancel')">No</button>
      <button class="main-btn main-btn-big" @click="$emit('confirm')">Yes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean
    }
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: calc(50vh - 100px);
  right: calc(50% - 150px);
  min-width: 300px;
  min-height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  z-index: 999;
  background-color: #1e1e1e;
}
</style>