// packages/runtime-core/src/renderer.ts
function getSequence(arr: number[]): number[] {
    const p = arr.slice() // 拷贝一个数组 p
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
        const arrI = arr[i]
        // 排除等于 0 的情况
        if (arrI !== 0) {
            j = result[result.length - 1]
            // 与最后一项进行比较
            if (arr[j] < arrI) {
                p[i] = j // 最后一项与 p 对应的索引进行对应
                result.push(i)
                continue
            }
            // arrI 比 arr[j] 小，使用二分查找找到后替换它
            // 定义二分查找区间
            u = 0
            v = result.length - 1
            // 开启二分查找
            while (u < v) {
                // 取整得到当前位置
                c = ((u + v) / 2) | 0
                if (arr[result[c]] < arrI) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            // 比较 => 替换
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1]  // 正确的结果
                }
                result[u] = i // 有可能替换会导致结果不正确，需要一个新数组 p 记录正确的结果
            }
        }
    }
    u = result.length
    v = result[u - 1]
    // 倒叙回溯 用 p 覆盖 result 进而找到最终正确的索引
    while (u-- > 0) {
        result[u] = v
        v = p[v]
    }
    return result
}

console.log(getSequence([10, 9, 2, 5, 3, 7, 101, 18]))