import '../css/style.css'
import { BASE_URL } from './config'
import { Form } from './helpers/Form'

const $formEl = document.querySelector('form')

const form = new Form($formEl, { postUrl: `${BASE_URL}/auth/login.php` })
