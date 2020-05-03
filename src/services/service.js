import { imageToBase64 } from '@/core/index'

export default class Service {
  rootUrl = 'https://messanger-backend.herokuapp.com/'

  getApiKey () {
    return JSON.parse(window.localStorage.getItem('apiKey'))
  }

  setApiKey (apiKey) {
    window.localStorage.setItem('apiKey', JSON.stringify(apiKey))
  }

  removeApiKey () {
    window.localStorage.removeItem('apiKey')
  }

  stringifyImage (image) {
    return imageToBase64(image)
  }
}
