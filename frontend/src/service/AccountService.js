export default class FetchAccount {
    /**
     * Permet de supprimer le compte
     */
    deleteAccount() {
        const userId = {
            userId: JSON.parse(localStorage.getItem('user')).id
        }

        console.log(userId);

        fetch('http://localhost:3000/api/deleteaccount', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(userId)
        })
        .then(res => {
            res.json().then(data => {
                this.disconnect();
                console.log(data);
            })
        })
        .catch(error => console.log(error))
    }

    /**
     * Permet de ce deconnecter du compte
     */
    disconnect() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:8080/#/'
        console.log('disconnect');
    }
}