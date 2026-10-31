/**
 * Leap Limitless - Life Changers Coaching Card Deck
 * 75 Unique Coaching Prompts for Reflection, Insight, and Aligned Action
 */

(function () {
  'use strict';

  const cards = [
    { question: "What do you need to avoid in this situation?", word: "Freedom", affirmation: "I love and accept my body as it is and as it changes." },
    { question: "What are you really thinking at this moment in time?", word: "Forgiveness", affirmation: "I am worthy of love and success in my life." },
    { question: "What are you assuming about the situation?", word: "Confidence", affirmation: "I take initiative to create my life the way I want it." },
    { question: "What's been the biggest challenge so far?", word: "Determination", affirmation: "People are catalysts not barriers to success." },
    { question: "If you were at your best, what would you do right now?", word: "Joyfulness", affirmation: "The purpose of my life is Joy." },
    { question: "If you did know the solution, what would it look like?", word: "Cooperation", affirmation: "All good things happen to me at the right time." },
    { question: "What are all the different ways in which you could approach this issue?", word: "Dependability", affirmation: "Almost anything is possible." },
    { question: "What would be something you would consider challenging in order to double your productivity/performance/efficiency?", word: "Tact", affirmation: "Everything will turn out all right." },
    { question: "So, what's possible here?", word: "Stability", affirmation: "There is a lot of opportunity out there." },
    { question: "What is one thing you could do this week that would clearly demonstrate your commitment to your goal?", word: "Wonder", affirmation: "All good things happen to me at the right time." },
    { question: "What would doubling your effectiveness look like?", word: "Gratitude", affirmation: "I love myself unconditionally." },
    { question: "How is the current situation serving you? What are you learning?", word: "Modesty", affirmation: "All the joy I need is within me now." },
    { question: "What would you do if you could start again, with a clean sheet?", word: "Kindness", affirmation: "I love and approve of myself." },
    { question: "What will happen if you think outside the box here?", word: "Truthfulness", affirmation: "Everything will turn out all right." },
    { question: "What is standing in the way of your success?", word: "Trustworthiness", affirmation: "I can always learn what I need to know." },
    { question: "Think of someone you truly respect and admire. How would they look differently at this situation?", word: "Abundance", affirmation: "I love and accept my body as it is and as it changes." },
    { question: "How much control do you personally have over the outcome?", word: "Faith", affirmation: "I now enjoy the universal abundance in my life." },
    { question: "If you were to look above the situation, what would you see?", word: "Creativity", affirmation: "MAP is not the territory." },
    { question: "What will it take for you to make it happen?", word: "Calmness", affirmation: "I am grateful for everything in my life." },
    { question: "What are three actions you could take that would make sense in this situation?", word: "Balance", affirmation: "I can always learn what I need to know." },
    { question: "What would you do now if you knew you wouldn't fail?", word: "Challenge", affirmation: "I flow with life and I am one with life." },
    { question: "What resources do you already have? Skill, time, enthusiasm, money, support, etc.?", word: "Compassion", affirmation: "I choose to believe that my life is an incredible gift." },
    { question: "What obstacles are you going to run into?", word: "Beauty", affirmation: "I deeply appreciate and accept myself." },
    { question: "What's stopping it from changing?", word: "Moderation", affirmation: "I am flexible and open to change in every aspect of my life." },
    { question: "To move forward, what do you need to believe in?", word: "Justice", affirmation: "I am grateful for everything in my life." },
    { question: "What steps are you missing in order to be successful?", word: "Humility", affirmation: "I am filled with divine love and give it to all beings in all circumstances." },
    { question: "What else has contributed to your success so far?", word: "Courage", affirmation: "I actively embrace the opportunities that come with change." },
    { question: "What other benefits would it give you?", word: "Integrity", affirmation: "I am a Creator. I create with my every thought." },
    { question: "What needs to happen in order for you to move forward?", word: "Purity", affirmation: "I have untapped abilities waiting to be discovered." },
    { question: "What is your main concern here?", word: "Openness", affirmation: "There is abundance of everything in my life." },
    { question: "How could you make the tasks/actions more enjoyable or fun?", word: "Obedience", affirmation: "I can make a difference." },
    { question: "What would the wisest person you know do in this situation?", word: "Equality", affirmation: "The world is a beautiful place." },
    { question: "What could you do that would be uncomfortable for you but would cause a breakthrough and move you forward?", word: "Generosity", affirmation: "I can make a difference." },
    { question: "Describe the perfect situation you would like to be in.", word: "Enthusiasm", affirmation: "Success comes easily to me." },
    { question: "How committed are you?", word: "Diversity", affirmation: "I am powerful in every way." },
    { question: "What are the real possibilities that you could see happening in the next few weeks?", word: "Discipline", affirmation: "It's not too late to start." },
    { question: "What is an impossible option?", word: "Thankfulness", affirmation: "I attract success in all areas of my life." },
    { question: "What will the impact be if you do what you plan to do?", word: "Tolerance", affirmation: "Almost anything is possible." },
    { question: "Okay, but if you could, how would you do it?", word: "Trust", affirmation: "MAP is not the territory." },
    { question: "How is the current situation serving you? What are you learning?", word: "Respect", affirmation: "I now attract abundance in my life." },
    { question: "From whom could you seek advice?", word: "Peacefulness", affirmation: "I have untapped abilities waiting to be discovered." },
    { question: "What are the three new positive habits that you would like to have, starting from today?", word: "Patience", affirmation: "I am flexible and open to change in every aspect of my life." },
    { question: "What, if any, internal obstacles or personal resistances do you have that are stopping you from taking action?", word: "Simplicity", affirmation: "I am truly happy to be me." },
    { question: "What's stopping it from changing?", word: "Perseverance", affirmation: "My Higher Self loves me." },
    { question: "What and how great is your concern about it?", word: "Reverence", affirmation: "I am Happiness." },
    { question: "Make a list of all the alternatives, large or small, complete and partial solutions. What else could you do?", word: "Responsibility", affirmation: "I know my wisdom guides me to the right decision." },
    { question: "What needs to happen for you to feel comfortable that the situation is moving forward?", word: "Discernment", affirmation: "I know that I have the knowledge and resources to achieve my dreams." },
    { question: "What is the present situation in more detail?", word: "Diligence", affirmation: "I take initiative to create my life the way I want it." },
    { question: "What do you think is needed to make your goal possible?", word: "Commitment", affirmation: "The world is a beautiful place." },
    { question: "What would be the smallest or easiest first step for you?", word: "Caring", affirmation: "Perseverance and hard work eventually pay off." },
    { question: "Who is affected by this issue other than you?", word: "Assertiveness", affirmation: "It's not too late to start." },
    { question: "What is the decision you have been avoiding?", word: "Purpose", affirmation: "All the peace I need is within me now." },
    { question: "What would give you the most satisfaction?", word: "Order", affirmation: "People are catalysts not barriers to success." },
    { question: "What are you NOT saying/doing?", word: "Loyalty", affirmation: "I am Happiness." },
    { question: "How can this be different tomorrow?", word: "Friendliness", affirmation: "I know my wisdom guides me to the right decision." },
    { question: "Who else has some control over it and how much?", word: "Helpfulness", affirmation: "I am happy anyways." },
    { question: "How meaningful is it to you?", word: "Love", affirmation: "I am filled with divine love and give it to all beings in all circumstances." },
    { question: "What are you grateful for in this moment?", word: "Acceptance", affirmation: "Perseverance and hard work eventually pay off." },
    { question: "What would (someone who inspires you) do in your situation?", word: "Contribution", affirmation: "I am in charge of my life." },
    { question: "What is the #1 strength you need in order to make things happen?", word: "Courtesy", affirmation: "All the love I need is within me now." },
    { question: "What's the first step you can take to make this happen?", word: "Contentment", affirmation: "The purpose of my life is Joy." },
    { question: "What are the priorities in this situation?", word: "Detachment", affirmation: "Everyone I meet is a best friend I don't know yet." },
    { question: "Who else could you ask for help in achieving your goal?", word: "Gentleness", affirmation: "I trust myself to manage money honestly and sensibly." },
    { question: "What additional resources will you need? Where will you get them from?", word: "Mercy", affirmation: "I am grateful to be alive." },
    { question: "What are you afraid of about this situation?", word: "Honor", affirmation: "I trust myself to manage money honestly and sensibly." },
    { question: "What would you need to change or do differently to achieve better results?", word: "Honesty", affirmation: "I love and approve of myself." },
    { question: "What would be easy for you to do? What would be a stretch for you?", word: "Humour", affirmation: "I am loved by others." },
    { question: "What gifts do you have that you are not using or acknowledging?", word: "Grace", affirmation: "I am worthy of love and success in my life." },
    { question: "What obstacles will need to be overcome on the way?", word: "Reliability", affirmation: "I am grateful to be alive." },
    { question: "What do you have already (eg, skills and resources) that could move you forwards?", word: "Service", affirmation: "All the wisdom, compassion I need is within me now." },
    { question: "What is your Higher-Self telling you?", word: "Selflessness", affirmation: "People are catalysts not barriers to success." },
    { question: "Which of these solutions appeals to you most, or feels best to you?", word: "Passion", affirmation: "People are inherently good." },
    { question: "If anything, and everything was possible, what would you do?", word: "Idealism", affirmation: "Everything happens for a reason." },
    { question: "What would it take to change your mind and move on?", word: "Wisdom", affirmation: "I am a powerful body, a powerful mind and a powerful soul." },
    { question: "What is the positive side of this situation?", word: "Understanding", affirmation: "I am a Creator. I create with my every thought." }
  ];

  // DOM Elements
  const cardEl = document.getElementById("llCard");
  const questionEl = document.getElementById("llQuestion");
  const lifeWordEl = document.getElementById("llLifeWord");
  const affirmationEl = document.getElementById("llAffirmation");
  const cardIndexEl = document.getElementById("llCardIndex");
  const cardTotalEl = document.getElementById("llCardTotal");
  const statusEl = document.getElementById("llStatus");
  const shuffleBtn = document.getElementById("llShuffleBtn");
  const pullBtn = document.getElementById("llPullBtn");
  const flipBtn = document.getElementById("llFlipBtn");
  const copyBtn = document.getElementById("llCopyBtn");
  const progressFill = document.getElementById("llProgressFill");

  if (!cardEl) return;

  if (cardTotalEl) cardTotalEl.textContent = cards.length;

  let currentIndex = null;
  let deckOrder = [];
  let nextPointer = 0;

  function flipCard() {
    cardEl.classList.toggle("flipped");
    updateFlipBtnState();
  }

  function showFront() {
    if (!cardEl.classList.contains("flipped")) {
      cardEl.classList.add("flipped");
    }
    updateFlipBtnState();
  }

  function showBack() {
    if (cardEl.classList.contains("flipped")) {
      cardEl.classList.remove("flipped");
    }
    updateFlipBtnState();
  }

  function updateFlipBtnState() {
    if (!flipBtn) return;
    const isFlipped = cardEl.classList.contains("flipped");
    flipBtn.innerHTML = isFlipped
      ? '<span class="icon">flip_to_back</span> Flip to Back'
      : '<span class="icon">flip_to_front</span> Flip Card';
  }

  function updateProgressBar() {
    if (!progressFill) return;
    if (nextPointer === 0) {
      progressFill.style.width = '0%';
    } else {
      const pct = Math.round((nextPointer / cards.length) * 100);
      progressFill.style.width = `${pct}%`;
    }
  }

  function renderCard(index) {
    const c = cards[index];
    if (questionEl) questionEl.textContent = c.question;
    if (lifeWordEl) lifeWordEl.textContent = c.word;
    if (affirmationEl) affirmationEl.textContent = c.affirmation;
    if (cardIndexEl) cardIndexEl.textContent = index + 1;
    if (copyBtn) copyBtn.disabled = false;
  }

  function shuffleDeck() {
    // Add visual shuffle shake
    cardEl.classList.add("shuffling");
    setTimeout(() => cardEl.classList.remove("shuffling"), 500);

    deckOrder = Array.from({ length: cards.length }, (_, i) => i);
    for (let i = deckOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckOrder[i], deckOrder[j]] = [deckOrder[j], deckOrder[i]];
    }
    nextPointer = 0;
    currentIndex = null;

    showBack();

    if (cardIndexEl) cardIndexEl.textContent = "-";
    if (questionEl) questionEl.textContent = "Deck shuffled. Now pull a card.";
    if (lifeWordEl) lifeWordEl.textContent = "";
    if (affirmationEl) affirmationEl.textContent = "Click 'Pull Card' to draw from the shuffled deck.";
    if (pullBtn) pullBtn.disabled = false;
    if (copyBtn) copyBtn.disabled = true;
    if (statusEl) statusEl.textContent = "Deck randomized. Press 'Pull Card' to draw.";
    updateProgressBar();
  }

  function pullCard() {
    if (deckOrder.length === 0) {
      shuffleDeck();
    }
    if (nextPointer >= deckOrder.length) {
      nextPointer = 0;
    }

    currentIndex = deckOrder[nextPointer];
    nextPointer++;

    renderCard(currentIndex);
    showFront();

    if (statusEl) {
      statusEl.textContent = `Card ${nextPointer} of ${cards.length} pulled. Reflect on the question and affirmation.`;
    }
    updateProgressBar();
  }

  function copyPromptToClipboard() {
    if (currentIndex === null) return;
    const c = cards[currentIndex];
    const textToCopy = `LEAP LIMITLESS - LIFE CHANGERS PROMPT\nQuality: ${c.word}\nQuestion: ${c.question}\nAffirmation: ${c.affirmation}\nhttps://leaplimitless.com/lc/`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span class="icon">check</span> Copied!';
      copyBtn.classList.add('btn-copied');
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove('btn-copied');
      }, 2000);
    }).catch(() => {
      // Fallback
      if (statusEl) statusEl.textContent = "Prompt ready for reflection.";
    });
  }

  // Event Listeners
  if (shuffleBtn) shuffleBtn.addEventListener("click", shuffleDeck);
  if (pullBtn) pullBtn.addEventListener("click", pullCard);
  if (flipBtn) flipBtn.addEventListener("click", flipCard);
  if (copyBtn) copyBtn.addEventListener("click", copyPromptToClipboard);
  if (cardEl) cardEl.addEventListener("click", flipCard);

  // Keyboard accessibility
  window.addEventListener("keydown", (e) => {
    // Only if target is not an input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.code === 'Space') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      pullCard();
    }
  });

})();
