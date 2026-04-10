<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const nickname = ref('')
const error = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
  } catch (err) {
    console.error('마이페이지 메인 조회 실패:', err)

    if (err.response) {
      error.value = `마이페이지 조회 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goToInfo = () => {
  router.push('/profile/info')
}

const goToEdit = () => {
  router.push('/profile/edit')
}

const goToDelete = () => {
  router.push('/profile/delete')
}

const handleLogout = async () => {
  try {
    await api.post('/users/logout')
    alert('로그아웃됐어.')
    router.push('/login')
  } catch (err) {
    console.error('로그아웃 실패:', err)
    alert('로그아웃 실패')
  }
}
</script>

<template>
  <div style="padding: 40px; max-width: 700px; margin: 0 auto;">
    <h1 style="text-align: center; margin-bottom: 40px;">
      {{ nickname }}님 환영합니다!
    </h1>

    <p v-if="error" style="color: red; margin-bottom: 20px;">
      {{ error }}
    </p>

    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
      <button
          @click="goToInfo"
          style="flex: 1; padding: 18px; cursor: pointer;"
      >
        내 정보
      </button>

      <button
          @click="goToEdit"
          style="flex: 1; padding: 18px; cursor: pointer;"
      >
        정보 수정
      </button>

      <button
          @click="goToDelete"
          style="flex: 1; padding: 18px; cursor: pointer; color: #a33;"
      >
        회원 탈퇴
      </button>
    </div>

    <button
        @click="handleLogout"
        style="width: 100%; padding: 18px; cursor: pointer;"
    >
      로그아웃
    </button>
  </div>
</template>