<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const name = ref('')
const nickname = ref('')
const email = ref('')
const phoneNumber = ref('')
const error = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/users/me')
    username.value = response.data.username
    nickname.value = response.data.nickname
    email.value = response.data.email

    if (response.data.name) {
      name.value = response.data.name
    }

    if (response.data.phoneNumber) {
      phoneNumber.value = response.data.phoneNumber
    }
  } catch (err) {
    console.error('내 정보 조회 실패:', err)

    if (err.response) {
      error.value = `내 정보 조회 실패 / status: ${err.response.status}`
    } else {
      error.value = '서버 연결 실패'
    }
  }
})

const goBack = () => {
  router.push('/profile')
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
  <div style="padding: 40px; max-width: 760px; margin: 0 auto;">
    <button
        @click="goBack"
        style="padding: 12px 18px; cursor: pointer; margin-bottom: 32px;"
    >
      ← 이전 화면
    </button>

    <h1 style="text-align: center; margin-bottom: 32px;">내 정보</h1>

    <p v-if="error" style="color: red; margin-bottom: 20px;">
      {{ error }}
    </p>

    <div
        v-if="!error"
        style="background: #f5f5f5; padding: 24px; border-radius: 12px; margin-bottom: 24px;"
    >
      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #ddd;">
        <strong>로그인 ID</strong>
        <span>{{ username }}</span>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #ddd;">
        <strong>사용자명</strong>
        <span>{{ name }}</span>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #ddd;">
        <strong>닉네임</strong>
        <span>{{ nickname }}</span>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #ddd;">
        <strong>이메일</strong>
        <span>{{ email }}</span>
      </div>

      <div style="display: flex; justify-content: space-between; padding: 16px 0;">
        <strong>전화번호</strong>
        <span>{{ phoneNumber }}</span>
      </div>
    </div>

    <div style="display: flex; gap: 12px; margin-bottom: 12px;">
      <button
          @click="goToEdit"
          style="flex: 1; padding: 16px; cursor: pointer;"
      >
        정보 수정
      </button>

      <button
          @click="goToDelete"
          style="flex: 1; padding: 16px; cursor: pointer; color: white; background: #d33; border: none;"
      >
        회원 탈퇴
      </button>
    </div>

    <button
        @click="handleLogout"
        style="width: 100%; padding: 16px; cursor: pointer;"
    >
      로그아웃
    </button>
  </div>
</template>