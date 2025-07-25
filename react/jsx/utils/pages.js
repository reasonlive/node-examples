export const getPagesCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}


export const getPostsOnPage = (pagesCount) => {

    let result = []
    for (let i = 0; i < pagesCount; i++) {
        result.push(i + 1)
    }
    return result
}


export const toHumanDate = (value) => {
    return Date.parse(new Date(a[activeSort.field]).toISOString())
}
