const dispatchMouseEvent = (dom, typeArg, mouseEventInit) => {
  const event = new window.MouseEvent(typeArg, mouseEventInit);
  dom.dispatchEvent(event);
};
export default {
  dispatchMouseEvent,
  clickClient (clientX, clientY) {
    dispatchMouseEvent(document.body, 'click', { clientX, clientY });
  }
};
