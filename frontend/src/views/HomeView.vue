<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const nickname = ref('')
const email = ref('')
const error = ref('')
const isLoggedIn = ref(false)

onMounted(async () => {
  error.value = ''

  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
    email.value = response.data.email
    isLoggedIn.value = true
  } catch (err) {
    console.error('사용자 정보 확인 실패:', err)
    isLoggedIn.value = false

    if (err.response) {
      if (err.response.status === 401) {
        error.value = ''
      } else {
        error.value = `상태 확인 실패 / status: ${err.response.status}`
      }
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goToLogin = () => {
  router.push('/login')
}

const goToSignup = () => {
  router.push('/signup')
}

const handleLogout = async () => {
  try {
    await api.post('/users/logout')
    alert('로그아웃됐어.')
    isLoggedIn.value = false
    username.value = ''
    nickname.value = ''
    email.value = ''
    router.push('/login')
  } catch (err) {
    console.error('로그아웃 실패:', err)

    if (err.response) {
      alert(`로그아웃 실패 / status: ${err.response.status}`)
    } else {
      alert('서버 연결 실패')
    }
  }
}
</script>

<template>
  <div style="padding: 40px">
    <h1>홈 화면</h1>

    <div v-if="isLoggedIn">
      <p><strong>{{ username }}</strong>님 로그인 상태야.</p>
      <p>닉네임: {{ nickname }}</p>
      <p>이메일: {{ email }}</p>
    </div>

    <div v-else>
      <p>현재 로그인되지 않았어.</p>
    </div>

    <p v-if="error" style="color: red;">
      {{ error }}
    </p>

    <div style="margin-top: 24px;">
      <button
          v-if="!isLoggedIn"
          @click="goToLogin"
          style="padding: 12px; margin-right: 12px; cursor: pointer;"
      >
        로그인
      </button>

      <button
          v-if="!isLoggedIn"
          @click="goToSignup"
          style="padding: 12px; cursor: pointer;"
      >
        회원가입
      </button>

      <button
          v-if="isLoggedIn"
          @click="handleLogout"
          style="padding: 12px; cursor: pointer;"
      >
        로그아웃
      </button>
    </div>
  </div>
</template>