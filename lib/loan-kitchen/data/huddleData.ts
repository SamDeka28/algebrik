import { Customer, StationId } from './gameData';

export type HuddleDecision = 'approve' | 'flag' | 'reject';

export interface HuddleFlag {
  label: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
}

export interface HuddleDataPoint {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical' | 'neutral';
}

export interface HuddleEvent {
  loanId: string;
  stationId: StationId;
  stationIndex: number;
  customer: Customer;
  title: string;
  subtitle: string;
  dataPoints: HuddleDataPoint[];
  flags: HuddleFlag[];
  decisions: {
    approve: {label: string;pointDelta: number;description: string;};
    flag: {label: string;pointDelta: number;description: string;};
    reject: {label: string;pointDelta: number;description: string;};
  };
  recommendedDecision: HuddleDecision;
}

function creditStatus(score: number): 'good' | 'warning' | 'critical' {
  if (score >= 720) return 'good';
  if (score >= 620) return 'warning';
  return 'critical';
}

function dtiStatus(dti: number): 'good' | 'warning' | 'critical' {
  if (dti <= 36) return 'good';
  if (dti <= 43) return 'warning';
  return 'critical';
}

function ltvStatus(ltv: number): 'good' | 'warning' | 'critical' {
  if (ltv <= 80) return 'good';
  if (ltv <= 90) return 'warning';
  return 'critical';
}

