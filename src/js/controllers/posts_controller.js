import { Controller } from '@hotwired/stimulus'
import { BASE_URL } from '../config'
import axios from 'axios'

export default class extends Controller {
  static targets = ['container', 'refreshButton']

  async fetchData() {
    const $posts = this.containerTarget
    this.refreshButtonTarget.disabled = true

    await new Promise((resolve, reject) => setTimeout(resolve, 300))
    const res = await axios.get(`${BASE_URL}/posts/index.php`)

    const posts = res.data.data

    $posts.innerHTML = 'No posts found'

    posts?.reverse()

    if (posts?.length > 0) {
      $posts.innerHTML = ''
      posts.forEach((post) => {
        const showActions = post.created_by === '1'

        $posts.innerHTML =
          $posts.innerHTML +
          `
          <div class='border p-4 w-full'>
            ${
              showActions
                ? '<button class="bg-red-500 rounded-md py-2 px-4" data-controller-id>hola</button>'
                : ''
            }
            <p class='text-red-500'>${post.body}</p>
            <p class='text-white'>${post.created_at}</p>
          </div>
        `

        $posts.querySelectorAll('div').forEach((div, i) => {
          const eraseButton = div.querySelector('button')

          eraseButton?.addEventListener('click', async () => {
            await axios.delete(`${BASE_URL}/posts/index.php?id=${posts[i].id}`)
            this.refresh()
          })
        })
      })
    }
    this.refreshButtonTarget.disabled = false
  }

  async refresh() {
    await this.fetchData()
  }

  connect() {
    this.fetchData()
  }
}
