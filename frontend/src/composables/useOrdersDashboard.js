import { computed, onMounted, ref } from 'vue'
import { fetchOrderManagement, fetchOrders } from '../api/orders'

function normalizeAutoStatus(value) {
  if (!value) return '-'

  const map = {
    Ready: '준비 중',
    Ordered: '주문 완료',
    FAILED: '실패',
    Shipping: '배송 중',
    SHIPPING: '배송 중',
    DELIVERED: '배송 완료',
  }

  return map[value] || value
}

function normalizeOrderStatus(value) {
  if (!value) return '-'

  const map = {
    CREATED: '생성됨',
    PAID: '결제 완료',
    FAILED: '실패',
    CANCELLED: '취소 완료',
    CANCELED: '취소 완료',
  }

  return map[value] || value
}

export function useOrdersDashboard(mode = 'all') {
  const loading = ref(false)
  const error = ref('')
  const rows = ref([])

  const load = async () => {
    loading.value = true
    error.value = ''

    try {
      const [orders, management] = await Promise.all([
        fetchOrders(),
        fetchOrderManagement(),
      ])

      const orderMap = new Map(orders.map((order) => [order.id, order]))

      const merged = management.map((item) => {
        const rawOrder = orderMap.get(item.orderId)

        return {
          orderId: item.orderId,
          autoOrderStatus: item.autoOrderStatus || '-',
          autoOrderStatusLabel: normalizeAutoStatus(item.autoOrderStatus),
          customerName: item.customerName || '-',
          customerPhone: item.customerPhone || '-',
          productName: item.productName || '-',
          overseasMall: item.overseasMall || '-',
          paymentAmount: item.paymentAmount ?? 0,
          margin: item.margin ?? 0,
          status: rawOrder?.status || '-',
          statusLabel: normalizeOrderStatus(rawOrder?.status),
          raw: rawOrder || null,
        }
      })

      rows.value = merged
    } catch (e) {
      error.value = e?.response?.data?.message || '주문 데이터를 불러오지 못했습니다.'
      rows.value = []
    } finally {
      loading.value = false
    }
  }

  const filteredRows = computed(() => {
    if (mode === 'auto') {
      return rows.value.filter((row) => row.status !== 'CANCELLED' && row.status !== 'CANCELED')
    }

    if (mode === 'cancel') {
      return rows.value.filter(
        (row) => row.status === 'CANCELLED' || row.status === 'CANCELED',
      )
    }

    return rows.value
  })

  const stats = computed(() => {
    const source = filteredRows.value

    const orderedCount = source.filter((row) => row.autoOrderStatus === 'Ordered').length
    const failedCount = source.filter((row) => row.autoOrderStatus === 'FAILED').length
    const readyCount = source.filter((row) => row.autoOrderStatus === 'Ready').length
    const shippingCount = source.filter(
      (row) => row.autoOrderStatus === 'Shipping' || row.autoOrderStatus === 'SHIPPING',
    ).length
    const cancelCount = source.filter(
      (row) => row.status === 'CANCELLED' || row.status === 'CANCELED',
    ).length

    if (mode === 'auto') {
      return [
        { label: '자동 주문 전체', value: source.length, tone: 'muted' },
        { label: '자동 주문 실패', value: failedCount, tone: 'danger' },
        { label: '자동 주문 완료', value: orderedCount, tone: 'primary' },
        { label: '주문 준비 중', value: readyCount, tone: 'warning' },
      ]
    }

    if (mode === 'cancel') {
      return [
        { label: '취소/환불 전체', value: source.length, tone: 'muted' },
        { label: '취소 완료', value: cancelCount, tone: 'primary' },
        { label: '자동 주문 실패', value: failedCount, tone: 'danger' },
        { label: '배송 중', value: shippingCount, tone: 'warning' },
      ]
    }

    return [
      { label: '전체 주문', value: source.length, tone: 'muted' },
      { label: '자동 주문 성공', value: orderedCount, tone: 'primary' },
      { label: '자동 주문 실패', value: failedCount, tone: 'danger' },
      { label: '배송 중', value: shippingCount, tone: 'warning' },
    ]
  })

  onMounted(load)

  return {
    loading,
    error,
    rows: filteredRows,
    stats,
    reload: load,
  }
}