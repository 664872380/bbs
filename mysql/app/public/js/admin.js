// 删除商品
function del(id) {
    let r = confirm("确定删除？");
    if (r == true) {
        axios.get("/delGoods.do", {
            params: {
                id: id
            }
        }).then(re => {
            show();
        }).catch(er => {
            console.log("ajax访问失败");
        });
    }
}

// 修改商品
function update(id) {
    let node = document.querySelector(`td[id=${id}]`);
    console.log(node);
}



// 显示所有的商品
function show(e) {
    let goodsTab = document.querySelector(".goodsTab");
    goodsTab.style.borderCollapse = "collapse";
    goodsTab.innerHTML = `<tr style="font-size:18px;">
                    <th>id</th>
                    <th>商品编码</th>
                    <th>商品名称</th>
                    <th>净含量</th>
                    <th>种类</th>
                    <th>库存</th>
                    <th>折扣</th>
                    <th>价格</th>
                    <th>操作</th>
                </tr>`;

    axios.get("/adminShowGoods.do", {
        params: {
            way: e
        }
    }).then(re => {
        console.log(re);
        let arr = re.data;
        arr.forEach((e1, index1) => {
            let tr = document.createElement("tr");
            let objArr = Object.keys(re.data[index1]);
            tr.style.borderBottom = "1px solid black";
            objArr.forEach((e2, index2) => {
                let td = document.createElement("td");
                let str = re.data[index1][e2];
                if (index2 == objArr.length - 1) {
                    td.innerHTML = `${str}元`;
                } else {
                    td.innerHTML = str;
                }

                tr.appendChild(td);
                if (index2 == objArr.length - 1) {
                    let td1 = document.createElement("td");
                    let button1 = document.createElement("button");
                    let button2 = document.createElement("button");
                    let id = e1.id;
                    button1.innerHTML = "修改";
                    button2.innerHTML = "删除";




                    button1.onclick = function () {


                        axios.get("/adminShowGoodsAll.do", {

                        }).then(re => {
                            re.data.forEach((e3, index3) => {
                                upGoods();//打开修改窗口
                                document.querySelector(".code").value = re.data[index1].code;
                                document.querySelector(".shortname").value = re.data[index1].shortname;
                                document.querySelector(".name").value = re.data[index1].name;
                                document.querySelector(".price").value = re.data[index1].price;
                                document.querySelector(".danwei").value = re.data[index1].danwei;
                                document.querySelector(".weight").value = re.data[index1].weight;
                                document.querySelector(".sort").value = re.data[index1].sort;
                                document.querySelector(".discount").value = re.data[index1].discount;
                                document.querySelector(".describe").value = re.data[index1].describe;
                                document.querySelector(".stock").value = re.data[index1].stock;
                                document.querySelector(".url").files[0] = re.data[index1].url;
                                let id=re.data[index1].id;

                                let sureBt=document.querySelector(".sureBt");
                                sureBt.onclick=function(){
                                    sure(id)
                                    location.href = "admin.html";

                                }
                                




                            })

                        }).catch(err => {
                            console.log("访问失败");
                        });




                    }








                    // 绑定匿名函数防止事件未发生就执行，可以传参
                    button2.addEventListener('click', function () { del(id) });


                    button2.style.marginLeft = 5 + "px"
                    td1.appendChild(button1);
                    td1.appendChild(button2);
                    tr.appendChild(td1);
                }
            })
            goodsTab.appendChild(tr);
        })
    }).catch(er => {
        console.log(er);
    })





// 增加商品





}










// 打开新增商品窗口
function addGoods() {
    let addbox = document.querySelector(".addbox");
    addbox.style.display = "block";
    let sureBt=document.querySelector(".sureBt");
    sureBt.onclick=function(){
        sure()
        location.href = "admin.html";

    }
}
// 修改商品窗口
function upGoods() {
    let addbox = document.querySelector(".addbox");
    addbox.style.display = "block";
    let divhead=document.querySelector(".divhead");
    divhead.innerHTML="修改商品";
}


// 新增窗口关闭
function exitbox() {
    let addbox = document.querySelector(".addbox");
    addbox.style.display = "none";
}


// 确定添加商品函数
function sure(id) {
    console.log(id);
    let code = document.querySelector(".code").value;
    let shortname = document.querySelector(".shortname").value;
    let name = document.querySelector(".name").value;
    let price = document.querySelector(".price").value;
    let danwei = document.querySelector(".danwei").value;
    let weight = document.querySelector(".weight").value;
    let sort = document.querySelector(".sort").value;
    let discount = document.querySelector(".discount").value;
    let describe = document.querySelector(".describe").value;
    let stock = document.querySelector(".stock").value;
    let file = document.querySelector(".url").files[0];


    let formData = new FormData();
    formData.append("code", code);
    formData.append("shortname", shortname);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("danwei", danwei);
    formData.append("weight", weight);
    formData.append("sort", sort);
    formData.append("discount", discount);
    formData.append("describe", describe);
    formData.append("stock", stock);
    formData.append("id", id);
    formData.append("uploadFile", file, file.name);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
        }
    };
    axios.post("/uploadFile.do", formData, config)
        .then(r => {
            document.getElementsByClassName("newImg")[0].src = r.data;
            console.log(r.data);
        }).catch(e => {
            console.log(e);
        })

    location.href = "admin.html";

}















// 查询
window.onload = function () {
    let selectBt = document.querySelector(".selectBt");
    selectBt.onclick = function () {
        let selectInput = document.querySelector(".selectInput").value;
        show(selectInput);
    }




    let lis = document.querySelector(".nav-left-ul").children;
    console.log(lis);
    lis = Array.from(lis)
    lis.forEach((e, index) => {
        if (index / 2 != 0 || index == 0) {
            e.onclick = function () {
                if (index == 0) {
                    show();
                }
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





    // 登录信息显示
    let po = document.cookie;
    let loginBt = document.querySelector(".loginBt");
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

        // 如果没有登录则不显示简易购物车
        let bottomShoppingCart = document.querySelector(".bottomShoppingCart");
        bottomShoppingCart.style.display = "none";

    }



    function exit() {
        document.cookie = `name=;expires=${new Date(0).toUTCString()}`;
        document.cookie = `accountNumber=;expires=${new Date(0).toUTCString()}`;
        location.href = "login.html";

    }


















}









