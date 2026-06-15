import { NextRequest, NextResponse } from 'next/server';

const THEMES: Record<string, { css: string; name: string }> = {
  standard: {
    name: 'Standard',
    css: `
      body { font-family: 'Arial', sans-serif; color: #1a1a1a; margin: 0; padding: 40px; }
      h1 { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
      .label { font-size: 16px; color: #555; margin-bottom: 8px; }
      .contact { font-size: 13px; color: #666; margin-bottom: 24px; }
      h2 { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #1a1a1a; padding-bottom: 4px; margin: 20px 0 10px; }
      .item { margin-bottom: 14px; }
      .item-header { display: flex; justify-content: space-between; }
      .item-title { font-weight: 600; font-size: 14px; }
      .item-sub { color: #555; font-size: 13px; font-style: italic; }
      .date { font-size: 12px; color: #888; }
      ul { margin: 6px 0 0 18px; padding: 0; }
      li { font-size: 13px; margin-bottom: 3px; color: #333; }
      .badge { display: inline-block; background: #f0f0f0; border-radius: 4px; padding: 2px 8px; font-size: 12px; margin: 2px; }
      .summary-text { font-size: 13px; color: #444; line-height: 1.6; }
    `,
  },
  elegant: {
    name: 'Elegant',
    css: `
      body { font-family: 'Georgia', serif; color: #2c2c2c; margin: 0; padding: 50px; }
      h1 { font-size: 32px; font-weight: 400; text-align: center; letter-spacing: 2px; margin: 0 0 6px; }
      .label { font-size: 15px; color: #777; text-align: center; font-style: italic; margin-bottom: 10px; }
      .contact { font-size: 13px; color: #666; text-align: center; margin-bottom: 30px; }
      h2 { font-size: 13px; font-weight: 600; text-align: center; text-transform: uppercase; letter-spacing: 3px; margin: 22px 0 12px; }
      h2::after { content: ''; display: block; width: 40px; height: 1px; background: #888; margin: 6px auto 0; }
      .item { margin-bottom: 14px; }
      .item-header { display: flex; justify-content: space-between; }
      .item-title { font-weight: 600; font-size: 14px; }
      .item-sub { color: #666; font-size: 13px; font-style: italic; }
      .date { font-size: 12px; color: #999; font-style: italic; }
      ul { margin: 6px 0 0 18px; } li { font-size: 13px; margin-bottom: 3px; }
      .badge { display: inline-block; background: #f5f0eb; border-radius: 2px; padding: 2px 8px; font-size: 12px; margin: 2px; }
      .summary-text { font-size: 13px; color: #555; line-height: 1.7; font-style: italic; }
    `,
  },
  modern: {
    name: 'Modern',
    css: `
      body { font-family: 'Helvetica Neue', sans-serif; color: #222; margin: 0; padding: 0; }
      .header { background: #1e3a5f; color: white; padding: 30px 40px; }
      h1 { font-size: 26px; font-weight: 700; margin: 0 0 4px; color: white; }
      .label { font-size: 14px; color: #a8c4e0; margin-bottom: 6px; }
      .contact { font-size: 12px; color: #cce0f5; }
      .body { padding: 30px 40px; }
      h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #1e3a5f; border-left: 3px solid #1e3a5f; padding-left: 8px; margin: 20px 0 10px; }
      .item { margin-bottom: 14px; }
      .item-header { display: flex; justify-content: space-between; }
      .item-title { font-weight: 600; font-size: 14px; }
      .item-sub { color: #555; font-size: 13px; }
      .date { font-size: 12px; color: #888; }
      ul { margin: 6px 0 0 18px; } li { font-size: 13px; margin-bottom: 3px; }
      .badge { display: inline-block; background: #e8f0f8; color: #1e3a5f; border-radius: 12px; padding: 2px 10px; font-size: 12px; margin: 2px; }
      .summary-text { font-size: 13px; color: #444; line-height: 1.6; }
    `,
  },
  minimal: {
    name: 'Minimal',
    css: `
      body { font-family: 'Helvetica', sans-serif; color: #333; margin: 0; padding: 50px 60px; }
      h1 { font-size: 24px; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 4px; }
      .label { font-size: 13px; color: #999; letter-spacing: 1px; margin-bottom: 8px; }
      .contact { font-size: 12px; color: #aaa; margin-bottom: 30px; }
      h2 { font-size: 11px; font-weight: 400; text-transform: uppercase; letter-spacing: 3px; color: #aaa; margin: 24px 0 8px; }
      .divider { height: 1px; background: #eee; margin-bottom: 12px; }
      .item { margin-bottom: 12px; }
      .item-header { display: flex; justify-content: space-between; }
      .item-title { font-weight: 500; font-size: 13px; }
      .item-sub { color: #999; font-size: 12px; }
      .date { font-size: 11px; color: #bbb; }
      ul { margin: 4px 0 0 16px; } li { font-size: 12px; margin-bottom: 2px; color: #555; }
      .badge { display: inline-block; border: 1px solid #ddd; border-radius: 2px; padding: 1px 7px; font-size: 11px; margin: 2px; color: #666; }
      .summary-text { font-size: 12px; color: #666; line-height: 1.7; }
    `,
  },
  creative: {
    name: 'Creative',
    css: `
      body { font-family: 'Arial', sans-serif; color: #2d2d2d; margin: 0; padding: 0; display: flex; min-height: 100vh; }
      .sidebar { width: 200px; background: #2d4a3e; color: white; padding: 30px 20px; min-height: 100vh; flex-shrink: 0; }
      .main { flex: 1; padding: 30px 35px; }
      h1 { font-size: 22px; font-weight: 700; color: white; margin: 0 0 4px; }
      .label { font-size: 12px; color: #a8c9b8; margin-bottom: 20px; }
      .contact-item { font-size: 11px; color: #c8e0d4; margin-bottom: 6px; word-break: break-all; }
      .sidebar h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #7ab89a; border-bottom: 1px solid #4a7a62; padding-bottom: 4px; margin: 20px 0 8px; }
      .main h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #2d4a3e; border-bottom: 2px solid #2d4a3e; padding-bottom: 3px; margin: 18px 0 10px; }
      .item { margin-bottom: 12px; }
      .item-title { font-weight: 600; font-size: 13px; }
      .item-sub { color: #555; font-size: 12px; }
      .date { font-size: 11px; color: #888; }
      ul { margin: 4px 0 0 16px; } li { font-size: 12px; margin-bottom: 2px; }
      .badge { display: inline-block; background: #e8f4ee; color: #2d4a3e; border-radius: 3px; padding: 2px 7px; font-size: 11px; margin: 2px; }
      .summary-text { font-size: 12px; color: #444; line-height: 1.6; }
    `,
  },
  tech: {
    name: 'Tech',
    css: `
      body { font-family: 'Courier New', monospace; color: #e0e0e0; background: #1a1a2e; margin: 0; padding: 40px; }
      h1 { font-size: 24px; font-weight: 700; color: #64ffda; margin: 0 0 4px; }
      .label { font-size: 14px; color: #a8b2d8; margin-bottom: 8px; }
      .contact { font-size: 12px; color: #8892b0; margin-bottom: 24px; }
      h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #64ffda; margin: 20px 0 8px; }
      h2::before { content: '// '; color: #4a5568; }
      .item { margin-bottom: 12px; border-left: 2px solid #233554; padding-left: 12px; }
      .item-title { font-weight: 600; font-size: 13px; color: #ccd6f6; }
      .item-sub { color: #8892b0; font-size: 12px; }
      .date { font-size: 11px; color: #4a5568; }
      ul { margin: 4px 0 0 16px; } li { font-size: 12px; margin-bottom: 2px; color: #a8b2d8; }
      .badge { display: inline-block; background: #233554; color: #64ffda; border-radius: 3px; padding: 2px 8px; font-size: 11px; margin: 2px; border: 1px solid #64ffda33; }
      .summary-text { font-size: 12px; color: #8892b0; line-height: 1.6; }
    `,
  },
};

