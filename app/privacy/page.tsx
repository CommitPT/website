import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CommitPT — Política de Privacidade',
  description:
    'Política de Privacidade da CommitPT. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="font-mono text-sm font-medium text-secondary">
              Última atualização: 11 de Julho de 2026
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Política de Privacidade
            </h1>
            <p className="leading-7 text-muted-foreground">
              A CommitPT compromete-se a proteger a privacidade dos seus utilizadores. Esta Política
              de Privacidade descreve como recolhemos, utilizamos, armazenamos e protegemos os teus
              dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados
              (RGPD) e demais legislação aplicável.
            </p>
          </header>

          <article className="space-y-8 leading-7 text-muted-foreground">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                1. Responsável pelo tratamento
              </h2>
              <p>
                O responsável pelo tratamento dos teus dados pessoais é{' '}
                <strong className="text-foreground">Bruno Moisão</strong>, operador da CommitPT,
                contactável através do email{' '}
                <strong className="text-foreground">brunomoisao@commitpt.com</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Dados que recolhemos</h2>
              <p>Consoante a forma como interages com a CommitPT, podemos recolher:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Dados de identificação:</strong> nome e
                  endereço de email fornecidos no registo na plataforma Whop.
                </li>
                <li>
                  <strong className="text-foreground">Dados de conta:</strong> nome de utilizador do
                  Discord e identificador de conta.
                </li>
                <li>
                  <strong className="text-foreground">Dados de pagamento:</strong> processados pela
                  Whop — não armazenamos dados de cartão de crédito ou informação financeira
                  diretamente.
                </li>
                <li>
                  <strong className="text-foreground">Conteúdo partilhado:</strong> mensagens,
                  código, projetos ou outros materiais que publiques voluntariamente na comunidade.
                </li>
                <li>
                  <strong className="text-foreground">Dados de análise:</strong> páginas visitadas,
                  duração da visita, tipo de browser, sistema operativo e país de origem —
                  recolhidos pelo Google Analytics apenas se deres consentimento para cookies de
                  análise.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                3. Finalidades e base legal do tratamento
              </h2>
              <p>Tratamos os teus dados para as seguintes finalidades:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Gerir o teu acesso à comunidade e aos conteúdos exclusivos —{' '}
                  <em>execução do contrato</em>.
                </li>
                <li>
                  Processar pagamentos e gerir subscrições — <em>execução do contrato</em>.
                </li>
                <li>
                  Comunicar contigo sobre sessões, atualizações e novidades relevantes —{' '}
                  <em>interesse legítimo</em>.
                </li>
                <li>
                  Garantir a segurança e o bom funcionamento da comunidade —{' '}
                  <em>interesse legítimo</em>.
                </li>
                <li>
                  Cumprir obrigações legais aplicáveis — <em>obrigação legal</em>.
                </li>
                <li>
                  Enviar comunicações comerciais, quando exista consentimento válido —{' '}
                  <em>consentimento</em>.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                4. Partilha de dados com terceiros
              </h2>
              <p>
                Não vendemos os teus dados pessoais a terceiros. Partilhamos informação apenas com:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Whop</strong> — plataforma de gestão de
                  membros e processamento de pagamentos, sujeita à sua própria política de
                  privacidade.
                </li>
                <li>
                  <strong className="text-foreground">Discord</strong> — plataforma de comunicação
                  da comunidade, sujeita à sua própria política de privacidade.
                </li>
                <li>
                  <strong className="text-foreground">Google Analytics (Google LLC)</strong> —
                  serviço de análise de tráfego web, apenas quando aceitas cookies de análise. Os
                  dados são tratados nos servidores da Google, incluindo nos EUA, ao abrigo das
                  cláusulas contratuais-tipo aprovadas pela Comissão Europeia.
                </li>
              </ul>
              <p>
                Quando necessário, podemos partilhar dados com autoridades competentes para cumprir
                obrigações legais.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Conservação dos dados</h2>
              <p>
                Conservamos os teus dados pelo tempo necessário para cumprir as finalidades para as
                quais foram recolhidos, incluindo obrigações legais, contabilísticas ou de reporte.
              </p>
              <p>
                Após o cancelamento da subscrição e encerramento da conta, os dados pessoais são
                eliminados no prazo de 90 dias, salvo obrigação legal que imponha conservação por
                período superior.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Os teus direitos</h2>
              <p>Ao abrigo do RGPD, tens direito a:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Acesso</strong> — saber quais os dados que
                  temos sobre ti.
                </li>
                <li>
                  <strong className="text-foreground">Retificação</strong> — corrigir dados
                  incorretos ou incompletos.
                </li>
                <li>
                  <strong className="text-foreground">Apagamento</strong> — solicitar a eliminação
                  dos teus dados (&quot;direito ao esquecimento&quot;).
                </li>
                <li>
                  <strong className="text-foreground">Limitação</strong> — restringir o tratamento
                  em determinadas circunstâncias.
                </li>
                <li>
                  <strong className="text-foreground">Portabilidade</strong> — receber os teus dados
                  num formato estruturado e legível por máquina.
                </li>
                <li>
                  <strong className="text-foreground">Oposição</strong> — opor-te ao tratamento
                  baseado em interesse legítimo ou para fins de marketing direto.
                </li>
                <li>
                  <strong className="text-foreground">Retirada do consentimento</strong> — quando o
                  tratamento se baseia em consentimento, podes retirá-lo a qualquer momento.
                </li>
              </ul>
              <p>
                Para exercer qualquer um destes direitos, contacta-nos através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>. Responderemos no
                prazo de 30 dias.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Cookies</h2>
              <p>
                O website não utiliza cookies sem o teu consentimento. Quando aceitas cookies de
                análise, o Google Analytics instala os seguintes cookies:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">_ga</strong> — identifica de forma anónima os
                  visitantes únicos. Duração: 2 anos.
                </li>
                <li>
                  <strong className="text-foreground">_ga_*</strong> — mantém o estado da sessão
                  para o Google Analytics 4. Duração: 2 anos.
                </li>
              </ul>
              <p>
                Estes cookies recolhem informação de forma agregada e anónima sobre como os
                visitantes utilizam o site (páginas visitadas, duração, origem do tráfego). Não são
                utilizados para publicidade nem para identificar pessoas individualmente.
              </p>
              <p>
                Podes retirar o teu consentimento a qualquer momento limpando os cookies do browser
                ou recusando na próxima visita. Ao recusares, o Google Analytics não é carregado e
                nenhum cookie é instalado.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">8. Segurança dos dados</h2>
              <p>
                Adotamos medidas técnicas e organizativas adequadas para proteger os teus dados
                contra acesso não autorizado, perda, destruição ou divulgação. No entanto, nenhum
                sistema é completamente infalível, pelo que não podemos garantir segurança absoluta.
              </p>
              <p>
                Em caso de violação de dados que possa afetar os teus direitos e liberdades,
                notificaremos as autoridades competentes e, quando legalmente exigido, os próprios
                titulares dos dados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                9. Transferências internacionais
              </h2>
              <p>
                Alguns dos nossos prestadores de serviços (como Discord ou Whop) podem tratar dados
                fora do Espaço Económico Europeu. Nesse caso, asseguramo-nos de que existem
                garantias adequadas, como cláusulas contratuais-tipo aprovadas pela Comissão
                Europeia.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">10. Reclamações</h2>
              <p>
                Se considerares que o tratamento dos teus dados pessoais viola o RGPD, tens o
                direito de apresentar reclamação à autoridade de controlo competente em Portugal:
              </p>
              <p>
                <strong className="text-foreground">
                  Comissão Nacional de Proteção de Dados (CNPD)
                </strong>
                <br />
                Rua de São Bento, 148-3º — 1200-821 Lisboa
                <br />
                <a
                  href="https://www.cnpd.pt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline hover:text-primary-hover transition-colors"
                >
                  www.cnpd.pt
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                11. Alterações a esta política
              </h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir
                alterações legais ou operacionais. A data de última atualização encontra-se no topo
                desta página.
              </p>
              <p>
                Em caso de alterações significativas, notificaremos os membros ativos através do
                Discord ou por email.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">12. Contacto</h2>
              <p>
                Para qualquer questão relacionada com esta Política de Privacidade ou com o
                tratamento dos teus dados pessoais, contacta-nos através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
