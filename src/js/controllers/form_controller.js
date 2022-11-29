import { Controller } from '@hotwired/stimulus'
import { LOADER, BASE_URL } from '../config'
import axios from 'axios'
import { redirect } from '../utils'

export default class extends Controller {
  static targets = ['button', 'form', 'error']

  static values = {
    url: String,
    redirect: String,
    renderer: String,
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
        // Create account middleware

        if (values?.avatar) {
          const fullAvatar = 'https://unavatar.io/twitter/' + values.avatar
          values.avatar = fullAvatar
        } else {
          const fallbackAvatar =
            'https://i.pravatar.cc/150?u=' +
            values.username +
            new Date().getTime()

          values.avatar = fallbackAvatar
        }

        if (URL.includes('posts')) {
          const account = JSON.parse(
            window.localStorage.getItem('fime_posts_user')
          )

          values.created_by = account.id
        }

        const res = await axios.post(URL, values)

        // Login middleware
        if (URL.includes('login.php')) {
          const account = res.data.data
          window.localStorage.setItem(
            'fime_posts_user',
            JSON.stringify(account)
          )
        }

        if (this?.redirectValue) redirect(this.redirectValue)

        if (this?.rendererValue) {
          const refreshButton = document.querySelector(this.rendererValue)
          const button = refreshButton.querySelector('#refresh')
          button.click()
        }

        this.element.reset()

        if (URL.includes('posts')) {
          document.querySelector('#post-form').classList.add('hidden')
        }
      } catch (e) {
        this.errorTarget.textContent =
          e?.response?.data?.message ?? 'Error procesando esa peticion.'
        this.errorTarget.classList.remove('hidden')
      } finally {
        this.buttonTarget.textContent = prevButtonText
      }
    })
  }
}
