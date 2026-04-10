<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const email = ref('')
const nickname = ref('')
const phoneNumber = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const handleSignup = async () => {
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

  if (password.value.length < 8) {
    errorMessage.value = '비밀번호는 8자 이상이어야 해.'
    return
  }

  if (!confirmPassword.value.trim()) {
    errorMessage.value = '비밀번호 확인을 입력해줘.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = '비밀번호가 일치하지 않아.'
    return
  }

  if (!name.value.trim()) {
    errorMessage.value = '이름을 입력해줘.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해줘.'
    return
  }

  if (!nickname.value.trim()) {
    errorMessage.value = '닉네임을 입력해줘.'
    return
  }

  if (!phoneNumber.value.trim()) {
    errorMessage.value = '전화번호를 입력해줘.'
    return
  }

  const phoneRegex = /^010\d{8}$/
  if (!phoneRegex.test(phoneNumber.value)) {
    errorMessage.value = '전화번호는 010으로 시작하는 11자리 숫자만 가능해. 예: 01012345678'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('username', username.value)
    params.append('password', password.value)
    params.append('confirmPassword', confirmPassword.value)
    params.append('name', name.value)
    params.append('email', email.value)
    params.append('nickname', nickname.value)
    params.append('phoneNumber', phoneNumber.value)

    const response = await api.post('/users/signup', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('회원가입 응답:', response)
    successMessage.value = '회원가입이 완료됐어. 로그인 페이지로 이동할게.'

    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (err) {
    console.error('회원가입 실패:', err)

    if (err.response) {
      errorMessage.value = `회원가입 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div style="padding: 40px; max-width: 480px; margin: 0 auto;">
    <h1 style="margin-bottom: 24px;">회원가입</h1>

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
          placeholder="비밀번호는 최소 8자 이상이어야 합니다."
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="confirmPassword" style="display: block; margin-bottom: 8px;">비밀번호 확인</label>
      <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="name" style="display: block; margin-bottom: 8px;">이름</label>
      <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이름을 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="email" style="display: block; margin-bottom: 8px;">이메일</label>
      <input
          id="email"
          v-model="email"
          type="email"
          placeholder="이메일을 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="nickname" style="display: block; margin-bottom: 8px;">닉네임</label>
      <input
          id="nickname"
          v-model="nickname"
          type="text"
          placeholder="닉네임을 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <div style="margin-bottom: 16px;">
      <label for="phoneNumber" style="display: block; margin-bottom: 8px;">전화번호</label>
      <input
          id="phoneNumber"
          v-model="phoneNumber"
          type="text"
          placeholder="01012345678"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <button
        @click="handleSignup"
        style="width: 100%; padding: 12px; cursor: pointer; margin-bottom: 12px;"
    >
      회원가입
    </button>

    <button
        @click="goToLogin"
        style="width: 100%; padding: 12px; cursor: pointer;"
    >
      로그인 하러 가기
    </button>

    <p v-if="errorMessage" style="color: red; margin-top: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-top: 16px;">
      {{ successMessage }}
    </p>
  </div>
</template>