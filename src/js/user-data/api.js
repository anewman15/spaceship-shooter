export const postScore = async (apiUri, userInfo) => {
  const optionsObject = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const response = await fetch(apiUri, optionsObject);
    const data = await response.json();
    return;
  } catch(error) {
    return;
  }
}