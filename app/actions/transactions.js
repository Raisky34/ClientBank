export function getAllTransactions(userId) {
    return fetch('/allTransactions', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          return json;
        });
      } else {
        return [];
      }
    });
}
