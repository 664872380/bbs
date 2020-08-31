window.onload = function () {





    show()

    // 登录信息显示
    let po = document.cookie;
    let loginBt = document.querySelector(".loginBt");
    // console.log(po);
    let userInfor = document.querySelector(".userInfor");
    userInfor.className = "userInfor";
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

        // 如果没有登录则不显示简易购物车
        let bottomShoppingCart = document.querySelector(".bottomShoppingCart");
        bottomShoppingCart.style.display = "none";

    }


}



function show() {

    // 获取当前页面是否登录
    var foo = document.cookie;
    var accountNumber = getByKey("accountNumber");
    // 给购物车页面添加已选的商品信息
    var showcarTab = document.querySelector(".showcarTab");
    showcarTab.innerHTML = `<tr>
                                <th style="width:80px">选择</th>
                                <th style="width: 250px;">商品编码</th>
                                <th>商品名字</th>
                                <th>商品规格</th>
                                <th>单价</th>
                                <th style="width: 150px;">数量</th>
                                <th>库存</th>
                                <th>总价</th>
                                <th  style="width: 60px;">　　</th>

                            </tr>`;

    // 如果当前用户登录的执行情况
    if (foo) {
        // 创建全局下的购物车被选中的项数组
        var checkedArr = [];
        var data = null;



        axios.get("/cartshow.do", {
            params: {
                accountNumber: accountNumber
            }
        }).then(re => {
            // 如果购物车为空，则提醒
            data = re.data;
            if (re.data.length == 0) {
                let showcar = document.querySelector(".showcar");
                let backshow = document.createElement("div");
                backshow.innerHTML = "您的购物车空空如也。。";
                backshow.className = "backshow";
                showcar.appendChild(backshow);
            }
            data.forEach((e, index) => {
                // console.log(e);
                let tr = document.createElement('tr');
                let td = document.createElement("td");


                // 添加选项按钮,看用户是否需要购买购物车里面的东西
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                td.appendChild(checkbox);
                tr.appendChild(td);
                var goodsCode = e.goodsCode;

                var times = 0;
                checkbox.onclick = function () {
                    times++;
                    if (times % 2 == 1) {
                        checkedArr.push(goodsCode);
                    } else {
                        remove(goodsCode, checkedArr);
                    }
                    console.log(checkedArr);
                    buttomCartShow(goodsCode, checkedArr, data);
                }


                let objArr = Object.keys(e);
                objArr.forEach((e2, index2) => {

                    let td = document.createElement("td");

                    if (e2 == "totalPrice") {
                        td.className = "totalPrice";
                    }

                    if (e2 == "number") {
                        let bt1 = document.createElement("button");
                        let bt2 = document.createElement("button");
                        let inputNum = document.createElement("input");
                        inputNum.className = "inputNum";
                        inputNum.value = `${data[index][e2]}`;
                        bt1.innerHTML = "-";
                        bt2.innerHTML = "+";
                        var price = parseFloat(e["price"]);
                        let num = parseInt(inputNum.value);
                        if (num > data[index]["stock"]) {
                            inputNum.value = data[index]["stock"];
                        }

                        // 按钮事件
                        bt1.onclick = function () {
                            let num = parseInt(inputNum.value);
                            let totalPrice = document.querySelectorAll(".totalPrice");
                            if (num == 0) {
                                num = 0;
                                warnShow("小主，不能再少了o(╥﹏╥)o");
                            } else {
                                num -= 1;
                            }
                            inputNum.value = num;
                            totalPrice[index].innerHTML = num * data[index]["price"];
                            // buttomCartShow(goodsCode, checkedArr, re.data,inputNum.value);
                            updateNum(accountNumber, inputNum.value, e["goodsCode"], price * (inputNum.value), checkedArr);
                        }

                        bt2.onclick = function () {
                            let num = parseInt(inputNum.value);

                            if (num != data[index]["stock"]) {
                                num += 1;
                                let totalPrice = document.querySelectorAll(".totalPrice");
                                inputNum.value = num;
                                totalPrice[index].innerHTML = num * data[index]["price"];
                            } else {
                                warnShow("库存不足,请手下留情(*^▽^*)")
                            }
                            buttomCartShow(goodsCode, checkedArr, re.data, inputNum.value);


                            updateNum(accountNumber, inputNum.value, e["goodsCode"], price * (inputNum.value), checkedArr);
                        }
                        td.appendChild(bt1);
                        td.appendChild(inputNum);
                        td.appendChild(bt2);
                    } else {
                        td.innerHTML = data[index][e2];
                    }

                    tr.appendChild(td);
                })



                // 添加删除事件
                let td2 = document.createElement("td");
                let deldiv = document.createElement("div");
                deldiv.innerHTML = "删除";
                deldiv.className = "deldiv";
                deldiv.onclick = function () {
                    let boo = confirm("请慎重考虑,亲！");
                    if (boo) {
                        axios.get("/delCartGoods.do", {
                            params: {
                                accountNumber: accountNumber,
                                goodsCode: data[index]["goodsCode"],
                                price: data[index]["price"]
                            }
                        }).then(re => {
                            if (re.data.affectedRows == 1) {
                                show();
                            }
                        }).catch(err => {
                            console.log("ajax访问失败");
                        });
                    }

                }


                td2.appendChild(deldiv);
                tr.appendChild(td2);
                showcarTab.appendChild(tr);

            });



        }).catch(err => {
            console.log("ajax访问失败");
        });
    } else {
        let showcar = document.querySelector(".showcar");
        let backshow = document.createElement("div");
        backshow.innerHTML = "请先登录,谢谢";
        backshow.className = "backshow";
        showcar.appendChild(backshow);
    }


    // 删除购物车中商品的函数
    function del(goodsCode, price) {
        axios.get("/delCartGoods.do", {
            params: {
                accountNumber: accountNumber,
                goodsCode: goodsCode,
                price: price
            }
        }).then(re => {
            if (re.data.affectedRows == 1) {
                // show();
            }
        }).catch(err => {
            console.log("ajax访问失败");
        });

    }


    // 删除数组中某一个元素
    function remove(val, checkedArr) {
        var index = checkedArr.indexOf(val);
        if (index > -1) {
            checkedArr.splice(index, 1);
        }
    }

    // 下方总计的显示函数
    function buttomCartShow(goodsCode, checkedArr, data) {
        let divshowcart = document.querySelector(".divshowcart");
        var arrNumber = 0;
        var arrtotalPrice = 0;
        data.forEach((e, index) => {
            checkedArr.forEach((e1, index1) => {
                if (e["goodsCode"] == e1) {
                    // console.log(e["number"],e["number"]*e["price"]);
                    arrNumber += e["number"];
                    arrtotalPrice += e["totalPrice"];
                }
            })
        })
        // console.log(arrtotalPrice);
        divshowcart.innerHTML = `您选择了${checkedArr.length}种商品,一共${arrNumber}件,总金额￥${arrtotalPrice}元`
    }

    // 点击加减按钮对数据库的操作
    function updateNum(accountNumber, number, goodsCode, totalPrice, checkedArr) {

        axios.get("/updateShoppingcart.do", {
            params: {
                accountNumber: accountNumber,
                number: number,
                goodsCode: goodsCode,
                totalPrice: totalPrice
            }
        }).then(re => {
            // console.log(re.data);
            data = re.data;
            if (re.data.length > 0) {
                console.log(123);
                buttomCartShow(goodsCode, checkedArr, data);
            }
        }).catch(err => {
            console.log("ajax访问失败");
        });

    }




    // 提交订单按钮事件
    let divshowcart2 = document.querySelector(".divshowcart2");
    // var orderNumber=0;
    divshowcart2.onclick = function () {
        let foo = confirm("确定提交订单");
        // 设置提交订单的总金额
        let total = 0;
        if (foo) {
            if (checkedArr != 0) {

                // 添加购物单
                // inforOrder(accountNumber,total);
                axios.get('/inforOrder.do', {
                    params: {
                        accountNumber: accountNumber,
                        totalPrice: total
                    }
                }).then(re => {
                    var orderNumber = re.data[0]["max(orderNumber)"];

                    checkedArr.forEach((e, index) => {
                        data.forEach((e2, index2) => {
                            if (e2["goodsCode"] == e) {
                                total += e2["totalPrice"];
                                del(e, e2["price"]);

                                // 将商品录入到购物单
                                inforGoodsOrder(orderNumber, e2.goodsCode, e2.goodsName, e2.price, e2.number);

                                // 修改商品的库存
                                updateStock(e2.goodsCode, e2.goodsName, e2.number);
                            }
                        })
                    });

                    show();
                    inforOrderTotal(orderNumber, total);


                }).catch(err => {
                    console.log("ajax访问失败");
                });

            } else {
                warnShow("请添加商品到订单");
            }

            let divshowcart = document.querySelector(".divshowcart");
            divshowcart.innerHTML = `亲,快下单吧`;
        }
    }





    // 订单添加到order表事件
    function inforOrderTotal(orderNumber, total) {
        console.log(orderNumber, total);
        axios.get('/inforOrderTotal.do', {
            params: {
                orderNumber: orderNumber,
                totalPrice: total
            }
        }).then(re => {
            console.log(re.data);
        }).catch(err => {
            console.log("ajax访问失败");
        });
    }



    // 修改商品的库存
    function updateStock(code, name, number) {
        axios.get("/changeStock.do", {
            params: {
                code: code,
                name: name,
                number: number
            }
        }).then(re => {
            console.log(re.data);
        }).catch(err => {
            console.log("ajax访问失败");
        });
    }


    // 订单的每一个商品传到已购买商品的表（goodsOrder）里面
    function inforGoodsOrder(orderNumber, goodsCode, goodsName, price, number) {
        axios.get('/inforGoodsOrder.do', {
            params: {
                orderNumber: orderNumber,
                goodsCode: goodsCode,
                goodsName: goodsName,
                price: price,
                number: number
            }
        }).then(re => {
            console.log(re.data);
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





// 警告信息提示框
function warnShow(str) {
    let warnDiv = document.createElement("div");
    let right = document.getElementsByTagName("body")[0];
    var num = 1;
    warnDiv.className = "warnDiv";
    warnDiv.innerHTML = str;
    right.appendChild(warnDiv);
    var timer3 = setInterval(() => {
        warnDiv.style.backgroundColor = `rgba(150, 150, 150, ${num})`;
        warnDiv.style.color = `rgba(0, 0, 0, ${num})`;
        num -= 0.05;
        if (num < 0) {
            clearInterval(timer3);
            warnDiv.remove();
        }
    }, 100)
}


// 退出
function exit() {
    document.cookie = `name=;expires=${new Date(0).toUTCString()}`;
    document.cookie = `accountNumber=;expires=${new Date(0).toUTCString()}`;
    location.href = "shoppingcart.html";

}










