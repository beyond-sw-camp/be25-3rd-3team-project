<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const email = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const resultId = ref('')

const goToLogin = () => {
  router.push('/login')
}

const goToFindPassword = () => {
  router.push('/find-password')
}

const handleFindId = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  resultId.value = ''

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해줘.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('email', email.value)

    const response = await api.post('/users/find-id', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('아이디 찾기 응답:', response)

    const html = typeof response.data === 'string' ? response.data : ''

    if (html.includes('회원님의 아이디는 [')) {
      const match = html.match(/회원님의 아이디는 \[(.*?)\] 입니다\./)

      if (match && match[1]) {
        resultId.value = match[1]
        successMessage.value = '아이디를 찾았어.'
      } else {
        successMessage.value = '아이디 찾기 요청이 처리됐어.'
      }
      return
    }

    // 백엔드가 넣는 errorMessage는 실제 문구를 그대로 HTML에 렌더링할 가능성이 큼
    if (html.includes('존재하지') || html.includes('찾을 수 없') || html.includes('일치하는')) {
      errorMessage.value = '입력한 이메일로 가입된 아이디를 찾지 못했어.'
      return
    }

    successMessage.value = '아이디 찾기 요청이 처리됐어.'
  } catch (err) {
    console.error('아이디 찾기 실패:', err)

    if (err.response) {
      errorMessage.value = `아이디 찾기 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}
</script>

<template>
  <div style="padding: 40px; max-width: 520px; margin: 0 auto;">
    <h1 style="margin-bottom: 28px; text-align: center;">아이디 찾기</h1>

    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 8px;">이메일</label>
      <input
          v-model="email"
          type="email"
          placeholder="이메일을 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <button
        @click="handleFindId"
        style="width: 100%; padding: 14px; cursor: pointer; margin-bottom: 12px;"
    >
      아이디 찾기
    </button>

    <div style="display: flex; gap: 12px;">
      <button
          @click="goToLogin"
          style="flex: 1; padding: 14px; cursor: pointer;"
      >
        로그인으로
      </button>

      <button
          @click="goToFindPassword"
          style="flex: 1; padding: 14px; cursor: pointer;"
      >
        비밀번호 찾기
      </button>
    </div>

    <p v-if="errorMessage" style="color: red; margin-top: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-top: 16px;">
      {{ successMessage }}
    </p>

    <p v-if="resultId" style="margin-top: 12px;">
      찾은 아이디: <strong>{{ resultId }}</strong>
    </p>
  </div>
</template>