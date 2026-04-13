<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const username = ref('')
const password = ref('')
const rememberId = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

// OAuth 시작 주소는 게이트웨이(9000) 기준
const OAUTH_BASE_URL = 'http://100.119.201.17:9000'

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

const goToFindId = () => {
  router.push('/find-id')
}

const goToFindPassword = () => {
  router.push('/find-password')
}

const handleGoogleLogin = () => {
  window.location.href = `${OAUTH_BASE_URL}/oauth2/authorization/google`
}

const handleKakaoLogin = () => {
  window.location.href = `${OAUTH_BASE_URL}/oauth2/authorization/kakao`
}

const handleNaverLogin = () => {
  window.location.href = `${OAUTH_BASE_URL}/oauth2/authorization/naver`
}
</script>

<template>
  <div class="login-page">
    <div class="login-shell">
      <section class="brand-panel">
        <div class="brand-shape brand-cube"></div>
        <div class="brand-shape brand-paper"></div>
        <div class="brand-shape brand-line"></div>

        <div class="brand-content">
          <h1 class="brand-copy">
            지금 로그인하고<br />
            소싱 자동화를<br />
            경험하세요
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

          <div class="form-group">
            <input
                id="username"
                v-model="username"
                type="text"
                class="text-input"
                placeholder="아이디를 입력하세요."
            />
          </div>

          <div class="form-group">
            <input
                id="password"
                v-model="password"
                type="password"
                class="text-input"
                placeholder="비밀번호를 입력하세요."
                @keyup.enter="handleLogin"
            />
          </div>

          <label class="remember-row">
            <input v-model="rememberId" type="checkbox" />
            <span>아이디 저장</span>
          </label>

          <button class="primary-btn" @click="handleLogin">
            로그인
          </button>

          <div class="sub-links">
            <button class="text-link-btn" @click="goToSignup">
              회원가입하기
            </button>
            <span class="divider">|</span>
            <button class="text-link-btn" @click="goToFindPassword">
              비밀번호 찾기
            </button>
          </div>

          <div class="sub-links sub-links-second">
            <button class="text-link-btn" @click="goToFindId">
              아이디 찾기
            </button>
          </div>

          <p v-if="errorMessage" class="message error-message">
            {{ errorMessage }}
          </p>

          <p v-if="successMessage" class="message success-message">
            {{ successMessage }}
          </p>

          <div class="sns-section">
            <p class="sns-title">간편 로그인</p>

            <button class="sns-btn kakao-btn" @click="handleKakaoLogin">
              Kakao
            </button>

            <button class="sns-btn google-btn" @click="handleGoogleLogin">
              Google
            </button>

            <button class="sns-btn naver-btn" @click="handleNaverLogin">
              Naver
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.login-shell {
  width: 100%;
  max-width: 1180px;
  min-height: 760px;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  font-size: 62px;
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
  padding: 54px 46px;
}

.form-wrap {
  width: 100%;
  max-width: 460px;
}

.service-title {
  margin: 0 0 42px 0;
  color: #101010;
  font-size: 54px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.form-group {
  margin-bottom: 22px;
}

.text-input {
  width: 100%;
  height: 72px;
  padding: 0 22px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  border-radius: 6px;
  background: #f7f7f7;
  color: #222222;
  font-size: 20px;
  outline: none;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}

.text-input::placeholder {
  color: #b3b3b3;
  font-size: 20px;
}

.text-input:focus {
  border-color: #ff8744;
  background: #ffffff;
}

.remember-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 30px 0;
  color: #222222;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.remember-row input {
  width: 18px;
  height: 18px;
  accent-color: #ff8744;
}

.primary-btn {
  width: 100%;
  height: 66px;
  border: none;
  border-radius: 6px;
  background: #f39a66;
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.18s ease, transform 0.12s ease;
}

.primary-btn:hover {
  background: #ef884b;
}

.primary-btn:active {
  transform: translateY(1px);
}

.sub-links {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.sub-links-second {
  margin-top: 14px;
}

.text-link-btn {
  background: transparent;
  border: none;
  color: #9d9d9d;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.text-link-btn:hover {
  color: #555555;
}

.divider {
  color: #b5b5b5;
  font-size: 18px;
}

.message {
  margin-top: 24px;
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

.sns-section {
  margin-top: 52px;
}

.sns-title {
  margin: 0 0 16px 0;
  color: #222222;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.sns-btn {
  width: 100%;
  height: 66px;
  border-radius: 6px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 14px;
  transition: transform 0.12s ease, filter 0.18s ease;
}

.sns-btn:hover {
  filter: brightness(0.98);
}

.sns-btn:active {
  transform: translateY(1px);
}

.kakao-btn {
  border: none;
  background: #fee500;
  color: #191919;
}

.google-btn {
  border: 1px solid #d8d8d8;
  background: #ffffff;
  color: #202124;
}

.naver-btn {
  border: none;
  background: #03c75a;
  color: #ffffff;
}

@media (max-width: 980px) {
  .login-shell {
    grid-template-columns: 1fr;
    max-width: 700px;
    min-height: auto;
  }

  .brand-panel {
    min-height: 340px;
    padding: 38px 28px;
  }

  .brand-copy {
    font-size: 44px;
  }

  .brand-sub {
    margin-top: 60px;
    font-size: 15px;
  }

  .form-panel {
    padding: 38px 24px 48px 24px;
  }

  .service-title {
    font-size: 42px;
    margin-bottom: 32px;
  }

  .text-input {
    height: 64px;
    font-size: 18px;
  }

  .text-input::placeholder {
    font-size: 18px;
  }

  .primary-btn,
  .sns-btn {
    height: 60px;
    font-size: 19px;
  }

  .text-link-btn {
    font-size: 17px;
  }
}

@media (max-width: 640px) {
  .login-page {
    padding: 0;
  }

  .login-shell {
    min-height: 100vh;
  }

  .brand-panel {
    min-height: 280px;
  }

  .brand-copy {
    font-size: 34px;
  }

  .service-title {
    font-size: 34px;
  }

  .form-panel {
    padding: 28px 18px 40px 18px;
  }

  .sub-links {
    gap: 10px;
  }

  .text-link-btn {
    font-size: 15px;
  }
}
</style>