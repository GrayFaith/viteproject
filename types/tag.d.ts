/**
 * 标签内部的所有属性
 */
export declare type TagProps = {
	/**
	 * 组件的Key,一般情况下用于组件的刷新机制
	 */
	readonly key: string,
	/**
	 * 标签代码,一般以大写字母开头,数字结尾
	 * <br/>
	 * 例如'A000','A001B002C003D099'
	 */
	readonly code: string,
	/**
	 * tag用于展示的名称
	 * <br/>
	 * 例如:'用户维护','部门维护'
	 */
	readonly title: string,
	/**
	 * 组件在src内的路径,不需要增加文件的扩展名
	 * <br/>
	 * 例如:'page/home/index'
	 */
	readonly url: string,
	/**
	 * 菜单栏的图标类型,仅支持i和svg
	 * <br/>
	 * 默认i
	 */
	readonly menuIconType: 'i' | 'svg',
	/**
	 * 菜单栏图标
	 */
	readonly menuIcon: string,
	/**
	 * 标签栏的图标类型,仅支持i和svg
	 * <br/>
	 * 默认i
	 */
	readonly tagIconType: 'i' | 'svg',
	/**
	 * 标签栏的图标
	 */
	readonly tagIcon: string,
	/**
	 * 是否缓存该组件
	 */
	readonly keepAlive: boolean,
	/**
	 * 是否强制刷新已存在的该组件
	 */
	readonly forceFlush: boolean,
	/**
	 * 传递给该组件的参数,可以是任意值,
	 * <br/>
	 * 但一定要确定该组件的definedProps接收了该值
	 */
	readonly params: any,
	/**
	 * 组件的实例
	 */
	readonly component: any
};