import Service from './service'

class ConferenceService extends Service {
  async getConferences (ids) {
    const bodyObject = JSON.stringify(ids)
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + 'conferences/byIds', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: bodyObject
    })

    const object = await response.json()

    if (object.errorMessage) {
      throw new Error(object.errorMessage)
    } else if (object.message) {
      throw new Error(object.message)
    }

    const conferences = object.map(conference => {
      delete conference.__v
      return conference
    })

    return conferences
  }

  async create (name, avatar) {
    let bodyObj = {
      name
    }

    if (avatar) {
      bodyObj.avatar = avatar
    }

    bodyObj = JSON.stringify(bodyObj)
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + 'conferences', {
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

    delete object.__v

    return object
  }

  async edit (id, updatedConference) {
    const bodyObj = JSON.stringify(updatedConference)
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + 'conferences/' + id, {
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
}

export default new ConferenceService()
