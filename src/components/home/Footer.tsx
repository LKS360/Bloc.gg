export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05060A] text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Bloc.gg</span>
        <div className="flex gap-4">
          <a href="/servidores">Servidores</a>
          <a href="/loja">VIP</a>
          <a href="/discord">Discord</a>
        </div>
      </div>
    </footer>
  );
}
