const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

// Function to create and connect the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'mubtaxim.aternos.me', // Minecraft server IP
    port: 53328,              // Server port
    username: 'Nigga',      // Bot's username
    version: '1.20.1'         // Minecraft version
  });

  // Load pathfinder plugin
  bot.loadPlugin(pathfinder);

  // List of broken-hearted sentences to send
  const sentences = [
    `I thought we were forever...`,
    `It hurts to breathe without you.`,
    `Why did you have to leave me?`,
    `I’m lost in memories of us.`,
    `Every song reminds me of you...`,
    `I can't find my way back to happiness.`,
    `It's like a piece of me is missing.`,
    `The silence is too loud without you.`,
    `I keep replaying our last moments.`,
    `You were my light, now it's just darkness.`,
    `Your laughter still echoes in my heart.`,
    `I'm haunted by the ghosts of our love.`,
    `Every sunset reminds me of our last goodbye.`,
    `I never thought I'd miss you this much.`,
    `The memories are bittersweet.`,
    `Sometimes I wish I could turn back time.`,
    `You were my dream, now I'm awake to reality.`,
    `I never wanted to say goodbye.`,
    `My heart aches in your absence.`,
    `I thought love was supposed to be easy...`,
    `You were my everything, now I'm nothing.`,
    `Why does it still hurt after all this time?`,
    `I thought love would conquer all, but...`,
    `The world feels colorless without you.`,
    `You left a void that can't be filled.`,
    `I keep searching for you in every crowd.`,
    `You were my home, now I'm lost.`,
    `How do I let go of something I never had?`,
    `Your memory is a bittersweet symphony.`,
    `Every corner of this place reminds me of you.`,
    `I'm still waiting for a sign from you.`,
    `I wish I could forget, but I can't.`
  ];

  bot.once('spawn', () => {
    console.log('Bot has spawned on the server.');

    // Set movements for pathfinding after the bot spawns
    const defaultMove = new Movements(bot);
    bot.pathfinder.setMovements(defaultMove);

    // Anti-AFK functionality: Jump and walk
    const antiAFK = () => {
      bot.setControlState('forward', true);
      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
        setTimeout(() => {
          bot.setControlState('forward', false);
          setTimeout(() => {
            bot.setControlState('forward', true);
            bot.setControlState('jump', true);
          }, 1000); // Move forward for 1 second
        }, 2000); // Jump for 2 seconds
      }, 1000); // Move forward for 1 second
    };

    // Anti-AFK interval
    setInterval(antiAFK, 5000); // Execute anti-AFK every 5 seconds

    // Function to send random chat messages
    const sendRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence = sentences[randomIndex];
      bot.chat(randomSentence);
      console.log(`Bot sent a sentence: "${randomSentence}"`); // Log the sentence sent
    };

    // Send a random sentence every 5 minutes
    setInterval(() => {
      sendRandomMessage();
    }, 300000); // Send a message every 5 minutes (300,000 milliseconds)
  });

  // Handle disconnection and error events
  bot.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Attempting to reconnect...');
    setTimeout(createBot, 5000); // Attempt to reconnect after 5 seconds
  });

  bot.on('login', () => {
    console.log('Bot has logged in.');
  });

  bot.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
  });
}

// Start the bot
createBot();
