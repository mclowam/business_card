export function Footer() {
  return (
    <footer className="border-t border-surface-200/60 bg-surface-100/40 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-surface-500">
        <p>&copy; {new Date().getFullYear()} CardCraft — создай свою карточку за минуту.</p>
      </div>
    </footer>
  )
}
