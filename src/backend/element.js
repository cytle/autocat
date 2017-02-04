/**
 * 选择对象
 */
let id = 1;
export default class Element {
  /**
   * @param  {DomNode} $el
   */
  constructor ($el) {
    this.$el = $el;
    this.id = id++;
  }
  get _isFragment () {
    return false;
  }
}
