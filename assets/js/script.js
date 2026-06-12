/*
 * Theme toggle: cycles auto -> light -> dark, persisted in localStorage.
 * Runs before paint to set data-theme and avoid a flash of the wrong theme.
 */
(() => {
  'use strict'

  const KEY = 'theme'
  const MODES = ['auto', 'light', 'dark']
  const mql = window.matchMedia('(prefers-color-scheme: dark)')

  const storedMode = () => localStorage.getItem(KEY) || 'auto'
  const resolve = mode => (mode === 'auto' ? (mql.matches ? 'dark' : 'light') : mode)
  const apply = mode => document.documentElement.setAttribute('data-theme', resolve(mode))

  // Apply immediately (this script is loaded synchronously in <head>).
  apply(storedMode())

  const reflect = mode => {
    const btn = document.getElementById('theme-toggle')
    if (!btn) return
    btn.dataset.mode = mode
    btn.setAttribute('aria-label', `Theme: ${mode} (click to change)`)
    const label = document.getElementById('theme-label')
    if (label) label.textContent = mode
  }

  // Follow the system when in auto mode.
  mql.addEventListener('change', () => {
    if (storedMode() === 'auto') apply('auto')
  })

  window.addEventListener('DOMContentLoaded', () => {
    reflect(storedMode())
    const btn = document.getElementById('theme-toggle')
    if (!btn) return
    btn.addEventListener('click', () => {
      const next = MODES[(MODES.indexOf(storedMode()) + 1) % MODES.length]
      localStorage.setItem(KEY, next)
      apply(next)
      reflect(next)
    })
  })
})()
