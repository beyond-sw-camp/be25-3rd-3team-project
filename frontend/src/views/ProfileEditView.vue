<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const nickname = ref('')
const phoneNumber = ref('')
const email = ref('')

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await api.get('/users/me')
    nickname.value = response.data.nickname || ''
    email.value = response.data.email || ''

    // 현재 /users/me 응답에 phoneNumber가 없다면 빈값 유지
    if (response.data.phoneNumber) {
      phoneNumber.value = response.data.phoneNumber
    }
  } catch (err) {
    console.error('수정 화면 초기 데이터 조회 실패:', err)
    errorMessage.value = '회원 정보를 불러오지 못했어.'
  }
})

const goBack = () => {
  router.push('/profile/info')
}

const handleProfileUpdate = async () => {
  errorMessage.value = ''
  successMessage.value = ''

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
    errorMessage.value = '전화번호는 010으로 시작하는 11자리 숫자만 가능해.'
    return
  }

  if (!email.value.trim()) {
    errorMessage.value = '이메일을 입력해줘.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('nickname', nickname.value)
    params.append('phoneNumber', phoneNumber.value)
    params.append('email', email.value)

    const response = await api.post('/users/update', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('프로필 수정 응답:', response)

    // 백엔드 성공 시 redirect:/users/me 이므로 responseURL로 1차 판단
    const finalUrl = response?.request?.responseURL || ''

    if (finalUrl.includes('/users/me')) {
      successMessage.value = '프로필이 수정됐어.'
      setTimeout(() => {
        router.push('/profile/info')
      }, 800)
      return
    }

    // redirect가 안 보여도, 현재 구조에서는 2xx면 일단 성공 가능성이 높음
    successMessage.value = '프로필 수정 요청이 처리됐어.'
    setTimeout(() => {
      router.push('/profile/info')
    }, 800)
  } catch (err) {
    console.error('프로필 수정 실패:', err)

    if (err.response) {
      errorMessage.value = `프로필 수정 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
  }
}

const handlePasswordChange = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!currentPassword.value.trim()) {
    errorMessage.value = '현재 비밀번호를 입력해줘.'
    return
  }

  if (!newPassword.value.trim()) {
    errorMessage.value = '새 비밀번호를 입력해줘.'
    return
  }

  if (newPassword.value.length < 8) {
    errorMessage.value = '새 비밀번호는 최소 8자 이상이어야 해.'
    return
  }

  if (!confirmNewPassword.value.trim()) {
    errorMessage.value = '새 비밀번호 확인을 입력해줘.'
    return
  }

  if (newPassword.value !== confirmNewPassword.value) {
    errorMessage.value = '새 비밀번호가 일치하지 않아.'
    return
  }

  try {
    const params = new URLSearchParams()
    params.append('currentPassword', currentPassword.value)
    params.append('newPassword', newPassword.value)
    params.append('confirmPassword', confirmNewPassword.value)

    const response = await api.post('/users/update/password', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    console.log('비밀번호 변경 응답:', response)

    const html = typeof response.data === 'string' ? response.data : ''

    // 서버 렌더링 HTML 안에 성공/실패 문구가 실제로 포함될 수 있어서
    // 가능한 범위에서 문자열 체크
    if (html.includes('비밀번호가 성공적으로 변경되었습니다.')) {
      successMessage.value = '비밀번호가 변경됐어.'
      currentPassword.value = ''
      newPassword.value = ''
      confirmNewPassword.value = ''
      return
    }

    if (html.includes('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.')) {
      errorMessage.value = '새 비밀번호와 확인 비밀번호가 일치하지 않아.'
      return
    }

    if (html.includes('현재 비밀번호')) {
      errorMessage.value = '현재 비밀번호를 다시 확인해줘.'
      return
    }

    // 현재 백엔드 구조상 성공/실패가 같은 뷰(users/update)로 와서
    // 프론트에서 100% 구분이 어려움
    successMessage.value = '비밀번호 변경 요청을 보냈어. 실제 반영 여부는 다시 로그인해서 확인해줘.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
  } catch (err) {
    console.error('비밀번호 변경 실패:', err)

    if (err.response) {
      errorMessage.value = `비밀번호 변경 실패 / status: ${err.response.status}`
    } else {
      errorMessage.value = '서버 연결 실패'
    }
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

    <h1 style="text-align: center; margin-bottom: 32px;">내 정보 수정</h1>

    <p v-if="errorMessage" style="color: red; margin-bottom: 16px;">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" style="color: green; margin-bottom: 16px;">
      {{ successMessage }}
    </p>

    <div style="background: #f5f5f5; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
      <h2 style="margin-bottom: 20px;">프로필 정보</h2>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">닉네임</label>
        <input
            v-model="nickname"
            type="text"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">전화번호</label>
        <input
            v-model="phoneNumber"
            type="text"
            placeholder="01012345678"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">이메일</label>
        <input
            v-model="email"
            type="email"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <div style="display: flex; gap: 12px;">
        <button
            @click="handleProfileUpdate"
            style="flex: 1; padding: 14px; cursor: pointer;"
        >
          프로필 수정
        </button>

        <button
            @click="goBack"
            style="flex: 1; padding: 14px; cursor: pointer;"
        >
          취소
        </button>
      </div>
    </div>

    <div style="background: #f5f5f5; padding: 24px; border-radius: 12px;">
      <h2 style="margin-bottom: 20px;">비밀번호 변경</h2>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">현재 비밀번호</label>
        <input
            v-model="currentPassword"
            type="password"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">새 비밀번호</label>
        <input
            v-model="newPassword"
            type="password"
            placeholder="최소 8자 이상"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">새 비밀번호 확인</label>
        <input
            v-model="confirmNewPassword"
            type="password"
            style="width: 100%; padding: 12px; box-sizing: border-box;"
        />
      </div>

      <button
          @click="handlePasswordChange"
          style="width: 100%; padding: 14px; cursor: pointer;"
      >
        비밀번호 변경
      </button>
    </div>
  </div>
</template>