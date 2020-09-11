import {request} from './request'

export function getDetail(iid){
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url: '/recommend'
    })
}

export class Goods{
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop{
    constructor(shopInfo){
  
        this.goodsCount= shopInfo.cGoods     
        this.logo= shopInfo.shopLogo
        this.sells= shopInfo.cSells     
        this.score= shopInfo.score
        this.fans= shopInfo.cFans
        this.name= shopInfo.name
        
        
    }
  }
  
export class GoodsParam{
    constructor(info,rule){
        this.image= info.images ? info.images[0] : ''
        this.infos= info.set
        this.sizes=rule.tables
    }
}