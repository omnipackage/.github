(async () => {
  const container = document.getElementById('supported-distros');
  if (!container) return;

  const familyLabels = {
    opensuse: 'openSUSE',
    almalinux: 'AlmaLinux',
    rockylinux: 'Rocky Linux',
    debian: 'Debian',
    ubuntu: 'Ubuntu',
    fedora: 'Fedora',
    mageia: 'Mageia',
  };

  try {
    const res = await fetch('https://raw.githubusercontent.com/omnipackage/omnipackage-rs/master/src/distros.yml', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = jsyaml.load(await res.text());
    const distros = (data.distros || []).filter(d => !d.deprecated);

    const groups = new Map();
    for (const d of distros) {
      const family = (d.id || '').split('_')[0];
      if (!groups.has(family)) groups.set(family, []);
      groups.get(family).push(d);
    }

    const html = [];
    html.push('<div class="distro-grid">');
    for (const [family, items] of groups) {
      const label = familyLabels[family] || family;
      const pkgType = (items[0] && items[0].package_type || '').toUpperCase();
      html.push('<div class="distro-card">');
      html.push('<div class="distro-head">');
      html.push('<h3 class="distro-name">');
      html.push('<img src="/assets/images/distros/' + family + '.svg" alt="" width="20" height="20" style="flex-shrink:0;" onerror="this.style.display=\'none\'">');
      html.push(label);
      html.push('</h3>');
      if (pkgType) html.push('<span class="pkg-type">' + pkgType + '</span>');
      html.push('</div>');
      html.push('<div class="distro-versions">');
      for (const d of items) {
        const version = (d.name || '').replace(label, '').trim() || d.name;
        html.push('<span>' + version + '</span>');
      }
      html.push('</div></div>');
    }
    html.push('</div>');
    html.push('<p class="muted small" style="margin-top:1rem;margin-bottom:0;">' + distros.length + ' distros across ' + groups.size + ' families.</p>');
    container.innerHTML = html.join('');
  } catch (err) {
    container.innerHTML = '<p class="muted">Could not load the distro list. See <a href="https://github.com/omnipackage/omnipackage-rs/blob/master/src/distros.yml" target="_blank">distros.yml</a> on GitHub.</p>';
    console.error(err);
  }
})();
