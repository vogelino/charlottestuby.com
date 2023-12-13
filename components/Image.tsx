import NextImage, { ImageProps } from 'next/image'

export const Image = (
	props: Omit<ImageProps, 'alt'> & {
		alt?: string
	}
) => {
	return (
		<NextImage
			{...props}
			className={`${props.className || ''} lazyload`}
			alt={props.alt || ''}
			onLoadingComplete={(img) => {
				if (props.onLoadingComplete) props.onLoadingComplete(img)
				img.classList.add('loaded')
			}}
		/>
	)
}
