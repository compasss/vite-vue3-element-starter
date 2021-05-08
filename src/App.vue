<template>
<el-container class="app-w">
  <sl-side></sl-side>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span>王小虎</span>
    </el-header>

    <el-main>
      content
    </el-main>
  </el-container>
</el-container>
</template>

<script setup>
  import SlSide from './components/Layout/SlSide.vue';
</script>