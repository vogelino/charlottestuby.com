import NextImage, { ImageProps } from 'next/image'
import { useEffect, useRef } from 'react'

export const Image = (
	props: Omit<ImageProps, 'alt'> & {
		alt?: string
	}
) => {
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		imgRef.current?.classList.remove('loaded')
	}, [])

	return (
		<NextImage
			{...props}
			ref={imgRef}
			className={`${props.className || ''} lazyload loaded`}
			alt={props.alt || ''}
			onLoadingComplete={(img) => {
				if (props.onLoadingComplete) props.onLoadingComplete(img)
				img.classList.add('loaded')
			}}
		/>
	)
}
