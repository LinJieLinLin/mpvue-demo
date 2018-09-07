let CommonFunction = {
    toPage: (argPage = 'index', argType) => {
        if (!argType) {
            wx.navigateTo({
                url: '/pages/' + argPage + '/main'
            })
        }
    },
    formatNumber: (n) => {
        const str = n.toString()
        return str[1] ? str : `0${str}`
    },
    formatTime: (date) => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        const t1 = [year, month, day].map(this.a.formatNumber).join('/')
        const t2 = [hour, minute, second].map(this.a.formatNumber).join(':')
        return `${t1} ${t2}`
    }
}
export default CommonFunction