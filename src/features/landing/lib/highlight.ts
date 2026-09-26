import { codeToHtml } from 'shiki';

export function highlightSnippet(code: string) {
  return codeToHtml(code, {
    lang: 'javascript',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false
  });
}
