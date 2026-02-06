export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <h2 className="text-lg font-semibold">Project not found</h2>
      <p className="text-sm text-muted-foreground">
        The project you are looking for does not exist or you do not have access.
      </p>
    </div>
  )
}
