module.exports = {
  id: 'terminal-runner', level: 'organism', owner: 'aetheris', born: 'aetheris',
  title: 'Terminal Runner', description: 'Aetheris-only. A live CLI transcript block — meaningless for a gaming brand, essential here.',
  render: () => `
    <div class="c-term">
      <div class="c-term-bar"><i></i><i></i><i></i><span>aetheris — bash</span></div>
<pre class="c-term-body"><span class="c-term-p">$</span> aetheris run --model claude-3.5-sonnet
<span class="c-term-d">→ routing to eu-central-1 · 118ms ttft</span>
<span class="c-term-d">→ 3,842 tok/s · zero-retention</span>
<span class="c-term-p">$</span> <span class="c-caret">▍</span></pre>
    </div>`
};
