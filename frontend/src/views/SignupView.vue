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
  <div class="signup-page">
    <div class="signup-shell">
      <section class="brand-panel">
        <div class="brand-shape brand-cube"></div>
        <div class="brand-shape brand-paper"></div>
        <div class="brand-shape brand-line"></div>

        <div class="brand-content">
          <h1 class="brand-copy">
            회원가입하고<br />
            소싱 자동화를<br />
            시작하세요
          </h1>

          <p class="brand-sub">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="form-panel">
        <div class="form-wrap">
          <h2 class="service-title">AutoSource</h2>
          <p class="form-intro">
            필요한 정보를 입력하고 계정을 만들어줘.
          </p>

          <div class="form-grid">
            <div class="form-group">
              <label class="input-label">아이디</label>
              <input
                  v-model="username"
                  type="text"
                  class="text-input"
                  placeholder="아이디를 입력하세요."
              />
            </div>

            <div class="form-group">
              <label class="input-label">이름</label>
              <input
                  v-model="name"
                  type="text"
                  class="text-input"
                  placeholder="이름을 입력하세요."
              />
            </div>

            <div class="form-group">
              <label class="input-label">비밀번호</label>
              <input
                  v-model="password"
                  type="password"
                  class="text-input"
                  placeholder="비밀번호는 최소 8자 이상이어야 합니다."
              />
            </div>

            <div class="form-group">
              <label class="input-label">비밀번호 확인</label>
              <input
                  v-model="confirmPassword"
                  type="password"
                  class="text-input"
                  placeholder="비밀번호를 다시 입력하세요."
              />
            </div>

            <div class="form-group">
              <label class="input-label">이메일</label>
              <input
                  v-model="email"
                  type="email"
                  class="text-input"
                  placeholder="이메일을 입력하세요."
              />
            </div>

            <div class="form-group">
              <label class="input-label">닉네임</label>
              <input
                  v-model="nickname"
                  type="text"
                  class="text-input"
                  placeholder="닉네임을 입력하세요."
              />
            </div>

            <div class="form-group form-group-full">
              <label class="input-label">전화번호</label>
              <input
                  v-model="phoneNumber"
                  type="text"
                  class="text-input"
                  placeholder="01012345678"
              />
            </div>
          </div>

          <button class="primary-btn" @click="handleSignup">
            회원가입
          </button>

          <button class="secondary-btn" @click="goToLogin">
            로그인으로 돌아가기
          </button>

          <p v-if="errorMessage" class="message error-message">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="message success-message">
            {{ successMessage }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.signup-shell {
  width: 100%;
  max-width: 1280px;
  min-height: 860px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  background: #f3f3f3;
  overflow: hidden;
}

.brand-panel {
  position: relative;
  background: #ff8744;
  padding: 54px 34px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
}

.brand-content {
  position: relative;
  z-index: 2;
  margin-top: 20px;
}

.brand-copy {
  margin: 0;
  color: #ffffff;
  font-size: 58px;
  line-height: 1.14;
  font-weight: 800;
  letter-spacing: -1.5px;
  word-break: keep-all;
}

.brand-sub {
  margin-top: 120px;
  color: #fff7f2;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 500;
}

.brand-shape {
  position: absolute;
  opacity: 0.32;
  z-index: 1;
  pointer-events: none;
}

.brand-cube {
  top: 18px;
  right: 92px;
  width: 220px;
  height: 160px;
  border: 4px solid rgba(255, 234, 222, 0.8);
  border-radius: 28px;
  transform: rotate(-32deg);
}

.brand-paper {
  right: -30px;
  bottom: 120px;
  width: 230px;
  height: 230px;
  border: 4px solid rgba(255, 234, 222, 0.7);
  border-radius: 28px;
  transform: rotate(28deg) skew(-8deg, -8deg);
}

.brand-line {
  left: -20px;
  bottom: 26px;
  width: 180px;
  height: 70px;
  border-bottom: 5px solid rgba(255, 234, 222, 0.55);
  border-left: 5px solid transparent;
  border-radius: 10px;
}

.form-panel {
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 46px 40px;
}

.form-wrap {
  width: 100%;
  max-width: 620px;
}

.service-title {
  margin: 0;
  color: #101010;
  font-size: 50px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.form-intro {
  margin: 10px 0 30px 0;
  color: #7a7a7a;
  font-size: 17px;
  font-weight: 500;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 16px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group-full {
  grid-column: 1 / -1;
}

.input-label {
  margin-bottom: 8px;
  color: #222222;
  font-size: 15px;
  font-weight: 700;
}

.text-input {
  width: 100%;
  height: 62px;
  padding: 0 18px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background: #f7f7f7;
  color: #222222;
  font-size: 17px;
  outline: none;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

.text-input::placeholder {
  color: #b3b3b3;
  font-size: 16px;
}

.text-input:focus {
  border-color: #ff8744;
  background: #ffffff;
}

.primary-btn {
  width: 100%;
  height: 62px;
  border: none;
  border-radius: 6px;
  background: #f39a66;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background-color 0.18s ease, transform 0.12s ease;
}

.primary-btn:hover {
  background: #ef884b;
}

.primary-btn:active {
  transform: translateY(1px);
}

.secondary-btn {
  width: 100%;
  height: 62px;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  background: #ffffff;
  color: #444444;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.secondary-btn:hover {
  background: #fafafa;
}

.message {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
}

.error-message {
  background: #fff0f0;
  border: 1px solid #ffcccc;
  color: #d93025;
}

.success-message {
  background: #eefaf0;
  border: 1px solid #cde9d3;
  color: #1a7f37;
}

@media (max-width: 1080px) {
  .signup-shell {
    grid-template-columns: 1fr;
    max-width: 760px;
    min-height: auto;
  }

  .brand-panel {
    min-height: 320px;
    padding: 38px 28px;
  }

  .brand-copy {
    font-size: 42px;
  }

  .brand-sub {
    margin-top: 58px;
    font-size: 15px;
  }

  .form-panel {
    padding: 34px 22px 44px 22px;
  }

  .service-title {
    font-size: 40px;
  }
}

@media (max-width: 720px) {
  .signup-page {
    padding: 0;
  }

  .signup-shell {
    min-height: 100vh;
  }

  .brand-panel {
    min-height: 250px;
  }

  .brand-copy {
    font-size: 34px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .service-title {
    font-size: 34px;
  }

  .text-input,
  .primary-btn,
  .secondary-btn {
    height: 58px;
  }
}
</style>