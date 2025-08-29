export const showNotification = async function (this: any, message: string, isError: boolean) {
  this.notification.message = message;
  this.notification.error = isError;
  this.notification.show = true;
  setTimeout(() => {
    // hide error message after 4 seconds
    this.notification.show = false;
  }, 4000);
};
