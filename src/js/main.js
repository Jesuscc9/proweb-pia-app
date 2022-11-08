import { Application } from '@hotwired/stimulus'

import FormController from './controllers/form_controller'

window.Stimulus = Application.start()
window.Stimulus.register('form', FormController)
