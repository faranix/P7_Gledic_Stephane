export default class FetchPost {

    /**
     * Permet de supprimer un post
     */
    deletePost(id) {
        const postId = {
            id: id
        };

        fetch('http://localhost:3000/api/connect/deletepost', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(postId)
        })
        .then(res => {
            res.json().then(() => {
                console.log('Post Supprimer !');
            });
        })
        .catch(error => console.log(error));
    }

    /**
     * Permet de modifier un post
     */
    editPost(postId) {
        const form = document.querySelector('#formPublier');
        let postData = [];
        form.forEach(element => {
            // Verifie que les champs son remplie
            if (element.value == '') {
                element = false;
            }
            postData.push(element.value);
        });
        
        const sendData = {
            postId: postId,
            title: postData[0],
            url: postData[1]
        }

        console.log(sendData);

        if (postData[1] == undefined || postData[2] == undefined) {
            console.log('Veuillez remplir tout les champs !');
        } else {
            fetch('http://localhost:3000/api/connect/editpost', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(sendData)
            })
            .then(res => {
                res.json().then(data => {
                    console.log(data);
                    this.overlay = 0;
                })
            })
            .catch(error => console.log(error));
        }
    }


    /**
     * Creation d'un nouveau post
     */
    newPost() {
        const form = document.querySelector('#formPublier');
        const userId = JSON.parse(localStorage.getItem('user')).id
        let post = [userId];

        form.forEach(element => {
            // Verifie que les champs son remplie
            if (element.value == '') {
            element = false;
            }
            JSON.stringify(post.push(element.value));
        });

        if (post[1] == undefined || post[2] == undefined) {
            console.log('Veuillez remplir tout les champs !');
        } else {
            // Envoie des données au backend
            fetch('http://localhost:3000/api/connect/createpost', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(post)
            })
            .then(res => {
                res.json().then(() => {
                    console.log('Post publier !');
                })
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}