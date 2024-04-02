import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from '~/components/index.vue'

describe('helloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Hello World'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })

  it('increments count when button is clicked', () => {
    const wrapper = shallowMount(HelloWorld, {
      props: { msg: 'Hello World' },
    })
    const button = wrapper.find('button')
    button.trigger('click')
    expect((wrapper.vm as any).count).toBe(1)
    button.trigger('click')
    expect((wrapper.vm as any).count).toBe(2)
  })
})
