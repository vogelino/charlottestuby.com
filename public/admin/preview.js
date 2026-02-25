(function () {
	var styles = [
		'/styles/reset.css',
		'/styles/fonts.css',
		'/styles/animations.css',
		'/styles/common.css',
		'/styles/about.css',
		'/styles/press.css',
		'/styles/work.css',
		'/styles/stubyAndFischer.css',
	];

	function getRenderer() {
		if (window.h) return window.h;
		if (window.DecapCmsDefaultExports && window.DecapCmsDefaultExports.h) {
			return window.DecapCmsDefaultExports.h;
		}
		if (window.NetlifyCmsDefaultExports && window.NetlifyCmsDefaultExports.h) {
			return window.NetlifyCmsDefaultExports.h;
		}
		if (window.React && window.React.createElement) return window.React.createElement;
		return null;
	}

	function getCreateClass() {
		if (window.createClass) return window.createClass;
		if (window.DecapCmsDefaultExports && window.DecapCmsDefaultExports.createClass) {
			return window.DecapCmsDefaultExports.createClass;
		}
		if (window.NetlifyCmsDefaultExports && window.NetlifyCmsDefaultExports.createClass) {
			return window.NetlifyCmsDefaultExports.createClass;
		}
		return function (spec) {
			function PreviewComponent(props) {
				return spec.render.call({ props: props });
			}
			return PreviewComponent;
		};
	}

	function toJS(value) {
		if (value && typeof value.toJS === 'function') return value.toJS();
		if (Array.isArray(value)) return value;
		return [];
	}

	function getIn(entry, path, fallback) {
		var value = entry.getIn(path);
		return value === undefined || value === null ? fallback : value;
	}

	function pageClass(page) {
		if (page.indexOf('/work/') === 0) return 'work without-navs';
		if (page.indexOf('about') >= 0) return 'about';
		if (page.indexOf('press') >= 0) return 'press';
		if (page.indexOf('stuby-and-fischer') >= 0) return 'stuby-and-fischer';
		return 'home';
	}

	function safeHost(url) {
		if (!url) return '';
		try {
			return new URL(url).host;
		} catch (_err) {
			return '';
		}
	}

	function toDisplayDate(value) {
		if (!value) return '';
		try {
			var parsed = new Date(value);
			if (!isNaN(parsed.getTime())) {
				return parsed.toDateString();
			}
		} catch (_err) {
			// Fall back to raw string when value is not parseable.
		}
		return String(value);
	}

	function blobPath() {
		return 'M150 26 C205 26 255 73 270 128 C285 183 258 248 200 270 C142 292 72 282 40 232 C8 182 18 109 62 66 C93 37 121 26 150 26 z';
	}

	function normalizeGridItem(item, lastRow) {
		var startX = typeof item.startX === 'number' ? item.startX : 0;
		var startY = typeof item.startY === 'number' ? item.startY : lastRow;
		return {
			startX: startX,
			startY: startY,
			endX: typeof item.endX === 'number' ? item.endX : startX ? startX + 1 : 0,
			endY: typeof item.endY === 'number' ? item.endY : startY ? startY + 1 : lastRow,
		};
	}

	function isValidGridItem(item) {
		return [item.startX, item.startY, item.endX, item.endY].every(function (value) {
			return typeof value === 'number' && value >= 0;
		});
	}

	function registerPreviewStyles(CMS) {
		if (!CMS || typeof CMS.registerPreviewStyle !== 'function') return;
		styles.forEach(function (stylePath) {
			CMS.registerPreviewStyle(stylePath);
		});
	}

	function renderLayout(h, page, content) {
		var isWork = page.indexOf('/work/') === 0;
		var pageName = page.replace(/^\//, '');

		return h('main', { className: 'website-main ' + pageClass(page) }, [
			!isWork &&
				h('header', { className: 'main-header', key: 'header' }, [
					h('h1', { className: 'main-title', key: 'title' }, [
						h('a', { className: 'logo', href: '#', key: 'link' }, 'Charlotte Stuby'),
					]),
				]),
			h('article', { key: 'article' }, [
				!isWork &&
					h('nav', { role: 'navigation', 'aria-label': 'main-navigation', className: 'main-nav', key: 'nav' }, [
						h('ul', { key: 'list' }, [
							h('li', { className: 'about', key: 'about' }, [
								h('a', { href: '#', className: pageName === 'about' ? 'active' : '' }, h('span', null, 'About')),
							]),
							h('li', { className: 'work', key: 'work' }, [
								h('a', { href: '#', className: pageName === '' ? 'active' : '' }, h('span', null, 'Works')),
							]),
							h('li', { className: 'press', key: 'press' }, [
								h('a', { href: '#', className: pageName === 'press' ? 'active' : '' }, h('span', null, 'Press')),
							]),
							h('li', { className: 'stuby-and-fischer', key: 'sf' }, [
								h(
									'a',
									{ href: '#', className: pageName === 'stuby-and-fischer' ? 'active' : '' },
									[h('span', { className: 'lg', key: 'lg' }, 'Stuby & Fischer'), h('span', { className: 'sm', key: 'sm' }, 'S & F')]
								),
							]),
						]),
					]),
				h('section', { className: 'content', key: 'content' }, content),
			]),
		]);
	}

	function registerTemplates(CMS, h, createClass) {
		var AboutPreview = createClass({
			render: function () {
				var entry = this.props.entry;
				var body = this.props.widgetFor('body');
				var forms = toJS(getIn(entry, ['data', 'forms'], []));
				var title = String(getIn(entry, ['data', 'title'], ''));
				var subtitle = String(getIn(entry, ['data', 'subtitle'], ''));
				var portrait = String(getIn(entry, ['data', 'portrait'], ''));
				var email = String(getIn(entry, ['data', 'email'], ''));
				var emailButtonText = String(getIn(entry, ['data', 'emailButtonText'], ''));
				var instagram = String(getIn(entry, ['data', 'instagramUsername'], ''));
				var instagramButtonText = String(getIn(entry, ['data', 'instagramButtonText'], ''));
				var cvUrl = String(getIn(entry, ['data', 'cv'], ''));
				var cvButtonText = String(getIn(entry, ['data', 'cvButtonText'], ''));

				return renderLayout(h, '/about', [
					h('div', { id: 'about-content', key: 'about-content' }, [
						h('section', { className: 'about-picture', key: 'pic' }, [
							h('div', { className: 'img', key: 'img' }, [
								h('img', { alt: 'Photographic Portrait of Charlotte Stuby', src: portrait, className: 'lazyload loaded' }),
							]),
							h('div', { className: 'about-forms', key: 'forms-wrap' }, [
								h(
									'div',
									{ key: 'forms' },
									forms.map(function (form, idx) {
										return h(
											'span',
											{
												key: 'form-' + idx,
												className: 'about-form floating',
												style: { top: String(form.posY || 0) + 'vh', left: String(form.posX || 0) + 'vw' },
											},
											h('img', { alt: '', src: form.image || '', className: 'lazyload loaded' })
										);
									})
								),
							]),
						]),
						h('section', { className: 'about-content', key: 'content' }, [
							h('h1', { key: 'h1' }, title),
							subtitle ? h('h3', { key: 'h3' }, subtitle) : null,
							h('div', { className: 'about-text', key: 'text' }, body),
							h('div', { className: 'about-buttons', key: 'buttons' }, [
								cvUrl && cvButtonText ? h('a', { className: 'btn', href: cvUrl, target: '__blank', key: 'cv' }, cvButtonText) : null,
								email && emailButtonText ? h('a', { className: 'btn', href: 'mailto:' + email, key: 'mail' }, emailButtonText) : null,
								instagram && instagramButtonText
									? h('a', { className: 'btn', href: 'https://instagram.com/' + instagram, target: '__blank', key: 'ig' }, instagramButtonText)
									: null,
							]),
						]),
					]),
				]);
			},
		});

		var PressPreview = createClass({
			render: function () {
				var entry = this.props.entry;
				var pressList = toJS(getIn(entry, ['data', 'pressList'], []));
				return renderLayout(
					h,
					'/press',
					h(
						'div',
						{ id: 'press-content' },
						h(
							'section',
							{ className: 'press-content' },
							pressList.map(function (item, idx) {
								var target = item.url || item.pdfFile || '#';
								var pathId = 'path-li-' + idx;
								return h('div', { className: 'press-link', key: 'press-' + idx }, [
									h(
										'a',
										{ href: target, target: '__blank', key: 'a' },
										[
											h(
												'svg',
												{
													viewBox: '0 0 300 300',
													xmlns: 'https://www.w3.org/2000/svg',
													version: '1.1',
													className: 'press-link-svg',
													key: 'svg',
													style: {
														stroke: item.color || '#000FFF',
													},
												},
												[
													h('defs', { key: 'defs' }, [
														h('clipPath', { id: pathId, key: 'clip' }, [h('path', { d: blobPath(), key: 'clip-path' })]),
													]),
													h('image', {
														href: item.screenshot || '',
														clipPath: 'url(#' + pathId + ')',
														width: '300',
														height: '300',
														preserveAspectRatio: 'xMinYMin slice',
														className: 'press-link-image',
														key: 'image',
													}),
													h('path', { d: blobPath(), fill: 'transparent', key: 'path' }),
												]
											),
											h('div', { className: 'press-link-content', key: 'content' }, [
												h('h3', { className: 'press-link-date', key: 'date' }, toDisplayDate(item.date)),
												h('h2', { className: 'press-link-title', key: 'title' }, String(item.title || '')),
												h('h4', { className: 'press-link-url', key: 'url' }, safeHost(item.url) || 'PDF'),
											]),
										]
									),
								]);
							})
						)
					)
				);
			},
		});

		var WorkPreview = createClass({
			render: function () {
				var entry = this.props.entry;
				var images = toJS(getIn(entry, ['data', 'images'], []));
				var slug = String(getIn(entry, ['slug'], 'preview-work'));
				var title = String(getIn(entry, ['data', 'title'], ''));
				var subtitle = String(getIn(entry, ['data', 'subtitle'], ''));
				var description = String(getIn(entry, ['data', 'description'], ''));

				return renderLayout(h, '/work/' + slug, [
					h('div', { className: 'work-container ' + slug, id: slug, key: 'work' }, [
						h('div', { className: 'work-head', key: 'head' }, [
							h('h2', { className: 'work-title', key: 'title' }, title),
							h('h3', { className: 'work-subtitle', key: 'subtitle' }, subtitle),
							h('p', { className: 'work-description', key: 'description' }, description),
						]),
						h(
							'ul',
							{ className: 'work-images', key: 'images' },
							images.map(function (image, idx) {
								var style = {};
								if (image.width && image.height) {
									style.aspectRatio = String(image.width) + ' / ' + String(image.height);
								}
								return h('li', { className: 'work-image', key: 'img-' + idx }, [
									h('figure', { key: 'figure' }, [
										h('div', { className: 'work-image-loading-container', style: style, key: 'frame' }, [
											h('img', { alt: image.caption || '', src: image.image || '', className: 'lazyload loaded', key: 'img' }),
										]),
										image.caption ? h('figcaption', { key: 'cap' }, String(image.caption)) : null,
									]),
								]);
							})
						),
					]),
				]);
			},
		});

		var StubyAndFischerPreview = createClass({
			render: function () {
				var entry = this.props.entry;
				var body = this.props.widgetFor('body');
				var projects = toJS(getIn(entry, ['data', 'projects'], []));
				var showPreviewGrid = Boolean(getIn(entry, ['data', 'showPreviewGrid'], false));
				var title = String(getIn(entry, ['data', 'title'], ''));
				var introImage = String(getIn(entry, ['data', 'introImage'], ''));
				var introButtonText = String(getIn(entry, ['data', 'introButtonText'], ''));
				var introButtonLink = String(getIn(entry, ['data', 'introButtonLink'], ''));

				return renderLayout(h, '/stuby-and-fischer', [
					h('div', { className: 'intro', key: 'intro' }, [
						h('section', { className: 'intro-content', key: 'intro-content' }, [
							h('h1', { key: 'title' }, title),
							h('div', { className: 'intro-text', key: 'text' }, body),
							introButtonText && introButtonLink
								? h('div', { className: 'intro-button-container', key: 'btn-wrap' }, [
										h('a', { className: 'btn', href: introButtonLink, key: 'btn' }, introButtonText),
								  ])
								: null,
						]),
						introImage
							? h('section', { className: 'intro-picture', key: 'intro-picture' }, [
									h('img', { alt: '', src: introImage, className: 'lazyload loaded', key: 'img' }),
							  ])
							: null,
					]),
					projects.map(function (project, idx) {
						var rawItems = (project.projetImages || []).concat([
							{
								startX: project.textStartX,
								startY: project.textStartY,
								endX: project.textEndX,
								endY: project.textEndY,
							},
						]);
						var validItems = rawItems.filter(isValidGridItem);
						var initialLastRow = Math.max.apply(
							Math,
							validItems.map(function (item) {
								return item.endY;
							})
						);
						if (!isFinite(initialLastRow)) initialLastRow = 3;

						var normalizedItems = rawItems.map(function (item) {
							return normalizeGridItem(item, initialLastRow);
						});
						var finalLastRow = Math.max.apply(
							Math,
							normalizedItems.map(function (item) {
								return item.endY;
							})
						);
						if (!isFinite(finalLastRow)) finalLastRow = 3;

						var textPos = normalizeGridItem(
							{
								startX: project.textStartX,
								startY: project.textStartY,
								endX: project.textEndX,
								endY: project.textEndY,
							},
							initialLastRow
						);

						return h(
							'section',
							{
								className: 'project',
								key: 'project-' + idx,
								style: { '--height': 'calc(var(--grid-size, 8vmin) * ' + (showPreviewGrid ? finalLastRow : finalLastRow) + ')' },
							},
							[
								h(
									'header',
									{
										className: 'project-text',
										key: 'text',
										style: {
											gridColumnStart: textPos.startX + 1,
											gridRowStart: textPos.startY + 1,
											gridColumnEnd: textPos.endX + 1,
											gridRowEnd: textPos.endY + 1,
										},
									},
									[
										h('h2', { key: 'title' }, String(project.projectTitle || '')),
										h('p', { key: 'desc' }, String(project.projectDescription || '')),
										project.projectButtonText && project.projectButtonLink
											? h('footer', { key: 'footer' }, [
													h('a', { className: 'btn', href: project.projectButtonLink, key: 'btn' }, project.projectButtonText),
											  ])
											: null,
									]
								),
								(project.projetImages || []).map(function (image, imageIdx) {
									var imagePos = normalizeGridItem(image, initialLastRow);
									var aspectratioW = imagePos.endX - imagePos.startX;
									var aspectratioH = imagePos.endY - imagePos.startY;
									var orientation = aspectratioW > aspectratioH ? 'landscape' : 'portrait';
									var aspectratio = orientation === 'portrait' ? aspectratioW / aspectratioH : aspectratioH / aspectratioW;
									var heightInPercent = aspectratio * 100;

								return h(
									'div',
									{
										className: 'project-image',
										key: 'image-' + imageIdx,
											style: {
												position: 'relative',
												gridColumnStart: imagePos.startX + 1,
												gridRowStart: imagePos.startY + 1,
												gridColumnEnd: imagePos.endX + 1,
												gridRowEnd: imagePos.endY + 1,
											'--aspectratio': String(aspectratioW) + '/' + String(aspectratioH),
											paddingBottom: String(heightInPercent) + '%',
											overflow: 'hidden',
										},
									},
									image.projectImage
										? h('img', {
												alt: '',
												src: image.projectImage,
												className: 'lazyload loaded',
												style: {
													position: 'absolute',
													inset: '0',
													width: '100%',
													height: '100%',
													objectFit: 'cover',
												},
										  })
										: null
								);
							}),
						]
					);
				}),
				]);
			},
		});

		CMS.registerPreviewTemplate('about', AboutPreview);
		CMS.registerPreviewTemplate('press', PressPreview);
		CMS.registerPreviewTemplate('work', WorkPreview);
		CMS.registerPreviewTemplate('stuby-and-fischer', StubyAndFischerPreview);
	}

	function init() {
		var CMS = window.CMS;
		var h = getRenderer();
		var createClass = getCreateClass();

		if (!CMS) return;
		registerPreviewStyles(CMS);

		if (!h) {
			console.warn('[admin/preview] No renderer found; custom preview templates were not registered.');
			return;
		}

		registerTemplates(CMS, h, createClass);
	}

	init();
})();
