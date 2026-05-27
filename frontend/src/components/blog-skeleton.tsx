export const BlogCardSkeleton = () => {
	return (
		<div className="w-full p-4 border-b-1 border-slate-250 pb-5 animate-pulse">
			<div className="flex items-center gap-2 text-xs">
				<div className="h-3 w-20 rounded bg-muted" />
				<div className="h-3 w-3 rounded-full bg-muted" />
				<div className="h-3 w-16 rounded bg-muted" />
			</div>
			<div className="mt-3 h-5 w-3/4 rounded bg-muted" />
			<div className="mt-2 space-y-2">
				<div className="h-4 w-full rounded bg-muted" />
				<div className="h-4 w-5/6 rounded bg-muted" />
			</div>
		</div>
	)
}
