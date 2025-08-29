export const inputValue = (event: Event) => {
  const result: string = (event.target as HTMLInputElement).value;
  return result;
};
