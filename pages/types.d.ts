declare module '*.md' {
	export const attributes: Record<string, unknown>
	export const react: React.FC<Record<string, unknown>>
}
