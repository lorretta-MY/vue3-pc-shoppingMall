import ImageViewVue from "./ImageView.vue";
import GoodsItemVue from "./GoodsItem.vue";

export const componentsPlugin = {
    install(app){
        app.component('RitaImageView', ImageViewVue)
        app.component('RitaGoodsItem', GoodsItemVue)
    }
}