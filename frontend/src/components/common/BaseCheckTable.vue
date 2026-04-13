<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    default: () => [],
  },
  rowKey: {
    type: [String, Function],
    default: 'id',
  },
  selectedKeys: {
    type: Array,
    default: () => [],
  },
  selectAllLabel: {
    type: String,
    default: '전체 선택',
  },
  rowSelectLabel: {
    type: Function,
    default: () => '행 선택',
  },
  emptyText: {
    type: String,
    default: '표시할 데이터가 없습니다.',
  },
})

const emit = defineEmits(['update:selectedKeys'])

function getRowKey(row, index) {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row, index)
  }

  return row?.[props.rowKey] ?? index
}

const rowKeys = computed(() => props.rows.map((row, index) => getRowKey(row, index)))

const allSelected = computed({
  get() {
    return (
      rowKeys.value.length > 0 && rowKeys.value.every((key) => props.selectedKeys.includes(key))
    )
  },
  set(checked) {
    emit('update:selectedKeys', checked ? [...rowKeys.value] : [])
  },
})

function isSelected(key) {
  return props.selectedKeys.includes(key)
}

function toggleRow(key, checked) {
  if (checked) {
    emit('update:selectedKeys', [...new Set([...props.selectedKeys, key])])
    return
  }

  emit(
    'update:selectedKeys',
    props.selectedKeys.filter((selectedKey) => selectedKey !== key),
  )
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
    <table class="w-full min-w-[720px] text-left text-sm">
      <thead class="border-b border-neutral-100 bg-neutral-50 text-xs text-neutral-600">
        <tr>
          <th class="w-12 px-4 py-3 font-medium">
            <input
              v-model="allSelected"
              type="checkbox"
              class="rounded border-neutral-300"
              :aria-label="selectAllLabel"
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 font-medium"
            :class="column.headerClass"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length + 1" class="px-4 py-8 text-center text-neutral-500">
            {{ emptyText }}
          </td>
        </tr>
        <tr
          v-for="(row, index) in rows"
          v-else
          :key="getRowKey(row, index)"
          class="border-b border-neutral-100 last:border-0"
        >
          <td class="px-4 py-4">
            <input
              type="checkbox"
              class="rounded border-neutral-300"
              :checked="isSelected(getRowKey(row, index))"
              :aria-label="rowSelectLabel(row, index)"
              @change="toggleRow(getRowKey(row, index), $event.target.checked)"
            />
          </td>
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-4"
            :class="column.cellClass"
          >
            <slot :name="`cell-${column.key}`" :row="row" :index="index" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
