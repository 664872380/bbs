window.onload = function () {




    let navLeftUl = document.querySelector(".nav-left-ul");
    axios.get("/getSort.do", {
        params: {

        }
    }).then(re => {
        // console.log(re.data);
        let arr = re.data;
        arr.forEach((e, index) => {
            let li1 = document.createElement("li");
            let li2 = document.createElement("li");
            // console.log(e.sort);
            if (e.sort != null) {
                li1.innerHTML = e.sort;
                navLeftUl.appendChild(li1);
                navLeftUl.appendChild(li2);

            }



        });


        // 列表点击事件
        let lis = document.querySelector(".nav-left-ul").children;
        lis = Array.from(lis);
        // console.log(lis);
        lis.forEach((e, index) => {
            if (index / 2 != 0 || index == 0) {
                let sort = e.innerHTML;
                if (sort == "所有商品") {
                    sort = undefined;
                    // console.log(123);
                }
                e.onclick = function () {
                    // console.log(sort);
                    show(sort)
                    let divstyles = document.querySelectorAll(".divstyle");
                    divstyles.forEach((e1, index1) => {
                        e1.style.display = "none";
                        if (index / 2 == index1) {
                            e1.style.display = "inline"
                        }
                    })

                }
            }
        });

    }).catch(err => {
        console.log("ajax访问失败");
    });


    show();




    // 登录信息显示
    let po = document.cookie;
    let loginBt = document.querySelector(".loginBt");
    let userInfor = document.querySelector(".userInfor");
    if (getByKey("accountNumber")!=null) {
        userInfor.innerHTML = `${getByKey("name")}(${getByKey("accountNumber")}),您好!`;
        loginBt.value = "注销";
        loginBt.addEventListener("click", exit);
    } else {
        console.log(1231211323);
        userInfor.innerHTML = `您好，请登录!`;
        loginBt.value = "登陆";
        loginBt.onclick = function () {
            location.href = "login.html";
        }

        // 如果没有登录则不显示简易购物车
        let bottomShoppingCart=document.querySelector(".bottomShoppingCart");
        bottomShoppingCart.style.display="none";

    }

    function exit() {
        document.cookie = `name=;expires=${new Date(0).toUTCString()}`;
        document.cookie = `accountNumber=;expires=${new Date(0).toUTCString()}`;
        location.href = "user.html";
    
    }




}










// 操作型函数