function buildHTML(resume: any, themeId: string): string {
  const theme = THEMES[themeId] || THEMES.standard;
  const r = resume;
  const b = r.basics || {};
  const isModern = themeId === 'modern';
  const isCreative = themeId === 'creative';

  const contact = [b.email, b.phone, b.location?.city && `${b.location.city}${b.location.region ? ', ' + b.location.region : ''}`]
    .filter(Boolean).join(' | ');

  const sectionsHTML = (sections: string) => sections;

  const workSection = r.work?.length ? `
    <h2>Work Experience</h2>
    ${r.work.map((w: any) => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${w.position || ''} ${w.name ? `— ${w.name}` : ''}</span>
          <span class="date">${w.startDate || ''} ${w.endDate ? `– ${w.endDate}` : w.startDate ? '– Present' : ''}</span>
        </div>
        ${w.summary ? `<div class="item-sub">${w.summary}</div>` : ''}
        ${w.highlights?.length ? `<ul>${w.highlights.map((h: string) => `<li>${h}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('')}
  ` : '';

  const educationSection = r.education?.length ? `
    <h2>Education</h2>
    ${r.education.map((e: any) => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${e.institution || ''}</span>
          <span class="date">${e.startDate || ''} ${e.endDate ? `– ${e.endDate}` : ''}</span>
        </div>
        ${(e.studyType || e.area) ? `<div class="item-sub">${[e.studyType, e.area].filter(Boolean).join(' in ')}</div>` : ''}
      </div>
    `).join('')}
  ` : '';

  const skillsSection = r.skills?.length ? `
    <h2>Skills</h2>
    <div style="margin-bottom:8px">
      ${r.skills.map((s: any) => `
        <div class="item" style="margin-bottom:8px">
          <span class="item-title" style="font-size:12px">${s.name}${s.level ? ` <span style="font-weight:400;color:#888">(${s.level})</span>` : ''}</span>
          ${s.keywords?.length ? `<div style="margin-top:3px">${s.keywords.map((k: string) => `<span class="badge">${k}</span>`).join('')}</div>` : ''}
        </div>
      `).join('')}
    </div>
  ` : '';

  const langSection = r.languages?.length ? `
    <h2>Languages</h2>
    ${r.languages.map((l: any) => `<div class="item"><span class="item-title">${l.language}</span>${l.fluency ? ` <span class="item-sub">— ${l.fluency}</span>` : ''}</div>`).join('')}
  ` : '';

  const certSection = r.certificates?.length ? `
    <h2>Certificates</h2>
    ${r.certificates.map((c: any) => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${c.name}</span>
          <span class="date">${c.date || ''}</span>
        </div>
        ${c.issuer ? `<div class="item-sub">${c.issuer}</div>` : ''}
      </div>
    `).join('')}
  ` : '';

  const projectsSection = r.projects?.length ? `
    <h2>Projects</h2>
    ${r.projects.map((p: any) => `
      <div class="item">
        <div class="item-title">${p.name}</div>
        ${p.description ? `<div class="item-sub">${p.description}</div>` : ''}
        ${p.keywords?.length ? `<div style="margin-top:3px">${p.keywords.map((k: string) => `<span class="badge">${k}</span>`).join('')}</div>` : ''}
      </div>
    `).join('')}
  ` : '';

  const mainContent = `
    ${b.summary ? `<h2>Summary</h2><p class="summary-text">${b.summary}</p>` : ''}
    ${workSection}
    ${educationSection}
    ${skillsSection}
    ${langSection}
    ${certSection}
    ${projectsSection}
  `;

  let bodyContent = '';

  if (isCreative) {
    bodyContent = `
      <div class="sidebar">
        <h1>${b.name || 'Name'}</h1>
        <div class="label">${b.label || ''}</div>
        ${b.email ? `<div class="contact-item">✉ ${b.email}</div>` : ''}
        ${b.phone ? `<div class="contact-item">📞 ${b.phone}</div>` : ''}
        ${b.location?.city ? `<div class="contact-item">📍 ${b.location.city}</div>` : ''}
        ${r.languages?.length ? `
          <h2>Languages</h2>
          ${r.languages.map((l: any) => `<div style="font-size:11px;color:#c8e0d4;margin-bottom:4px">${l.language}${l.fluency ? ` — ${l.fluency}` : ''}</div>`).join('')}
        ` : ''}
        ${r.skills?.length ? `
          <h2>Skills</h2>
          ${r.skills.slice(0, 4).map((s: any) => `
            <div style="font-size:11px;color:#c8e0d4;margin-bottom:4px">${s.name}</div>
            ${s.keywords?.slice(0, 3).map((k: string) => `<span class="badge" style="font-size:10px;margin:1px;display:inline-block">${k}</span>`).join('') || ''}
          `).join('')}
        ` : ''}
      </div>
      <div class="main">
        ${b.summary ? `<h2>Summary</h2><p class="summary-text">${b.summary}</p>` : ''}
        ${workSection}
        ${educationSection}
        ${projectsSection}
        ${certSection}
      </div>
    `;
  } else if (isModern) {
    bodyContent = `
      <div class="header">
        <h1>${b.name || 'Name'}</h1>
        <div class="label">${b.label || ''}</div>
        <div class="contact">${contact}</div>
      </div>
      <div class="body">${mainContent}</div>
    `;
  } else {
    bodyContent = `
      <h1>${b.name || 'Name'}</h1>
      ${b.label ? `<div class="label">${b.label}</div>` : ''}
      <div class="contact">${contact}</div>
      ${mainContent}
    `;
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ${theme.css}
  @media print {
    @page { size: A4; margin: 0; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>${bodyContent}</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const { resume, themeId = 'standard', filename = 'resume' } = await request.json();

    if (!resume) {
      return NextResponse.json({ error: 'No resume data provided' }, { status: 400 });
    }

    const html = buildHTML(resume, themeId);

    const safeFilename = filename.replace(/[^a-zA-Z0-9-_؀-ۿ\s]/g, '_');

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${safeFilename}.html"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export resume' }, { status: 500 });
  }
}
