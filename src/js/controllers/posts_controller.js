import { Controller } from '@hotwired/stimulus'
import { BASE_URL } from '../config'
import axios from 'axios'

import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)

const timeAgo = new TimeAgo('es')

export default class extends Controller {
  static targets = ['container', 'refreshButton']

  async fetchData() {
    const $posts = this.containerTarget
    this.refreshButtonTarget.disabled = true

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
          <div class='border p-4 w-full flex flex-col gap-2'>
            ${
              showActions
                ? '<button class="bg-red-500 rounded-md py-2 px-4" data-controller-id>Delete</button>'
                : ''
            }
            <div class='flex gap-2 items-center'>
              <img src='${
                post.author.avatar_url
              }' class='w-8 h-8 rounded-full' alt="" />

              <div class='flex gap-2'>
                <p class='font-bold mt-0'>${post.author.username}</p>
                <span class='opacity-60'>·</span>
                <p class='text-white opacity-60'>${timeAgo.format(
                  new Date(post.created_at)
                )}</p>
              </div>
            </div>

            <p class='text-red-500'>${post.body}</p>

            <div class='mt-4 flex justify-around'>
              <button class='bg-red-500 px-2'>like</button>
              <button class='bg-red-500 px-2'>comment</button>
              
            </div>

         </div>
        `

        $posts.querySelectorAll('div').forEach((div, i) => {
          const eraseButton = div.querySelector('button')
          console.log({ $posts })

          eraseButton?.addEventListener('click', async () => {
            console.log({ posts, i })
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
