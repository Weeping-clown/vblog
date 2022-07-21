<template>
  <a-layout>
    <a-layout-header theme="light" :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo"></div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="(item, index) in menu" :key="index" @click="goPage(item.path)">{{item.title}}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout class="layout-content">
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-sider class="layout-mr_left10" theme="light" width="300">
        <a-card title="文章" :bordered="false">
          <p v-for="item in article" :key="item.id">{{item.title}}</p>
        </a-card>
        <a-card class="card-tags" title="标签" :bordered="false">
          <span class="card-tags_tag" v-for="item in tags" :key="item">{{item}}</span>
        </a-card>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup(props, ctx) {
    const data = reactive({
      menu: [
        {title: '首页', path: '/'},
        {title: '技术博客', path: '/tech'},
        {title: '欢乐时光', path: '/art'}
      ]
    })
    let {proxy} = getCurrentInstance()
    proxy.$axios.get('/users').then(res => {
      console.log(res)
    })
    const article = reactive([])
    proxy.$axios.post('/article', {test: 1}).then(res => {
      console.log(res.data.data)
      res.data.data.map(item => {
        article.push(item)
      })
    })
    const tags = reactive([])
    proxy.$axios.post('/article/tags', {test: 1}).then(res => {
      res.data.data.map(item => {
        tags.push(item)
      })
      console.log(tags)
    })
    const router = useRouter();
    const goPage = (path) => {
      console.log(props, ctx)
      router.push({path: `${path}`})
    }
    return {
      selectedKeys: ref([0]),
      goPage,
      ...data,
      article,
      tags
    };
  },
  methods: {
  }

});
</script>

<style lang="scss">
@import url('./assets/css/color.scss');
@import url('./assets/css/layout.scss');
p {
  // color: $main-color;
}

.article-tags {
  font-size: 12px;
  &:hover {
    color: #6d9772;
  }
}
.card-tags_tag {
  padding: 0 10px;
  // border: 1px solid green;
}

</style>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: #0c3a2d;
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.ant-card {
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 8px rgba(156, 156, 156, 0.3);
}
</style>