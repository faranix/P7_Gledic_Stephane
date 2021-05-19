export default class CommentaireFetch {

    /**
     * Permet de poster un commentaire
     * @param {*} id 
     */
    postCommentaire(id) {
        return new Promise((resolve) => {
            // recuperation du bon input 
            let content = document.querySelector(`#commentaire${id}`).value;
            // recuperation des données
            const postId = id;
            const userId = JSON.parse(localStorage.getItem('user')).id;
    
            // Les données que on va envoyer au backend
            const sendData = {
                content: content,
                userId: userId,
                postId: postId
            };
    
            if (sendData.content == '') {
                console.log('Remplissez le champ');
            } else {
                fetch('http://localhost:3000/api/commentaire/post', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(sendData)
                })
                .then(res => {
                    res.json().then(data => {
                        resolve(data);
                    });
                }) 
                .catch(error => console.log(error));
            }
        })
    }

    /**
     * Permet de supprimer un commentaire 
     * @param {*} id 
     */
    deleteCommentaire(id) {
        const data = {
            id: id
        };

        fetch('http://localhost:3000/api/commentaire/delete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            console.log('Commentaire Supprimer !');
        })
        .catch(() => console.log('error'));
    }

    /**
     * Permet de modifier un commentaire
     * @param {*} id 
     */
    editCommentaire(id) {
        const content = document.querySelector(`#commentaire-edit${id}`).value;

        const data = {
            id: id,
            content: content
        };
        fetch('http://localhost:3000/api/commentaire/put', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            res.json().then(() => {
                console.log('Commentaire modifier !');
            })
        })
        .catch(() => console.log('Erreur de modification du commentaire'));
    }

    /**
     * Permet de récuperer les commentaires
     * @returns les commentaires
     */
    getCommentaire() {
        return new Promise((resolve) => {
            fetch('http://localhost:3000/api/commentaire/get', {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(res => {
                res.json().then(data => {
                    resolve(data);
                })
            })
            .catch(error => console.log(error));
        })
    }    
}