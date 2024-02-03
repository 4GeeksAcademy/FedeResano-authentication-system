const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {

			},
		},
		actions: {

			sendSignup: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					if (!resp.ok) {
						console.error("Error al registrarse.");
						return "Error al registrarse.";
					}

					return "Signup successful.";


				} catch (error) {
					console.error("Error procesando los datos.")
					return "Error procesando los datos."
				}
			},

			checkLoginInfo: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					if (!resp.ok) {
						console.error("Credenciales invalidas.");
						return "Credenciales invalidas."
					}

					const data = await resp.json();
					return data;

				} catch (error) {
					console.error("Error procesando los datos.")
					return "Error procesando los datos. "
				}
			},

		}
	};
};

export default getState;