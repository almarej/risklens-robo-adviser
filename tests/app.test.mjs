import test from 'node:test';
import assert from 'node:assert/strict';

// Exercise the real app's delegated events and rendered output without a browser dependency.
test('scenario labels, selection, focus and advice mode separation across profiles',async()=>{
 const listeners={};
 let focused;
 const app={innerHTML:'',addEventListener:(type,fn)=>listeners[type]=fn,querySelector:selector=>({focus:()=>{focused=selector;},setAttribute:()=>{}})};
 globalThis.document={getElementById:id=>id==='app'?app:{addEventListener:()=>{}}};
 globalThis.window={scrollTo:()=>{}};
 const action=(action,value)=>listeners.click({target:{closest:()=>({dataset:{action,value}})}});
 const scenario=value=>listeners.change({target:{closest:selector=>selector==='input[name="scenario"]'?{value}:null}});
 try{
  await import('../src/app.js');
  for(const [preset,aligned,mismatch] of [['cautious','Harbour','Summit'],['balanced','Bridge','Summit']]){
   action('start');action('preset',preset);
   for(let i=0;i<5;i++)action('next');
   action('to-advice');
   for(const [value,portfolio] of [['aligned',aligned],['mismatch',mismatch]]){
    scenario(value);
    assert.match(app.innerHTML,new RegExp(`value="${value}" checked`));
    assert.match(app.innerHTML,new RegExp(`Selected: <strong>.*${portfolio} portfolio`));
    assert.equal(focused,`input[name="scenario"][value="${value}"]`);
    assert.match(app.innerHTML,/<fieldset[^>]*aria-describedby="scenario-help scenario-keys"/);
    assert.match(app.innerHTML,/<legend>Portfolio scenario<\/legend>/);
    assert.match(app.innerHTML,/Harbour portfolio · Low risk|Bridge portfolio · Moderate risk/);
    assert.match(app.innerHTML,/Summit portfolio · High risk/);
    const chat=()=>app.innerHTML.match(/<div class="chat"[\s\S]*?<div class="portfolio">/)[0];
    const standardChat=chat();
    assert.doesNotMatch(app.innerHTML,/INSPECTABLE RISK COMPARISON/);
    action('mode','inspectable');
    assert.match(app.innerHTML,/INSPECTABLE RISK COMPARISON/);
    assert.equal(chat(),standardChat);
    assert.doesNotMatch(chat(),/Your inferred profile|Risk-category mismatch|Categories align/);
    action('mode','standard');
   }
   action('restart');
  }
 }finally{delete globalThis.document;delete globalThis.window;}
});
