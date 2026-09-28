// Builds "Phase 2" of the NLP poster: Appendix + References (dummy content).
// Safe to re-run: it clears and rebuilds the Phase 2 frame's body each time.

const BLACK = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
const FRAME_NAME = 'Poster – Phase 2: Appendix & References (A1 landscape)';
const BODY_H = 1425;

function txt(chars, style, lh, w, mono, size) {
  style = style || 'Regular'; lh = lh || 138; size = size || 28;
  const t = figma.createText();
  t.fontName = { family: mono ? 'IBM Plex Mono' : 'IBM Plex Sans', style: style };
  t.fontSize = size;
  t.characters = chars;
  t.fills = BLACK;
  t.lineHeight = { unit: 'PERCENT', value: lh };
  t.name = chars.slice(0, 60);
  if (w) { t.resize(w, t.height); t.textAutoResize = 'HEIGHT'; }
  else t.textAutoResize = 'WIDTH_AND_HEIGHT';
  return t;
}

function vstack(name, spacing, w) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = 'VERTICAL';
  f.itemSpacing = spacing;
  f.fills = [];
  f.clipsContent = false;
  if (w) { f.resize(w, 10); f.counterAxisSizingMode = 'FIXED'; }
  else f.counterAxisSizingMode = 'AUTO';
  f.primaryAxisSizingMode = 'AUTO';
  return f;
}

function hstack(name, spacing) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = 'HORIZONTAL';
  f.itemSpacing = spacing || 0;
  f.fills = [];
  f.clipsContent = false;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  return f;
}

function columnRule(body) {
  const r = figma.createRectangle();
  r.name = 'Column rule';
  r.resize(2, BODY_H);
  r.cornerRadius = 1;
  r.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.18 }];
  body.appendChild(r);
  return r;
}

// Booktabs-style table matching Tables 1 and 2 on the main poster.
function table(name, rows, widths, boldRow) {
  const W = widths.reduce((a, b) => a + b, 0) + 16;
  const tbl = vstack(name, 0, W);
  tbl.paddingTop = 3; tbl.paddingBottom = 3;
  tbl.strokes = BLACK;
  tbl.strokeTopWeight = 3; tbl.strokeBottomWeight = 3;
  tbl.strokeLeftWeight = 0; tbl.strokeRightWeight = 0;
  rows.forEach((r, i) => {
    const row = hstack(i === 0 ? 'Header row' : 'Row ' + i, 0);
    row.paddingTop = 10; row.paddingBottom = 10; row.paddingLeft = 8; row.paddingRight = 8;
    if (i === 0) {
      row.strokes = BLACK;
      row.strokeTopWeight = 0; row.strokeLeftWeight = 0; row.strokeRightWeight = 0;
      row.strokeBottomWeight = 1.5;
    }
    tbl.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';
    r.forEach((c, j) => {
      const style = i === 0 ? 'Medium' : (i === boldRow ? 'SemiBold' : 'Regular');
      const t = txt(c, style, 130, widths[j]);
      if (j > 0) t.textAlignHorizontal = 'RIGHT';
      row.appendChild(t);
    });
  });
  return tbl;
}

function section(parent, title, W) {
  const s = vstack(title, 6, W);
  parent.appendChild(s);
  s.appendChild(txt(title, 'Medium', 125, W));
  return s;
}

function heading(parent, label) {
  parent.appendChild(txt(label, 'SemiBold', 110));
}

// ---------- Column 1: Appendix A + B ----------
function buildCol1(body) {
  const W = 600;
  const col = vstack('A Appendix (part 1)', 18, W);
  body.appendChild(col);
  heading(col, 'Appendix');

  const a = section(col, 'A. Prompt templates', W);
  a.appendChild(txt('Dummy text: the exact prompts used for the sequential (depth) and parallel (diversity) settings. Replace with your final templates.', 'Regular', 138, W));
  const box = vstack('Prompt box', 8, W);
  box.paddingTop = 20; box.paddingBottom = 20; box.paddingLeft = 24; box.paddingRight = 24;
  box.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.04 }];
  box.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.18 }];
  box.strokeWeight = 1.5;
  box.cornerRadius = 8;
  a.appendChild(box);
  const IW = W - 48;
  box.appendChild(txt('[Sequential]', 'Regular', 130, IW, true, 24));
  box.appendChild(txt('Solve the problem step by step.\nThink carefully before answering.\nPut the final answer in \\boxed{}.\n\n{problem}', 'Regular', 130, IW, true, 24));
  box.appendChild(txt('[Parallel, k samples]', 'Regular', 130, IW, true, 24));
  box.appendChild(txt('Same prompt, sampled k times;\nanswers aggregated by majority vote.', 'Regular', 130, IW, true, 24));
  a.appendChild(txt('Listing A1: Prompt templates (dummy).', 'Regular', 135, W));

  const b = section(col, 'B. Generation settings', W);
  b.appendChild(table('Table A1', [
    ['Setting', 'Sequential', 'Parallel'],
    ['Temperature', '0.6', '0.6'],
    ['Top-p', '0.95', '0.95'],
    ['Samples (k)', '1', '4, 8, 16'],
    ['Max tokens / sample', 'B', 'B / k'],
    ['Aggregation', '–', 'Majority vote'],
    ['Seeds', '3', '3'],
  ], [240, 150, 194]));
  b.appendChild(txt('Table A1: Decoding settings per strategy at budget B (dummy values).', 'Regular', 135, W));
}

