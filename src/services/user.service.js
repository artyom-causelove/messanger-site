import Service from './service'

class UserService extends Service {
  async logout () {
    const apiKey = this.getApiKey()

    if (apiKey) {
      const object = await fetch(this.rootUrl + 'users/logout', {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })

      if (object.message) {
        throw new Error(object.message)
      }

      this.removeApiKey()

      return true
    }

    throw new Error('apiKey not found')
  }

  async login (personalId, password) {
    const bodyObj = JSON.stringify({ personalId, password })

    const response = await fetch(this.rootUrl + 'users/login', {
      method: 'post',
      body: bodyObj,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    delete object.__v

    this.setApiKey(object.apiKey)

    return object
  }

  async loginByApiKey () {
    const apiKey = this.getApiKey()

    if (apiKey) {
      const response = await fetch(this.rootUrl + 'users/loginByApiKey', {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })

      const object = await response.json()

      if (object.errorMessage) {
        throw new Error(object.errorMessage)
      } else if (object.message) {
        throw new Error(object.message)
      }

      delete object.__v

      return object
    }

    throw new Error('apiKey not found')
  }

  async signUp (personalId, nickname, password) {
    const bodyObj = JSON.stringify({
      personalId,
      nickname,
      password
    })

    const response = await fetch(this.rootUrl + 'users', {
      method: 'post',
      body: bodyObj,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    delete object.__v

    return object
  }

  async edit (id, updatedUser) {
    const bodyObj = JSON.stringify(updatedUser)
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + 'users/' + id, {
      method: 'put',
      body: bodyObj,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    delete object.__v

    return object
  }

  async checkPassword (id, password) {
    const bodyObj = JSON.stringify({
      password
    })
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + 'users/password/' + id, {
      method: 'post',
      body: bodyObj,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    return object
  }

  async findByNickname (nickname) {
    const apiKey = this.getApiKey()

    const response = await fetch(`${this.rootUrl}users/find/nickname/${nickname}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    return object
  }

  async getOuterInfo (outerId) {
    const apiKey = this.getApiKey()

    const response = await fetch(`${this.rootUrl}users/${outerId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    return object
  }
}

export default new UserService()
