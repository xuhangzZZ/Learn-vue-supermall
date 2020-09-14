export default {
    addCart(context, payload){
        // state.cartList.push(payload);

        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        // for(let item of state.cartList){
        //     if(item.iid === payload.iid){
        //         oldProduct = payload;
        //     }
        // }
        if(oldProduct){
            context.commit('addCounter', oldProduct);
        }
        else{
            payload.count = 1;
            context.commit('addToCart', payload);
        }
        resolve('已添加到购物车');

        })
    }
}