import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

// 封装倒计时
export const useCounDown = () => {
  const time = ref(0)

  let timer = null

  const formTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  const start = (curTime) => {
    // 核心逻辑 每过一秒数字减一
    time.value = curTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  onUnmounted(() => {
    timer && timer.clearInterval(timer)
  })

  return {
    formTime,
    start
  }
}
