# 	Vue.js 3组件体系



## 

Vue.js 3 提供了强⼤、灵活的组件体系，使得开发者可以使⽤模块化、可复⽤的⽅式来构建应 ⽤。结合 TypeScript 和 script setup 语法糖，开发者能够更加简洁⾼效地编写代码。

## 组件状态：data与props 

## 

data 是每个组件⾃⼰管理的状态。在 Vue 3 中，借助组合式 API，如 ref 和 reactiv e ，我们可以轻松管理组件的状态。 ref ⽤于管理基本数据类型，⽽ reactive 则⽤于管理 对象或数组等复杂数据。

```vue
// UserForm.vue
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>⽤户名：</label>
      <input v-model="form.username" placeholder="输⼊⽤户名" />
    </div>
    <div>
      <label>邮箱：</label>
      <input v-model="form.email" placeholder="输⼊邮箱" />
    </div>
    <div>
      <label>密码：</label>
      <input v-model="form.password" type="password" placeholder="输⼊密
        码" />
    </div>
    <button type="submit">注册</button>
  </form>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  // 定义表单数据为⼀个响应式对象
  const form = reactive({
    username: '',
    email: '',
    password: '',
  })
  // 表单提交处理函数
  const submitForm = () => {
    console.log('提交的数据:', form)
    // 假设此处进⾏ API 请求
  }
</script>
```

此处我们使用reactive创建一个响应式表单数据对象form，通过v-model实现数据和表单的双向绑定，即用户驶入自动进入Form中，之后提交表单时调用submitform函数处理。

props ⽤于⽗组件向⼦组件传递数据。在 Vue 3 中，可以使⽤ defineProps 接收传⼊ 的数据，并通过 TypeScript 定义 props 的类型，确保组件的数据结构⼀致。

```vue
// ParentComponent.vue
<template>
  <!-- 传递⽤户信息给 UserProfile ⼦组件 -->
  <UserProfile :user="user" />
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import UserProfile from './UserProfile.vue'; // 确保 UserProfile.vue ⽂件路
  径正确
  // 定义⽗组件中的⽤户数据
  const user = ref({
    name: '李四',
    age: 28,
    email: 'lisi@example.com'
  });
</script>

```

接下来展示父组件传递用户信息：

```vue
// UserProfile.vue
    <template>
      <div class="user-profile">
        <h3>⽤户信息</h3>
        <p>姓名: {{ user.name }}</p>
        <p>年龄: {{ user.age }}</p>
        <p>邮箱: {{ user.email }}</p>
      </div>
    </template>
  <script setup lang="ts">
    // 定义 props 接收⽗组件传递的⽤户数据
    const props = defineProps<{
      user: {
        name: string;
    age: number;
    email: string;
    };
    }>();
  </script>
  <style scoped>
    .user-profile {
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 5px;
      max-width: 300px;
    }
  </style>

```

这里⽗组件通过 ref 定义了⼀个 user 对象，并通过 :user="user" 将该对象作为 props 传递给⼦组件 UserProfile ，⼦组件通过 defineProps 接收⽗组件传递的 user 对 象，并在模板中展示⽤户的姓名、年龄和邮箱信息；



值得注意的是，现在运行会报错

```bash
Cannot find module './UserProfile.vue' or its corresponding type declarations.ts-plugin(2307) 
这个错误是 TypeScript ⽆法识别 .vue ⽂件的类型。
```

我们可在项目根目录下创建一个shims-vue.d.ts 文件：

``` typescript
declare module '*.vue' {
 import { DefineComponent } from 'vue';
 const component: DefineComponent<{}, {}, any>;
 export default component;
}
```

此文件会告诉TypeScript如何处理.vue文件来便面模块解析问题，然后我们便可检查tsconfig.app.json来确保有包含对 .vue ⽂件的⽀持。

```json
"include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
```



## 组件的自定义事件

在 Vue 3 中，⼦组件可以通过⾃定义事件将数据或操作通知⽗组件。使⽤ defineEmits 可以 声明⼦组件触发的事件，⽗组件通过事件监听处理相关逻辑

