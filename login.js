import './style.css'
import axios from 'axios'
import { BASE_URL, LOADER } from './config'

const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const errorEl = e.target.querySelector('.form-error')
  const button = e.target.querySelector('button')

  const values = Object.fromEntries(new window.FormData(e.target))

  errorEl.textContent = ''
  errorEl.classList.add('hidden')

  const prevButtonText = button.textContent

  button.innerHTML = LOADER

  try {
    await axios.post(`${BASE_URL}/auth/login.php`, values)
  } catch (e) {
    errorEl.textContent = e.response.data.message
    errorEl.classList.remove('hidden')
  } finally {
    button.textContent = prevButtonText
  }
})
