/**
 * LEAP LIMITLESS - CAREER CEILING & IMMIGRANT LEADERSHIP DIAGNOSTIC
 * Interactive 6-step diagnostic calculating Executive Gravitas, Cultural Fluency, and Compensation Leverage
 */

document.addEventListener('DOMContentLoaded', () => {
  const diagnosticContainer = document.getElementById('career-diagnostic');
  if (!diagnosticContainer) return;

  const steps = diagnosticContainer.querySelectorAll('.diagnostic-step');
  const progressBar = diagnosticContainer.querySelector('.diagnostic-progress-fill');
  const currentStepNum = diagnosticContainer.querySelector('#current-step-num');
  const prevBtn = diagnosticContainer.querySelector('#diag-prev-btn');
  const nextBtn = diagnosticContainer.querySelector('#diag-next-btn');
  const resultsContainer = diagnosticContainer.querySelector('#diagnostic-results');
  const questionsWrapper = diagnosticContainer.querySelector('#diagnostic-questions-wrapper');

  let currentStep = 0;
  const totalSteps = steps.length;
  const userAnswers = {};

  // Attach selection listener to all option cards
  diagnosticContainer.querySelectorAll('.diagnostic-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const stepEl = card.closest('.diagnostic-step');
      const stepIndex = parseInt(stepEl.getAttribute('data-step'), 10);
      
      // Deselect siblings in the same step
      stepEl.querySelectorAll('.diagnostic-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // Record answer
      const scoreGravitas = parseFloat(card.getAttribute('data-gravitas') || 0);
      const scoreCultural = parseFloat(card.getAttribute('data-cultural') || 0);
      const scoreComp = parseFloat(card.getAttribute('data-comp') || 0);

      userAnswers[stepIndex] = {
        gravitas: scoreGravitas,
        cultural: scoreCultural,
        comp: scoreComp,
        label: card.querySelector('h5')?.innerText || ''
      };

      // Enable next button
      if (nextBtn) nextBtn.removeAttribute('disabled');
    });
  });

  function updateStepView() {
    steps.forEach((step, idx) => {
      if (idx === currentStep) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update progress
    const progressPercent = ((currentStep + 1) / totalSteps) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (currentStepNum) currentStepNum.innerText = currentStep + 1;

    // Prev button state
    if (prevBtn) {
      if (currentStep === 0) {
        prevBtn.style.visibility = 'hidden';
      } else {
        prevBtn.style.visibility = 'visible';
      }
    }

    // Next button state (disabled if current step not answered)
    if (nextBtn) {
      if (userAnswers[currentStep]) {
        nextBtn.removeAttribute('disabled');
      } else {
        nextBtn.setAttribute('disabled', 'true');
      }

      if (currentStep === totalSteps - 1) {
        nextBtn.innerHTML = 'Calculate Diagnostic Results <span class="icon">arrow_forward</span>';
      } else {
        nextBtn.innerHTML = 'Continue <span class="icon">arrow_forward</span>';
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateStepView();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!userAnswers[currentStep]) return;

      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateStepView();
      } else {
        calculateAndShowResults();
      }
    });
  }

  function calculateAndShowResults() {
    // Hide questions, show results
    if (questionsWrapper) questionsWrapper.style.display = 'none';
    if (resultsContainer) resultsContainer.classList.add('active');
    if (progressBar) progressBar.style.width = '100%';

    let totalGravitas = 0;
    let totalCultural = 0;
    let totalComp = 0;

    Object.values(userAnswers).forEach(ans => {
      totalGravitas += ans.gravitas;
      totalCultural += ans.cultural;
      totalComp += ans.comp;
    });

    // Normalize to 100 max
    const gravitasPercent = Math.min(100, Math.round((totalGravitas / 12) * 100));
    const culturalPercent = Math.min(100, Math.round((totalCultural / 12) * 100));
    const compPercent = Math.min(100, Math.round((totalComp / 12) * 100));

    // Update UI scores
    const gravitasEl = document.getElementById('score-gravitas');
    const culturalEl = document.getElementById('score-cultural');
    const compEl = document.getElementById('score-comp');
    
    if (gravitasEl) {
      gravitasEl.style.width = `${gravitasPercent}%`;
      const numEl = document.getElementById('num-gravitas');
      if (numEl) numEl.innerText = `${gravitasPercent}%`;
    }
    if (culturalEl) {
      culturalEl.style.width = `${culturalPercent}%`;
      const numEl = document.getElementById('num-cultural');
      if (numEl) numEl.innerText = `${culturalPercent}%`;
    }
    if (compEl) {
      compEl.style.width = `${compPercent}%`;
      const numEl = document.getElementById('num-comp');
      if (numEl) numEl.innerText = `${compPercent}%`;
    }

    // Determine Archetype
    let archetypeTitle = 'The Undervalued Powerhouse';
    let archetypeDesc = 'You deliver undeniable technical excellence, but an ingrained cultural modesty and reliance on "letting work speak for itself" is leaving hundreds of thousands of dollars and executive promotions on the table. You need executive narrative framing and deliberate corporate sponsorship.';

    if (culturalPercent < 50 && gravitasPercent < 50) {
      archetypeTitle = 'The Invisible Pillar (High Output, Low Visibility)';
      archetypeDesc = 'Your organization relies on your brilliance, but executives don’t see you as one of "them." You are experiencing the classic immigrant bamboo ceiling. Shifting from execution to room orchestration will instantly change your trajectory.';
    } else if (compPercent < 55 && culturalPercent >= 50) {
      archetypeTitle = 'The Diligent Steward';
      archetypeDesc = 'You understand corporate dynamics well, but your immigration history or scarcity conditioning prevents you from aggressively demanding your upper-quartile market value. You are leaving $150K to $300K+ in annual compensation uncaptured.';
    } else if (gravitasPercent >= 65 && culturalPercent >= 65) {
      archetypeTitle = 'The Sovereign Transition Leader';
      archetypeDesc = 'You have command of your domain and strong political acumen. Your primary hurdle is navigating confidential backchannels and executive board search to break into the C-Suite and secure institutional equity.';
    }

    const archetypeTitleEl = document.getElementById('archetype-title');
    const archetypeDescEl = document.getElementById('archetype-desc');
    if (archetypeTitleEl) archetypeTitleEl.innerText = archetypeTitle;
    if (archetypeDescEl) archetypeDescEl.innerText = archetypeDesc;
  }

  // Initialize
  updateStepView();
});
