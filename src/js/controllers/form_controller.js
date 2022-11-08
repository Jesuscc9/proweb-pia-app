import { Controller } from '@hotwired/stimulus'
import { LOADER, BASE_URL } from '../config'
import axios from 'axios'

export default class extends Controller {
  static targets = ['button', 'form', 'error']

  static values = {
    url: String,
  }

  connect() {
    this.element.addEventListener('submit', async (evt) => {
      evt.preventDefault()

      const values = Object.fromEntries(new window.FormData(evt.target))
      this.errorTarget.textContent = ''
      this.errorTarget.classList.add('hidden')

      const prevButtonText = this.buttonTarget.textContent

      this.buttonTarget.innerHTML = LOADER

      const URL = `${BASE_URL}${this.urlValue}`

      try {
        await axios.post(URL, values)
        // this.opts.onSuccess()
      } catch (e) {
        console.error({ e })

        this.errorTarget.textContent =
          e?.response?.data?.message ?? 'Error procesando esa peticion.'
        this.errorTarget.classList.remove('hidden')
      } finally {
        this.buttonTarget.textContent = prevButtonText
      }
    })
  }
}
