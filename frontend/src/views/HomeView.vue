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

const goToProfile = () => {
  router.push('/profile')
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
  <div class="home-page">
    <header class="top-nav">
      <div class="logo-mark"></div>

      <nav class="nav-links">
        <button class="nav-link">사용 가이드</button>
        <button class="nav-link">서비스 소개</button>

        <button
            v-if="!isLoggedIn"
            class="nav-login-btn"
            @click="goToLogin"
        >
          로그인
        </button>

        <button
            v-if="isLoggedIn"
            class="nav-login-btn"
            @click="goToProfile"
        >
          마이페이지
        </button>
      </nav>
    </header>

    <main class="hero-section">
      <div class="decor decor-cube"></div>
      <div class="decor decor-paper"></div>

      <div class="hero-content">
        <h1 class="hero-title">AutoSource</h1>
        <p class="hero-subtitle">Sourcing Automation System</p>

        <div class="hero-features">
          <span>자동 상품 소싱</span>
          <span>국내 마켓 자동 업로드</span>
          <span>최고 마진 자동 선택</span>
        </div>

        <div v-if="isLoggedIn" class="status-card">
          <p class="status-label">현재 로그인 상태</p>
          <p class="status-main">{{ nickname }}님, 반가워.</p>
          <p class="status-detail">아이디: {{ username }}</p>
          <p class="status-detail">이메일: {{ email }}</p>

          <div class="status-actions">
            <button class="primary-action" @click="goToProfile">
              마이페이지
            </button>
            <button class="secondary-action" @click="handleLogout">
              로그아웃
            </button>
          </div>
        </div>

        <div v-else class="status-card">
          <p class="status-label"></p>
          <p class="status-main">로그인 후 더 많은 기능을 사용할 수 있습니다.</p>
          <p class="status-detail">소싱 자동화 기능을 사용해보세요!</p>

          <div class="status-actions">
            <button class="primary-action" @click="goToLogin">
              로그인
            </button>
            <button class="secondary-action" @click="goToSignup">
              회원가입
            </button>
          </div>
        </div>

        <div v-if="error" class="error-box">
          {{ error }}
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  height: 100vh;
  background: #f3f3f3;
  overflow: hidden;
}

.top-nav {
  height: 59px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo-mark {
  width: 31px;
  height: 31px;
  border: 2px solid #ffb28a;
  border-radius: 6px;
  transform: rotate(45deg);
  opacity: 0.55;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  border: none;
  background: transparent;
  color: #111111;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.nav-login-btn {
  padding: 5px 18px;
  border: 2px solid #ff5a00;
  background: transparent;
  color: #444444;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
}

.hero-section {
  position: relative;
  height: calc(100vh - 59px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 17px 40px;
  box-sizing: border-box;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 686px;
  text-align: center;
}

.hero-kicker {
  margin: 0 0 6px 0;
  color: #ff6b1a;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.4px;
}

.hero-title {
  margin: 0;
  color: #ff5a00;
  font-size: 63px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -1px;
}

.hero-subtitle {
  margin: 7px 0 35px 0;
  color: #ff7b39;
  font-size: 14px;
  font-weight: 500;
}

.hero-features {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  flex-wrap: wrap;
  margin-bottom: 18px;
  color: #4b5563;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -0.6px;
}

.status-card {
  max-width: 504px;
  margin: 0 auto;
  padding: 21px 20px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid #ececec;
  border-radius: 13px;
  backdrop-filter: blur(4px);
}

.status-label {
  margin: 0 0 7px 0;
  color: #6b7280;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.status-main {
  margin: 0 0 8px 0;
  color: #111827;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.6px;
}

.status-detail {
  margin: 3px 0;
  color: #4b5563;
  font-size: 11px;
  font-weight: 500;
}

.status-actions {
  margin-top: 17px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.primary-action {
  min-width: 119px;
  height: 38px;
  padding: 0 17px;
  border: none;
  border-radius: 6px;
  background: #ff7b39;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.primary-action:hover {
  background: #ee864b;
}

.secondary-action {
  min-width: 119px;
  height: 38px;
  padding: 0 17px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.secondary-action:hover {
  background: #f9fafb;
}

.error-box {
  max-width: 504px;
  margin: 14px auto 0;
  padding: 10px 11px;
  border-radius: 7px;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  color: #d93025;
  font-size: 10px;
  font-weight: 600;
}

.decor {
  position: absolute;
  pointer-events: none;
  opacity: 0.32;
  border: 4px solid #ffbf9e;
}

.decor-cube {
  top: 14px;
  left: -28px;
  width: 200px;
  height: 200px;
  border-radius: 28px;
  transform: rotate(32deg);
}

.decor-paper {
  right: -70px;
  bottom: 40px;
  width: 260px;
  height: 220px;
  border-radius: 28px;
  transform: rotate(24deg) skew(-8deg, -8deg);
}

@media (max-width: 980px) {
  .top-nav {
    padding: 0 20px;
    height: auto;
    min-height: 53px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .nav-links {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .hero-title {
    font-size: 45px;
  }

  .hero-features {
    font-size: 14px;
    gap: 18px;
  }

  .status-main {
    font-size: 17px;
  }
}

@media (max-width: 640px) {
  .top-nav {
    justify-content: center;
    padding: 16px;
  }

  .nav-links {
    justify-content: center;
  }

  .hero-section {
    padding: 24px 16px 48px;
  }

  .hero-title {
    font-size: 34px;
  }

  .hero-features {
    flex-direction: column;
    gap: 10px;
    font-size: 13px;
  }

  .status-card {
    padding: 22px 18px;
  }

  .status-main {
    font-size: 15px;
  }

  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>