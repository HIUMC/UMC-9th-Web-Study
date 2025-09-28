export const getCurrentPath = () => window.location.pathname;

export const navigateTo = (path: string) : void => {
  window.history.pushState(null, '', path);
  const navEvent = new PopStateEvent('popstate');
  window.dispatchEvent(navEvent);
}