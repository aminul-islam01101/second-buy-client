const setAuthToken = (user) => {
    const currentUser = {
        email: user?.email,
        role: user?.role,
        name: user?.displayName,
    };

    fetch(`${import.meta.env.VITE_API_URL}/user/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            localStorage.setItem('token', data.token);
        })
        .catch((err) => {
            console.error(err);
        });
};
export default setAuthToken;
