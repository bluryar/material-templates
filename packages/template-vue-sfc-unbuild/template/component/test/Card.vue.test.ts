import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Card from '../src/components/Card.vue'

describe('card', () => {
  it('renders slots correctly', () => {
    const wrapper = shallowMount(Card, {
      slots: {
        header: '<div class="test-header">Test Header</div>',
        body: '<div class="test-body">Test Body</div>',
        footer: '<div class="test-footer">Test Footer</div>',
      },
    })

    expect(wrapper.find('.test-header').exists()).toBe(true)
    expect(wrapper.find('.test-body').exists()).toBe(true)
    expect(wrapper.find('.test-footer').exists()).toBe(true)
  })
})
