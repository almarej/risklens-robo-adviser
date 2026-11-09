import test from 'node:test';
import assert from 'node:assert/strict';
import {EXAMPLES,inferRisk,selectPortfolio,compareRisk,decisionFeedback} from '../src/model.js';

const answers=(x)=>({comfort:x,horizon:x,loss:x,goal:x,volatility:x});

test('incomplete questionnaire is identified without guessing',()=>{
 assert.deepEqual(inferRisk({comfort:0}).missing,['horizon','loss','goal','volatility']);
});
test('low, moderate, high thresholds are deterministic',()=>{
 assert.equal(inferRisk(answers(0)).profile,'low');
 assert.equal(inferRisk(answers(1)).profile,'moderate');
 assert.equal(inferRisk(answers(2)).profile,'high');
});
test('a score of three is low and a score of four is moderate',()=>{
 assert.equal(inferRisk({comfort:1,horizon:1,loss:1,goal:0,volatility:0}).profile,'low');
 assert.equal(inferRisk({comfort:1,horizon:1,loss:1,goal:1,volatility:0}).profile,'moderate');
});
test('a score of six is moderate and a score of seven is high',()=>{
 assert.equal(inferRisk({comfort:1,horizon:1,loss:1,goal:1,volatility:2}).profile,'moderate');
 assert.equal(inferRisk({comfort:1,horizon:1,loss:2,goal:1,volatility:2}).profile,'high');
});
test('contradiction blocks confident continuation',()=>{
 const result=inferRisk(EXAMPLES.uncertain.answers);
 assert.equal(result.status,'needs-clarification');
 assert.ok(result.conflicts.length>0);
});
test('mismatched example differs from inferred category',()=>{
 for(const p of ['low','moderate','high'])assert.notEqual(selectPortfolio(p,'mismatch').risk,p);
});
test('aligned example has matching category',()=>{
 for(const p of ['low','moderate','high'])assert.equal(selectPortfolio(p,'aligned').risk,p);
});
test('comparator reports alignment accurately',()=>{
 assert.equal(compareRisk('low',selectPortfolio('low','aligned')).aligned,true);
 assert.equal(compareRisk('low',selectPortfolio('low','mismatch')).aligned,false);
});
test('accepting a mismatch triggers caution instead of congratulations',()=>{
 const comparison=compareRisk('low',selectPortfolio('low','mismatch'));
 const feedback=decisionFeedback('accept',comparison);
 assert.equal(feedback.tone,'caution');
 assert.match(feedback.title,/mismatch/i);
});
test('rejecting a match does not mark user wrong',()=>{
 const feedback=decisionFeedback('reject',compareRisk('moderate',selectPortfolio('moderate','aligned')));
 assert.match(feedback.body,/do not obligate/i);
});
test('invalid decisions and scenario identifiers fail explicitly',()=>{
 assert.throws(()=>selectPortfolio('low','unknown'));
 assert.throws(()=>decisionFeedback('maybe',{aligned:true}));
});
