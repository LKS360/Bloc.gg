export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-gray-100">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-[#5865F2] opacity-20 blur-3xl" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-[#FF7A00] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#FFD54A] opacity-10 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Entre no{" "}
          <span className="bg-gradient-to-r from-[#5865F2] via-[#8A9BFF] to-[#5865F2] bg-clip-text text-transparent">
            Discord
          </span>{" "}
          da Bloc.gg
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-lg mb-10">
          Participe da nossa comunidade oficial, receba atualizações, suporte, eventos, sorteios
          exclusivos e acompanhe seu desempenho nos servidores.
        </p>

        {/* Card principal */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#5865F2] to-[#8A9BFF] opacity-40 blur-md"></div>

          <div className="relative bg-[#0A0C14] border border-white/10 rounded-2xl px-10 py-12 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            {/* Ícone */}
            <div className="flex justify-center mb-6">
              <img
                src="https://cdn.worldvectorlogo.com/logos/discord-6.svg"
                alt="Discord Logo"
                className="w-24 opacity-90"
              />
            </div>

            <h2 className="text-2xl font-bold mb-3">Junte-se ao Servidor Oficial</h2>

            <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8">
              Faça parte da comunidade, reporte bugs, receba suporte da staff e participe de
              eventos exclusivos para membros.
            </p>

            {/* BUTTON */}
            <a
              href="https://discord.gg/zcCNP3wxtn"
              target="_blank"
              className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-[#5865F2] hover:bg-[#6f78ff] transition px-8 py-3 font-semibold shadow-[0_0_25px_rgba(88,101,242,0.8)]"
            >
              Entrar no Discord
            </a>
          </div>
        </div>

        {/* BENEFÍCIOS LIST */}
        <section className="grid md:grid-cols-3 gap-6 mt-14">
          <Benefit icon="🎤" title="Canais de voz">
            Treine mira, jogue mix, encontre parceiros e converse com a comunidade.
          </Benefit>

          <Benefit icon="📢" title="Anúncios e atualizações">
            Receba novidades sobre os servidores, loja VIP e eventos especiais.
          </Benefit>

          <Benefit icon="🎁" title="Sorteios exclusivos">
            Participe de sorteios semanais para membros da comunidade.
          </Benefit>
        </section>
      </main>
    </div>
  );
}

// Components auxiliares
function Benefit({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0E16]/80 p-6 shadow-lg hover:shadow-[#5865F2]/20 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[#C7D2FF] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{children}</p>
    </div>
  );
}
