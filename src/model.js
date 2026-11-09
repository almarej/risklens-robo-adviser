/**
 * RiskLens educational simulation logic.
 * All profiles and portfolios are fictional and are NOT financial advice.
 * This module contains deterministic rules; there is no LLM or market API.
 */

export const QUESTIONS = [
  {id:'comfort', title:'How comfortable would you feel taking investment risk?', subtitle:'Imagine this is money set aside for a fictional goal.', options:[['0','I prefer stability'],['1','Some ups and downs are okay'],['2','I am comfortable with large swings']]},
  {id:'horizon', title:'How long could you leave the money invested?', subtitle:'A shorter horizon generally leaves less time to recover losses.', options:[['0','Less than 3 years'],['1','3–7 years'],['2','More than 7 years']]},
  {id:'loss', title:'If the value fell 20% in a month, what would you do?', subtitle:'There is no right answer. Choose what best describes you.', options:[['0','I would prefer to avoid that possibility'],['1','I might wait and reassess'],['2','I could stay invested despite the drop']]},
  {id:'goal', title:'Which outcome would matter most to you?', subtitle:'Choose a priority for this fictional scenario.', options:[['0','Protecting my starting amount'],['1','Balancing growth and stability'],['2','Pursuing long-term growth']]},
  {id:'volatility', title:'How much short-term movement feels manageable?', subtitle:'Volatility means prices rising and falling over time.', options:[['0','Very little'],['1','A moderate amount'],['2','A substantial amount']]}
];

export const EXAMPLES = {
  cautious: {label:'Cautious investor', answers:{comfort:0,horizon:0,loss:0,goal:0,volatility:0}, scenario:'mismatch'},
  balanced: {label:'Balanced investor', answers:{comfort:1,horizon:1,loss:1,goal:1,volatility:1}, scenario:'aligned'},
  uncertain: {label:'Contradictory answers', answers:{comfort:0,horizon:2,loss:2,goal:1,volatility:2}, scenario:'mismatch'}
};

export const PORTFOLIOS = {
  low: {id:'harbour',name:'Harbour',risk:'low',subtitle:'Lower-risk fictional portfolio',mix:'Example: 80% lower-volatility assets / 20% growth assets'},
  moderate:{id:'bridge',name:'Bridge',risk:'moderate',subtitle:'Moderate-risk fictional portfolio',mix:'Example: 50% lower-volatility assets / 50% growth assets'},
  high:{id:'summit',name:'Summit',risk:'high',subtitle:'Higher-risk fictional portfolio',mix:'Example: 20% lower-volatility assets / 80% growth assets'}
};

const names={low:'Low',moderate:'Moderate',high:'High'};
export const labelRisk=(key)=>names[key] ?? 'Unknown';

export function inferRisk(answers) {
  const missing=QUESTIONS.filter(q => !Number.isInteger(answers?.[q.id]) || answers[q.id]<0 || answers[q.id]>2);
  if (missing.length) return {status:'incomplete',missing:missing.map(q=>q.id)};
  const score=QUESTIONS.reduce((sum,q)=>sum+answers[q.id],0);
  const profile=score<=3?'low':score<=6?'moderate':'high';
  const conflicts=[];
  if(answers.comfort===0 && answers.loss===2) conflicts.push('You preferred stability, but said you could tolerate a 20% drop.');
  if(answers.comfort===2 && answers.loss===0) conflicts.push('You felt comfortable with large swings, but wanted to avoid a 20% drop.');
  if(answers.horizon===0 && answers.comfort===2) conflicts.push('You selected a short time horizon alongside high risk comfort.');
  const evidence=[
    `Risk comfort: ${QUESTIONS[0].options[answers.comfort][1]}`,
    `Time horizon: ${QUESTIONS[1].options[answers.horizon][1]}`,
    `Reaction to a fall: ${QUESTIONS[2].options[answers.loss][1]}`
  ];
  return {status:conflicts.length?'needs-clarification':'ready',profile,score,conflicts,evidence};
}

export function selectPortfolio(profile,scenario='mismatch') {
  if(!PORTFOLIOS[profile]) throw new Error('Unknown profile');
  if(scenario==='aligned')return PORTFOLIOS[profile];
  if(scenario==='mismatch')return PORTFOLIOS[profile==='high'?'low':'high'];
  throw new Error('Unknown scenario');
}

export function compareRisk(profile,portfolio) {
  if(!PORTFOLIOS[profile] || !portfolio || !PORTFOLIOS[portfolio.risk])throw new Error('Cannot compare unknown risk categories');
  const aligned=profile===portfolio.risk;
  return {aligned,headline:aligned?'Categories align in this simulation':'Risk-category mismatch',
   detail:aligned?`Your inferred ${labelRisk(profile).toLowerCase()}-risk profile and the ${portfolio.name} example have the same category. That alone does not establish investment suitability.`:
   `Your inferred profile is ${labelRisk(profile).toLowerCase()} risk, while the ${portfolio.name} example is ${labelRisk(portfolio.risk).toLowerCase()} risk. Consider this difference before making a simulated choice.`};
}

export function decisionFeedback(decision,comparison){
  if(!['accept','reject'].includes(decision))throw new Error('Unknown decision');
  if(decision==='accept'&&!comparison.aligned)return {title:'You accepted a mismatch',tone:'caution',body:'Your simulated choice differs from your inferred risk profile. You remain in control: you can review the comparison, edit answers or change your decision.'};
  if(decision==='reject'&&comparison.aligned)return {title:'You chose not to proceed',tone:'neutral',body:'The two risk categories match in this simplified model, but matching categories do not obligate you to accept a recommendation.'};
  if(decision==='accept')return {title:'Simulated choice recorded',tone:'neutral',body:'The categories align in this example. This is not a check of real financial suitability or a real investment.'};
  return {title:'You declined the simulated recommendation',tone:'neutral',body:'The example contains a category mismatch. You can inspect the evidence or explore another scenario.'};
}
