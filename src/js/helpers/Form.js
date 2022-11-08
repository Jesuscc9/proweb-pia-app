import { LOADER } from '../config'
import axios from 'axios'

export class Form {
  constructor(form, opts) {
    this.form = form
    this.opts = opts
    this.init()
  }

  init() {
    this.form.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const errorEl = evt.target.querySelector('.form-error')
      const button = evt.target.querySelector('button')

      const values = Object.fromEntries(new window.FormData(evt.target))

      errorEl.textContent = ''
      errorEl.classList.add('hidden')

      const prevButtonText = button.textContent

      button.innerHTML = LOADER

      try {
        await axios.post(this.opts.postUrl, values)
        this.opts.onSuccess()
      } catch (e) {
        errorEl.textContent = e.response.data.message
        errorEl.classList.remove('hidden')
      } finally {
        button.textContent = prevButtonText
      }
    })
  }
}
