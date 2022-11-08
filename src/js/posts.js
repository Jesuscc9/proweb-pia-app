import axios from 'axios'
import '../css/style.css'
import { BASE_URL } from './config'

const fetch = async () => {
  const res = await axios.get(`${BASE_URL}/posts/index.php`)

  const posts = res.data.data

  $posts.innerHTML = JSON.stringify(posts)
}

const $posts = document.querySelector('#posts-container')

fetch()
