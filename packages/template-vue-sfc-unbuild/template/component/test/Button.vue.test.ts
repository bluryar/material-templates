import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import Button from '../src/components/Button.vue'

describe('button.vue', () => {
  it('renders default variant correctly', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).not.toContain('btn-outline')
  })

  it('renders outline variant correctly', () => {
    const wrapper = shallowMount(Button, {
      props: {
        variant: 'outline',
      },
    })
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-outline')
  })

  it('renders slot content correctly', () => {
    const slotContent = 'Click me'
    const wrapper = shallowMount(Button, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
