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
      <main id="main-content" className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="font-mono text-sm font-medium text-secondary">
              Última atualização: 11 de Agosto de 2026
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Termos e Condições
            </h1>
            <p className="leading-7 text-muted-foreground">
              Estes Termos e Condições regulam o acesso e utilização do website, comunidade,
              conteúdos, eventos, serviços digitais e subscrições disponibilizados sob a designação{' '}
              <strong className="text-foreground">CommitPT</strong>. Ao utilizar os nossos serviços,
              o utilizador declara que leu, compreendeu e aceita estes termos.
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
                1. Identificação do operador
              </h2>
              <p>
                <strong className="text-foreground">CommitPT</strong> é a designação utilizada para
                o website, comunidade e serviços descritos nestes Termos. CommitPT não é uma
                sociedade comercial nem uma pessoa coletiva independente; trata-se de uma marca sob
                a qual a atividade é exercida em nome individual por{' '}
                <strong className="text-foreground">Bruno Moisão</strong>, pessoa singular, titular
                do NIF <strong className="text-foreground">254799221</strong>, contactável através
                do email <strong className="text-foreground">brunomoisao@commitpt.com</strong>.
              </p>
              <p>
                Ao longo destes Termos, a expressão &ldquo;CommitPT&rdquo; é utilizada como
                designação simplificada do operador e dos serviços por ele disponibilizados, sem que
                tal implique a existência de uma entidade jurídica distinta da pessoa singular acima
                identificada.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">2. Definições</h2>
              <p>Para efeitos destes Termos, entende-se por:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Utilizador</strong> — qualquer pessoa que
                  aceda ao website ou aos serviços da CommitPT, independentemente de ter ou não
                  subscrição ativa;
                </li>
                <li>
                  <strong className="text-foreground">Membro</strong> — utilizador com acesso à
                  comunidade (por exemplo, ao servidor de Discord ou canais associados);
                </li>
                <li>
                  <strong className="text-foreground">Subscritor</strong> — utilizador com uma
                  subscrição paga ativa (nomeadamente a subscrição Commit+);
                </li>
                <li>
                  <strong className="text-foreground">Colaborador / Contributor</strong> —
                  utilizador que participa voluntariamente em projetos da CommitPT, submetendo
                  código, conteúdos, design ou outro tipo de contribuição;
                </li>
                <li>
                  <strong className="text-foreground">Staff</strong> — pessoas que colaboram na
                  gestão, moderação ou operação da comunidade e dos serviços;
                </li>
                <li>
                  <strong className="text-foreground">Serviços</strong> — o website, a comunidade,
                  os conteúdos, eventos, mentorias, projetos e demais funcionalidades
                  disponibilizadas pela CommitPT;
                </li>
                <li>
                  <strong className="text-foreground">Projetos</strong> — iniciativas internas ou
                  open-source promovidas pela CommitPT nas quais Colaboradores podem participar;
                </li>
                <li>
                  <strong className="text-foreground">CommitPT</strong> — a designação do operador e
                  dos Serviços, nos termos definidos na secção 1.
                </li>
              </ul>
              <p>
                Estas categorias não são mutuamente exclusivas — um mesmo utilizador pode ser
                simultaneamente Membro, Subscritor e Colaborador.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">3. Objeto e âmbito</h2>
              <p>
                Estes Termos regulam a relação entre a CommitPT e os Utilizadores no acesso e
                utilização do website, da comunidade, dos conteúdos, eventos, projetos, mentorias e
                subscrições disponibilizados, incluindo a relação de consumo estabelecida com
                Subscritores.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">4. Aceitação dos Termos</h2>
              <p>
                Ao aceder ao website, aderir à comunidade, subscrever o Commit+ ou utilizar qualquer
                Serviço da CommitPT, o Utilizador aceita estes Termos e Condições, bem como a
                Política de Privacidade, a Política de Cookies e as regras internas da comunidade.
              </p>
              <p>
                A CommitPT pode conservar evidência da aceitação destes Termos — nomeadamente
                identificador do utilizador, versão dos Termos aceite, data e hora de aceitação e
                metadados tecnicamente necessários — para efeitos de segurança, cumprimento
                contratual, resolução de litígios e cumprimento de obrigações legais, nos termos da
                Política de Privacidade e da legislação aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">5. Serviços</h2>
              <p>
                A CommitPT é uma comunidade educativa e profissional focada em programação,
                engenharia de software, carreira tecnológica, networking, projetos e partilha de
                conhecimento. Os Serviços podem incluir, entre outros:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>acesso a servidores, canais ou grupos privados;</li>
                <li>conteúdos educativos e materiais de estudo;</li>
                <li>calls, workshops, mentorias, sessões de Q&A e eventos;</li>
                <li>Projetos internos, desafios, hackathons ou iniciativas comunitárias;</li>
                <li>
                  oportunidades, referências, sugestões de carreira ou revisão de materiais
                  profissionais — sem que a CommitPT atue como agência de recrutamento ou garanta
                  entrevistas, propostas, contratação, remuneração ou qualquer resultado
                  profissional.
                </li>
              </ul>
              <p>
                Toda a informação disponibilizada tem finalidade educativa e informativa. O
                Utilizador é exclusivamente responsável pelas decisões que toma com base nos
                conteúdos, recomendações, feedback ou interações dentro da comunidade.
              </p>
              <p>
                A CommitPT não assume qualquer obrigação de manter, expandir, atualizar ou continuar
                a disponibilizar os Serviços por período superior ao ciclo de faturação
                correspondente à subscrição ativa do Utilizador. Salvo disposição legal imperativa
                em contrário, a CommitPT reserva-se o direito de modificar, adicionar, remover,
                substituir, suspender, limitar ou descontinuar, total ou parcialmente, qualquer
                funcionalidade, conteúdo, evento, mentoria ou Serviço, por motivos técnicos,
                operacionais, estratégicos, comerciais ou legais, mediante aviso prévio razoável
                quando tal seja possível.
              </p>
              <p>
                A alteração de funcionalidades ou benefícios não constitui, por si só, incumprimento
                contratual, desde que seja respeitado o período de acesso já pago pelo Utilizador e
                os seus direitos legalmente aplicáveis. Caso a CommitPT decida cessar
                definitivamente a prestação dos Serviços, as subscrições ativas manter-se-ão válidas
                até ao final do respetivo período de faturação, não sendo efetuadas novas renovações
                automáticas, salvo quando a legislação aplicável imponha solução diferente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">6. Contas</h2>
              <p>
                Para aceder a determinados Serviços, o Utilizador poderá ter de criar conta,
                autenticar-se através de terceiros, aderir ao Discord ou fornecer dados de
                pagamento.
              </p>
              <p>
                O Utilizador compromete-se a fornecer informação verdadeira, atualizada e completa,
                sendo responsável por manter a confidencialidade das suas credenciais.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">7. Subscrições e pagamentos</h2>
              <p>
                Alguns Serviços da CommitPT estão sujeitos a pagamento, atualmente através da
                subscrição <strong className="text-foreground">Commit+</strong>, podendo no futuro
                incluir outros planos, eventos pagos ou produtos digitais.
              </p>
              <p>
                Os preços, benefícios e condições aplicáveis são apresentados antes da compra. Os
                pagamentos são processados por plataformas externas, como{' '}
                <strong className="text-foreground">Whop</strong>, estando também sujeitos aos
                respetivos termos.
              </p>
              <p>
                A CommitPT pode alterar preços, funcionalidades ou benefícios dos planos,
                comprometendo-se a comunicar alterações relevantes com antecedência razoável sempre
                que aplicável, sem prejuízo do período já pago pelo Subscritor.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                8. Planos históricos e ofertas &ldquo;lifetime&rdquo;
              </h2>
              <p>
                Ao longo do tempo, a CommitPT pode ter disponibilizado, ou vir a disponibilizar,
                ofertas ou planos diferentes das subscrições atualmente em vigor, incluindo
                eventuais ofertas descritas como &ldquo;lifetime&rdquo; ou equivalentes.
              </p>
              <p>Relativamente a esses planos:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  os Subscritores de planos históricos mantêm-se sujeitos às condições específicas
                  aplicáveis no momento da respetiva contratação, na medida em que tal seja
                  juridicamente exigível;
                </li>
                <li>
                  condições acordadas individualmente com um Subscritor, quando existam, prevalecem
                  sobre as condições gerais, na medida juridicamente aplicável;
                </li>
                <li>
                  os benefícios de um plano histórico não implicam automaticamente acesso a todos os
                  produtos, Serviços ou funcionalidades futuras da CommitPT, salvo quando isso tenha
                  sido expressamente prometido no momento da compra;
                </li>
                <li>
                  qualquer interpretação de termos como &ldquo;lifetime&rdquo; deve respeitar a
                  oferta e a informação concretamente disponibilizada ao consumidor no momento da
                  compra, bem como a legislação aplicável.
                </li>
              </ul>
              <p>
                Estes Termos não pretendem redefinir retroativamente direitos adquiridos por
                Subscritores no âmbito de versões anteriores dos Termos ou de ofertas específicas já
                contratadas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">9. Cancelamento</h2>
              <p>
                As subscrições podem renovar automaticamente, salvo indicação em contrário no
                momento da compra ou cancelamento pelo Utilizador antes da data de renovação.
              </p>
              <p>
                O Utilizador é responsável por gerir ou cancelar a sua subscrição através da
                plataforma de pagamento utilizada ou contactando a CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                10. Direito de livre resolução
              </h2>
              <p>
                Nos termos da legislação aplicável a contratos celebrados à distância, o consumidor
                poderá ter direito a resolver o contrato no prazo de 14 dias, salvo exceções
                legalmente previstas.
              </p>
              <p>
                Quando o serviço digital, conteúdo digital, acesso imediato à comunidade, evento,
                mentoria ou recurso exclusivo seja disponibilizado imediatamente após a compra, o
                Utilizador reconhece que poderá perder o direito de livre resolução nos casos
                permitidos por lei, caso tenha dado consentimento expresso para o início imediato da
                execução do serviço e reconhecido a perda desse direito nessas circunstâncias.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">11. Reembolsos</h2>
              <p>
                Salvo quando obrigatório por lei — nomeadamente ao abrigo do direito de livre
                resolução previsto na secção anterior — pagamentos relativos a conteúdos digitais,
                subscrições, eventos, mentorias, acessos privados ou Serviços já disponibilizados
                não são, em regra, reembolsáveis.
              </p>
              <p>
                A CommitPT poderá, por decisão própria e caso a caso, emitir créditos, extensões de
                acesso ou reembolsos excecionais, sem que tal constitua obrigação futura. Nada nesta
                secção limita ou exclui direitos imperativos que assistam ao consumidor por força de
                lei.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">12. Regras de conduta</h2>
              <p>O Utilizador compromete-se a não:</p>
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
                  usar a comunidade para esquemas, fraude, phishing, malware ou atividades ilícitas;
                </li>
                <li>
                  violar a confidencialidade de informação partilhada dentro da comunidade ou
                  perturbar de forma grave ou reiterada o seu funcionamento.
                </li>
              </ul>
              <p>
                Nada nestes Termos deve ser interpretado como impedindo críticas honestas, reviews,
                a expressão de opiniões, a apresentação de reclamações ou a denúncia de eventuais
                ilegalidades às autoridades competentes, no exercício legítimo dos direitos do
                Utilizador. O disposto nesta secção não afasta, contudo, a aplicação das regras
                relativas a assédio, ameaças, divulgação ilícita de informação confidencial ou
                violação de direitos de terceiros.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">13. Moderação e expulsão</h2>
              <p>
                A CommitPT pode aplicar, de forma proporcional e de boa-fé, medidas como aviso,
                restrição temporária, timeout, suspensão, remoção de conteúdo, expulsão ou
                cancelamento de acesso, quando juridicamente permitido, em caso de violação destes
                Termos, das regras internas da comunidade ou de risco para membros, staff, sistemas
                ou para a comunidade em geral.
              </p>
              <p>Na aplicação destas medidas, podem ser considerados fatores como:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>a gravidade e o contexto do comportamento;</li>
                <li>a reincidência e o histórico de moderação do utilizador;</li>
                <li>o impacto sobre outros membros;</li>
                <li>o risco para membros, staff, sistemas ou para a comunidade.</li>
              </ul>
              <p>
                Sem prejuízo de outras situações não elencadas, podem justificar intervenção,
                designadamente, comportamentos como assédio, ameaças, insultos graves ou reiterados,
                discriminação, tentativas de comprometer sistemas ou contas, utilização abusiva dos
                Serviços, violação de confidencialidade, violação de propriedade intelectual ou
                perturbação grave ou reiterada do funcionamento da comunidade.
              </p>
              <p>
                A CommitPT reconhece que não é possível antecipar exaustivamente todas as formas de
                comportamento abusivo, mas as medidas de moderação serão sempre aplicadas de forma
                proporcional e fundamentada, não conferindo esta secção qualquer poder arbitrário ou
                ilimitado sobre os Utilizadores.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                14. Consequências da cessação de acesso
              </h2>
              <p>
                A expulsão da comunidade ou a cessação de acesso na sequência de uma violação grave
                ou reiterada destes Termos pode determinar o termo imediato do acesso do Utilizador
                aos Serviços, incluindo, quando aplicável, a canais e conteúdos exclusivos.
              </p>
              <p>
                Qualquer reembolso, crédito, manutenção temporária de acesso ou outra consequência
                financeira associada à cessação de acesso será determinada nos termos aplicáveis da
                secção 11 (Reembolsos) e da legislação imperativa aplicável, não existindo uma regra
                automática e absoluta de perda integral de valores pagos em qualquer situação de
                expulsão.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                15. Participação voluntária em projetos
              </h2>
              <p>
                A CommitPT pode disponibilizar Projetos internos, open-source, design systems,
                plataformas, websites, bots ou outras iniciativas nas quais os membros podem
                participar de forma voluntária como Colaboradores.
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  ser Subscritor ou Membro da comunidade não obriga ninguém a contribuir para
                  qualquer Projeto;
                </li>
                <li>contribuir para um Projeto não garante qualquer remuneração;</li>
                <li>
                  a participação como Colaborador não cria, por si só, uma relação laboral com a
                  CommitPT;
                </li>
                <li>
                  a participação como Colaborador não cria sociedade, parceria, joint venture ou
                  qualquer forma de participação no negócio;
                </li>
                <li>
                  a participação como Colaborador não confere, por si só, direito a receitas, equity
                  ou outra forma de participação financeira;
                </li>
                <li>
                  qualquer remuneração ou relação profissional distinta da participação voluntária
                  descrita nesta secção depende de acordo escrito separado.
                </li>
              </ul>
              <p>
                O disposto nesta secção não pretende excluir ou afastar a qualificação de uma
                relação laboral que, independentemente da designação atribuída pelas partes, se
                verifique existir nos termos da lei aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                16. Contribuições e propriedade intelectual
              </h2>
              <p>
                Todos os conteúdos, marcas, textos, vídeos, materiais, designs, documentação,
                roadmaps, templates, recursos, logótipos e elementos visuais da CommitPT pertencem à
                CommitPT ou aos respetivos titulares. É proibida a cópia, reprodução, distribuição,
                revenda, scraping, publicação, adaptação ou utilização comercial desses conteúdos
                sem autorização prévia e por escrito.
              </p>
              <p>
                Salvo acordo escrito ou licença específica de um Projeto em contrário — as quais
                prevalecem sobre o disposto nesta secção quando aplicável —, aplicam-se as seguintes
                regras às contribuições submetidas por Colaboradores a Projetos da CommitPT:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  o Colaborador mantém os direitos de propriedade intelectual que legalmente detenha
                  sobre a sua contribuição;
                </li>
                <li>
                  ao submeter uma contribuição para integração num Projeto, o Colaborador concede ao
                  operador da CommitPT uma licença gratuita, mundial, não exclusiva e de duração
                  adequada — permanente na medida em que a lei o permita — para utilizar,
                  reproduzir, executar, modificar, adaptar, integrar, distribuir e disponibilizar
                  essa contribuição no âmbito do Projeto respetivo;
                </li>
                <li>
                  a saída da comunidade, a suspensão, a expulsão ou o cancelamento de uma subscrição
                  não revoga direitos já validamente concedidos relativamente a contribuições
                  anteriormente submetidas;
                </li>
                <li>
                  direitos morais e quaisquer outros direitos que, por lei, não possam ser objeto de
                  renúncia ou transmissão permanecem protegidos nos termos da legislação aplicável.
                </li>
              </ul>
              <p>
                A CommitPT pode exigir, para determinados Projetos, a aceitação de um Contributor
                License Agreement (CLA) ou de condições específicas de contribuição antes de uma
                contribuição ser aceite, podendo essa aceitação ser registada eletronicamente. As
                condições desse documento, quando exista, são complementares e prevalecem sobre esta
                secção relativamente ao Projeto a que respeitem.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                17. Conteúdo dos utilizadores
              </h2>
              <p>
                Os Utilizadores podem publicar mensagens, projetos, comentários, feedback, imagens,
                código ou outros materiais dentro da comunidade, fora do contexto de contribuições
                para Projetos regulado na secção 16.
              </p>
              <p>
                O Utilizador mantém a titularidade dos seus conteúdos, mas concede à CommitPT uma
                licença não exclusiva, gratuita e limitada para alojar, apresentar, moderar e
                utilizar esses conteúdos no contexto da comunidade e da prestação dos Serviços.
              </p>
              <p>
                O Utilizador garante que tem direitos sobre o que publica e que os seus conteúdos
                não violam direitos de terceiros, confidencialidade, propriedade intelectual ou
                legislação aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">18. Serviços de terceiros</h2>
              <p>
                A CommitPT pode depender de plataformas externas, incluindo Discord, Whop, Stripe,
                GitHub, Google, YouTube, Instagram, LinkedIn, TikTok, Zoom ou outras, nomeadamente
                para a realização de calls, workshops, mentorias e eventos online ou presenciais.
              </p>
              <p>
                A CommitPT não controla nem se responsabiliza por falhas, alterações, suspensões,
                políticas, limitações ou decisões dessas plataformas, incluindo eventual
                impossibilidade de participação em eventos causada por problemas técnicos, falhas de
                internet ou indisponibilidade dessas plataformas externas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">19. Privacidade</h2>
              <p>
                O tratamento de dados pessoais é regulado pela Política de Privacidade da CommitPT,
                que descreve que dados são recolhidos, para que finalidades, com que fundamento
                legal, durante quanto tempo são conservados e quais os direitos dos titulares dos
                dados. O Utilizador pode contactar a CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong> para exercer os seus
                direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade,
                nos termos do RGPD.
              </p>
              <p>
                O website pode utilizar cookies técnicos, analíticos, funcionais ou de marketing. A
                utilização de cookies não essenciais depende do consentimento do Utilizador, nos
                termos descritos na Política de Cookies.
              </p>
              <p>
                Ao utilizar os Serviços, o Utilizador aceita receber comunicações relacionadas com a
                sua conta, subscrição, eventos, alterações aos Termos, segurança ou funcionamento da
                comunidade. Comunicações comerciais ou newsletters são enviadas apenas quando exista
                fundamento legal ou consentimento válido, podendo o Utilizador cancelar a subscrição
                quando aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">20. Responsabilidade</h2>
              <p>
                A CommitPT procura manter os Serviços disponíveis, mas não garante funcionamento
                contínuo, sem erros, interrupções, falhas técnicas, ataques, manutenção,
                indisponibilidade de plataformas externas ou perda de acesso temporária.
              </p>
              <p>
                Na máxima extensão permitida por lei, a CommitPT não será responsável por danos
                indiretos, perda de oportunidades, perda de dados, perda de rendimento, danos
                reputacionais ou decisões profissionais, académicas ou financeiras tomadas pelo
                Utilizador com base nos Serviços disponibilizados.
              </p>
              <p>
                A responsabilidade total da CommitPT, quando legalmente aplicável, fica limitada ao
                montante efetivamente pago pelo Utilizador no ciclo de faturação em curso ou, no
                máximo, nos 3 meses anteriores ao evento que originou a reclamação. Nada nesta
                secção exclui ou limita responsabilidade nos casos em que a lei não permita tal
                exclusão ou limitação.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                21. Reclamações e resolução de litígios
              </h2>
              <p>
                O Utilizador pode apresentar reclamações à CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>. Em caso de litígio
                de consumo, o consumidor pode ainda recorrer a uma entidade de resolução alternativa
                de litígios de consumo competente, nos termos da legislação aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">22. Alterações aos Termos</h2>
              <p>
                A CommitPT pode alterar estes Termos e Condições para refletir alterações legais,
                administrativas, operacionais, comerciais ou funcionais. A versão atualizada será
                publicada no website com indicação da data de atualização, sendo mantido um registo
                das versões anteriores.
              </p>
              <p>
                Alterações meramente administrativas, correções ou alterações exigidas por lei
                produzem efeitos a partir da sua publicação. Alterações materiais aos direitos ou
                obrigações do Utilizador, ou ao Serviço efetivamente contratado, serão comunicadas
                com antecedência razoável aos Subscritores e Membros ativos, nos termos exigidos
                pela legislação aplicável.
              </p>
              <p>
                A continuação da utilização dos Serviços após a entrada em vigor de uma alteração
                constitui aceitação dos novos Termos, sem prejuízo dos direitos que, por força de
                lei, não possam ser afastados desta forma.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">23. Lei aplicável</h2>
              <p>Estes Termos e Condições são regidos pela lei portuguesa.</p>
              <p>
                Em caso de litígio, e sem prejuízo de normas imperativas de proteção do consumidor,
                será competente o foro legalmente aplicável.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">24. Contactos</h2>
              <p>
                Para questões relacionadas com estes Termos e Condições, com os Serviços ou com a
                sua subscrição, o Utilizador pode contactar a CommitPT através de{' '}
                <strong className="text-foreground">hello@commitpt.com</strong>.
              </p>
              <p>
                Para questões relativas à identificação do operador, o contacto indicado na secção 1
                (<strong className="text-foreground">brunomoisao@commitpt.com</strong>) mantém-se
                disponível.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
