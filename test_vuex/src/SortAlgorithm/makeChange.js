// 找零 1 5 10 20 50 100，怎么找钱最合适？
// 使用动态规划：比如现在需要找5元，先1元1元的给你，发现是给了你5个1元的，就把5个1元的换成一个5元的，结论是慢慢优化出来的；
class Change {
    constructor(changeType) {
        this.changeType = changeType // 找零数组
        this.cache = {}
    }
    makeChange(amount) {
        
        let min = [] // 最少张数的一个数组
        if (!amount) {
            return []
        }
        if (this.cache[amount]) {
            return this.cache[amount]
        }
        // 从1元往上算
        for (let i=0;i<this.changeType.length;i++) {
            // 先找一张试试
            const leftAmount = amount-this.changeType[i]
            let newMin
            if (leftAmount>=0) {
                //只要还剩下没找完，继续找钱
                // 下一步找钱的数组 --- 动态规划
                newMin = this.makeChange(leftAmount)
                console.log('newMin', newMin)
            }
            if (leftAmount>=0 && (newMin.length<min.length-1 || !min.length)) {
                //纠正结果
                min = [this.changeType[i]].concat(newMin)
                console.log('min', min)
            }
        }
        return this.cache[amount] = min
    }
}
const change = new Change([1,5,10,20,50,100])
// console.log(change.makeChange(2))
console.log(change.makeChange(5))
// console.log(change.makeChange(13))
// console.log(change.makeChange(35))

