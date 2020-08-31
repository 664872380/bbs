window.onload = function () {

    let orderNum = document.querySelector(".orderNum");
    orderNum.innerHTML = `订单编号：${orderNumber}`;

    let po = document.cookie;
    let accountNumber = getByKey("accountNumber");

    let name = document.querySelector(".name");
    name.innerHTML = `下单账号：${accountNumber}`
}



let orderNumber = window.location.href.split("?")[1].split("=")[1];


// 查询goodsorder表
axios.get("/infor.do", {
    params: {
        orderNumber: orderNumber
    }
}).then(re => {
    console.log(re.data);
    let data = re.data;
    let table = document.querySelector(".table");
    data.forEach((e, index) => {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        let arr = Object.keys(e);
        arr.forEach((e2, index2) => {
            let td = document.createElement("td");
            td.innerHTML = e[e2];
            tr.appendChild(td)

            if (index2 == arr.length - 1) {
                let td = document.createElement("td");
                td.innerHTML = parseFloat(e.number) * parseFloat(e.price)
                tr.appendChild(td)
            }
        })
    });


}).catch(err => {
    console.log("访问失败");
});



// 查询userorder表
axios.get("/inforUser.do", {
    params: {
        orderNumber: orderNumber
    }
}).then(re => {
    let dateTime=document.querySelector(".dateTime");
    dateTime.innerHTML=`下单时间：${re.data[0].time}`;
    let total=document.querySelector(".total");
    total.innerHTML=`总计：${re.data[0].totalPrice} 元`;


}).catch(err => {
    console.log("访问失败");
});



// 截取字符串
function getByKey(key) {
    let name = key + "=";//"pwd="
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        // "pwd=abc"   "price=12.4"  "name=小王"
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            //"pwd=abc"	   //4       ,  7
            return c.substring(name.length, c.length);
        }
    }
    return null;
}