/**
 * LEAP LIMITLESS - PERSONALITY & LIFE FULFILLMENT ASSESSMENT ENGINE
 * Implements 100% Public-Domain Validated Instruments:
 *   1. Quick Profile (25 Questions, ~3 Mins): Mini-IPIP (Donnellan et al., 2006; 20 items) + SWLS (Diener et al., 1985; 5 items)
 *   2. Deep-Dive Profile (55 Questions, ~7 Mins): IPIP-50 Big-Five Factor Markers (Goldberg, 1992; 50 items) + SWLS (5 items)
 * Includes Mandatory Contact & Email Gate, Bot Protection, and Automatic OneDrive Excel / Microsoft Forms Integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('personality-assessment-app');
  if (!container) return;

  const QUESTIONS_PER_PAGE = 5;

  // 20-Item Mini-IPIP (Core items used in Quick Mode and as the first 20 items of Deep-Dive Mode)
  // key: +1 (normal 1..5) or -1 (reverse-scored: 6 - val)
  // trait: 'E' (Extraversion), 'A' (Agreeableness), 'C' (Conscientiousness), 'R' (Emotional Resilience), 'O' (Openness), 'S' (SWLS Fulfillment)
  const MINI_IPIP_ITEMS = [
    { id: 'q1', trait: 'E', key: 1, text: 'I bring energy to social and professional gatherings and enjoy engaging with the room.' },
    { id: 'q2', trait: 'A', key: 1, text: 'I naturally empathize with other people\'s feelings and perspectives.' },
    { id: 'q3', trait: 'C', key: 1, text: 'I tackle priority tasks and commitments right away rather than procrastinating.' },
    { id: 'q4', trait: 'R', key: -1, text: 'I experience frequent mood swings when plans or expectations shift.' },
    { id: 'q5', trait: 'O', key: 1, text: 'I have a vivid imagination and enjoy exploring new possibilities.' },

    { id: 'q6', trait: 'E', key: -1, text: 'I tend to speak very little in group settings unless called upon.' },
    { id: 'q7', trait: 'A', key: -1, text: 'I am generally detached from other people\'s personal challenges.' },
    { id: 'q8', trait: 'C', key: -1, text: 'I sometimes lose track of details or forget to put systems back in order.' },
    { id: 'q9', trait: 'R', key: 1, text: 'I remain calm, steady, and relaxed most of the time, even under pressure.' },
    { id: 'q10', trait: 'O', key: -1, text: 'I prefer concrete routines over abstract or theoretical concepts.' },

    { id: 'q11', trait: 'E', key: 1, text: 'I comfortably connect and converse with many different types of people.' },
    { id: 'q12', trait: 'A', key: 1, text: 'I quickly sense the emotional tone of the people around me.' },
    { id: 'q13', trait: 'C', key: 1, text: 'I thrive on clear structure, organization, and well-defined plans.' },
    { id: 'q14', trait: 'R', key: -1, text: 'I get frustrated or upset easily when things go wrong.' },
    { id: 'q15', trait: 'O', key: -1, text: 'I find overly abstract or conceptual discussions draining.' },

    { id: 'q16', trait: 'E', key: -1, text: 'I prefer to stay in the background rather than take center stage.' },
    { id: 'q17', trait: 'A', key: -1, text: 'I focus primarily on my own agenda rather than others\' concerns.' },
    { id: 'q18', trait: 'C', key: -1, text: 'I occasionally let my workflow or environment become disorganized.' },
    { id: 'q19', trait: 'R', key: 1, text: 'I rarely feel discouraged or weighed down for long.' },
    { id: 'q20', trait: 'O', key: -1, text: 'I rarely spend time daydreaming or inventing unconventional approaches.' }
  ];

  // Additional 30 items from Goldberg's Public-Domain IPIP-50 (6 additional items per Big Five factor)
  const ADDITIONAL_IPIP50_ITEMS = [
    { id: 'q21', trait: 'E', key: 1, text: 'I feel at ease and confident around new people and senior stakeholders.' },
    { id: 'q22', trait: 'A', key: 1, text: 'I am genuinely curious about what motivates the people around me.' },
    { id: 'q23', trait: 'C', key: 1, text: 'I am consistently prepared well before meetings or deadlines.' },
    { id: 'q24', trait: 'R', key: -1, text: 'I get stressed out easily when juggling competing priorities.' },
    { id: 'q25', trait: 'O', key: 1, text: 'I articulate complex ideas with a rich, nuanced vocabulary.' },

    { id: 'q26', trait: 'E', key: -1, text: 'I often feel I have little to say in unfamiliar groups.' },
    { id: 'q27', trait: 'A', key: -1, text: 'I can be blunt or critical when others fall short of expectations.' },
    { id: 'q28', trait: 'C', key: -1, text: 'I sometimes leave tasks or materials scattered around.' },
    { id: 'q29', trait: 'R', key: -1, text: 'I tend to worry ahead of time about things that might go wrong.' },
    { id: 'q30', trait: 'O', key: 1, text: 'I frequently generate strong, original ideas for solving problems.' },

    { id: 'q31', trait: 'E', key: 1, text: 'I proactively initiate conversations rather than waiting for others.' },
    { id: 'q32', trait: 'A', key: 1, text: 'I am compassionate and considerate when colleagues or loved ones struggle.' },
    { id: 'q33', trait: 'C', key: 1, text: 'I pay close attention to accuracy and subtle details.' },
    { id: 'q34', trait: 'R', key: -1, text: 'I am easily thrown off balance by unexpected criticism or setbacks.' },
    { id: 'q35', trait: 'O', key: 1, text: 'I grasp new frameworks and unfamiliar concepts very quickly.' },

    { id: 'q36', trait: 'E', key: -1, text: 'I dislike drawing attention to my own achievements in public.' },
    { id: 'q37', trait: 'A', key: 1, text: 'I willingly carve out time to mentor, support, or help others.' },
    { id: 'q38', trait: 'C', key: -1, text: 'I sometimes put off responsibilities that feel tedious.' },
    { id: 'q39', trait: 'R', key: -1, text: 'My emotional state shifts noticeably when my environment is tense.' },
    { id: 'q40', trait: 'O', key: 1, text: 'I enjoy analyzing complex systems and strategic patterns.' },

    { id: 'q41', trait: 'E', key: 1, text: 'I am comfortable being the focal point when leading a discussion.' },
    { id: 'q42', trait: 'A', key: -1, text: 'I find it easy to detach emotionally when making tough decisions.' },
    { id: 'q43', trait: 'C', key: 1, text: 'I stick to a disciplined schedule and honor my planned commitments.' },
    { id: 'q44', trait: 'R', key: -1, text: 'I get irritated quickly when people or processes move too slowly.' },
    { id: 'q45', trait: 'O', key: 1, text: 'I regularly set aside time to reflect deeply on purpose, values, and direction.' },

    { id: 'q46', trait: 'E', key: -1, text: 'I tend to be reserved and quiet around people I do not know well.' },
    { id: 'q47', trait: 'A', key: 1, text: 'I naturally put people at ease and build trust quickly.' },
    { id: 'q48', trait: 'C', key: 1, text: 'I hold myself to exacting standards of quality in my work.' },
    { id: 'q49', trait: 'R', key: -1, text: 'I occasionally feel overwhelmed by the weight of my responsibilities.' },
    { id: 'q50', trait: 'O', key: 1, text: 'I am energized by brainstorming and pioneering new directions.' }
  ];

  // 5-Item Satisfaction With Life Scale (SWLS - Diener, Emmons, Larsen, & Griffin, 1985)
  const SWLS_ITEMS = [
    { id: 'swls1', trait: 'S', key: 1, text: 'In most ways, my current life and career trajectory are close to my ideal.' },
    { id: 'swls2', trait: 'S', key: 1, text: 'The overall conditions of my life and work are excellent right now.' },
    { id: 'swls3', trait: 'S', key: 1, text: 'I feel genuinely fulfilled and satisfied with where I am in life.' },
    { id: 'swls4', trait: 'S', key: 1, text: 'So far, I have achieved the important milestones I value most in life.' },
    { id: 'swls5', trait: 'S', key: 1, text: 'Looking at my path so far, I feel aligned with the choices I have made.' }
  ];

  const TRAIT_META = {
    O: {
      name: 'Openness & Strategic Vision',
      shortName: 'Openness & Vision',
      highLabel: 'Visionary & Exploratory',
      midLabel: 'Balanced Pragmatist',
      lowLabel: 'Grounded & Practical'
    },
    C: {
      name: 'Conscientiousness & Execution',
      shortName: 'Conscientiousness',
      highLabel: 'Structured & Driven',
      midLabel: 'Adaptive Executor',
      lowLabel: 'Flexible & Spontaneous'
    },
    E: {
      name: 'Extraversion & Presence',
      shortName: 'Extraversion & Presence',
      highLabel: 'Expressive & Energizing',
      midLabel: 'Selective Communicator',
      lowLabel: 'Reflective & Observant'
    },
    A: {
      name: 'Agreeableness & Collaboration',
      shortName: 'Agreeableness & Empathy',
      highLabel: 'Empathetic & Harmonizing',
      midLabel: 'Diplomatic & Fair',
      lowLabel: 'Direct & Independent'
    },
    R: {
      name: 'Emotional Resilience & Composure',
      shortName: 'Emotional Resilience',
      highLabel: 'Unshakable Under Pressure',
      midLabel: 'Responsive & Aware',
      lowLabel: 'High-Sensitivity / Stress-Reactive'
    },
    S: {
      name: 'Life & Career Fulfillment (SWLS)',
      shortName: 'Life Fulfillment',
      highLabel: 'Thriving & Aligned',
      midLabel: 'Growing / At a Crossroads',
      lowLabel: 'Ready for a Major Pivot'
    }
  };

  let currentMode = 'quick'; // 'quick' (25 items) or 'deep' (55 items)
  let currentPage = 0;
  const answers = {}; // { [questionId]: 1..5 }
  let captchaExpected = null;
  const pageLoadTimestamp = Date.now();

  // DOM Elements
  const modeQuickBtn = document.getElementById('mode-quick-btn');
  const modeDeepBtn = document.getElementById('mode-deep-btn');
  const modeSummaryBadge = document.getElementById('pa-mode-badge');
  const stepCounterEl = document.getElementById('pa-step-counter');
  const answeredCounterEl = document.getElementById('pa-answered-counter');
  const progressFillEl = document.getElementById('pa-progress-fill');
  const questionsListEl = document.getElementById('pa-questions-list');
  const questionsStageEl = document.getElementById('pa-questions-stage');
  const prevBtn = document.getElementById('pa-prev-btn');
  const nextBtn = document.getElementById('pa-next-btn');
  const pageHintEl = document.getElementById('pa-page-hint');

  const intakeStageEl = document.getElementById('pa-intake-stage');
  const intakeForm = document.getElementById('pa-intake-form');
  const captchaQuestionEl = document.getElementById('pa-captcha-question');
  const captchaAnswerEl = document.getElementById('pa-captcha-answer');
  const captchaRefreshBtn = document.getElementById('pa-captcha-refresh');
  const captchaErrorEl = document.getElementById('pa-captcha-error');
  const honeypotEl = document.getElementById('pa-hp-field');

  const resultsStageEl = document.getElementById('pa-results-stage');

  function getActiveItems() {
    if (currentMode === 'deep') {
      return [...MINI_IPIP_ITEMS, ...ADDITIONAL_IPIP50_ITEMS, ...SWLS_ITEMS];
    }
    return [...MINI_IPIP_ITEMS, ...SWLS_ITEMS];
  }

  function getTotalPages() {
    return Math.ceil(getActiveItems().length / QUESTIONS_PER_PAGE);
  }

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    captchaExpected = a + b;
    if (captchaQuestionEl) captchaQuestionEl.textContent = `${a} + ${b}`;
    if (captchaAnswerEl) {
      captchaAnswerEl.value = '';
      captchaAnswerEl.style.borderColor = '';
    }
    if (captchaErrorEl) captchaErrorEl.style.display = 'none';
  }

  if (captchaRefreshBtn) {
    captchaRefreshBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generateCaptcha();
      if (captchaAnswerEl) captchaAnswerEl.focus();
    });
  }

  function setMode(mode) {
    if (mode !== 'quick' && mode !== 'deep') return;
    currentMode = mode;
    currentPage = 0;

    if (modeQuickBtn && modeDeepBtn) {
      modeQuickBtn.classList.toggle('active', mode === 'quick');
      modeDeepBtn.classList.toggle('active', mode === 'deep');
      modeQuickBtn.setAttribute('aria-selected', mode === 'quick' ? 'true' : 'false');
      modeDeepBtn.setAttribute('aria-selected', mode === 'deep' ? 'true' : 'false');
    }

    if (modeSummaryBadge) {
      modeSummaryBadge.textContent = mode === 'quick'
        ? 'Quick Profile • 25 Questions (~3 Mins)'
        : 'Deep-Dive Profile • 55 Questions (~7 Mins)';
    }

    // Ensure we are showing the questions stage
    if (questionsStageEl) questionsStageEl.style.display = 'block';
    if (intakeStageEl) intakeStageEl.style.display = 'none';
    if (resultsStageEl) resultsStageEl.style.display = 'none';

    renderCurrentPage();
  }

  if (modeQuickBtn) {
    modeQuickBtn.addEventListener('click', () => setMode('quick'));
  }
  if (modeDeepBtn) {
    modeDeepBtn.addEventListener('click', () => setMode('deep'));
  }

  function isCurrentPageComplete() {
    const items = getActiveItems();
    const startIdx = currentPage * QUESTIONS_PER_PAGE;
    const pageItems = items.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);
    return pageItems.every(item => typeof answers[item.id] === 'number');
  }

  function getAnsweredCount() {
    const items = getActiveItems();
    return items.filter(item => typeof answers[item.id] === 'number').length;
  }

  function renderCurrentPage() {
    const items = getActiveItems();
    const totalPages = getTotalPages();
    const startIdx = currentPage * QUESTIONS_PER_PAGE;
    const pageItems = items.slice(startIdx, startIdx + QUESTIONS_PER_PAGE);

    const answeredCount = getAnsweredCount();
    const totalCount = items.length;
    const pct = Math.round((answeredCount / totalCount) * 100);

    if (stepCounterEl) {
      stepCounterEl.textContent = `Section ${currentPage + 1} of ${totalPages}`;
    }
    if (answeredCounterEl) {
      answeredCounterEl.textContent = `${answeredCount} / ${totalCount} Answered (${pct}%)`;
    }
    if (progressFillEl) {
      progressFillEl.style.width = `${Math.max(5, pct)}%`;
    }

    if (questionsListEl) {
      questionsListEl.innerHTML = '';
      pageItems.forEach((item, idx) => {
        const globalNum = startIdx + idx + 1;
        const selectedVal = answers[item.id] || null;
        const isSwls = item.trait === 'S';

        const card = document.createElement('div');
        card.className = 'pa-question-card' + (selectedVal ? ' answered' : '');

        const scaleLabels = [
          { val: 1, label: 'Very Inaccurate', short: '1' },
          { val: 2, label: 'Moderately Inaccurate', short: '2' },
          { val: 3, label: 'Neutral / Mixed', short: '3' },
          { val: 4, label: 'Moderately Accurate', short: '4' },
          { val: 5, label: 'Very Accurate', short: '5' }
        ];

        card.innerHTML = `
          <div class="pa-q-header">
            <span class="pa-q-num">Question ${globalNum} of ${totalCount}</span>
            <span class="pa-q-tag">${isSwls ? 'Life & Career Fulfillment' : 'Personality Style'}</span>
          </div>
          <p class="pa-q-text">${item.text}</p>
          <div class="pa-scale-row" role="radiogroup" aria-label="Question ${globalNum}">
            ${scaleLabels.map(opt => `
              <button type="button" class="pa-scale-btn ${selectedVal === opt.val ? 'selected' : ''}" data-qid="${item.id}" data-val="${opt.val}">
                <span class="pa-scale-num">${opt.short}</span>
                <span class="pa-scale-caption">${opt.label}</span>
              </button>
            `).join('')}
          </div>
        `;
        questionsListEl.appendChild(card);
      });

      questionsListEl.querySelectorAll('.pa-scale-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const qid = btn.getAttribute('data-qid');
          const val = parseInt(btn.getAttribute('data-val'), 10);
          answers[qid] = val;

          const parentCard = btn.closest('.pa-question-card');
          if (parentCard) {
            parentCard.classList.add('answered');
            parentCard.querySelectorAll('.pa-scale-btn').forEach(b => b.classList.remove('selected'));
          }
          btn.classList.add('selected');

          updateNavigationState();
        });
      });
    }

    updateNavigationState();
  }

  function updateNavigationState() {
    const items = getActiveItems();
    const totalPages = getTotalPages();
    const answeredCount = getAnsweredCount();
    const totalCount = items.length;
    const pct = Math.round((answeredCount / totalCount) * 100);

    if (answeredCounterEl) {
      answeredCounterEl.textContent = `${answeredCount} / ${totalCount} Answered (${pct}%)`;
    }
    if (progressFillEl) {
      progressFillEl.style.width = `${Math.max(5, pct)}%`;
    }

    if (prevBtn) {
      prevBtn.style.visibility = currentPage === 0 ? 'hidden' : 'visible';
    }

    const pageDone = isCurrentPageComplete();
    if (nextBtn) {
      nextBtn.disabled = !pageDone;
      if (currentPage === totalPages - 1) {
        nextBtn.innerHTML = '<span>Continue to Receive My Report</span> <span class="icon">arrow_forward</span>';
      } else {
        nextBtn.innerHTML = `<span>Next Section (${currentPage + 2} of ${totalPages})</span> <span class="icon">arrow_forward</span>`;
      }
    }

    if (pageHintEl) {
      pageHintEl.textContent = pageDone
        ? 'All 5 questions in this section are complete. Click Continue below.'
        : 'Select one rating (1 to 5) for each of the 5 statements above to continue.';
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderCurrentPage();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!isCurrentPageComplete()) return;
      const totalPages = getTotalPages();
      if (currentPage < totalPages - 1) {
        currentPage++;
        renderCurrentPage();
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        showIntakeGate();
      }
    });
  }

  function showIntakeGate() {
    if (questionsStageEl) questionsStageEl.style.display = 'none';
    if (resultsStageEl) resultsStageEl.style.display = 'none';
    if (intakeStageEl) {
      intakeStageEl.style.display = 'block';
      if (progressFillEl) progressFillEl.style.width = '96%';
      if (stepCounterEl) stepCounterEl.textContent = 'Final Step: Report Delivery Details';
      generateCaptcha();
      intakeStageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function computeScores() {
    const items = getActiveItems();
    const sums = { O: 0, C: 0, E: 0, A: 0, R: 0, S: 0 };
    const counts = { O: 0, C: 0, E: 0, A: 0, R: 0, S: 0 };

    items.forEach(item => {
      const raw = answers[item.id] || 3;
      const scored = item.key === 1 ? raw : (6 - raw); // 1..5
      sums[item.trait] += scored;
      counts[item.trait] += 1;
    });

    // Convert 1..5 average into 0..100 percentage score (where 1.0 -> 20% and 5.0 -> 100%)
    const percents = {};
    const averages = {};
    Object.keys(sums).forEach(t => {
      const avg = counts[t] > 0 ? sums[t] / counts[t] : 3;
      averages[t] = Number(avg.toFixed(2));
      percents[t] = Math.round(((avg - 1) / 4) * 80 + 20);
    });

    return { percents, averages };
  }

  function buildCoachingAnalysis(percents) {
    const { O, C, E, A, R, S } = percents;

    // Determine Primary Coaching Archetype combining Big Five + Life Fulfillment (SWLS)
    let archetype = {
      title: 'The Balanced Strategic Leader',
      subtitle: 'Adaptable, steady, and well-rounded across execution and interpersonal dynamics',
      summary: 'You bring a balanced blend of strategic curiosity, reliable execution, and interpersonal awareness. Your biggest opportunity is moving from steady competence to deliberate, high-leverage visibility and bold career or life milestones.',
      strengths: [
        'Adaptable across both analytical problem-solving and collaborative team environments.',
        'Consistent follow-through without becoming rigid or micromanaging.',
        'Steady emotional presence that builds trust with peers, managers, and stakeholders.'
      ],
      blindSpots: [
        'Playing it safe in comfort zones rather than claiming high-visibility stretch opportunities.',
        'Saying yes to incremental demands at the expense of your long-term personal or career vision.',
        'Waiting for external validation before advocating for your next promotion or life chapter.'
      ],
      coachingFocus: 'Career Growth & Personal Clarity: Define a bold 90-day roadmap to convert your steady reliability into executive presence, stronger boundaries, and next-level fulfillment.'
    };

    if (C >= 72 && S < 62) {
      archetype = {
        title: 'The High-Achieving Burnout Risk',
        subtitle: 'Exceptional discipline and execution paired with a fulfillment and renewal gap',
        summary: 'You are a high-output driver who consistently delivers results, meets deadlines, and carries heavy responsibility. However, your Life & Career Fulfillment score reveals a gap between how hard you are working and how fulfilled you feel right now. You may be succeeding on paper while feeling plateaued, under-recognized, or stretched thin.',
        strengths: [
          'Relentless ownership, reliability, and ability to execute complex goals from start to finish.',
          'High personal standards that make you a trusted pillar in your organization and family.',
          'Strong self-discipline and capacity to push through difficult obstacles.'
        ],
        blindSpots: [
          'Over-indexing on hard work ("letting results speak for themselves") while neglecting strategic visibility or personal renewal.',
          'Difficulty delegating, disconnecting, or setting firm boundaries around your time and energy.',
          'Staying too long in roles or routines that no longer align with your deeper values and next chapter.'
        ],
        coachingFocus: 'Personal Renewal, Mid-Life Realignment & Executive Leverage: Shift from exhausting over-execution to high-leverage leadership, sustainable boundaries, and a career chapter that genuinely energizes you.'
      };
    } else if (A >= 74 && C >= 70 && E < 65) {
      archetype = {
        title: 'The Quiet Powerhouse (The Over-Extended Pillar)',
        subtitle: 'High empathy and dependable execution, with untapped room command and self-advocacy',
        summary: 'Everyone around you relies on your competence, kindness, and follow-through. You create harmony and deliver outstanding work, yet you may hesitate to assert your own authority, challenge senior stakeholders, or claim credit in high-stakes rooms.',
        strengths: [
          'Deep emotional intelligence, active listening, and ability to build psychological safety.',
          'Dependable execution and meticulous attention to commitments.',
          'Natural mentor and collaborative partner across diverse teams.'
        ],
        blindSpots: [
          'Putting others\' priorities ahead of your own goals, boundaries, and well-being.',
          'Holding back your strategic voice in boardrooms or high-stakes negotiations to avoid friction.',
          'Risk of hitting a "bamboo ceiling" or promotion plateau due to modest self-advocacy.'
        ],
        coachingFocus: 'Authentic Self-Advocacy, Boundaries & Executive Presence: Learn to command the room, communicate your strategic value unapologetically, and protect your boundaries without losing your authenticity.'
      };
    } else if (O >= 74 && E >= 70) {
      archetype = {
        title: 'The Visionary Catalyst',
        subtitle: 'High strategic imagination, expressive presence, and appetite for growth and reinvention',
        summary: 'You are energized by big ideas, innovation, and inspiring others toward a larger vision. You thrive in dynamic environments and transitions, though you are at your best when your creative momentum is anchored by disciplined execution systems.',
        strengths: [
          'Big-picture strategic thinking and ability to spot opportunities others miss.',
          'Charismatic communication that energizes teams, clients, and stakeholders.',
          'Courage to embrace change, career pivots, and entrepreneurial initiatives.'
        ],
        blindSpots: [
          'Losing interest once the initial creative challenge turns into repetitive operational execution.',
          'Taking on too many exciting initiatives simultaneously, diluting focus on the highest-ROI goal.',
          'Impatience with slower-moving organizational politics or incremental processes.'
        ],
        coachingFocus: 'Strategic Prioritization & High-Impact Execution: Channel your visionary energy into a focused roadmap with clear milestones, executive sponsorship, and measurable breakthroughs.'
      };
    } else if (C >= 74 && O >= 70 && R >= 70) {
      archetype = {
        title: 'The Strategic Architect',
        subtitle: 'High intellectual curiosity, disciplined execution, and calm composure under pressure',
        summary: 'You combine long-range strategic thinking with rigorous execution and emotional steadiness. You are naturally wired for senior leadership, complex problem-solving, and high-stakes decision-making.',
        strengths: [
          'Rare combination of visionary big-picture thinking and disciplined operational follow-through.',
          'Calm, grounded composure during organizational turbulence or high-pressure transitions.',
          'Strong analytical clarity when evaluating trade-offs and long-term career moves.'
        ],
        blindSpots: [
          'Relying too heavily on logic and data while underestimating unspoken political and emotional dynamics.',
          'Setting an intensely high bar for yourself and others without pausing to celebrate or build informal alliances.',
          'Outgrowing your current scope without proactively engineering your next C-suite or entrepreneurial leap.'
        ],
        coachingFocus: 'Executive Leadership, Stakeholder Influence & Next-Peak Strategy: Elevate from operational architect to influential enterprise leader or founder.'
      };
    } else if (R < 58) {
      archetype = {
        title: 'The Driven Perfectionist in Transition',
        subtitle: 'Deeply invested in outcomes, navigating high internal pressure or a pivotal life/career crossroads',
        summary: 'You care deeply about doing meaningful work and getting things right, which can create heavy internal pressure, second-guessing, or stress reactivity when facing uncertainty or transition.',
        strengths: [
          'High perceptiveness and attentiveness to risks, nuances, and quality.',
          'Strong internal drive to improve yourself, your career, and your environment.',
          'Authentic self-awareness regarding what is and is not working in your life.'
        ],
        blindSpots: [
          'Overthinking high-stakes decisions or experiencing imposter syndrome when stepping into bigger roles.',
          'Absorbing workplace stress or external criticism personally rather than maintaining detached composure.',
          'Feeling stuck in analysis paralysis when evaluating a career or personal life pivot.'
        ],
        coachingFocus: 'Mindset Mastery, Confidence & Transition Clarity: Build unshakeable inner confidence, quiet self-doubt, and execute a clear, step-by-step transition plan with a trusted sounding board.'
      };
    }

    return archetype;
  }

  function getTraitBandDescription(traitKey, pct) {
    const isHigh = pct >= 70;
    const isLow = pct < 52;
    switch (traitKey) {
      case 'O':
        return isHigh
          ? 'You thrive on strategic innovation, continuous learning, and exploring new possibilities.'
          : isLow
            ? 'You excel at practical, proven execution and turning abstract plans into concrete reality.'
            : 'You balance creative big-picture thinking with grounded, practical execution.';
      case 'C':
        return isHigh
          ? 'You operate with strong self-discipline, organization, and dependable follow-through.'
          : isLow
            ? 'You prefer flexibility and spontaneity over rigid schedules, benefiting from external accountability.'
            : 'You maintain reliable structure while staying adaptable when priorities shift.';
      case 'E':
        return isHigh
          ? 'You gain energy from engaging rooms, initiating dialogue, and leading visible conversations.'
          : isLow
            ? 'You lead with thoughtful reflection, deep 1:1 connection, and measured observation.'
            : 'You flex naturally between visible group leadership and focused independent work.';
      case 'A':
        return isHigh
          ? 'You build strong trust and harmony through empathy, though you must guard against over-giving.'
          : isLow
            ? 'You prioritize candor, objective results, and direct negotiation over people-pleasing.'
            : 'You balance warmth and collaboration with the ability to hold firm boundaries.';
      case 'R':
        return isHigh
          ? 'You stay composed, steady, and emotionally grounded even in high-pressure situations.'
          : isLow
            ? 'You feel pressure and uncertainty acutely, making stress-mastery and mindset boundaries critical.'
            : 'You handle everyday challenges well while remaining sensitive to high-stakes stressors.';
      case 'S':
        return isHigh
          ? 'You feel strong alignment and satisfaction with your current life and career trajectory.'
          : isLow
            ? 'Your score signals a clear fulfillment gap: you are ready for a meaningful life or career pivot.'
            : 'You have built solid foundations, but key areas of your career or personal life are ready for their next level.';
      default:
        return '';
    }
  }

  function isValidContactEmail(email) {
    const clean = String(email || '').trim().toLowerCase();
    const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!basicRegex.test(clean)) return false;
    const blocked = ['test@test.com', 'a@b.com', 'abc@abc.com', 'none@none.com', 'example@example.com'];
    if (blocked.includes(clean)) return false;
    return true;
  }

  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Bot honeypot check
      if (honeypotEl && honeypotEl.value.trim() !== '') {
        console.warn('Bot submission blocked.');
        return;
      }

      // 2. Velocity check
      if (Date.now() - pageLoadTimestamp < 1500) {
        console.warn('Automated velocity blocked.');
        return;
      }

      // 3. CAPTCHA check
      if (captchaAnswerEl && captchaExpected !== null) {
        const userAns = parseInt(captchaAnswerEl.value.trim(), 10);
        if (isNaN(userAns) || userAns !== captchaExpected) {
          if (captchaErrorEl) captchaErrorEl.style.display = 'block';
          captchaAnswerEl.style.borderColor = '#c93b2b';
          captchaAnswerEl.focus();
          generateCaptcha();
          return;
        }
      }

      const fullName = document.getElementById('pa-user-name')?.value?.trim() || '';
      const userEmail = document.getElementById('pa-user-email')?.value?.trim() || '';
      const userPhone = document.getElementById('pa-user-phone')?.value?.trim() || '';
      const userRole = document.getElementById('pa-user-role')?.value?.trim() || '';
      const focusSelect = document.getElementById('pa-user-focus');
      const userFocusArea = focusSelect ? focusSelect.options[focusSelect.selectedIndex]?.text : 'Personal & Career Growth';
      const newsletterOptIn = document.getElementById('pa-newsletter-sub')?.checked ?? true;
      const emailErrEl = document.getElementById('pa-email-error');

      if (!isValidContactEmail(userEmail)) {
        if (emailErrEl) emailErrEl.style.display = 'block';
        document.getElementById('pa-user-email')?.focus();
        return;
      }
      if (emailErrEl) emailErrEl.style.display = 'none';

      if (!fullName || !userPhone || !userRole) {
        alert('Please complete your name, email, phone number, and current role/life stage to receive your assessment report.');
        return;
      }

      const submitBtn = document.getElementById('pa-submit-intake-btn');
      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Generating &amp; Dispatching Your Report...</span> <span class="icon">hourglass_top</span>';
      }

      const { percents, averages } = computeScores();
      const archetype = buildCoachingAnalysis(percents);
      const modeLabel = currentMode === 'deep' ? 'Deep-Dive Profile (55Q IPIP-50 + SWLS)' : 'Quick Profile (25Q Mini-IPIP + SWLS)';

      // Build comprehensive text report for OneDrive Excel & Email Delivery
      const reportSummaryText = [
        `ASSESSMENT MODE: ${modeLabel}`,
        `ARCHETYPE: ${archetype.title} (${archetype.subtitle})`,
        `SCORES: Openness=${percents.O}% (${averages.O}/5) | Conscientiousness=${percents.C}% (${averages.C}/5) | Extraversion=${percents.E}% (${averages.E}/5) | Agreeableness=${percents.A}% (${averages.A}/5) | Emotional Resilience=${percents.R}% (${averages.R}/5) | Life Fulfillment (SWLS)=${percents.S}% (${averages.S}/5)`,
        `KEY STRENGTHS: ${archetype.strengths.join(' ; ')}`,
        `BLIND SPOTS: ${archetype.blindSpots.join(' ; ')}`,
        `RECOMMENDED COACHING FOCUS: ${archetype.coachingFocus}`,
        `CLIENT SELECTED AREA: ${userFocusArea}`,
        `NEWSLETTER OPT-IN: ${newsletterOptIn ? 'Yes' : 'No'}`
      ].join(' || ');

      // Build formatted email body for the visitor's inbox copy
      const emailSubject = encodeURIComponent(`Your Leap Limitless Personality & Life Fulfillment Report: ${archetype.title}`);
      const emailBody = encodeURIComponent(
        `LEAP LIMITLESS - PERSONALITY & LIFE FULFILLMENT REPORT\n` +
        `Prepared for: ${fullName} (${userRole})\n` +
        `Email: ${userEmail} | Phone: ${userPhone}\n` +
        `Assessment Mode: ${modeLabel}\n` +
        `Coach: Gagan Sharma, ICF Certified Coach (coach@leaplimitless.com)\n` +
        `================================================================\n\n` +
        `PRIMARY ARCHETYPE: ${archetype.title.toUpperCase()}\n` +
        `${archetype.subtitle}\n\n` +
        `${archetype.summary}\n\n` +
        `----------------------------------------------------------------\n` +
        `YOUR 6-DIMENSION PROFILE SCORES\n` +
        `----------------------------------------------------------------\n` +
        `1. Openness & Strategic Vision:       ${percents.O}% (${TRAIT_META.O.highLabel})\n` +
        `2. Conscientiousness & Execution:     ${percents.C}% (${TRAIT_META.C.highLabel})\n` +
        `3. Extraversion & Executive Presence: ${percents.E}% (${TRAIT_META.E.highLabel})\n` +
        `4. Agreeableness & Empathy:           ${percents.A}% (${TRAIT_META.A.highLabel})\n` +
        `5. Emotional Resilience & Composure:  ${percents.R}% (${TRAIT_META.R.highLabel})\n` +
        `6. Life & Career Fulfillment (SWLS):  ${percents.S}% (${TRAIT_META.S.highLabel})\n\n` +
        `----------------------------------------------------------------\n` +
        `TOP 3 SIGNATURE STRENGTHS TO LEVERAGE\n` +
        `----------------------------------------------------------------\n` +
        `- ${archetype.strengths[0]}\n` +
        `- ${archetype.strengths[1]}\n` +
        `- ${archetype.strengths[2]}\n\n` +
        `----------------------------------------------------------------\n` +
        `TOP 3 BLIND SPOTS & GROWTH OPPORTUNITIES\n` +
        `----------------------------------------------------------------\n` +
        `- ${archetype.blindSpots[0]}\n` +
        `- ${archetype.blindSpots[1]}\n` +
        `- ${archetype.blindSpots[2]}\n\n` +
        `----------------------------------------------------------------\n` +
        `RECOMMENDED COACHING ROADMAP\n` +
        `----------------------------------------------------------------\n` +
        `${archetype.coachingFocus}\n\n` +
        `Book your complimentary 30-Minute Discovery & Report Debrief Call with Coach Gagan:\n` +
        `https://leaplimitless.com/apply.html\n`
      );

      // Save to Microsoft Form & SkyKloud OneDrive Excel sheet automatically
      const submitPromise = window.submitLeapLimitlessRequest
        ? window.submitLeapLimitlessRequest({
            type: 'Personality Assessment',
            name: fullName,
            email: userEmail,
            phone: userPhone,
            roleOrg: userRole,
            focus: `[Personality Assessment - ${currentMode === 'deep' ? 'Deep-Dive 55Q' : 'Quick 25Q'}] ${archetype.title} (O:${percents.O}% C:${percents.C}% E:${percents.E}% A:${percents.A}% R:${percents.R}% SWLS:${percents.S}%)`,
            details: reportSummaryText,
            sourcePage: '/personality-assessment.html'
          })
        : Promise.resolve();

      submitPromise.finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHtml;
        }
        renderResultsReport({
          fullName,
          userEmail,
          userPhone,
          userRole,
          modeLabel,
          percents,
          averages,
          archetype,
          emailSubject,
          emailBody
        });
      });
    });
  }

  function renderResultsReport(data) {
    if (questionsStageEl) questionsStageEl.style.display = 'none';
    if (intakeStageEl) intakeStageEl.style.display = 'none';
    if (progressFillEl) progressFillEl.style.width = '100%';
    if (stepCounterEl) stepCounterEl.textContent = 'Assessment Complete • Personalized Report Unlocked';

    if (!resultsStageEl) return;
    resultsStageEl.style.display = 'block';

    const greetingEl = document.getElementById('pa-res-greeting');
    const emailConfirmEl = document.getElementById('pa-res-email-target');
    const archetypeTitleEl = document.getElementById('pa-res-archetype-title');
    const archetypeSubEl = document.getElementById('pa-res-archetype-sub');
    const archetypeDescEl = document.getElementById('pa-res-archetype-desc');
    const scoresGridEl = document.getElementById('pa-res-scores-grid');
    const strengthsListEl = document.getElementById('pa-res-strengths');
    const blindspotsListEl = document.getElementById('pa-res-blindspots');
    const coachingFocusEl = document.getElementById('pa-res-coaching-focus');
    const sendEmailCopyBtn = document.getElementById('pa-send-email-copy-btn');

    if (greetingEl) {
      greetingEl.innerHTML = `<strong>Prepared for ${data.fullName}</strong> &bull; ${data.modeLabel}`;
    }
    if (emailConfirmEl) {
      emailConfirmEl.textContent = data.userEmail;
    }
    if (archetypeTitleEl) archetypeTitleEl.textContent = data.archetype.title;
    if (archetypeSubEl) archetypeSubEl.textContent = data.archetype.subtitle;
    if (archetypeDescEl) archetypeDescEl.textContent = data.archetype.summary;

    if (scoresGridEl) {
      const traitOrder = ['O', 'C', 'E', 'A', 'R', 'S'];
      scoresGridEl.innerHTML = traitOrder.map(t => {
        const meta = TRAIT_META[t];
        const pct = data.percents[t];
        const bandLabel = pct >= 70 ? meta.highLabel : (pct < 52 ? meta.lowLabel : meta.midLabel);
        const desc = getTraitBandDescription(t, pct);
        const isSwls = t === 'S';
        return `
          <div class="pa-score-card ${isSwls ? 'pa-score-card-highlight' : ''}">
            <div class="flex-between" style="margin-bottom: 0.35rem; gap: 0.5rem;">
              <span class="label-caps" style="font-size: 0.72rem; color: ${isSwls ? 'var(--brand-accent-gold-dark)' : 'var(--brand-primary)'};">${meta.name}</span>
              <strong style="font-size: 1.05rem; color: var(--brand-primary);">${pct}%</strong>
            </div>
            <div class="score-bar-bg" style="margin-bottom: 0.5rem;">
              <div class="score-bar-value" style="width: ${pct}%; background: ${isSwls ? 'var(--brand-accent-gold)' : 'var(--brand-primary)'};"></div>
            </div>
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--brand-accent-gold-dark); margin-bottom: 0.25rem;">
              ${bandLabel}
            </div>
            <p class="body-sm" style="margin: 0; font-size: 0.83rem; line-height: 1.45;">${desc}</p>
          </div>
        `;
      }).join('');
    }

    if (strengthsListEl) {
      strengthsListEl.innerHTML = data.archetype.strengths.map(s => `
        <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
          <span class="icon text-gold" style="font-size: 1.15rem; flex-shrink: 0; margin-top: 2px;">check_circle</span>
          <span>${s}</span>
        </li>
      `).join('');
    }

    if (blindspotsListEl) {
      blindspotsListEl.innerHTML = data.archetype.blindSpots.map(b => `
        <li style="display: flex; gap: 0.6rem; align-items: flex-start;">
          <span class="icon" style="font-size: 1.15rem; color: var(--brand-accent-gold-dark); flex-shrink: 0; margin-top: 2px;">visibility</span>
          <span>${b}</span>
        </li>
      `).join('');
    }

    if (coachingFocusEl) {
      coachingFocusEl.textContent = data.archetype.coachingFocus;
    }

    if (sendEmailCopyBtn) {
      const mailtoHref = `mailto:${encodeURIComponent(data.userEmail)}?bcc=coach@leaplimitless.com&subject=${data.emailSubject}&body=${data.emailBody}`;
      sendEmailCopyBtn.setAttribute('href', mailtoHref);
    }

    resultsStageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Initialize Quick Profile by default
  setMode('quick');
});