// ---------- Column 2: Appendix C + D + E ----------
function buildCol2(body) {
  const W = 640;
  const col = vstack('A Appendix (part 2)', 18, W);
  body.appendChild(col);
  heading(col, 'Appendix (cont.)');

  const c = section(col, 'C. Results by difficulty', W);
  c.appendChild(txt('Dummy text: accuracy at each difficulty level at a fixed budget, for both strategies.', 'Regular', 138, W));
  c.appendChild(table('Table A2', [
    ['Level', 'Sequential', 'Parallel', 'Δ'],
    ['1 (easy)', '84.0', '86.5', '+2.5'],
    ['2', '71.2', '74.0', '+2.8'],
    ['3', '58.6', '57.9', '−0.7'],
    ['4', '41.3', '37.2', '−4.1'],
    ['5 (hard)', '22.8', '17.5', '−5.3'],
  ], [180, 164, 164, 100]));
  c.appendChild(txt('Table A2: Accuracy (%) by difficulty level (dummy values).', 'Regular', 135, W));

  const d = section(col, 'D. Model size and thinking mode', W);
  d.appendChild(txt('Dummy text: the same comparison repeated for each model size, with thinking mode on and off.', 'Regular', 138, W));
  const ph = figma.createFrame();
  ph.name = 'Figure A1 placeholder (replace with your export)';
  ph.layoutMode = 'VERTICAL';
  ph.primaryAxisAlignItems = 'CENTER';
  ph.counterAxisAlignItems = 'CENTER';
  ph.resize(W, 280);
  ph.primaryAxisSizingMode = 'FIXED';
  ph.counterAxisSizingMode = 'FIXED';
  ph.cornerRadius = 8;
  ph.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.04 }];
  ph.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.3 }];
  ph.strokeWeight = 1.5;
  ph.dashPattern = [10, 8];
  d.appendChild(ph);
  const pt = txt('Figure A1 placeholder\nAccuracy vs. budget per model size × thinking mode', 'Regular', 135, W - 80);
  pt.textAlignHorizontal = 'CENTER';
  pt.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.55 }];
  ph.appendChild(pt);
  d.appendChild(txt('Figure A1: Sequential vs. parallel accuracy across model sizes, thinking on/off (dummy).', 'Regular', 135, W));

  const e = section(col, 'E. Compute and reproducibility', W);
  e.appendChild(txt('Dummy text: hardware, total GPU hours, inference library and versions, and how token budgets were counted.', 'Regular', 138, W));
}

// ---------- Column 3: References ----------
function buildCol3(body) {
  const W = 872;
  const col = vstack('R References', 18, W);
  body.appendChild(col);
  heading(col, 'References');

  const list = vstack('Reference list', 14, W);
  col.appendChild(list);
  const refs = [
    'Author, A., & Author, B. (2024). Title of the first cited paper. In Proceedings of the Conference Name, pages 1–10.',
    'Author, C., Author, D., & Author, E. (2024). Title of the second cited paper. arXiv preprint arXiv:0000.00000.',
    'Author, F. (2023). Title of the third cited paper. Journal Name, 12(3), 45–67.',
    'Author, G., & Author, H. (2025). Title of the dataset paper. In Proceedings of the Conference Name.',
    'Author, I., et al. (2025). Title of the model technical report. Technical report, Organisation.',
    'Author, J., & Author, K. (2024). Title of the decoding / self-consistency paper. In Proceedings of the Conference Name.',
    'Author, L. (2025). Title of the test-time compute scaling paper. arXiv preprint arXiv:0000.00000.',
    'Author, M., & Author, N. (2023). Title of the evaluation or tooling paper. In Workshop Name.',
  ];
  refs.forEach((r, i) => {
    const row = hstack('Ref ' + (i + 1), 16);
    row.counterAxisAlignItems = 'MIN';
    list.appendChild(row);
    row.appendChild(txt('[' + (i + 1) + ']', 'Medium', 135, 56));
    row.appendChild(txt(r, 'Regular', 135, W - 72));
  });
  col.appendChild(txt('Dummy references – replace with the final citations. Numbers match the in-text markers [1]–[6] on the main poster.', 'Regular', 135, W)).opacity = 0.55;
}

async function main() {
  const fonts = [
    ['IBM Plex Sans', 'Regular'], ['IBM Plex Sans', 'Medium'],
    ['IBM Plex Sans', 'SemiBold'], ['IBM Plex Sans', 'Bold'], ['IBM Plex Mono', 'Regular'],
  ];
  for (const [family, style] of fonts) await figma.loadFontAsync({ family, style });

  const page = figma.currentPage;
  let frame = page.findChild(n => n.type === 'FRAME' && n.name === FRAME_NAME);
  if (!frame) {
    const src = page.findChild(n => n.type === 'FRAME' && n.name.indexOf('Poster – A1') === 0);
    if (!src) throw new Error('Could not find the main poster frame on this page.');
    frame = src.clone();
    page.appendChild(frame);
    frame.x = src.x + src.width + 200;
    frame.y = src.y;
    frame.name = FRAME_NAME;
  }
  const body = frame.findChild(n => n.name === 'Body');
  if (!body) throw new Error('Phase 2 frame has no "Body" layer.');
  for (const c of body.children.slice()) c.remove();

  buildCol1(body);
  columnRule(body);
  buildCol2(body);
  columnRule(body);
  buildCol3(body);

  figma.viewport.scrollAndZoomIntoView([frame]);
  page.selection = [frame];
}

main()
  .then(() => figma.closePlugin('Phase 2 (Appendix & References) built'))
  .catch(e => figma.closePlugin('Error: ' + e.message));
