import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue';
// .use(Antd)
import {Layout, Menu, List, Skeleton, Card, Pagination} from 'ant-design-vue';
import vueRouter from './router'
import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
import Axios from './api';
const app = createApp(App)
app.config.globalProperties.$axios = Axios
app
.use(Layout)
.use(Menu)
.use(List)
.use(Skeleton)
.use(Pagination)
.use(Card)
.use(vueRouter)
.use(mavonEditor)
.mount('#app')
