<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const email = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const goToLogin = () => {
  router.push('/login')
}

const goToFindId = () => {
  router.push('/find-id')
}

const handleResetPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '아이디를 입력해줘.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해줘.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('email', email.value)

    const response = await api.post('/users/reset-pw', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('비밀번호 찾기 응답:', response)

    const html = typeof response.data === 'string' ? response.data : ''

    if (html.includes('임시 비밀번호가 이메일로 발송되었습니다.')) {
      successMessage.value = '임시 비밀번호가 이메일로 발송됐어.'
      return
    }

    if (html.includes('존재하지') || html.includes('일치하지') || html.includes('찾을 수 없')) {
      errorMessage.value = '아이디와 이메일 정보를 다시 확인해줘.'
      return
    }

    successMessage.value = '비밀번호 재설정 요청이 처리됐어.'
  } catch (err) {
    console.error('비밀번호 찾기 실패:', err)

    if (err.response) {
      errorMessage.value = `비밀번호 찾기 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}
</script>

<template>
  <div style="padding: 40px; max-width: 520px; margin: 0 auto;">
    <h1 style="margin-bottom: 28px; text-align: center;">비밀번호 찾기</h1>

    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px;">아이디</label>
      <input
          v-model="username"
          type="text"
          placeholder="아이디를 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

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
        @click="handleResetPassword"
        style="width: 100%; padding: 14px; cursor: pointer; margin-bottom: 12px;"
    >
      비밀번호 찾기
    </button>

    <div style="display: flex; gap: 12px;">
      <button
          @click="goToLogin"
          style="flex: 1; padding: 14px; cursor: pointer;"
      >
        로그인으로
      </button>

      <button
          @click="goToFindId"
          style="flex: 1; padding: 14px; cursor: pointer;"
      >
        아이디 찾기
      </button>
    </div>

    <p v-if="errorMessage" style="color: red; margin-top: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-top: 16px;">
      {{ successMessage }}
    </p>
  </div>
</template>