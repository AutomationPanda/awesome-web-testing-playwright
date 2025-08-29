export const getUserId = ( headers ) => {

  if (
    headers.hasOwnProperty('authorization') &&
    headers['authorization'].length
  ) {
    const base64Url = headers.authorization.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userData = JSON.parse(Buffer.from(base64, 'base64') as unknown as string);
    const userId = parseInt(userData.sub);

    return userId

  }

  return false;
};