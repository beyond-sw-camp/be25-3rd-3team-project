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

    // 성공 문구가 있을 때만 성공 처리
    if (html.includes('임시 비밀번호가 이메일로 발송되었습니다.')) {
      successMessage.value = '임시 비밀번호가 이메일로 발송됐어.'
      return
    }

    // 그 외는 실패로 처리
    errorMessage.value = '아이디와 이메일 정보를 다시 확인해줘.'
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
  <div class="findpw-page">
    <div class="findpw-shell">
      <section class="brand-panel">
        <div class="brand-shape brand-cube"></div>
        <div class="brand-shape brand-paper"></div>
        <div class="brand-shape brand-line"></div>

        <div class="brand-content">
          <h1 class="brand-copy">
            임시 비밀번호를<br />
            발급받고<br />
            다시 로그인하세요
          </h1>

          <p class="brand-sub">
            Sourcing Automation System<br />
            - AutoSource
          </p>
        </div>
      </section>

      <section class="form-panel">
        <div class="form-wrap">
          <h2 class="service-title">비밀번호 찾기</h2>
          <p class="form-intro">
            가입한 아이디와 이메일을 입력하면 임시 비밀번호를 발급해줘.
          </p>

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
            <label class="input-label">이메일</label>
            <input
                v-model="email"
                type="email"
                class="text-input"
                placeholder="이메일을 입력하세요."
                @keyup.enter="handleResetPassword"
            />
          </div>

          <button class="primary-btn" @click="handleResetPassword">
            비밀번호 찾기
          </button>

          <div class="sub-links">
            <button class="text-link-btn" @click="goToLogin">
              로그인으로
            </button>
            <span class="divider">|</span>
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
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.findpw-page {
  min-height: 100vh;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.findpw-shell {
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
  font-size: 56px;
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
  margin: 0;
  color: #101010;
  font-size: 50px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
}

.form-intro {
  margin: 10px 0 32px 0;
  color: #7a7a7a;
  font-size: 17px;
  font-weight: 500;
}

.form-group {
  margin-bottom: 22px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  color: #222222;
  font-size: 15px;
  font-weight: 700;
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
  margin-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
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

@media (max-width: 980px) {
  .findpw-shell {
    grid-template-columns: 1fr;
    max-width: 700px;
    min-height: auto;
  }

  .brand-panel {
    min-height: 340px;
    padding: 38px 28px;
  }

  .brand-copy {
    font-size: 40px;
  }

  .brand-sub {
    margin-top: 60px;
    font-size: 15px;
  }

  .form-panel {
    padding: 38px 24px 48px 24px;
  }

  .service-title {
    font-size: 38px;
  }

  .text-input {
    height: 64px;
    font-size: 18px;
  }

  .text-input::placeholder {
    font-size: 18px;
  }

  .primary-btn {
    height: 60px;
    font-size: 19px;
  }

  .text-link-btn {
    font-size: 17px;
  }
}

@media (max-width: 640px) {
  .findpw-page {
    padding: 0;
  }

  .findpw-shell {
    min-height: 100vh;
  }

  .brand-panel {
    min-height: 280px;
  }

  .brand-copy {
    font-size: 32px;
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