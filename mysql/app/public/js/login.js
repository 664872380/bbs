window.onload = function () {

    let login = document.querySelector(".login");
    let show = document.querySelector(".show");
    let register = document.querySelector(".register");
    show.style.color = "red";

    // 登录操作
    login.onclick = function () {
        let radioChecked = document.querySelector("input[name='check']:checked");
        let loginSort = radioChecked.value;
        let number = document.querySelector(".number").value;
        let password = document.querySelector(".password").value;
        // 判断输入框是否为空
        if (!number && !password) {
            show.innerHTML = '请输入正确的用户名和密码';
        } else if (!password) {
            show.innerHTML = '密码不能为空';
        } else if (!number) {
            show.innerHTML = '账号不能为空';
        } else {
            axios.post(`/${loginSort}.do`, {
                number: number,
                password: password
            }).then(re => {
                if (re.data.length == 1) {
                    document.cookie=`accountNumber=${re.data[0].accountNumber}`;
                    document.cookie=`name=${re.data[0].name}`;
                    document.cookie=`number=${re.data[0].number}`;

                    location.href = `/public/${loginSort}.html`;
                } else {
                    show.innerHTML = '密码错误,请重新输入'
                }
            }).catch(err => {
                console.log("ajax访问失败");
            });
        }
    }


    // 注册操作
    // register.onclick = function () {
    //     location.href = "/public/register.html"
    // }


    let bigBox=document.querySelector(".big-box");
    var num=1;
    let timer1= setInterval(()=>{
        num-=0.05;
        bigBox.style.backgroundColor=`rgba(220, 220, 220,${num})`;
        console.log(num);
        if(num<0.2){
            // bigBox.style.display="none";
            clearInterval(timer1);
        }
    },50)


}