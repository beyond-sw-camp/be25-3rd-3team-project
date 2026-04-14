<script setup>
import { ref } from 'vue'

const loading = ref(false)
const result = ref(null)
const error = ref(null)

async function pingApi() {
  loading.value = true
  error.value = null
  result.value = null
  try {
    const res = await fetch('/api/health', { headers: { Accept: 'application/json' } })
    const text = await res.text()
    result.value = { ok: res.ok, status: res.status, body: text }
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page">
    <h1>시작하기</h1>
    <p class="lead">
      Vite 개발 서버가 프록시로 백엔드에 요청을 넘깁니다. 백엔드에 <code>/api/health</code> 같은
      엔드포인트를 두면 아래 버튼으로 연동을 확인할 수 있습니다.
    </p>
    <div class="actions">
      <button type="button" class="btn" :disabled="loading" @click="pingApi">
        {{ loading ? '요청 중…' : 'API 연동 테스트' }}
      </button>
    </div>
    <pre v-if="result" class="panel">{{ JSON.stringify(result, null, 2) }}</pre>
    <p v-if="error" class="err">{{ error }}</p>
  </section>
</template>

<style scoped>
.page {
  max-width: 42rem;
}

.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}

.lead code {
  font-size: 0.9em;
}

.actions {
  margin-bottom: 1rem;
}

.btn {
  font: inherit;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--accent-border);
  background: var(--accent-bg);
  color: var(--accent);
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover:not(:disabled) {
  opacity: 0.92;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.panel {
  margin: 0;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--code-bg);
  font-family: var(--mono);
  font-size: 0.85rem;
  overflow-x: auto;
  text-align: left;
}

.err {
  margin: 0.75rem 0 0;
  color: var(--danger);
  font-size: 0.95rem;
}
</style>
