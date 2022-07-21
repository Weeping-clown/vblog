<template>
  <div class="article">
    <h2>title</h2>
    <div class="article-content" v-html="data.content"></div>
  </div>
</template>
<script>
import {reactive, getCurrentInstance, onMounted} from 'vue'
import { useRouter, useRoute} from 'vue-router'
import {marked} from 'marked'
import hljs from 'highlight.js'
 import 'highlight.js/styles/monokai-sublime.css';
export default {
	setup() {
    const Route  = useRoute()
    const Router = useRouter()
		const data = reactive({
			content: ''
		})
		const {proxy} = getCurrentInstance()
		onMounted (()=>{
			console.log('=========')
      let id = Route.query.id
      console.log(Route)
      console.log(Router)
			proxy.$axios.get(`/article/details?id=${id}`).then(res => {
        marked.setOptions({
          renderer: new marked.Renderer(),
          highlight: function (code) {
            return hljs.highlightAuto(code).value;
          },
          pedantic: false,
          gfm: true,
          tables: true,
          breaks: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
          xhtml: false
        })
        data.content = marked(res.data)
      })
		}) 
		return {
			data
		}
	}
}
</script>
<style lang="scss" scoped>
.article {
  padding: 10px;
  border-radius: 6px;
  background: white;
}
</style>
<style lang="scss">
.article-content {
  pre {
    color: white;
    padding: 1.25rem 1.5rem;
    border-radius: 6px;
    background: #282c34;
  }
  h2 {
    border-left: 2px solid #1890ff;
    padding-left: 5px;
  }
}
</style>