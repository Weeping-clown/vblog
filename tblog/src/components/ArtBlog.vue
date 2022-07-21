<template>
  <div>
    art
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'TechBlog',
  setup() {
    return {
      selectedKeys: ref(['2']),
    };
  },

});
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>