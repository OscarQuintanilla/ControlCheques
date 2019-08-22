const BASE_URL = 'http://localhost:5000';

async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  cheques: {
    list(user) {
      return callApi('/cheques/listar', {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },
    create(cheque) {
      return callApi(`/cheques/registrar`, {
        method: 'POST',
        body: JSON.stringify(cheque),
      });
    },
    read(badgeId) {
      return callApi(`/badges/${badgeId}`);
    },
    update(badgeId, updates) {
      return callApi(`/badges/${badgeId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    remove(badgeId) {
      return callApi(`/badges/${badgeId}`, {
        method: 'DELETE',
      });
    },
  },
  sesion: {
    login(badge) {
      return callApi(`/sesion/log`, {
        method: 'POST',
        body: JSON.stringify(badge),
      });
    },
  },
};



export default api;
