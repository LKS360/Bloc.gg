"use client";

export default function Benefits() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Por que jogar na <span className="text-orange-500">Bloc.gg</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Servidores Otimizados</h3>
            <p className="text-white/70">
              MM 5x5 e Deathmatch com configs focadas em treino real.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Estatísticas Avançadas</h3>
            <p className="text-white/70">
              Dados inspirados em HLTV e Scope.gg para evolução constante.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
            <p className="text-white/70">
              Discord ativo, eventos, campeonatos e suporte próximo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
