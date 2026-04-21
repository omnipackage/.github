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
    html.push('<div class="row g-3">');
    for (const [family, items] of groups) {
      const label = familyLabels[family] || family;
      const pkgType = (items[0] && items[0].package_type || '').toUpperCase();
      html.push('<div class="col-md-6 col-lg-4">');
      html.push('<div class="card h-100"><div class="card-body">');
      html.push('<div class="d-flex justify-content-between align-items-center mb-2">');
      html.push('<div class="d-flex align-items-center gap-2">');
      html.push('<img src="/assets/images/distros/' + family + '.svg" alt="" width="20" height="20" style="flex-shrink:0;" onerror="this.style.display=\'none\'">');
      html.push('<h3 class="h6 mb-0">' + label + '</h3>');
      html.push('</div>');
      if (pkgType) html.push('<small class="text-body-secondary text-uppercase" style="font-size:0.7rem;letter-spacing:0.05em;">' + pkgType + '</small>');
      html.push('</div>');
      html.push('<div class="d-flex flex-wrap small text-body-secondary" style="gap:0.25rem 0.75rem;">');
      for (const d of items) {
        const version = (d.name || '').replace(label, '').trim() || d.name;
        html.push('<span>' + version + '</span>');
      }
      html.push('</div></div></div></div>');
    }
    html.push('</div>');
    html.push('<p class="text-body-secondary small mt-3 mb-0">' + distros.length + ' distros across ' + groups.size + ' families.</p>');
    container.innerHTML = html.join('');
  } catch (err) {
    container.innerHTML = '<p class="text-body-secondary">Could not load the distro list. See <a href="https://github.com/omnipackage/omnipackage-rs/blob/master/src/distros.yml" target="_blank">distros.yml</a> on GitHub.</p>';
    console.error(err);
  }
})();
