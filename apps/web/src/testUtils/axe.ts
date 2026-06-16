import { axe } from 'jest-axe'

const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

export function runAxe(container: Element) {
  return axe(container, {
    runOnly: { type: 'tag', values: WCAG_AA_TAGS },
  })
}
