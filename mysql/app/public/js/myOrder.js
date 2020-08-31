window.onload = function () {

    let po = document.cookie;
    let loginBt = document.querySelector(".loginBt");
    let accountNumber = getByKey("accountNumber");


    // console.log(po);
    let userInfor = document.querySelector(".userInfor");
    if (po) {
        userInfor.innerHTML = `${getByKey("name")}(${getByKey("accountNumber")}),您好!`;
        loginBt.value = "注销";
        loginBt.addEventListener("click", exit);
    } else {
        userInfor.innerHTML = `您好，请登录!`;
        loginBt.value = "登陆";
        loginBt.onclick = function () {
            location.href = "login.html";
        }
    }


    show();


























    // 显示订单信息
    function show() {
        let orderShowTab = document.querySelector(".orderShowTab");
        axios.get("/orderShow.do", {
            params: {
                accountNumber: accountNumber
            }
        }).then(re => {
            console.log(re.data);
            if (re.data.length == 0) {
                let orderShow = document.querySelector(".orderShow");
                let backshow = document.createElement("div");
                backshow.innerHTML = "您还没有订单哦，请赶快下单吧";
                backshow.className = "backshow";
                orderShow.appendChild(backshow);
            }
            var dataArr = re.data;
            dataArr.forEach((e, index) => {
                let tr = document.createElement("tr");
                let num = 0;

                // 订单的操作行
                let trbt = document.createElement("tr");
                trbt.className = "trbt";
                let btEnter = document.createElement("button");
                btEnter.innerHTML="查看订单";
                let btDel = document.createElement("button");
                btDel.innerHTML="删除订单";
                trbt.appendChild(btEnter);
                trbt.appendChild(btDel);

                // 查看订单操作
                btEnter.onclick=function (){
                    // location.href="show.html";
                    window.open(`showMyOrder.html?orderNumber=${e.orderNumber}`)
                }

                // 删除订单操作
                btDel.onclick=function(){

                    let foo=confirm("是否删除");
                    if(foo){
                        axios.get("/delOrder.do",{
                            params:{
                                orderNumber:e.orderNumber
                            }
                        }).then(re=>{
                            if(re.data.affectedRows==1){
                                location.href="myOrder.html"
                            }
                        }).catch(err=>{
                            console.log("访问失败");
                        })

                    }
                }



                // 订单的行操作事件
                tr.onclick = function () {
                    console.log(num);
                    if (num % 2 == 1) {
                        trbt.style.display = "none";
                    } else {
                        trbt.style.display = "block";
                    }
                    num++;
                }



                orderShowTab.appendChild(tr);
                orderShowTab.appendChild(trbt);

                // 添加订单编号
                let td1 = document.createElement("td");
                td1.innerHTML = e["orderNumber"];
                tr.appendChild(td1);


                // 添加订单时间
                let td2 = document.createElement("td");
                td2.innerHTML = e.time;
                tr.appendChild(td2);

                // 添加订单金额
                let td3 = document.createElement("td");
                td3.innerHTML = e.totalPrice;
                tr.appendChild(td3);



            });

        }).catch(err => {
            console.log("ajax访问失败");
        });



    }






   





}





























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


// 退出按钮的点击事件
function exit() {
    document.cookie = `name=;expires=${new Date(0).toUTCString()}`;
    document.cookie = `accountNumber=;expires=${new Date(0).toUTCString()}`;
    location.href = "myOrder.html";

}