const BASE_URL = "http://localhost:5000";

async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  cheques: {
    list(user) {
      return callApi("/cheques/listar", {
        method: "POST",
        body: JSON.stringify(user)
      });
    },
    create(cheque) {
      return callApi(`/cheques/registrar`, {
        method: "POST",
        body: JSON.stringify(cheque)
      });
    },
    update(cheque) {
      return callApi(`/cheques/modificar`, {
        method: "PUT",
        body: JSON.stringify(cheque)
      });
    },
    remove(chequeNo) {
      return callApi(`/cheques/eliminar`, {
        method: "POST",
        body: JSON.stringify(chequeNo)
      });
    },
    getRubros(dealer) {
      return callApi(`/cheques/rubros`, {
        method: "POST",
        body: JSON.stringify(dealer)
      });
    }
  },
  sesion: {
    login(badge) {
      return callApi(`/sesion/log`, {
        method: "POST",
        body: JSON.stringify(badge)
      });
    }
  }
};

export default api;