接下来展示一个子传父示例

```vue
//  EmitParent.vue
<template>
  <UserForm @submit-form="handleSubmit" />
  <p v-if="submittedData">提交的数据：{{ submittedData }}</p>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import UserForm from './UserForm.vue'
  // 存储提交的表单数据
  const submittedData = ref(null)
  // 处理⼦组件传递的数据
  const handleSubmit = (data: any) => {
    submittedData.value = data
  }
</script>
```

```vue
// UserForm.vue
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>⽤户名：</label>
      <input v-model="form.username" placeholder="输⼊⽤户名" />
    </div>
    <div>
      <label>邮箱：</label>
      <input v-model="form.email" placeholder="输⼊邮箱" />
    </div>
    <div>
      <label>密码：</label>
      <input v-model="form.password" type="password" placeholder="输⼊密
        码" />
    </div>
    <button type="submit">注册</button>
  </form>
</template>
<script setup lang="ts">
  import { reactive } from 'vue'
  // 定义表单数据为⼀个响应式对象
  const form = reactive({
    username: '',
    email: '',
    password: '',
  })
  // 定义 emits 事件
  const emit = defineEmits<{ 'submit-form': [any] }>()
    // 表单提交处理函数
    const submitForm = () => {
      // console.log('提交的数据:', form)
      emit('submit-form', form)
    }
</script>
```

此处子组件通过emit('submit-form', form) 触发 submit-form 事件，并将表单数 据传递给⽗组件，父组件件通过 @submit-form="handleSubmit" 监听事件，接收并处理⼦组件传递的数据。

## 组件的生命周期

Vue 3 提供了⼀系列⽣命周期钩⼦，允许开发者在组件的不同阶段执⾏操作。 在 script setup 中，⽣命周期钩⼦如 onMounted 、 onUpdated 、 onUnmounted 等可以直接使⽤。

接下来展示组件挂载时加载数据：

DataFetcher.vue

```vue
<template>
  <div>
    <p v-if="loading">数据加载中...</p>
    <p v-else>加载完成的数据：{{ data }}</p>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  // 定义状态
  const data = ref<string | null>(null)
  const loading = ref(true)
  // 模拟异步请求
  const fetchData = async () => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000)) // 模拟 2 秒延
    迟
    data.value = '加载完成的数据'
    loading.value = false
  }
  // 组件挂载时加载数据
  onMounted(() => {
    console.log('组件挂载，开始加载数据...')
    fetchData()
  })
  // 组件卸载时清理操作
  onUnmounted(() => {
    console.log('组件卸载，清理资源')
  })
</script>

```

这里我们用onMounted 钩⼦在组件挂载后执⾏，⽤于加载异步数据，onUnmounted 钩⼦在组件卸载时执⾏清理操作，如取消订阅或清除计时器。 



## 使用插槽动态渲染模版

Vue 的插槽功能允许⽗组件向⼦组件动态传递内容。Vue 3 ⽀持默认插槽和具名插槽，使组件的 内容更加灵活、可定制
接下来展示一个如何在卡片组件中使用插槽自定义内容：

```vue
// Card.vue
<template>
  <div class="card">
    <header>
      <slot name="header">默认头部</slot>
    </header>
    <main>
      <slot>默认主体内容</slot>
    </main>
    <footer>
      <slot name="footer">默认底部</slot>
    </footer>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 20px;
  }
  header,
  footer {
    background-color: #f5f5f5;
    padding: 10px;
  }
</style>
<template>
  <div class="card">
    <header>
      <slot name="header">默认头部</slot>
    </header>
    <main>
      <slot>默认主体内容</slot>
    </main>
    <footer>
      <slot name="footer">默认底部</slot>
    </footer>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 20px;
  }
  header,
  footer {
    background-color: #f5f5f5;
    padding: 10px;
  }
</style>

```

