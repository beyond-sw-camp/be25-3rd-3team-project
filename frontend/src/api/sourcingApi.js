/**
 * Sourcing 자동 소싱: Spring POST /sourcing/auto → Python 파이프라인
 * 개발: vite proxy `/sourcing` → API_PROXY_TARGET (기본 8080)
 * Gateway만 쓸 때: VITE_SOURCING_AUTO_PATH=/api/sourcing/auto 등으로 경로만 맞추면 됨.
 */

const autoPath = () => import.meta.env.VITE_SOURCING_AUTO_PATH || '/sourcing/auto'

function authHeaders() {
  const headers = { 'Content-Type': 'application/json' }
  const userId = import.meta.env.VITE_DEV_X_USER_ID
  if (userId != null && String(userId).trim() !== '') {
    headers['X-User-Id'] = String(userId).trim()
  }
  const bearer = import.meta.env.VITE_DEV_AUTHORIZATION
  if (bearer != null && String(bearer).trim() !== '') {
    headers.Authorization = String(bearer).trim()
  }
  return headers
}

/**
 * @param {{ seasons: string[], banned_words?: string[], item_count?: number }} body
 * @returns {Promise<{ ok: boolean, status: number, data: unknown }>}
 */
export async function postSourcingAuto(body) {
  const res = await fetch(autoPath(), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })

  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }

  return { ok: res.ok, status: res.status, data }
}

const uploadPath = () => import.meta.env.VITE_SOURCING_UPLOAD_PATH || '/sourcing/upload'

function rawToSourcingDTO(raw) {
  return {
    url: raw?.url ?? '',
    asin: raw?.asin ?? '',
    title: raw?.title ?? '',
    price: raw?.price ?? null,
    currency: raw?.currency ?? 'USD',
    brand: raw?.brand ?? '',
    url_image: raw?.url_image ?? (raw?.images?.[0] ?? ''),
    images: raw?.images ?? [],
    variation: Array.isArray(raw?.variation)
      ? raw.variation.map((v) => ({
          asin: v?.asin ?? '',
          dimensions: v?.dimensions ?? {},
          price: v?.price ?? null,
          currency: v?.currency ?? 'USD',
          images: v?.images ?? [],
        }))
      : [],
  }
}

export async function postSourcingUpload(rawProduct) {
  const dto = rawToSourcingDTO(rawProduct)
  const res = await fetch(uploadPath(), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dto),
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  return { ok: res.ok, status: res.status, data }
}

function reviewsToCompetition(reviews) {
  const n = Number(reviews)
  if (Number.isNaN(n)) return '—'
  if (n >= 5000) return '상'
  if (n >= 500) return '중'
  return '하'
}

function ratingToTrend(rating) {
  if (rating == null || rating === '') return '—'
  const r = Number(rating)
  if (Number.isNaN(r)) return '—'
  if (r >= 4.2) return '상승'
  if (r >= 3.5) return '보합'
  return '하락'
}

function ratingToScore(rating) {
  if (rating == null || rating === '') return '—'
  const r = Number(rating)
  if (Number.isNaN(r)) return '—'
  return String(Math.min(100, Math.round(r * 20)))
}

/**
 * Python/FastAPI 응답의 keywords·results를 카테고리 테이블 행으로 변환 (1단계 매핑).
 * 리서치 전용 지표(검색량 등)는 API에 없어 '—'로 둔다.
 */
export function mapAutoSourcingToRows(keywords, results, seasons, itemCount) {
  if (!Array.isArray(results)) return []
  const kws = Array.isArray(keywords) ? keywords : []
  const ic = Math.min(10, Math.max(1, Number(itemCount) || 1))
  const sns = Array.isArray(seasons) ? seasons : []

  return results.map((merged, i) => {
    const kw = kws[i] ?? merged?.title ?? merged?.query ?? '—'
    const seasonIdx = Math.floor(i / ic)
    const seasonLabel = sns[seasonIdx] ?? '—'
    const brand = merged?.brand ?? '—'
    const rating = merged?.rating
    const reviews = merged?.reviews_count ?? merged?.reviews

    return {
      keyword: kw,
      type: brand && brand !== '—' ? '브랜드' : '일반',
      brand,
      trend: ratingToTrend(rating),
      vol30: '—',
      volYtd: '—',
      competition: reviewsToCompetition(reviews),
      score: ratingToScore(rating),
      seasonality: seasonLabel,
      trendY: '—',
      raw: merged,
    }
  })
}
