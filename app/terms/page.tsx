import type { Metadata } from 'next'
import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'

export const metadata: Metadata = {
  title: 'CommitPT — Termos e Condições',
  description:
    'Termos e Condições da CommitPT. Regulam o acesso e utilização do website, comunidade, conteúdos e subscrições.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="font-mono text-sm font-medium text-secondary">
              Última atualização: 6 de Julho de 2026
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Termos e Condições
            </h1>
            <p className="leading-7 text-muted-foreground">
              Estes Termos e Condições regulam o acesso e utilização do website, comunidade,
              conteúdos, eventos, serviços digitais e subscrições disponibilizados pela CommitPT. Ao
              utilizar os nossos serviços, o utilizador declara que leu, compreendeu e aceita estes
              termos.
            </p>
          </header>

          <div className="rounded-xl border border-border bg-surface/50 p-5">
            <p className="font-semibold text-foreground">Nota importante</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A CommitPT disponibiliza conteúdos educativos, comunidade, mentorias, eventos e
              recursos relacionados com tecnologia e carreira. Nada do que é disponibilizado
              constitui garantia de emprego, progressão profissional, rendimento, aprovação
              académica ou resultado específico.
            </p>
          </div>

          <article className="space-y-8 leading-7 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                1. Identificação da entidade
              </h2>
              <p>
                O presente website é operado por{' '}
                <strong className="text-foreground">Bruno Moisão</strong>, contactável através do
                email <strong className="text-foreground">brunomoisao@commitpt.com</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Aceitação dos termos</h2>
              <p>
                Ao aceder ao website, aderir à comunidade, subscrever o Commit+ ou utilizar qualquer
                serviço da CommitPT, o utilizador aceita estes Termos e Condições, bem como a
                Política de Privacidade, Política de Cookies e regras internas da comunidade.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Natureza dos serviços</h2>
              <p>
                A CommitPT é uma comunidade educativa e profissional focada em programação,
                engenharia de software, carreira tecnológica, networking, projetos, eventos e
                partilha de conhecimento.
              </p>
              <p>Os serviços podem incluir, entre outros:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>acesso a servidores, canais ou grupos privados;</li>
                <li>conteúdos educativos e materiais de estudo;</li>
                <li>calls, workshops, mentorias, sessões de Q&A e eventos;</li>
                <li>projetos internos, desafios, hackathons ou iniciativas comunitárias;</li>
                <li>
                  oportunidades, referências, sugestões de carreira ou revisão de materiais
                  profissionais.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Ausência de garantias</h2>
              <p>
                A CommitPT não garante que a utilização dos seus serviços resulte em emprego,
                estágio, promoção, aprovação académica, aumento salarial, sucesso em entrevistas,
                crescimento de negócio ou qualquer outro resultado específico.
              </p>
              <p>
                Toda a informação disponibilizada tem finalidade educativa e informativa. O
                utilizador é exclusivamente responsável pelas decisões que toma com base nos
                conteúdos, recomendações, feedback ou interações dentro da comunidade.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Continuidade do serviço</h2>
              <p>
                A CommitPT disponibiliza os seus serviços numa base contínua, mas não assume
                qualquer obrigação de manter, expandir, atualizar ou continuar a disponibilizar a
                plataforma, comunidade, funcionalidades, conteúdos, eventos, mentorias ou qualquer
                outro serviço por um período superior ao ciclo de faturação correspondente à
                subscrição ativa do utilizador.
              </p>
              <p>
                A aquisição de uma subscrição não cria qualquer expectativa ou garantia de
                disponibilidade do serviço para além do período já pago pelo utilizador. A CommitPT
                não assume qualquer compromisso relativamente à continuidade da atividade após o
                termo desse período.
              </p>
              <p>
                Salvo disposição legal imperativa em contrário, a CommitPT reserva-se o direito de
                modificar, suspender, limitar ou descontinuar, total ou parcialmente, qualquer
                serviço, funcionalidade, conteúdo, plano de subscrição ou atividade da comunidade,
                mediante aviso prévio considerado razoável quando tal seja possível.
              </p>
              <p>
                Caso a CommitPT decida cessar definitivamente a prestação dos seus serviços, as
                subscrições ativas manter-se-ão válidas apenas até ao final do respetivo período de
                faturação, não sendo efetuadas novas renovações automáticas, salvo quando a
                legislação aplicável imponha solução diferente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Alteração dos serviços</h2>
              <p>
                A CommitPT pode alterar, adicionar, remover ou substituir funcionalidades,
                benefícios, conteúdos, eventos, mentorias, canais, projetos ou outros elementos dos
                seus serviços por motivos técnicos, operacionais, estratégicos, comerciais ou
                legais.
              </p>
              <p>
                A alteração de funcionalidades ou benefícios não constitui, por si só, incumprimento
                contratual, desde que seja respeitado o período de acesso já pago pelo utilizador e
                os seus direitos legalmente aplicáveis.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Conta de utilizador</h2>
              <p>
                Para aceder a determinados serviços, o utilizador poderá ter de criar conta,
                autenticar-se através de terceiros, aderir ao Discord ou fornecer dados de
                pagamento.
              </p>
              <p>
                O utilizador compromete-se a fornecer informação verdadeira, atualizada e completa,
                sendo responsável por manter a confidencialidade das suas credenciais.
              </p>
              <p>
                A CommitPT pode recusar, suspender ou terminar o acesso de qualquer utilizador que
                viole estes termos, as regras da comunidade, a lei aplicável ou coloque em risco a
                segurança, reputação ou funcionamento da comunidade.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Regras de conduta</h2>
              <p>O utilizador compromete-se a não:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  praticar assédio, ameaças, discriminação, insultos ou comportamento abusivo;
                </li>
                <li>
                  partilhar conteúdo ilegal, ofensivo, fraudulento, difamatório ou prejudicial;
                </li>
                <li>fazer spam, autopromoção abusiva ou recrutamento não autorizado;</li>
                <li>tentar aceder a sistemas, contas, canais ou informação sem autorização;</li>
                <li>
                  copiar, revender, distribuir ou publicar conteúdos exclusivos sem autorização;
                </li>
                <li>
                  prejudicar a segurança, funcionamento ou reputação da CommitPT ou dos seus
                  membros;
                </li>
                <li>
                  usar a comunidade para esquemas, fraude, phishing, malware ou atividades ilícitas.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                9. Moderação e suspensão de acesso
              </h2>
              <p>
                A CommitPT reserva-se o direito de moderar conteúdos, remover mensagens, limitar
                acessos, suspender contas, expulsar membros ou cancelar subscrições quando exista
                violação destes termos, das regras internas ou risco para a comunidade.
              </p>
              <p>
                Em casos graves, a suspensão ou expulsão poderá ocorrer sem aviso prévio e sem
                direito a reembolso, especialmente quando estejam em causa abuso, fraude, assédio,
                violação de propriedade intelectual, ataques à comunidade ou comportamentos de
                má-fé.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                10. Subscrições, pagamentos e faturação
              </h2>
              <p>
                Alguns serviços da CommitPT podem estar sujeitos a pagamento, incluindo subscrições
                mensais, planos premium, eventos pagos ou outros produtos digitais.
              </p>
              <p>
                Os preços, benefícios e condições aplicáveis serão apresentados antes da compra. Os
                pagamentos podem ser processados por plataformas externas, como{' '}
                <strong className="text-foreground">Whop</strong>, estando também sujeitos aos
                respetivos termos.
              </p>
              <p>
                A CommitPT pode alterar preços, funcionalidades ou benefícios dos planos,
                comprometendo-se a comunicar alterações relevantes com antecedência razoável sempre
                que aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                11. Renovação e cancelamento
              </h2>
              <p>
                As subscrições podem renovar automaticamente, salvo indicação em contrário no
                momento da compra ou cancelamento pelo utilizador antes da data de renovação.
              </p>
              <p>
                O utilizador é responsável por gerir ou cancelar a sua subscrição através da
                plataforma de pagamento utilizada ou contactando a CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                12. Direito de livre resolução
              </h2>
              <p>
                Nos termos da legislação aplicável a contratos celebrados à distância, o consumidor
                poderá ter direito a resolver o contrato no prazo de 14 dias, salvo exceções
                legalmente previstas.
              </p>
              <p>
                Quando o serviço digital, conteúdo digital, acesso imediato à comunidade, evento,
                mentoria ou recurso exclusivo seja disponibilizado imediatamente após a compra, o
                utilizador reconhece que poderá perder o direito de livre resolução nos casos
                permitidos por lei, caso tenha dado consentimento expresso para o início imediato da
                execução do serviço.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">13. Política de reembolsos</h2>
              <p>
                Salvo quando obrigatório por lei, pagamentos relativos a conteúdos digitais,
                subscrições, eventos, mentorias, acessos privados ou serviços já disponibilizados
                não são reembolsáveis.
              </p>
              <p>
                A CommitPT poderá, por decisão própria e caso a caso, emitir créditos, extensões de
                acesso ou reembolsos excecionais, sem que tal constitua obrigação futura.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                14. Eventos, calls e mentorias
              </h2>
              <p>
                A CommitPT pode organizar calls, workshops, mentorias, eventos online ou
                presenciais. A participação está sujeita a disponibilidade, regras específicas e
                eventuais alterações de horário, formato, oradores ou conteúdo.
              </p>
              <p>
                A CommitPT não se responsabiliza por impossibilidade de participação causada por
                problemas técnicos, falhas de internet, indisponibilidade do utilizador ou
                plataformas externas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                15. Conteúdos gerados por utilizadores
              </h2>
              <p>
                Os utilizadores podem publicar mensagens, projetos, comentários, feedback, imagens,
                código ou outros materiais dentro da comunidade.
              </p>
              <p>
                O utilizador mantém a titularidade dos seus conteúdos, mas concede à CommitPT uma
                licença não exclusiva, gratuita e limitada para alojar, apresentar, moderar e
                utilizar esses conteúdos no contexto da comunidade e da prestação dos serviços.
              </p>
              <p>
                O utilizador garante que tem direitos sobre o que publica e que os seus conteúdos
                não violam direitos de terceiros, confidencialidade, propriedade intelectual ou
                legislação aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">16. Propriedade intelectual</h2>
              <p>
                Todos os conteúdos, marcas, textos, vídeos, materiais, designs, documentação,
                roadmaps, templates, recursos, logótipos e elementos visuais da CommitPT pertencem à
                CommitPT ou aos respetivos titulares.
              </p>
              <p>
                É proibida a cópia, reprodução, distribuição, revenda, scraping, publicação,
                adaptação ou utilização comercial de conteúdos da CommitPT sem autorização prévia e
                por escrito.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                17. Projetos internos e contribuições
              </h2>
              <p>
                A CommitPT pode permitir que membros participem em projetos internos, open-source,
                design systems, plataformas, websites, bots ou outras iniciativas.
              </p>
              <p>
                Salvo acordo escrito em contrário, qualquer contribuição feita para projetos da
                CommitPT poderá ser utilizada, modificada, distribuída e integrada pela CommitPT,
                sem obrigação de compensação financeira.
              </p>
              <p>
                Quando aplicável, projetos específicos poderão ter licenças próprias, regras de
                contribuição ou acordos adicionais.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                18. Informação profissional e oportunidades
              </h2>
              <p>
                A CommitPT pode partilhar oportunidades de emprego, referências, sugestões de
                carreira, feedback a CVs, preparação para entrevistas ou contactos profissionais.
              </p>
              <p>
                A CommitPT não atua como agência de recrutamento, não garante entrevistas,
                propostas, contratação, remuneração ou qualquer resultado profissional.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                19. Limitação de responsabilidade
              </h2>
              <p>
                Na máxima extensão permitida por lei, a CommitPT não será responsável por danos
                indiretos, perda de oportunidades, perda de dados, perda de rendimento, danos
                reputacionais, decisões profissionais, académicas ou financeiras tomadas pelo
                utilizador com base nos serviços disponibilizados.
              </p>
              <p>
                A responsabilidade total da CommitPT, quando legalmente aplicável, fica limitada ao
                montante efetivamente pago pelo utilizador no ciclo de faturação em curso ou, no
                máximo, nos 3 meses anteriores ao evento que originou a reclamação.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">20. Disponibilidade técnica</h2>
              <p>
                A CommitPT procura manter os serviços disponíveis, mas não garante funcionamento
                contínuo, sem erros, interrupções, falhas técnicas, ataques, manutenção,
                indisponibilidade de plataformas externas ou perda de acesso temporária.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">21. Plataformas externas</h2>
              <p>
                A CommitPT pode depender de plataformas externas, incluindo Discord, Whop, Stripe,
                GitHub, Google, YouTube, Instagram, LinkedIn, TikTok, Zoom ou outras.
              </p>
              <p>
                A CommitPT não controla nem se responsabiliza por falhas, alterações, suspensões,
                políticas, limitações ou decisões dessas plataformas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">22. Dados pessoais</h2>
              <p>
                O tratamento de dados pessoais é regulado pela Política de Privacidade da CommitPT,
                que descreve que dados são recolhidos, para que finalidades, com que fundamento
                legal, durante quanto tempo são conservados e quais os direitos dos titulares dos
                dados.
              </p>
              <p>
                O utilizador pode contactar a CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong> para exercer os seus
                direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade,
                nos termos do RGPD.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">23. Cookies</h2>
              <p>
                O website pode utilizar cookies técnicos, analíticos, funcionais ou de marketing. A
                utilização de cookies não essenciais depende do consentimento do utilizador, nos
                termos descritos na Política de Cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">24. Comunicações</h2>
              <p>
                Ao utilizar os serviços, o utilizador aceita receber comunicações relacionadas com a
                sua conta, subscrição, eventos, alterações aos termos, segurança ou funcionamento da
                comunidade.
              </p>
              <p>
                Comunicações comerciais ou newsletters serão enviadas apenas quando exista
                fundamento legal ou consentimento válido, podendo o utilizador cancelar a subscrição
                quando aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                25. Resolução alternativa de litígios
              </h2>
              <p>
                Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de
                resolução alternativa de litígios de consumo competente, nos termos da legislação
                aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">26. Alterações aos termos</h2>
              <p>
                A CommitPT pode alterar estes Termos e Condições a qualquer momento para refletir
                alterações legais, operacionais, comerciais ou funcionais.
              </p>
              <p>
                A versão atualizada será publicada no website com indicação da data de atualização.
                A continuação da utilização dos serviços após alterações constitui aceitação dos
                novos termos.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">27. Lei aplicável e foro</h2>
              <p>Estes Termos e Condições são regidos pela lei portuguesa.</p>
              <p>
                Em caso de litígio, e sem prejuízo de normas imperativas de proteção do consumidor,
                será competente o foro legalmente aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">28. Contactos</h2>
              <p>
                Para questões relacionadas com estes Termos e Condições, o utilizador pode
                contactar:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Email geral: <strong className="text-foreground">hello@commitpt.com</strong>
                </li>
                <li>
                  Email de suporte: <strong className="text-foreground">hello@commitpt.com</strong>
                </li>
                <li>
                  Email de privacidade:{' '}
                  <strong className="text-foreground">hello@commitpt.com</strong>
                </li>
              </ul>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
