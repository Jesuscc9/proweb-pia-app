import { Application } from '@hotwired/stimulus'
import FormController from './controllers/form_controller'
import PostsController from './controllers/posts_controller'

import '../css/style.css'

window.Stimulus = Application.start()
window.Stimulus.register('form', FormController)
window.Stimulus.register('posts', PostsController)
