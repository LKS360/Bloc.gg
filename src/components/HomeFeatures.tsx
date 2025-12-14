export default function HomeFeatures() {
  const features = [
    {
      title: "Análise de Performance",
      desc: "Acompanhe seu desempenho em partidas e treinos.",
      icon: "📊",
    },
    {
      title: "Treinos Inteligentes",
      desc: "Evolua suas skills com foco no que importa.",
      icon: "🎯",
    },
    {
      title: "Histórico Completo",
      desc: "Veja sua evolução ao longo do tempo.",
      icon: "📈",
    },
    {
      title: "Perfil Steam Integrado",
      desc: "Login seguro e dados direto da Steam.",
      icon: "🎮",
    },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-zinc-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
<section className="bg-zinc-950 py-20 text-center">
  <h2 className="text-3xl font-bold text-white mb-4">
    Pronto para evoluir no CS?
  </h2>
  <p className="text-zinc-400 mb-8">
    Entre no Dashboard e acompanhe sua evolução agora.
  </p>

  <a
    href="/dashboard"
    className="inline-block bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-3 rounded-full transition"
  >
    Acessar Dashboard
  </a>
</section>
