# Element-plus Context Menu

## Example

### Normal

```html
<script lang="ts" setup>
  import { ref } from "vue"
  import { ContextMenuOptionProps, ElContextMenu, ElContextMenuItem } from "@/components/ElContextMenu"
  const contextMenuRef = ref<InstanceType<typeof ElContextMenu>>()
  const onLabelClick = (props: ContextMenuOptionProps) => {
    console.log("This is props:", props)
  }
  const onButtonClick = () => {
    contextMenuRef.value?.show()
  }
</script>
<template>
  <el-context-menu ref="contextMenuRef">
    <template #reference>
      <el-button @click="onButtonClick">Click me!</el-button>
    </template>
    <el-context-menu-item label="Label 1" @click="onLabelClick" />
  </el-context-menu>
</template>
```

### With children

```html
<script lang="ts" setup>
  import { ref } from "vue"
  import { ContextMenuOptionProps, ElContextMenu, ElContextMenuItem } from "@/components/ElContextMenu"
  const contextMenuRef = ref<InstanceType<typeof ElContextMenu>>()
  const onLabelClick = (props: ContextMenuOptionProps) => {
    console.log("This is props:", props)
  }
  const onButtonClick = () => {
    contextMenuRef.value?.show()
  }
</script>
<template>
  <el-context-menu ref="contextMenuRef">
    <template #reference>
      <el-button @click="onButtonClick">Click me!</el-button>
    </template>
    <el-context-menu-item label="Label 1">
      <el-context-menu-item label="Label 2" @click="onLabelClick" />
      <el-context-menu-item label="Label 3" @click="onLabelClick" />
    </el-context-menu-item>
  </el-context-menu>
</template>
```

### With v-for

```html
<script lang="ts" setup>
  import { ref } from "vue"
  import { ContextMenuOptionProps, ElContextMenu, ElContextMenuItem } from "@/components/ElContextMenu"
  const contextMenuRef = ref<InstanceType<typeof ElContextMenu>>()
  const onLabelClick = (props: ContextMenuOptionProps) => {
    console.log("This is props:", props)
  }
  const onButtonClick = () => {
    contextMenuRef.value?.show()
  }
  const options = [
    {
      label: "Label a"
    },
    {
      label: "Label b"
    }
  ]
</script>
<template>
  <el-context-menu ref="contextMenuRef">
    <template #reference>
      <el-button @click="onButtonClick">Click me!</el-button>
    </template>
    <el-context-menu-item label="Label 1">
      <el-context-menu-item
        v-for="(option, index) in options"
        :key="index"
        :label="option.label"
        @click="onLabelClick"
      />
    </el-context-menu-item>
  </el-context-menu>
</template>
```

## Props

> No props

## Slots

|      Name | Description                                     | Type | Default |
| --------: | :---------------------------------------------- | :--: | :-----: |
|   default | 放[el-context-menu-item](#el-context-menu-item) |  -   |  null   |
| reference | 放觸發 el-context-menu 的 HTML 元素.            |  -   |  null   |

## Methods

| Name | Description          | Type                                                                            |
| ---- | -------------------- | ------------------------------------------------------------------------------- |
| show | 顯示 el-context-menu | `(inset: { top: string; left: string; bottom: string; right: string;}) => void` |

## el-context-menu-item

### Props

|    Name | Description |   Type    | Default  |
| ------: | :---------- | :-------: | :------: |
|   label | 選單標題    | `String`  | required |
| disable |             | `Boolean` | `false`  |

### Events

|  Name | Description           |       Type        |
| ----: | :-------------------- | :---------------: |
| click | 當 menu-item 被點擊時 | `(props) => void` |

### Methods

> No methods

### Slots

| Name    | Description | Default |
| ------- | ----------- | ------- |
| default | 子選單      | null    |
