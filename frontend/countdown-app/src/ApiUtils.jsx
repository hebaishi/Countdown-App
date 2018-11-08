var post = function(endpoint, object) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object)
  })
}

export default post;
