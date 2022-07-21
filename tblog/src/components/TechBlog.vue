<template>
  <div>
    <a-list item-layout="vertical" size="large" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template v-if="!loading" #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component :is="type" style="margin-right: 8px"></component>
              {{ text }}
            </span>
          </template>
          <a-skeleton :paragraph="{ rows: 4, width: '100%' }" :loading="loading" active avatar>
            <a-list-item-meta>
              <template #title>
                <a @click="goPage(item.id)">{{ item.title }}</a>
                <span class="article-tags">{{item.tags}}</span>
              </template>
            </a-list-item-meta>
            {{item.description}}
            <span class="article-details">阅读原文</span>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
    <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />
  </div>
</template>
<script>
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue';
import {useRouter} from 'vue-router'


export default defineComponent({
  name: 'TechBlog',
  setup() {
    let loading = ref(true);
    const data = reactive({
      content: '',
      text: '22',
      test: 1,
      pageList: [
        {title: '博客'}
      ],
      listData: []
    })
    const actions = [
      { type: 'star-outlined', text: '156' },
      { type: 'like-outlined', text: '156' },
      { type: 'message-outlined', text: '2' },
    ];
    const router = useRouter()
    const goPage = (id) => {
      console.log(id)
      router.push({path: '/article', query: {id}})
    }
    let {proxy} = getCurrentInstance()
    
    const listData = reactive([])
    onMounted(() => {
      proxy.$axios.get('/article').then(res => {
        console.log(res)
        res.data.data.map(item => {
          listData.push({
            id: item.id,
            title: item.title,
            description: item.description + '',
            tags: item.tags,
            content: item.content + '',
            path: item.path
          })
        })
      }).then(() => {
        console.log('=========')
        loading.value = false
        console.log('=========', loading)
      })
    })
    return {
      data,
      listData,
      loading,
      actions,
      goPage
    };
  }
});
</script>
<style lang="scss">
.ant-list-item{
  transition: all 200ms;
  background: white;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 8px rgba(156, 156, 156, 0.3);
  &:hover {
    box-shadow: 2px 2px 8px rgb(156, 156, 156);
  }
}
.ant-pagination {
  text-align: right;
}
.article-details {
  float: right;
    margin-top: 38px;
}
</style>
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