// 1 显示所有商品框函数
function show(e) {
    axios.get("/userShowGoods.do", {
        params: {
            sort: e
        }
    }).then(re => {
        console.log(re.data);

        // 创建一个显示所有商品的大框
        let divstyleRight = document.createElement("div");
        let right = document.querySelector(".right");


        // 添加装商品的框
        right.innerHTML = "";
        divstyleRight.className = "divstyle";
        right.appendChild(divstyleRight);


        re.data.forEach((e, index) => {
            // 每一个商品的小框
            let goodsBox = document.createElement("div");
            goodsBox.className = "goodsBox";

            // 商品小框的图片
            let img = document.createElement("img");
            img.className = "imgStyle";
            img.src = e.url;
            goodsBox.appendChild(img);

            // 商品内容
            let div1 = document.createElement("div");
            div1.innerHTML = `${e.weight} ${e.name} `;
            let div2 = document.createElement("div");
            div2.innerHTML = `￥${e.price}元/${e.danwei}`;
            let div3 = document.createElement("div");
            div3.innerHTML = `剩余${e.stock}`;

            div1.className = "divName";
            div2.className = "divPrice";
            div3.className = "divStock";

            goodsBox.appendChild(div1);
            goodsBox.appendChild(div2);
            goodsBox.appendChild(div3);


            // 1、鼠标放到商品小口上的事件：添加到购物车、设置数量
            let buydiv = document.createElement("div");
            buydiv.className = "buydiv";
            goodsBox.appendChild(buydiv);


            // 1.1滑动窗口里面的数量选择和加入购物车按钮
            let input = document.createElement("input");
            let bt1 = document.createElement("button");
            let bt2 = document.createElement("button");


            // 1.1.1输入购买数量的框
            input.type = "text";
            input.value = "0";
            input.style.width = 30 + "px";
            input.style.textAlign = "center";
            input.oninput = function () {
                var str = parseInt(input.value);
                var cho = isNaN(str);
                if (cho) {
                    input.value = 0;
                } else {
                    input.value = str;
                }
            }



            // 1.1.2加减购买两按钮
            var totalPricediv = document.createElement("div");
            totalPricediv.className = "totalPricediv";
            bt1.innerHTML = "-";
            bt2.innerHTML = "+";
            bt1.onclick = function () {

                // 点击的数量不能小于0
                var str = parseInt(input.value);
                if (str - 1 < 0) {
                    str = 1;
                }
                input.value = str - 1;
                totalPricediv.innerHTML = "";
                totalPricediv.innerHTML = `总计:${e.price * input.value}元`;
            }

            bt2.onclick = function () {
                // 点击的数量不能大于库存量
                var str = parseInt(input.value);
                if (str > e.stock - 1) {
                    str = e.stock;
                    warnShow("超出库存");
                } else {
                    str = str + 1;
                }
                input.value = str;
                totalPricediv.innerHTML = "";
                totalPricediv.innerHTML = `总计:${e.price * input.value}元`;
            }



            // 1.1.3确认加入购物车
            let addShopCar = document.createElement("div");
            let accountNumber = getByKey("accountNumber");
            addShopCar.className = "addShopCar";
            addShopCar.innerHTML = "加入购物";
            // 1.1.3.1点击按钮将其存入数据库中
            addShopCar.onclick = function () {

                // 确认是否有登陆
                let po = document.cookie;
                if (po && input.value != 0) {
                    axios.get("/addShopCar.do", {
                        params: {
                            accountNumber: accountNumber,
                            goodsName: e.name,
                            goodCode: e.code,
                            price: e.price,
                            number: input.value,
                            weight: e.weight,
                            totalPrice: e.price * input.value
                        }
                    }).then(re => {
                        console.log(re.data);
                        if (re.data.affectedRows == 1) {
                            // 在简易购物车中显示购物信息
                            bottomShoppingCart();

                        }
                        }).catch(err => {
                            console.log("ajax访问失败");
                        });
                }else if(!po){
                    warnShow("请先登录哟！亲！(•ω•)");
                }



            }




            // 1.1.4该商品的总价格



            buydiv.appendChild(bt1);
            buydiv.appendChild(input);
            buydiv.appendChild(bt2);
            buydiv.appendChild(addShopCar);
            buydiv.appendChild(totalPricediv);



            // 1.2鼠标放到商品上的移入移出事件
            var timer1 = null, timer2 = null, num = 220;
            goodsBox.onmouseenter = function () {
                clearInterval(timer2);
                timer1 = setInterval(() => {
                    num -= 5
                    buydiv.style.top = num + "px"
                    if (num < 105) {
                        clearInterval(timer1)

                    }
                }, 5)

            }

            goodsBox.onmouseleave = function () {
                clearInterval(timer1);
                timer2 = setInterval(() => {
                    num += 10
                    buydiv.style.top = num + "px"

                    if (num > 215) {
                        clearInterval(timer2)
                    }
                }, 1)
            }



            divstyleRight.appendChild(goodsBox);
        })






    }).catch(err => {
        console.log("ajax访问失败");
    });












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



        // 购物车信息
        function bottomShoppingCart(){
            let bottomShoppingCart = document.querySelector(".bottomShoppingCart");
            let accountNumber=getByKey("accountNumber");
            console.log(bottomShoppingCart);
            
            // ajax访问购物车信息
            // console.log(accountNumber);
            axios.get("/shoppingCartInfor.do", {
                params: {
                    accountNumber: accountNumber
                }
            }).then(re => {
                let divshowcart = document.createElement("div");
                let divshowcart2 = document.createElement("div");
                let data=re.data[0];
                bottomShoppingCart.innerHTML = "";
                divshowcart.innerHTML = `您一共选了　${data["count(*)"]}　种　　${data["sum(number)"]}　件商品，    金额:￥${parseFloat(data["sum(totalPrice)"]).toFixed(2) }元`;
                divshowcart2.innerHTML="进入购物车";
                divshowcart2.onclick=function(){
                    location.href='shoppingcart.html';
                }
                divshowcart.className="divshowcart";
                divshowcart2.className="divshowcart2";
                bottomShoppingCart.appendChild(divshowcart);
                bottomShoppingCart.appendChild(divshowcart2);
            }).catch(err => {
                console.log("ajax访问失败");
            });
        }
       

        bottomShoppingCart()




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