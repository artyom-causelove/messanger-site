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

  async getMessages (id) {
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + `messages/by-message-block/${id}`, {
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

    delete object.__v
    return object
  }

  async getMessageBlock (confId, page) {
    const apiKey = this.getApiKey()

    const response = await fetch(this.rootUrl + `message-blocks/by-conference/${confId}/page/${page}`, {
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

    delete object.__v

    return object
  }

  async getParticipants (confId) {
    const apiKey = this.getApiKey()

    const response = await fetch(`${this.rootUrl}conferences/${confId}/participants`, {
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

    delete object.__v

    return object
  }

  async addParticipant (confId, userOuterId) {
    const bodyObj = JSON.stringify({
      userOuterId
    })
    const apiKey = this.getApiKey()

    const response = await fetch(`${this.rootUrl}conferences/${confId}/participants`, {
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

  async deleteParticipant (confId, participantOuterId) {
    const apiKey = this.getApiKey()

    const response = await fetch(`${this.rootUrl}conferences/${confId}/participants/${participantOuterId}`, {
      method: 'delete',
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
