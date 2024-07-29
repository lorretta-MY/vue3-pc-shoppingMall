import dayjs from 'dayjs'

const helper = {
    // 日期格式化
    dateFormat(date, template = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(date).format(template)
    },
    // 获取url拼接的参数值
    getUrlParams(name) {
        const url = window.location.href.split("?")[1] || "";
        if (!url) return "";
        const theRequest = new Object();
        const params = url.split("&");
        for (let i = 0; i < params.length; i++) {
            const el = params[i].split("=");
            theRequest[el[0]] = el[1];
        }
        return theRequest[name] || "";
    },
    // localStorage 存储
    setLocal(key, value) {
        if (key) {
            try {
                return localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                new Error(error);
            }
            return false;
        }
        new Error("请传入key值");
    },
    // localStorage 获取
    getLocal(key) {
        if (key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (error) {
                new Error(error);
            }
            return false;
        }
        new Error("请传入key值");
    },
    // sessionStorage 存储
    setSession(key, value) {
        if (key) {
            try {
                return sessionStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                new Error(error);
            }
            return false;
        }
        new Error("请传入key值");
    },
    // sessionStorage 获取
    getSession(key) {
        if (key) {
            try {
                return JSON.parse(sessionStorage.getItem(key));
            } catch (error) {
                new Error(error);
            }
            return false;
        }
        new Error("请传入key值");
    },
    userInfo() {
        return JSON.parse(localStorage.getItem("user"))['userInfo'];
    },
    userName() {
        return JSON.parse(localStorage.getItem("user"))['userInfo']['account'];
    },
}

export default helper