export function generateHuddleData(
loanId: string,
stationId: StationId,
stationIndex: number,
customer: Customer)
: HuddleEvent {
  const flags: HuddleFlag[] = [];
  const isBadRisk = customer.riskGrade === 'F' || customer.riskGrade === 'D';
  const isGoodRisk = customer.riskGrade === 'A' || customer.riskGrade === 'B';

  // Deterministic "randomness" from customer id for flavor
  const seed = customer.id.charCodeAt(0) + customer.id.charCodeAt(1);
  const hasAltDataWarning = seed % 3 === 0;
  const hasEmploymentIssue = seed % 4 === 0;
  const hasIdMismatch = isBadRisk && seed % 2 === 0;
  const hasExpiredId = isBadRisk && seed % 5 === 0;

  switch (stationId) {
    case 'account':{
        const idFlags: HuddleFlag[] = [];
        if (hasIdMismatch)
        idFlags.push({
          label: 'ID MISMATCH',
          severity: 'critical',
          description: 'Name on ID does not match application'
        });
        if (hasExpiredId)
        idFlags.push({
          label: 'EXPIRED ID',
          severity: 'critical',
          description: 'Government-issued ID expired > 6 months ago'
        });
        if (customer.dti > 50)
        idFlags.push({
          label: 'ADDRESS DISCREPANCY',
          severity: 'warning',
          description: 'Stated address differs from credit bureau records'
        });
        if (idFlags.length === 0 && isGoodRisk)
        idFlags.push({
          label: 'IDENTITY VERIFIED',
          severity: 'info',
          description: 'All documents match bureau records'
        });

        const hasCriticalIdIssue = hasIdMismatch || hasExpiredId;

        return {
          loanId,
          stationId,
          stationIndex,
          customer,
          title: 'Identity Verification',
          subtitle: 'Review customer documents before opening account',
          dataPoints: [
          {
            label: 'Name Match',
            value: hasIdMismatch ? '❌ MISMATCH' : '✅ Confirmed',
            status: hasIdMismatch ? 'critical' : 'good'
          },
          { label: 'DOB Match', value: '✅ Confirmed', status: 'good' },
          {
            label: 'ID Expiry',
            value: hasExpiredId ? '❌ Expired' : '✅ Valid',
            status: hasExpiredId ? 'critical' : 'good'
          },
          {
            label: 'Address',
            value: customer.dti > 50 ? '⚠️ Discrepancy' : '✅ Matches',
            status: customer.dti > 50 ? 'warning' : 'good'
          },
          {
            label: 'Watchlist',
            value: isBadRisk ? '⚠️ Soft Hit' : '✅ Clear',
            status: isBadRisk ? 'warning' : 'good'
          }],

          flags: idFlags,
          decisions: {
            approve: {
              label: 'Verify & Open Account',
              pointDelta: hasCriticalIdIssue ? -350 : 150,
              description: hasCriticalIdIssue ?
              '⚠️ WARNING: Approving with critical ID issues enables fraud!' :
              'Documents accepted, proceed to product selection'
            },
            flag: {
              label: 'Flag for Manual Review',
              pointDelta: 50,
              description: 'Escalate to compliance team for secondary check'
            },
            reject: {
              label: 'Reject — ID Fraud Risk',
              pointDelta: hasCriticalIdIssue ? 200 : -200,
              description: 'Decline application due to identity concerns'
            }
          },
          recommendedDecision: hasCriticalIdIssue ? 'reject' : 'approve'
        };
      }

    case 'pos':{
        const affordability = Math.round(
          customer.amount / 12 / (customer.creditScore * 0.8) * 100
        );
        const isOverLeveraged = customer.dti > 43 || affordability > 35;
        if (isOverLeveraged)
        flags.push({
          label: 'OVER-LEVERAGED',
          severity: 'warning',
          description:
          'Monthly payment exceeds recommended affordability threshold'
        });
        if (customer.type === 'Mortgage' && customer.creditScore < 620)
        flags.push({
          label: 'PRODUCT MISMATCH',
          severity: 'critical',
          description:
          'Credit profile does not meet mortgage minimum requirements'
        });
        if (flags.length === 0)
        flags.push({
          label: 'SUITABLE PRODUCT',
          severity: 'info',
          description: 'Loan product aligns with customer financial profile'
        });

        return {
          loanId,
          stationId,
          stationIndex,
          customer,
          title: 'Product Suitability Check',
          subtitle:
          'Confirm the loan product matches customer needs and capacity',
          dataPoints: [
          { label: 'Loan Type', value: customer.type, status: 'neutral' },
          {
            label: 'Requested Amount',
            value: `$${customer.amount.toLocaleString()}`,
            status: 'neutral'
          },
          {
            label: 'Est. Monthly Payment',
            value: `$${Math.round(customer.amount / 60).toLocaleString()}`,
            status: isOverLeveraged ? 'warning' : 'good'
          },
          {
            label: 'Affordability Ratio',
            value: `${affordability}%`,
            status:
            affordability > 35 ?
            'critical' :
            affordability > 28 ?
            'warning' :
            'good'
          },
          {
            label: 'Credit Tier',
            value: customer.riskGrade,
            status: isGoodRisk ? 'good' : isBadRisk ? 'critical' : 'warning'
          }],

          flags,
          decisions: {
            approve: {
              label: 'Proceed with Product',
              pointDelta: 100,
              description: 'Confirm loan product and advance to origination'
            },
            flag: {
              label: 'Counter-offer (Lower Amount)',
              pointDelta: 75,
              description: 'Suggest reduced loan amount to improve affordability'
            },
            reject: {
              label: 'Decline — Unsuitable Product',
              pointDelta: isBadRisk ? 150 : -150,
              description: 'Product does not meet suitability standards'
            }
          },
          recommendedDecision:
          isOverLeveraged && isBadRisk ?
          'reject' :
          isOverLeveraged ?
          'flag' :
          'approve'
        };
      }

    case 'origination':{
        const highDti = customer.dti > 43;
        const veryHighDti = customer.dti > 55;
        if (veryHighDti)
        flags.push({
          label: 'HIGH DTI RATIO',
          severity: 'critical',
          description: `DTI of ${customer.dti}% far exceeds the 43% guideline`
        });else
        if (highDti)
        flags.push({
          label: 'ELEVATED DTI',
          severity: 'warning',
          description: `DTI of ${customer.dti}% is above the preferred 36% threshold`
        });
        if (hasEmploymentIssue)
        flags.push({
          label: 'UNSTABLE EMPLOYMENT',
          severity: 'warning',
          description: 'Less than 2 years at current employer'
        });
        if (customer.ltv > 90)
        flags.push({
          label: 'INSUFFICIENT ASSETS',
          severity: 'warning',
          description: 'Asset-to-liability ratio below recommended level'
        });
        if (flags.length === 0)
        flags.push({
          label: 'FINANCIALS VERIFIED',
          severity: 'info',
          description: 'Income, employment, and assets all within guidelines'
        });

        const annualIncome = Math.round(customer.creditScore * 85);
        return {
          loanId,
          stationId,
          stationIndex,
          customer,
          title: 'Financial Data Review',
          subtitle: 'Verify income, employment, and asset documentation',
          dataPoints: [
          {
            label: 'Est. Annual Income',
            value: `$${annualIncome.toLocaleString()}`,
            status: 'neutral'
          },
          {
            label: 'Employment Status',
            value: hasEmploymentIssue ? '⚠️ < 2 Years' : '✅ Stable',
            status: hasEmploymentIssue ? 'warning' : 'good'
          },
          {
            label: 'DTI Ratio',
            value: `${customer.dti}%`,
            status: dtiStatus(customer.dti)
          },
          {
            label: 'LTV Ratio',
            value: `${customer.ltv}%`,
            status: ltvStatus(customer.ltv)
          },
          {
            label: 'Liabilities',
            value: `$${Math.round(customer.amount * 0.3).toLocaleString()}`,
            status: customer.dti > 43 ? 'warning' : 'good'
          }],

          flags,
          decisions: {
            approve: {
              label: 'Complete Application',
              pointDelta: 100,
              description: 'All financials verified, advance to underwriting'
            },
            flag: {
              label: 'Request Additional Docs',
              pointDelta: 50,
              description:
              'Ask for bank statements, tax returns, or employment letter'
            },
            reject: {
              label: 'Withdraw — Incomplete/Ineligible',
              pointDelta: veryHighDti ? 150 : -100,
              description: 'Application cannot proceed due to financial concerns'
            }
          },
          recommendedDecision: veryHighDti ?
          'reject' :
          highDti ?
          'flag' :
          'approve'
        };
      }

    case 'decisioning':{
        const defaultProb = Math.round(
          (100 - customer.creditScore / 8.5) * 0.4 +
          customer.dti * 0.4 +
          customer.ltv * 0.2
        );
        const altDataScore = hasAltDataWarning ? 'Negative Signals' : 'Neutral';

        if (customer.creditScore < 580)
        flags.push({
          label: 'SUBPRIME CREDIT',
          severity: 'critical',
          description: `Credit score of ${customer.creditScore} is below the 580 minimum`
        });
        if (defaultProb > 60)
        flags.push({
          label: 'HIGH DEFAULT RISK',
          severity: 'critical',
          description: `${defaultProb}% predicted default probability based on risk model`
        });
        if (hasAltDataWarning)
        flags.push({
          label: 'ALT DATA WARNING',
          severity: 'warning',
          description:
          'Alternative data sources indicate elevated payment risk'
        });
        if (customer.ltv > 90)
        flags.push({
          label: 'HIGH LTV',
          severity: 'warning',
          description: `LTV of ${customer.ltv}% exceeds 90% — limited equity cushion`
        });
        if (flags.length === 0)
        flags.push({
          label: 'CREDIT APPROVED',
          severity: 'info',
          description: 'All underwriting criteria met — recommend approval'
        });

        return {
          loanId,
          stationId,
          stationIndex,
          customer,
          title: 'Underwriting Decision',
          subtitle:
          'Final credit risk assessment — this decision affects portfolio health',
          dataPoints: [
          {
            label: 'Credit Score',
            value: `${customer.creditScore}`,
            status: creditStatus(customer.creditScore)
          },
          {
            label: 'Risk Grade',
            value: customer.riskGrade,
            status: isGoodRisk ? 'good' : isBadRisk ? 'critical' : 'warning'
          },
          {
            label: 'DTI Ratio',
            value: `${customer.dti}%`,
            status: dtiStatus(customer.dti)
          },
          {
            label: 'LTV Ratio',
            value: `${customer.ltv}%`,
            status: ltvStatus(customer.ltv)
          },
          {
            label: 'Default Probability',
            value: `${Math.min(99, defaultProb)}%`,
            status:
            defaultProb > 60 ?
            'critical' :
            defaultProb > 35 ?
            'warning' :
            'good'
          },
          {
            label: 'Alt Data Signal',
            value: altDataScore,
            status: hasAltDataWarning ? 'warning' : 'good'
          }],

          flags,
          decisions: {
            approve: {
              label: 'Approve Loan',
              pointDelta: isBadRisk ? -400 : 300,
              description: isBadRisk ?
              'WARNING: High-risk approval will damage portfolio' :
              'Approve at standard rate — strong credit profile'
            },
            flag: {
              label: 'Counter-offer (Higher Rate)',
              pointDelta: 100,
              description: 'Approve with risk-adjusted interest rate premium'
            },
            reject: {
              label: 'Deny Application',
              pointDelta: isBadRisk ? 350 : -150,
              description: isBadRisk ?
              'Correct denial — protects portfolio health' :
              'Declining a creditworthy applicant loses business'
            }
          },
          recommendedDecision: isBadRisk ?
          'reject' :
          isGoodRisk ?
          'approve' :
          'flag'
        };
      }

    case 'analytics':{
        const portfolioImpact = isBadRisk ?
        'Negative' :
        isGoodRisk ?
        'Positive' :
        'Neutral';
        const rateAdj = isBadRisk ?
        '+3.5%' :
        customer.riskGrade === 'C' ?
        '+1.5%' :
        'Standard';
        if (isBadRisk)
        flags.push({
          label: 'PORTFOLIO RISK WARNING',
          severity: 'critical',
          description: 'Booking this loan will reduce portfolio health score'
        });
        if (customer.type === 'Mortgage' && customer.ltv > 85)
        flags.push({
          label: 'CONCENTRATION RISK',
          severity: 'warning',
          description: 'High-LTV mortgage increases portfolio concentration'
        });
        if (flags.length === 0)
        flags.push({
          label: 'READY TO BOOK',
          severity: 'info',
          description: 'Loan meets all criteria for portfolio inclusion'
        });

        return {
          loanId,
          stationId,
          stationIndex,
          customer,
          title: 'Portfolio Booking Review',
          subtitle: 'Final check before loan is booked into the portfolio',
          dataPoints: [
          {
            label: 'Loan Amount',
            value: `$${customer.amount.toLocaleString()}`,
            status: 'neutral'
          },
          {
            label: 'Risk Grade',
            value: customer.riskGrade,
            status: isGoodRisk ? 'good' : isBadRisk ? 'critical' : 'warning'
          },
          {
            label: 'Rate Adjustment',
            value: rateAdj,
            status: isBadRisk ? 'critical' : 'neutral'
          },
          {
            label: 'Portfolio Impact',
            value: portfolioImpact,
            status: isBadRisk ? 'critical' : isGoodRisk ? 'good' : 'neutral'
          },
          {
            label: 'Compliance Check',
            value: isBadRisk ? '⚠️ Review Required' : '✅ Passed',
            status: isBadRisk ? 'warning' : 'good'
          }],

          flags,
          decisions: {
            approve: {
              label: 'Book Loan',
              pointDelta: isBadRisk ? -300 : 200,
              description: isBadRisk ?
              'Booking a risky loan damages portfolio health' :
              'Loan booked successfully into portfolio'
            },
            flag: {
              label: 'Adjust Terms & Book',
              pointDelta: 75,
              description: 'Apply rate adjustment and book with modified terms'
            },
            reject: {
              label: 'Cancel Booking',
              pointDelta: isBadRisk ? 200 : -200,
              description: isBadRisk ?
              'Correct — prevents portfolio contamination' :
              'Cancelling a good loan loses revenue'
            }
          },
          recommendedDecision: isBadRisk ? 'reject' : 'approve'
        };
      }
  }
}
