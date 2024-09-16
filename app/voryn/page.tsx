import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Voryn's Manual - ViseryaApp`,
};

export default function Voryn() {
  return (
    <>
      <blockquote>
        <Image src="/voryn.png" alt="alt" width={96} height={96} />
        <em>
          Greetings, adventurers! I am <strong>Voryn</strong>, an AI Discord bot
          crafted to serve as your Dungeon Master, guiding you through the
          thrilling and mysterious adventures of the Realm of Viserya. I possess
          the ability to interact seamlessly with each of you, recognizing your
          unique characters and choices as we delve into this fantastical world
          together. Prepare to embark on an epic journey filled with challenge,
          intrigue, and unforgettable moments!
        </em>
      </blockquote>

      <hr />

      <h2 id="why-voryn-was-created">Why Voryn was created</h2>

      <p>
        Voryn was designed to enable players to engage in asynchronous gameplay
        over text, utilizing AI as their Dungeon Master. While it may not fully
        replicate the in-person experience of playing Dungeons &amp; Dragons, it
        offers a unique and enjoyable alternative.
      </p>

      <p>
        Harnessing the combined power of Discord, Avrae, D&amp;D Beyond, and
        ChatGPT, Voryn allows multiple players to interact with the AI
        simultaneously.
      </p>

      <p>
        Currently, Voryn creates immersive stories primarily set in the
        homebrewed D&amp;D campaign world of Viserya. However, exciting
        developments are on the horizon, with plans to allow customization for
        your own scenarios.
      </p>

      <p>
        Below, you’ll find a comprehensive guide to maximize your experience
        with Voryn.
      </p>

      <hr />

      <h2 id="part-1-getting-started-with-voryn">
        Part 1: Getting started with Voryn
      </h2>

      <p>
        Before venturing into the Realm of Viserya, you must initiate the
        session with <strong>Voryn</strong>. To do this, you’ll use the{' '}
        <strong>slash commands</strong> provided by the bot. Think of these
        commands as the magical keys that unlock the gateway to your adventure.
      </p>

      <h3 id="step-1-start-your-session">Step 1: Start Your Session</h3>

      <p>
        To begin a new session, type the following command in the channel or
        thread where you wish to play:
      </p>

      <pre>
        <code>/startsession</code>
      </pre>

      <ul>
        <li>
          This begins a new D&amp;D session with <strong>Voryn</strong> as your
          guide.
        </li>
        <li>
          Each thread can only host one active session at a time, so make sure
          you’re in the right place!
        </li>
      </ul>

      <p>
        By default, Voryn initiates new sessions in English. However, it also
        has the capability to converse with you in Brazilian Portuguese,
        offering a more inclusive experience. At any point during your session
        you can ask Voryn to change the language. Those are just shortcuts to
        set it up.
      </p>

      <pre>
        <code>/startsession language:Português</code>
      </pre>

      <h4>
        <em>So it begins...</em>
      </h4>

      <p>
        Once the session begins, Voryn will create a new thread, add the user
        who triggered the command to it, and send a welcome message with
        instructions.
      </p>

      <h3 id="step-2-check-active-sessions">Step 2: Check Active Sessions</h3>

      <p>
        If you’re unsure whether there’s already an active session running,{' '}
        <strong>Voryn</strong> will let you know if there’s an ongoing session
        in the current thread. Simply type:
      </p>

      <pre>
        <code>/checksessions</code>
      </pre>

      <h3 id="step-3-end-the-session">Step 3: End the Session</h3>

      <p>
        Once you are done with your adventure, end the current session with.
        You’ll need to do this before starting a new session in the same channel
        or thread.
      </p>

      <pre>
        <code>/endsession</code>
      </pre>

      <p>
        Once the session ends, Voryn will lock the thread, and send a summary of
        the outcomes, loot, and rewards. Once the session ends, you will not be
        able to interact with Voryn in the same conversation context and a new
        session will be required.
      </p>

      <hr />

      <h2 id="part-2-interacting-with-voryn-during-your-session">
        Part 2: Interacting with Voryn
      </h2>

      <p>
        Now that your session has started, all your messages and decisions must
        be directed to <strong>Voryn</strong> to ensure the Guardian of the Deep
        processes them correctly. Here&#39;s how to make sure your instructions
        reach <strong>Voryn</strong>:
      </p>

      <p>
        Voryn is designed to recognise each player individually based on the
        user who submitted the message. However, it is recommended that you
        customise your{' '}
        <a href="https://tinyurl.com/s3smpufy" target="_blank" rel="noreferrer">
          Discord server profile
        </a>{' '}
        with the name of your character. This way, when Voryn parses the
        messages, it will ensure consistency on identify who you are.
      </p>

      <p>
        <strong>Mention Voryn</strong> or <strong>Reply</strong> to one of its
        messages for any interaction. This is how Voryn knows you’re speaking to
        it.
      </p>

      <blockquote>
        <strong>@Voryn</strong>, I would like to search the cave for traps.
      </blockquote>

      <h3 id="submitting-player-decisions">Submitting Player Decisions</h3>

      <p>
        Once all players have made their choices, you’ll need to submit these
        decisions to <strong>Voryn</strong> using the following command:{' '}
        <code>!submit</code>. <strong>Voryn</strong> will then process all the
        players&#39; decisions and react to them accordingly.
      </p>

      <hr />

      <h2 id="part-3-how-voryn-responds-to-your-actions">
        Part 3: How Voryn responds to your actions
      </h2>

      <p>
        <strong>Voryn</strong> communicates using reactions to let you know
        what’s happening with your decisions. Here’s what the reactions mean:
      </p>

      <ul>
        <li>
          📬 <strong>Decision Stored</strong>: Your decision has been saved.{' '}
          <strong>Voryn</strong> is keeping track of it for the story.
        </li>
        <li>
          ✍️ <strong>Decision Edited</strong>: You’ve changed your decision, but
          remember, you can only edit it <em>before</em> submitting. After
          submission, changes are no longer processed.
        </li>
        <li>
          📜 <strong>Decision Submitted</strong>: Your decision has been read
          and processed by <strong>Voryn</strong>.
        </li>
        <li>
          🔊 <strong>Text-To-Speak - TTS</strong>: React to any of Voryn’s
          messages with this emoji, and Voryn will convert the response into
          audio, sending it directly to the channel for you to listen to.
          Experience the adventure in a whole new way!
        </li>
      </ul>

      <p>
        ⚠️ <strong>Important Note:</strong> If you forget to mention or reply to{' '}
        <strong>Voryn</strong>, you must delete your message and resend it.
        Simply editing the message won’t work!
      </p>

      <hr />

      <h2 id="part-4-adventure-ideas-and-creativity">
        Part 4: Adventure ideas and creativity
      </h2>

      <p>
        Sometimes, you might want a spark of inspiration for your adventure.{' '}
        <strong>Voryn</strong> can help by generating creative ideas on the spot
        by using <code>/generate</code> command.
      </p>

      <p>
        This command will create a random concept for any of the following:
        <code>adventure</code>, <code>character</code>, <code>item</code>,{' '}
        <code>location</code>, <code>organisation</code>, <code>monster</code>.
      </p>

      <p>Use this to fuel your creativity and craft an even richer story.</p>

      <hr />

      <h2 id="part-5-integrating-with-avrae-and-d-d-beyond">
        Part 5: Integrating with avrae and D&amp;D Beyond
      </h2>

      <p>
        <strong>Voryn</strong> uses the power of <strong>Avrae</strong> and{' '}
        <strong>D&amp;D Beyond</strong> to help you with game mechanics such as
        character sheets and rolls.
      </p>

      <h3 id="before-the-session">Before the Session</h3>

      <ul>
        <li>
          <p>
            You first need to link your campaign with the channel in which you
            want to run the session using <strong>Avrae</strong>:
          </p>
          <pre>
            <code>!campaign https://www.dndbeyond.com/campaigns/0000000</code>
          </pre>
          <small>
            Visit{' '}
            <a href="https://avrae.io/commands#campaign">Avrae&#39;s website</a>{' '}
            for more details on the <code>!campaign</code> command.
          </small>
        </li>
        <li>
          Make sure you have your character imported into <strong>Avrae</strong>
          :
          <pre>
            <code>!import https://www.dndbeyond.com/characters/000000000</code>
          </pre>
          <small>
            Visit{' '}
            <a href="https://avrae.io/commands#import">Avrae&#39;s website</a>{' '}
            for more details on the <code>!import</code> command.
          </small>
        </li>
        <li>
          Once the session begins, post your character sheet using the following
          command:
          <pre>
            <code>!sheet</code>
          </pre>
          <small>
            Visit{' '}
            <a href="https://avrae.io/commands#sheet">Avrae&#39;s website</a>{' '}
            for more details on the <code>!sheet</code> command.
          </small>
        </li>
        <li>
          <p>
            Whenever you want to use a spell or item that does not require a
            roll, you can levarage Avrae lookup command to send the description
            of the item or spell. Here&apos;s an example of how you can do this:
          </p>

          <blockquote>
            <p>
              <strong>@Voryn</strong> I&apos;m going to cast Mage Hand, to try
              to close the door.
            </p>
          </blockquote>
        </li>
        <li>
          <p>
            Once you submit and Voryn as received your message (📬), you run the
            following command:
          </p>

          <pre>
            <code>/lookup spell name:Mage Hand</code>
          </pre>

          <small>
            Visit{' '}
            <a href="https://avrae.io/commands#lookup">Avrae&#39;s website</a>{' '}
            for more details on the <code>/lookup</code> command.
          </small>
        </li>
      </ul>

      <h3 id="making-rolls">Making Rolls</h3>

      <ul>
        <li>
          Use the <strong>D&amp;D Beyond</strong> website to make your rolls,
          keeping track of your HP, AC, Initiative, and any other stats.
        </li>
        <li>
          Make sure to always provide this information when asked by{' '}
          <strong>Voryn</strong> or your fellow players.
        </li>
        <li>
          Alternatively, you can use the <code>!roll</code> command provided by
          Avrae for your rolls as well.
        </li>
      </ul>

      <hr />

      <h2 id="part-6-the-flow-of-the-story">Part 6: The flow of the story</h2>

      <p>
        As the Guardian of the Deep, <strong>Voryn</strong> will weave your
        decisions into a dynamic narrative. Each session is broken down into
        scenes. Every scene advances the story, and combat encounters count as
        their own full scenes. Remember:
      </p>

      <ul>
        <li>
          <strong>Voryn</strong> will never make rolls or assume character
          details for you. It’s up to you to provide HP, AC, rolls, and other
          relevant stats when prompted.
        </li>
        <li>
          Make sure to actively participate and submit your decisions in a
          timely manner to keep the adventure flowing!
        </li>
      </ul>

      <hr />

      <h2 id="part-7-wrapping-up-your-session">
        Part 7: Wrapping up your session
      </h2>

      <p>
        Once your adventure has come to an end, you can close the session by
        using the <code>/endsession</code> command. This ensures the session is
        officially closed, and you’re ready for the next one!
      </p>

      <p>
        ⚠️ <strong>Important Note:</strong> Once you end the sesssion, Voryn
        will not be able to access the same conversation again.
      </p>

      <hr />

      <h2 id="final-tips-from-the-guardian-of-the-deep">
        Final Tips from the Guardian of the Deep
      </h2>

      <ul>
        <li>
          <strong>Always remember to mention or reply to Voryn</strong> for
          every decision to ensure it’s processed.
        </li>
        <li>
          <strong>Use Avrae and D&amp;D Beyond</strong> to manage your character
          stats and rolls.
        </li>
        <li>
          <strong>Submit your decisions</strong> with the <code>!submit</code>{' '}
          command to allow Voryn to process and respond to the story.
        </li>
      </ul>

      <p>
        Now, gather your party, enter the depths of Viserya, and let the journey
        begin!
      </p>
    </>
  );
}
