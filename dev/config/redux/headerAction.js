/**
 * 首页项目数Action
 */
export const headerScrollAction = (showType) => ({
    type: 'headerScroll',
    showType: showType
})

/**
 * 头部内容条显示的内容
 * @param icon 头部图标与颜色 {{
 *  img:,
 *  color:
 *  }}
 * @param breadcrumb 导航 {title:,routes[{name,url}]}
 */
export const headerShowAction = (icon, breadcrumb) => {
    return {
        type: 'headerShow',
        icon,
        breadcrumb
    }
}