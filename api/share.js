function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function handler(req, res) {
  const image = typeof req.query.image === 'string' ? req.query.image : ''
  const kind = req.query.kind === 'frame' ? 'frame' : 'builder'

  let imageUrl
  try {
    const parsed = new URL(image)
    if (parsed.protocol !== 'https:') throw new Error('Image must use HTTPS')
    imageUrl = parsed.toString()
  } catch {
    res.status(400).send('Invalid image URL')
    return
  }

  const title = kind === 'frame'
    ? 'HHGoa2026 Frame'
    : 'HHGoa2026 Builder ID'
  const description = kind === 'frame'
    ? 'My HHGoa2026 Frame. #HHGoa2026 #FrameInGoa'
    : 'My HHGoa2026 Builder ID. #HHGoa2026 #FrameInGoa'
  const pageUrl = `https://${req.headers.host || 'hhgoaid.vercel.app'}${req.url}`

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(pageUrl)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(pageUrl)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
<meta property="og:image:alt" content="${escapeHtml(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}">
<meta name="twitter:image:alt" content="${escapeHtml(title)}">
<style>html,body{margin:0;min-height:100%;font-family:system-ui,sans-serif;background:#111;color:#fff}main{max-width:900px;margin:0 auto;padding:24px}img{display:block;max-width:100%;height:auto;margin:auto;border-radius:12px}h1{font-size:20px}p{opacity:.75}</style>
</head>
<body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}"></main></body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=31536000, stale-while-revalidate=86400')
  res.status(200).send(html)
}

module.exports = handler;
