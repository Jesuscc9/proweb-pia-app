import { Application } from '@hotwired/stimulus'
import FormController from './controllers/form_controller'
import PostsController from './controllers/posts_controller'

import '../css/style.css'
import { redirect } from './utils'
import axios from 'axios'
import { BASE_URL } from './config'

window.Stimulus = Application.start()
window.Stimulus.register('form', FormController)
window.Stimulus.register('posts', PostsController)

const setup = async () => {
  const account = JSON.parse(window.localStorage.getItem('fime_posts_user'))

  if (account) {
    const res = await axios.get(`${BASE_URL}/users/index.php?id=${account.id}`)

    window.localStorage.setItem(
      'fime_posts_user',
      JSON.stringify(res.data.data)
    )
  }

  const isPublicRoute = (route) => {
    return route.includes('login') || route.includes('signup')
  }

  const isLoggedIn = () => typeof account !== 'undefined' && account !== null

  if (isLoggedIn() && isPublicRoute(window.location.pathname)) {
    redirect('home')
  }

  if (!isLoggedIn()) {
    if (!isPublicRoute(window.location.pathname)) {
      redirect('login')
    }
  }

  const setupNavbar = () => {
    const navbarEl = document.querySelector('#navbar')

    const usernameEl = navbarEl.querySelector('#username')
    const avatarEl = document.querySelectorAll('.avatar')
    const logoutBtn = navbarEl.querySelector('#logout-button')

    usernameEl.textContent = account.username

    avatarEl.forEach((e) => {
      e.setAttribute('src', account.avatar_url)
    })

    logoutBtn.addEventListener('click', () => {
      window.localStorage.clear()
      redirect('login')
    })
  }

  if (!isPublicRoute(window.location.pathname) && isLoggedIn()) {
    setupNavbar()
  }

  if (window.location.pathname.includes('home')) {
    const newPostBtn = document.querySelector('#new-post-btn')
    const postsForm = document.querySelector('#post-form')

    const showPostForm = () => {
      postsForm.classList.remove('hidden')
    }

    const hidePostForm = () => {
      postsForm.classList.add('hidden')
    }

    newPostBtn.addEventListener('click', () => {
      showPostForm()
    })

    document.querySelector('#overlay').addEventListener('click', () => {
      hidePostForm()
    })
  }
}

setup()