```vue
// CardParent.vue 
<template>
  <Card>
    <template #header>
      <h3>⾃定义头部</h3>
    </template>
    <p>这是⾃定义的主体内容。</p>
    <template #footer>
      <p>⾃定义的底部信息。</p>
    </template>
  </Card>
</template>
<script setup lang="ts">
  import Card from './Card.vue'
</script>

```

这里我们在Card 组件定义了默认插槽和具名插槽，允许⽗组件定制头部、主体和底部内容，并于⽗组件通过 #header 、 #footer 插槽插⼊⾃定义内容。

## 使用异步组件提升性能

异步组件按需加载，可以显著减少应⽤的⾸屏加载时间，提升性能。Vue 3 提供了 defineAsyn cComponent API，⽤于动态加载组件。当⽤户访问相关⻚⾯时，组件才会加载，这种延迟加载 ⽅式减少了初次加载时的 JavaScript 体积。

接下来展示异步加载大型组件：

假设我们有⼀个⻚⾯，其中包含⼀个较为复杂的图表组件。我们只希望在⽤户点击按钮后才加载该组件，⽽不是在⻚⾯加载时就全部加载。

```vue
<template>
  <div>
    <button @click="loadComponent">加载图表组件</button>
    <!-- 通过 :is 动态加载异步组件 -->
    <component v-if="showComponent" :is="asyncComponent" />
  </div>
</template>
<script setup lang="ts">
  import { ref, defineAsyncComponent } from 'vue'
  // 定义异步组件的加载函数
  const asyncComponent = defineAsyncComponent(() => import('./LargeChart.vu
    e'))
  // 控制是否显示组件
  const showComponent = ref(false)
  // 按需加载组件
  const loadComponent = () => {
    showComponent.value = true // 点击后显示异步组件
  }
</script>
```



```vue
 // LargeChart.vue
<template>
 <div>
 <h2>⼤型图表组件</h2>
 <!-- 这⾥假设有复杂的图表逻辑 -->
 <p>这是⼀个包含⼤量逻辑的⼤型图表组件。</p>
 </div>
</template>
<script setup lang="ts">
// 此组件假设包含复杂逻辑和第三⽅库的引⼊
</script>
```

 





## 在组件中自定义：V-model

Vue 3 ⽀持在组件中⾃定义 v-model ，默认情况下， v-model 绑定到 modelValue 属 性，并通过 update:modelValue 事件更新数据。通过⾃定义 v-model ，可以控制组件内 部的数据绑定⾏为，⽀持多个 v-model 绑定不同的数据字段。 代码示例：表单组件的⾃定义 v-model 我们设计⼀个⾃定义输⼊组件 CustomInput.vue ，允许⽤户在⽗组件中使⽤ v-model 来 双向绑定输⼊内容。

```vue
// CustomInput.vue
<template>
  <div>
    <label>{{ label }}</label>
    <input :value="modelValue" @input="onInputChange" />
  </div>
</template>
<script setup lang="ts">
  // 接收的 props
  const props = defineProps<{
    modelValue: string
      label: string
  }>()
    // 定义 emits，⽤于向⽗组件传递更新事件
    const emit = defineEmits<{
      (e: 'update:modelValue', value: string): void
    }>()
      // 处理输⼊变化
      const onInputChange = (event: Event) => {
        const input = event.target as HTMLInputElement
        emit('update:modelValue', input.value) // 通过 emit 更新⽗组件中的值
      }
</script>
```





```vue
// ParentForm
<template>
 <form>
 <CustomInput v-model="username" label="⽤户名：" />
 <p>输⼊的⽤户名：{{ username }}</p>
 <button type="submit">提交</button>
 </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
// 定义响应式数据
const username = ref('')
</script>

```

这里我们自定义v-model机制，让⼦组件 CustomInput 接收 modelValue 作为 v-model 绑定的值，并通过 update:modelValue 事件通知⽗组件更新数据。然后在⽗组件通过 v-model="username" 实现双向绑定，输⼊框的值会⾃动 更新 username ，⽗组件中任何对 username 的更改也会反映到输⼊框中。

