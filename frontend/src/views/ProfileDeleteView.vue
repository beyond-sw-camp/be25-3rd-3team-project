<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const goBack = () => {
  router.push('/profile')
}

const handleDelete = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!password.value.trim()) {
    errorMessage.value = '현재 비밀번호를 입력해줘.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('password', password.value)

    const response = await api.post('/users/delete', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('회원 탈퇴 응답:', response)

    const finalUrl = response?.request?.responseURL || ''

    if (finalUrl.includes('/users/login')) {
      successMessage.value = '회원 탈퇴가 완료됐어.'
      setTimeout(() => {
        router.push('/login')
      }, 800)
      return
    }

    successMessage.value = '회원 탈퇴 요청이 처리됐어.'
    setTimeout(() => {
      router.push('/login')
    }, 800)
  } catch (err) {
    console.error('회원 탈퇴 실패:', err)

    if (err.response) {
      errorMessage.value = `회원 탈퇴 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}
</script>

<template>
  <div style="padding: 40px; max-width: 700px; margin: 0 auto;">
    <button
        @click="goBack"
        style="padding: 12px 18px; cursor: pointer; margin-bottom: 32px;"
    >
      ← 이전 화면
    </button>

    <h1 style="text-align: center; margin-bottom: 32px;">회원 탈퇴</h1>

    <div style="background: #fff4d6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
      <strong>주의사항</strong>
      <p style="margin-top: 12px;">
        회원 탈퇴 시 계정과 관련된 모든 데이터가 삭제되며, 이 작업은 되돌릴 수 없어.
      </p>
    </div>

    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px;">비밀번호 확인</label>
      <input
          v-model="password"
          type="password"
          placeholder="현재 비밀번호를 입력해줘"
          style="width: 100%; padding: 12px; box-sizing: border-box;"
      />
    </div>

    <p v-if="errorMessage" style="color: red; margin-bottom: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-bottom: 16px;">
      {{ successMessage }}
    </p>

    <div style="display: flex; gap: 12px;">
      <button
          @click="handleDelete"
          style="flex: 1; padding: 14px; cursor: pointer; color: white; background: #d33; border: none;"
      >
        탈퇴하기
      </button>

      <button
          @click="goBack"
          style="flex: 1; padding: 14px; cursor: pointer;"
      >
        취소
      </button>
    </div>
  </div>
</template>