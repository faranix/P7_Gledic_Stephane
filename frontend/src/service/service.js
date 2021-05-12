/**
 * Permet d'afficher le message du data
 * @param {*} data 
 */
exports.showError = (data) => {
  const errorMessage = document.querySelector('.error-message');
            
  if (errorMessage.childNodes.length == 0) {
    let message = document.createElement('p');
    message.className = 'message';
    errorMessage.appendChild(message);
  } 

  let newMessage = document.querySelector('.message');
  newMessage.innerHTML = data.message;
  console.log(newMessage);

};

exports.blockLocalStorage = window.addEventListener('storage', (storageUser) => {
  const user = storageUser.oldValue;

  JSON.stringify(window.localStorage.setItem('user', user));
}) 
  
