
// $copy 全局提示
// import { ElMessage } from 'element-plus'
// window.$vueApp.config.globalProperties.$message = async (text) => {
//     try {
//         await toClipboard(text)
//     } catch (error) {

//     }
// }


// $copy 全局复制
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
window.$vueApp.config.globalProperties.$copy = async (text) => {
    try {
        await toClipboard(text)
        $message.success('复制成功')
    } catch (error) {
        $message.success('复制失败'+error.message)

    }
}