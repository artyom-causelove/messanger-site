import { imageToBase64 } from '@/core/index'
import openSocket from 'socket.io-client'

export default class Service {
  rootUrl = 'http://127.0.0.1:3000/'

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

  startSocket (query) {
    return openSocket(this.rootUrl, {
      query
    })
  }
}
