import { gsap } from 'gsap'

interface PointType {
	x: number
	y: number
}

interface OptionsInputType {
	clipPathElement: SVGPathElement
	pathElement: SVGPathElement
	numPoints: number
	minDuration: number
	maxRadius: number
	minRadius: number
	maxDuration: number
	centerX: number
	centerY: number
}

interface OptionsOutputType extends OptionsInputType {
	tl: gsap.core.Timeline
	points: PointType[]
}

export function createBlob(options: OptionsInputType): OptionsOutputType {
	const points: PointType[] = []
	const clipPath = options.clipPathElement
	const path = options.pathElement
	const slice = (Math.PI * 2) / options.numPoints
	const startAngle = random(Math.PI * 2)

	const tl = gsap.timeline({
		onUpdate: update,
	})

	for (let i = 0; i < options.numPoints; i++) {
		const angle = startAngle + i * slice
		const duration = random(options.minDuration, options.maxDuration)

		const point = {
			x: options.centerX + Math.cos(angle) * options.minRadius,
			y: options.centerY + Math.sin(angle) * options.minRadius,
		}

		const tween = gsap.to(point, duration, {
			x: options.centerX + Math.cos(angle) * options.maxRadius,
			y: options.centerY + Math.sin(angle) * options.maxRadius,
			repeat: -1,
			yoyo: true,
			ease: 'ease.out',
		})

		tl.add(tween, -random(duration))
		points.push(point)
	}

	function update(): void {
		const card = cardinal(points, true, 1)
		path.setAttribute('d', card)
		clipPath.setAttribute('d', card)
	}

	return { ...options, tl, points }
}

function cardinal(data: PointType[], closed: boolean, tension?: number): string {
	if (data.length < 1) return 'M0 0'
	if (tension == null) tension = 1

	const size = data.length - (closed ? 0 : 1)
	let path = 'M' + data[0].x + ' ' + data[0].y + ' C'

	for (let i = 0; i < size; i++) {
		let p0: PointType, p1: PointType, p2: PointType, p3: PointType

		if (closed) {
			p0 = data[(i - 1 + size) % size]
			p1 = data[i]
			p2 = data[(i + 1) % size]
			p3 = data[(i + 2) % size]
		} else {
			p0 = i == 0 ? data[0] : data[i - 1]
			p1 = data[i]
			p2 = data[i + 1]
			p3 = i == size - 1 ? p2 : data[i + 2]
		}

		const x1 = p1.x + ((p2.x - p0.x) / 6) * tension
		const y1 = p1.y + ((p2.y - p0.y) / 6) * tension

		const x2 = p2.x - ((p3.x - p1.x) / 6) * tension
		const y2 = p2.y - ((p3.y - p1.y) / 6) * tension

		path += ' ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + p2.x + ' ' + p2.y
	}

	return closed ? path + 'z' : path
}

function random(min: number, max?: number): number {
	if (!max) {
		max = min
		min = 0
	}
	if (min > max) {
		const tmp = min
		min = max
		max = tmp
	}
	return min + (max - min) * Math.random()
}
