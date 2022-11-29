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
        const showActions =
          post.created_by ===
          JSON.parse(window.localStorage.getItem('fime_posts_user')).id

        $posts.innerHTML =
          $posts.innerHTML +
          `
          <div class='border-t border-gray-50 p-4 w-full flex flex-col gap-2 post'>
            ${
              showActions
                ? '<button class="bg-red-500 rounded-md w-min flex items-center px-3 text-xs py-1 self-end gap-2 hover:bg-red-600" id="delete-button">Delete <i class="fa-solid fa-trash"></i></button>'
                : ''
            }
            <div class='flex gap-4 items-center'>
              <img src='${
                post.author.avatar_url
              }' class='w-12 h-12 rounded-full' alt="" />

              <div class='flex gap-2'>
                <p class='font-bold mt-0'>${post.author.username}</p>
                <span class='opacity-60'>·</span>
                <p class='text-white opacity-60'>${timeAgo.format(
                  new Date(post.created_at)
                )}</p>
              </div>
            </div>

            <p>${post.body}</p>
            <!--
            <div class='flex justify-around'>
              <button type='button' class='flex gap-0 items-center'>
                <div class="heart" id='like-button'></div>
                <p class='opacity-60 text-sm' id='likes-count'>1</p>
              </button>
              <button class='bg-red-500 px-2'>comment</button>
            </div>
            -->
         </div>
        `

        $posts.querySelectorAll('.post').forEach((div, i) => {
          const eraseButton = div.querySelector('#delete-button')

          if (!eraseButton) return

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
