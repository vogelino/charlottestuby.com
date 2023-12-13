export const getPageClass = (page: string): string => {
	if (page.startsWith('/work/')) return 'work without-navs'
	if (page.includes('about')) return 'about'
	if (page.includes('press')) return 'press'
	if (page.includes('stuby-and-fischer')) return 'stuby-and-fischer'
	return 'home'
}
