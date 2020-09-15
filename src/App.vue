<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding:0;
  margin: 0;
  list-style: none;
}
.toggle-btn i{
    font-size:14px
}
.table-bg{
  background-color:#fff;
  padding: 15px;
  margin: 15px;
}
.el-dialog__header{
  border-bottom:1px solid #eee;
  padding:15px 20px 10px!important;
}
</style>
