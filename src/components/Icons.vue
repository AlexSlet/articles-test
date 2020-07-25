<template>
  <div class="icons flex">
    <span class="addIcon" v-if="addIcon" @click="$emit('add')" title="Create item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </span>
    <span class="editIcon" v-if="editIcon" @click="$emit('edit')" title="Edit item">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
      </svg>
    </span>
    <span v-if="deleteIcon" class="deleteIcon" @click="$emit('delete')" title="Delete item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    addIcon: {
      type: Boolean
    },
    editIcon: {
      type: Boolean
    },
    deleteIcon: {
      type: Boolean
    }
  }
};
</script>

<style>
.icons svg {
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icons span {
  padding: 3px;
  border: 1px solid #fff;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}

.icons span svg {
  fill: #fff;
}

.icons span svg:hover {
  transform: scale(1.1);
}

</style>