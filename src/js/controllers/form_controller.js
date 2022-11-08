import { Controller } from '@hotwired/stimulus'
import { LOADER, BASE_URL } from '../config'
import axios from 'axios'

export default class extends Controller {
  static targets = ['button', 'form', 'error']

  static values = {
    url: String,
  }

  connect() {
    fetchPosts()

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
        this.element.reset()
        fetchPosts()
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

const fetchPosts = async () => {
  const $posts = document.querySelector('#posts-container')
  const res = await axios.get(`${BASE_URL}/posts/index.php`)

  const posts = res.data.data

  console.log({ res })

  $posts.innerHTML = 'No posts found'

  if (posts?.length > 0) {
    $posts.innerHTML = ''
    posts.forEach((post) => {
      console.log({ post })
      console.log(new Date(post.created_at))

      $posts.innerHTML =
        $posts.innerHTML +
        `
        <div>
          <p class='text-red-500'>${post.body}</p>
          <p class='text-white'>${post.created_at}</p>
        </div>
      `
    })
  }
}
