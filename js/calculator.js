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

  // Baseline market benchmarks by executive tier (Total Comp: Base + Bonus + LTI/Carry)
  const tierBenchmarks = {
    'director': { median: 360000, upperQuartile: 450000 },
    'senior-director': { median: 480000, upperQuartile: 620000 },
    'vp': { median: 650000, upperQuartile: 850000 },
    'svp': { median: 920000, upperQuartile: 1250000 },
    'csuite': { median: 1400000, upperQuartile: 2200000 }
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

    const benchmark = tierBenchmarks[targetTier] || tierBenchmarks['vp'];
    
    // Target package: upper quartile targeted negotiation
    const targetPackage = benchmark.upperQuartile;

    // Annual gap between current compensation and market benchmark
    const annualGap = Math.max(45000, targetPackage - currentComp);

    // Stagnation friction penalty (immigrants stuck in band compound lost opportunity)
    const stagnationPenalty = (yearsInBand - 1) * 25000;
    const total3YearLost = (annualGap * 3) + stagnationPenalty;

    // Coaching estimated investment vs return
    const estimatedCoachingInvestment = 15000;
    const roiMultiplier = Math.round(annualGap / estimatedCoachingInvestment);

    if (outputAnnualGap) outputAnnualGap.innerText = formatCurrency(annualGap);
    if (outputTargetPackage) outputTargetPackage.innerText = formatCurrency(targetPackage);
    if (output3YearLift) output3YearLift.innerText = formatCurrency(total3YearLost);
    if (outputRoiMultiplier) outputRoiMultiplier.innerText = `${roiMultiplier}x ROI`;
  }

  if (currentCompSlider) currentCompSlider.addEventListener('input', updateCalculations);
  if (yearsInBandSlider) yearsInBandSlider.addEventListener('input', updateCalculations);
  if (targetLevelSelect) targetLevelSelect.addEventListener('change', updateCalculations);

  updateCalculations();
});
