/**
 * LEAP LIMITLESS - EXECUTIVE COMPENSATION & PROMOTION CALCULATOR
 * Calculates estimated career compensation gap, target compensation package, and coaching ROI
 */

document.addEventListener('DOMContentLoaded', () => {
  const calcContainer = document.getElementById('comp-calculator');
  if (!calcContainer) return;

  const currentCompSlider = document.getElementById('calc-current-comp');
  const targetLevelSelect = document.getElementById('calc-target-level');
  const yearsInBandSlider = document.getElementById('calc-years-band');

  const displayCurrentComp = document.getElementById('display-current-comp');
  const displayYearsBand = document.getElementById('display-years-band');
  
  const outputAnnualGap = document.getElementById('output-annual-gap');
  const outputTargetPackage = document.getElementById('output-target-package');
  const output3YearLift = document.getElementById('output-three-year-lift');
  const outputRoiMultiplier = document.getElementById('output-roi-multiplier');

  // Grounded Fortune 500 corporate compensation benchmarks (Base + Corporate Bonus + LTI)
  const tierBenchmarks = {
    'intern': { median: 38000, upperQuartile: 50000, coachingCost: 2000 },
    'entry-level': { median: 68000, upperQuartile: 85000, coachingCost: 3000 },
    'mid-level': { median: 98000, upperQuartile: 125000, coachingCost: 4500 },
    'senior-lead': { median: 138000, upperQuartile: 175000, coachingCost: 6000 },
    'manager': { median: 175000, upperQuartile: 220000, coachingCost: 7500 },
    'director': { median: 225000, upperQuartile: 285000, coachingCost: 9500 },
    'senior-director': { median: 280000, upperQuartile: 360000, coachingCost: 12000 },
    'vp': { median: 380000, upperQuartile: 495000, coachingCost: 15000 },
    'svp': { median: 520000, upperQuartile: 720000, coachingCost: 18000 },
    'csuite': { median: 750000, upperQuartile: 1100000, coachingCost: 22000 }
  };

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function updateCalculations() {
    const currentComp = parseInt(currentCompSlider.value, 10);
    const yearsInBand = parseInt(yearsInBandSlider.value, 10);
    const targetTier = targetLevelSelect.value;

    if (displayCurrentComp) displayCurrentComp.innerText = formatCurrency(currentComp);
    if (displayYearsBand) displayYearsBand.innerText = `${yearsInBand} ${yearsInBand === 1 ? 'Year' : 'Years'}`;

    const benchmark = tierBenchmarks[targetTier] || tierBenchmarks['senior-director'];
    
    // Determine target package and annual gap
    let effectiveTargetPackage = benchmark.upperQuartile;
    let annualGap;

    if (currentComp < effectiveTargetPackage) {
      annualGap = effectiveTargetPackage - currentComp;
    } else {
      // If current comp is already at or above selected tier, benchmark elevates to next-level promotion/parity (+18%)
      annualGap = Math.max(15000, Math.round(currentComp * 0.18));
      effectiveTargetPackage = currentComp + annualGap;
    }

    // Stagnation friction penalty (lost annual merit increases + compounding market lag)
    const annualPenaltyPerYear = Math.min(20000, Math.max(2000, Math.round(annualGap * 0.05)));
    const stagnationPenalty = (yearsInBand - 1) * annualPenaltyPerYear;
    const total3YearLost = (annualGap * 3) + stagnationPenalty;

    // Coaching estimated investment vs return scaled realistically by career tier
    const estimatedCoachingInvestment = benchmark.coachingCost || 10000;
    const roiMultiplier = Math.max(3, Math.round(annualGap / estimatedCoachingInvestment));

    if (outputAnnualGap) outputAnnualGap.innerText = formatCurrency(annualGap);
    if (outputTargetPackage) outputTargetPackage.innerText = formatCurrency(effectiveTargetPackage);
    if (output3YearLift) output3YearLift.innerText = formatCurrency(total3YearLost);
    if (outputRoiMultiplier) outputRoiMultiplier.innerText = `${roiMultiplier}x ROI`;
  }

  if (currentCompSlider) currentCompSlider.addEventListener('input', updateCalculations);
  if (yearsInBandSlider) yearsInBandSlider.addEventListener('input', updateCalculations);
  if (targetLevelSelect) targetLevelSelect.addEventListener('change', updateCalculations);

  updateCalculations();
});
