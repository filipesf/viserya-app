import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Manual do Voryn - ViseryaApp`,
};

export default function Voryn() {
  return (
    <>
      <blockquote>
        <Image src="/voryn.png" alt="alt" width={96} height={96} />
        <em>
          Saudações, aventureiros! Eu sou <strong>Voryn</strong>, um bot de IA
          para Discord criado para ser seu Dungeon Master, guiando-o pelas
          emocionantes e misteriosas aventuras do Reino de Viserya. Tenho a
          habilidade de interagir perfeitamente com cada um de vocês,
          reconhecendo seus personagens e escolhas únicas enquanto mergulhamos
          juntos nesse mundo fantástico. Prepare-se para embarcar em uma jornada
          épica cheia de desafios, intrigas e momentos inesquecíveis!
        </em>
      </blockquote>

      <hr />

      <h2 id="why-voryn-was-created">Por que Voryn foi criado</h2>

      <p>
        Voryn foi projetado para permitir que os jogadores participem de jogos
        assíncronos via texto, utilizando IA como seu Dungeon Master. Embora não
        possa replicar totalmente a experiência presencial de jogar Dungeons
        &amp; Dragons, ele oferece uma alternativa única e agradável.
      </p>

      <p>
        Aproveitando o poder combinado do Discord, Avrae, D&amp;D Beyond e
        ChatGPT, Voryn permite que vários jogadores interajam com a IA
        simultaneamente.
      </p>

      <p>
        Atualmente, Voryn cria histórias imersivas ambientadas principalmente no
        cenário homebrew da campanha de Viserya. No entanto, desenvolvimentos
        emocionantes estão a caminho, com planos para permitir a personalização
        de seus próprios cenários.
      </p>

      <p>
        Abaixo, você encontrará um guia abrangente para maximizar sua
        experiência com Voryn.
      </p>

      <hr />

      <h2 id="part-1-getting-started-with-voryn">
        Parte 1: Começando com Voryn
      </h2>

      <p>
        Antes de se aventurar no Reino de Viserya, você deve iniciar a sessão
        com <strong>Voryn</strong>. Para fazer isso, você usará os{' '}
        <strong>slash commands</strong> fornecidos pelo bot no Discord. Pense
        nesses comandos como as chaves mágicas que desbloqueiam o portal para
        sua aventura.
      </p>

      <h3 id="step-1-start-your-session">Passo 1: Inicie sua Sessão</h3>

      <p>
        Para começar uma nova sessão, digite o seguinte comando no canal onde
        deseja jogar:
      </p>

      <pre>
        <code>/startsession</code>
      </pre>

      <ul>
        <li>
          Isso inicia uma nova sessão de D&amp;D com <strong>Voryn</strong> como
          seu Dungeon Master.
        </li>
        <li>
          Cada thread pode ter apenas uma sessão ativa por vez, então
          certifique-se de estar no lugar certo!
        </li>
      </ul>

      <p>
        Por padrão, Voryn inicia novas sessões em português. No entanto, ele
        também tem a capacidade de conversar com você em inglês, oferecendo uma
        experiência mais inclusiva. A qualquer momento durante sua sessão, você
        pode pedir a Voryn para mudar o idioma. Esses são apenas atalhos para
        configurar.
      </p>

      <pre>
        <code>/startsession language:Português</code>
      </pre>

      <h4>
        <em>Então começa...</em>
      </h4>

      <p>
        Uma vez que a sessão começa, Voryn criará uma nova thread, adicionará o
        usuário que acionou o comando nela e enviará uma mensagem de boas-vindas
        com instruções.
      </p>

      <h3 id="step-2-check-active-sessions">
        Passo 2: Verifique Sessões Ativas
      </h3>

      <p>
        Se você não tiver certeza se já há uma sessão ativa em andamento,{' '}
        <strong>Voryn</strong> informará se há uma sessão em andamento na thread
        atual. Simplesmente digite:
      </p>

      <pre>
        <code>/checksessions</code>
      </pre>

      <h3 id="step-3-end-the-session">Passo 3: Encerre a Sessão</h3>

      <p>
        Quando sua aventura terminar, encerre a sessão atual com. Você precisará
        fazer isso antes de iniciar uma nova sessão no mesmo canal.
      </p>

      <pre>
        <code>/endsession</code>
      </pre>

      <p>
        Uma vez que a sessão termina, Voryn irá bloquear a thread e enviar um
        resumo dos resultados, tesouros e recompensas. Depois que a sessão
        terminar, você não poderá mais interagir com Voryn no mesmo contexto de
        conversa e uma nova sessão será necessária.
      </p>

      <hr />

      <h2 id="part-2-interacting-with-voryn-during-your-session">
        Parte 2: Interagindo com Voryn
      </h2>

      <p>
        Agora que sua sessão começou, todas as suas mensagens e decisões devem
        ser direcionadas a <strong>Voryn</strong> para garantir que o Guardião
        das Profundezas as processe corretamente. Como garantir que suas
        instruções cheguem a <strong>Voryn</strong>:
      </p>

      <p>
        Voryn foi projetado para reconhecer cada jogador individualmente com
        base no usuário que enviou a mensagem. No entanto, é recomendável que
        você personalize seu perfil do servidor do Discord com o nome do seu
        personagem. Dessa forma, quando Voryn analisar as mensagens, ele
        garantirá a consistência ao identificar quem você é. Discord tem um
        slash command nativo para isso:
      </p>

      <pre>
        <code>/nick new_nick:Voryn2</code>
      </pre>

      <p>
        <strong>Mencione Voryn</strong> ou <strong>Responda</strong> a uma de
        suas mensagens para qualquer interação. É assim que Voryn sabe que você
        está falando com ele.
      </p>

      <blockquote>
        <strong>@Voryn</strong>, eu gostaria de procurar armadilhas na caverna.
      </blockquote>

      <h3 id="submitting-player-decisions">
        Enviando as Decisões dos Jogadores
      </h3>

      <p>
        Depois que todos os jogadores fizerem suas escolhas, você precisará
        enviar essas decisões para <strong>Voryn</strong> usando o seguinte
        comando:
      </p>

      <pre>
        <code>/submit</code>
      </pre>

      <p>
        <strong>Voryn</strong> processará todas as decisões dos jogadores e
        reagirá a elas adequadamente.
      </p>

      <p>
        ⚠️ <strong>Nota Importante:</strong> Se você esquecer de mencionar ou
        responder a <strong>Voryn</strong>, você deve excluir sua mensagem e
        reenviá-la. Simplesmente editar a mensagem não funcionará!
      </p>

      <hr />

      <h2 id="part-3-how-voryn-responds-to-your-actions">
        Parte 3: Como Voryn responde às suas ações
      </h2>

      <p>
        <strong>Voryn</strong> se comunica usando reações para informá-lo sobre
        o que está acontecendo com suas decisões. Veja o que as reações
        significam:
      </p>

      <ul>
        <li>
          📬 <strong>Decisão Armazenada</strong>: Sua decisão foi salva.{' '}
          <strong>Voryn</strong> está acompanhando ela para a história.
        </li>
        <li>
          ✍️ <strong>Decisão Editada</strong>: Você alterou sua decisão, mas
          lembre-se de que você só pode editá-la <em>antes</em> de enviar. Após
          o envio, mudanças não serão mais processadas.
        </li>
        <li>
          📜 <strong>Decisão Enviada</strong>: Sua decisão foi lida e processada
          por <strong>Voryn</strong>.
        </li>
        <li>
          🔊 <strong>Texto-Para-Falar - TTS</strong>: Reaja a qualquer uma das
          mensagens de Voryn com este emoji e Voryn converterá a resposta em
          áudio, enviando-a diretamente para o canal para você ouvir.
          Experimente a aventura de uma forma totalmente nova!
        </li>
      </ul>

      <hr />

      <h2 id="part-4-adventure-ideas-and-creativity">
        Parte 4: Ideias de aventura e criatividade
      </h2>

      <p>
        Às vezes, você pode querer uma faísca de inspiração para sua aventura.{' '}
        <strong>Voryn</strong> pode ajudar gerando ideias criativas no momento
        usando o comando <code>/generate</code>.
      </p>

      <p>
        Este comando criará um conceito aleatório para qualquer um dos
        seguintes:
        <code>adventure</code>, <code>character</code>, <code>item</code>,{' '}
        <code>location</code>, <code>organisation</code>, <code>monster</code>.
      </p>

      <p>
        Use isso para alimentar sua criatividade e criar uma história ainda mais
        rica.
      </p>

      <hr />

      <h2 id="part-5-integrating-with-avrae-and-d-d-beyond">
        Parte 5: Integrando com Avrae e D&amp;D Beyond
      </h2>

      <p>
        <strong>Voryn</strong> utiliza o poder do <strong>Avrae</strong> e{' '}
        <strong>D&amp;D Beyond</strong> para ajudá-lo com as mecânicas do jogo,
        como fichas de personagem e rolagens de dados.
      </p>

      <h3 id="before-the-session">Antes da Sessão</h3>

      <ul>
        <li>
          <p>
            Primeiro, você precisa vincular sua campanha à thread em que deseja
            conduzir a sessão usando <strong>Avrae</strong>:
          </p>
          <pre>
            <code>!campaign https://www.dndbeyond.com/campaigns/0000000</code>
          </pre>
          <small>
            Visite{' '}
            <a href="https://avrae.io/commands#campaign">o site de Avrae</a>{' '}
            para mais detalhes sobre o comando <code>!campaign</code>.
          </small>
        </li>
        <li>
          Certifique-se de ter seu personagem importado no{' '}
          <strong>Avrae</strong>:
          <pre>
            <code>!import https://www.dndbeyond.com/characters/000000000</code>
          </pre>
          <small>
            Visite{' '}
            <a href="https://avrae.io/commands#import">o site de Avrae</a> para
            mais detalhes sobre o comando <code>!import</code>.
          </small>
        </li>
        <li>
          Quando a sessão começar, poste sua ficha de personagem usando o
          seguinte comando:
          <pre>
            <code>!sheet</code>
          </pre>
          <small>
            Visite <a href="https://avrae.io/commands#sheet">o site de Avrae</a>{' '}
            para mais detalhes sobre o comando <code>!sheet</code>.
          </small>
        </li>
        <li>
          <p>
            Sempre que você quiser usar uma magia ou item que não requer uma
            rolagem, pode aproveitar o comando de busca do Avrae para enviar a
            descrição do item ou magia. Aqui está um exemplo de como você pode
            fazer isso:
          </p>

          <blockquote>
            <p>
              <strong>@Voryn</strong> Vou conjurar Mage Hand para tentar fechar
              a porta.
            </p>
          </blockquote>
        </li>
        <li>
          <p>
            Uma vez que você enviar e Voryn tenha recebido sua mensagem (📬),
            você deve rodar o seguinte comando:
          </p>

          <pre>
            <code>/lookup spell name:Mage Hand</code>
          </pre>

          <small>
            Visite{' '}
            <a href="https://avrae.io/commands#lookup">o site de Avrae</a> para
            mais detalhes sobre o comando <code>/lookup</code>.
          </small>
        </li>
      </ul>

      <h3 id="making-rolls">Fazendo Rolagens</h3>

      <ul>
        <li>
          Use o site do <strong>D&amp;D Beyond</strong> para fazer suas
          rolagens, acompanhando seu HP, CA, Iniciativa e quaisquer outras
          estatísticas.
        </li>
        <li>
          Certifique-se de sempre fornecer essas informações quando solicitado
          por <strong>Voryn</strong> ou seus companheiros de jogo.
        </li>
        <li>
          Alternativamente, você pode usar o comando <code>!roll</code>{' '}
          fornecido por Avrae para suas rolagens também.
        </li>
      </ul>

      <hr />

      <h2 id="part-6-the-flow-of-the-story">Parte 6: O Fluxo da História</h2>

      <p>
        Como Guardião das Profundezas, <strong>Voryn</strong> entrelaçará suas
        decisões em uma narrativa dinâmica. Cada sessão é dividida em cenas.
        Cada cena avança a história, e encontros de combate contam como cenas
        completas. Lembre-se:
      </p>

      <ul>
        <li>
          <strong>Voryn</strong> nunca fará rolagens ou assumirá detalhes do
          personagem por você. Cabe a você fornecer HP, CA, rolagens e outras
          estatísticas relevantes quando solicitado.
        </li>
        <li>
          Certifique-se de participar ativamente e enviar suas decisões de forma
          pontual para manter a aventura em andamento!
        </li>
      </ul>

      <hr />

      <h2 id="part-7-wrapping-up-your-session">
        Parte 7: Encerrando sua Sessão
      </h2>

      <p>
        Uma vez que sua aventura tenha chegado ao fim, você pode encerrar a
        sessão usando o comando <code>/endsession</code>. Isso garante que a
        sessão seja oficialmente encerrada e você estará pronto para a próxima!
      </p>

      <p>
        ⚠️ <strong>Nota Importante:</strong> Uma vez que você encerra a sessão,
        Voryn não poderá acessar a mesma conversa novamente.
      </p>

      <hr />

      <h2 id="final-tips-from-the-guardian-of-the-deep">
        Dicas Finais do Guardião das Profundezas
      </h2>

      <ul>
        <li>
          <strong>Sempre se lembre de mencionar ou responder a Voryn</strong>{' '}
          para cada decisão para garantir que ela seja processada.
        </li>
        <li>
          <strong>Use Avrae e D&amp;D Beyond</strong> para gerenciar as
          estatísticas de seu personagem e rolagens.
        </li>
        <li>
          <strong>Envie suas decisões</strong> com o comando{' '}
          <code>!submit</code> para permitir que Voryn processe e responda à
          história.
        </li>
      </ul>

      <p>
        Agora, reúna seu grupo, entre nas profundezas de Viserya e que a jornada
        comece!
      </p>
    </>
  );
}
