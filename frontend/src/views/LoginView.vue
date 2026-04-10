<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '아이디를 입력해줘.'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = '비밀번호를 입력해줘.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('password', password.value)

    const response = await api.post('/users/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('로그인 응답:', response)
    successMessage.value = '로그인 성공'
    router.push('/')
  } catch (err) {
    console.error('로그인 실패:', err)

    if (err.response) {
      if (err.response.status === 401) {
        errorMessage.value = '아이디 또는 비밀번호가 올바르지 않아.'
      } else {
        errorMessage.value = `로그인 실패 / status: ${err.response.status}`
      }
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}

const goToSignup = () => {
  router.push('/signup')
}
</script>

<template>
  <div style="padding: 40px; max-width: 420px; margin: 0 auto;">
    <h1 style="margin-bottom: 24px;">로그인</h1>

    <div style="margin-bottom: 16px;">
      <label for="username" style="display: block; margin-bottom: 8px;">아이디</label>
      <input
          id="username"
          v-model="username"
          type="text"
          placeholder="아이디를 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="password" style="display: block; margin-bottom: 8px;">비밀번호</label>
      <input
          id="password"
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
          @keyup.enter="handleLogin"
      />
    </div>

    <button
        @click="handleLogin"
        style="width: 100%; padding: 12px; cursor: pointer; margin-bottom: 12px;"
    >
      로그인
    </button>

    <button
        @click="goToSignup"
        style="width: 100%; padding: 12px; cursor: pointer;"
    >
      회원가입 하러 가기
    </button>

    <p v-if="errorMessage" style="color: red; margin-top: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-top: 16px;">
      {{ successMessage }}
    </p>
  </div>
</template>