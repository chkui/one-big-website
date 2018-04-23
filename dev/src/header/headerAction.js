/**
 * 首页项目数Action
 */
export const headerScrollAction = (showType) => ({
    type: 'headerScroll',
    showType: showType
})

/**
 * 首页显示内容
 * @param icon 图标 {img:,color:}
 * @param breadcrumb 导航 {title:,routes[{name,url}]}
 */
export const headerShowAction = (icon, breadcrumb) => {
    return {
        type: 'headerShow',
        icon,
        breadcrumb
    }
}