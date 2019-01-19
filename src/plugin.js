import { Base } from './base'
import { Sprite, Polyline, Rect } from 'spritejs';
import { draggable } from 'sprite-draggable'
class Step extends Base {

  constructor(attrs) {
    super(attrs);
    this.attrs = Object.assign({}, attrs);
    const { pos } = attrs;
    this.container.attr({ pos, bgcolor: 'rgba(255,255,255,0)' });
    draggable(this.container)
    /*内置的Step 类型，有 ['rect','circle','triangle','star','diamond'] */
    this.type = attrs.type || 'rect';
  }
  draw() {
    let $rect = new Rect();
    $rect.attr({ size: [ 20, 20 ], bgcolor: '#f00' });
    this.container.append($rect);
    return this.container
  }
}

class Link extends Base {
  constructor(attrs, type) {
    super(attrs);
    /*属性，相关绘制属性等 */
    this.attrs = Object.assign({}, attrs);
    /*内置的Link 类型，有 ['solid','dash'] */
    this.type = type;
  }
  draw() {
    let $link = new Polyline();
    $link.attr({ size: [ 20, 20 ], bgcolor: '#f00' });
    this.append($link);
    return this.container;
  }
}
export { Step, Link }
