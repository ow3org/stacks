import '@unocss/reset/tailwind.css'
import { defineCustomElement } from 'vue'
import AppHelloWorld from '/Users/ChrisBreuer/Code/stacks/resources/components/HelloWorld.stx'

const AppHelloWorldCustomElement = defineCustomElement(AppHelloWorld)
customElements.define('app-hello-world', AppHelloWorldCustomElement)
