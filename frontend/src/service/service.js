/**
 * Permet de bloquer le localStorage !
 */
exports.blockLocalStorage = window.addEventListener('storage', (storageUser) => {
  const user = storageUser.oldValue;

  JSON.stringify(window.localStorage.setItem('user', user));
}) 
  