### ElementPlus 样式库练习

先进行准备工作：

安装ElementPlus：

为了在 Vue 3 项⽬中使⽤ ElementPlus 组件库，我们⾸先需要安装该库。

```bash
npm install element-plus --save
```

引入ElementPlus：

安装完 ElementPlus 后，需要在项⽬的⼊⼝⽂件（ main.ts ）中引⼊ ElementPlus 以及其样式。

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引⼊ ElementPlus 的样式⽂件
const app = createApp(App);
app.use(ElementPlus); // 安装 ElementPlus 插件
app.mount('#app');
```

使用ElementPlus 组件

在安装好ElementPlus并引入样式后，就可以在Vue中使用ElementPlus的组件了。接下来通过几个例子演示如何使用ElementPlus的主要组件

### 主要组件的使用练习

练习 1：使⽤ el-button 和 el-input 组件创建简单的登录表单
⽬标：创建⼀个包含⽤户名和密码输⼊框的登录表单，并使⽤ ElementPlus 的 el-button 按 钮提交表单。
步骤：先创建一个LoginForm.vue组件，在使用ElementPlus的el-input 组件创建输入框，使用ElementPlus的el-button组件创建提交按钮

```vue
// LoginForm.vue
<template>
  <el-card class="login-card">
    <h2>登录表单</h2>
    <el-form label-width="80px">
      <el-form-item label="⽤户名">
        <el-input v-model="username" placeholder="请输⼊⽤户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="password"
          placeholder="请输⼊密码"
          type="password"
          ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  // 定义表单的响应式数据
  const username = ref('')
  const password = ref('')
  // 模拟表单提交处理函数
  const submitForm = () => {
    console.log('提交的数据:', {
      username: username.value,
      password: password.value,
    })
  }
</script>
<style scoped>
  .login-card {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }

```

这里我们使用el-input创建用户名和密码输入框，并通过v-model实现双向绑定，并用el-button创建提交按钮，并绑定 click 事件处理提交逻辑。

练习 2：使⽤ el-table 组件创建商品列表和详情对话框

⽬标：创建⼀个商品列表，并在⽤户点击 "查看详情" 按钮时，弹出对话框显示商品的详细信息。
步骤：首先创建一个创建⼀个 ProductList.vue 组件，再使⽤ ElementPlus 的 el-table 组件展示商品列表。

```vue
// ProductList.vue
<template>
  <el-card>
    <h2>商品列表</h2>
    <el-table :data="products">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="showProductDetails(row)"
            >查看详情</el-button
                   >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  import { ElCard, ElTable, ElTableColumn, ElButton } from "element-plus";
  import "element-plus/dist/index.css";
  interface Product {
    name: string;
    price: number;
  }
  const products = ref<Product[]>([
    { name: "商品 A", price: 100 },
    { name: "商品 B", price: 200 },
    { name: "商品 C", price: 300 },
  ]);
  const showProductDetails = (product: Product) => {
    alert(JSON.stringify(product));
  };
</script>
<style scoped>
  .el-card {
    max-width: 800px;
    margin: 20px auto;
  }
</style>
```

这里我们使用el-table组件展示商品列表，其中每个商品都有⼀个 "查看详情" 按钮，当⽤户点击时，弹出商品信息的对话框；



## 本章小结

本章介绍了 Vue 3 中组件相关的核⼼概念，包括组件状态管理、事件处理、⽣命周期、插槽等。 在组件状态管理中，我们学习了 data 和 props 的区别与使⽤。⾃定义事件使得⼦组件可以 通过 $emit 触发⽗组件中的函数，增强了组件间的通信能⼒。在⽣命周期⽅⾯，Vue 提供了多 个钩⼦函数。插槽（slot）使得我们能够动态渲染模板，提供灵活的内容分发机制，⽽异步组件的 使⽤则有效提升了应⽤的性能，尤其适⽤于⼤体积组件的懒加载。同时，还讨论了如何在组件中⾃ 定义 v-model ，使得组件能够实现双向数据绑定的功能。











