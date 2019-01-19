
import { Group } from 'spritejs'
import { getType } from './utils'
import JSONSchemaValidator from 'q-schema-validator'
let attrs = Symbol('attrs');
class Base {
  constructor(attrs) {
    this.container = new Group();
    this.validatorSchema(attrs);
  }
  validatorSchema(attrs) {
    let curName = this.constructor.name;
    let schema = require("./schema/" + curName.toLowerCase() + ".json.js");
    var validator = new JSONSchemaValidator();
    let res = validator.validate(attrs, schema.default);
    if (res.length) {
      //console.error(`${curName} params validator fail`, '\n error message', res, '\n validator params', attrs)
      console.groupCollapsed('%c♥ %s params validation fail', "color: red", curName);
      console.log('%c → validated message: ↵', 'color:#42b983')
      res.forEach(item => {
        console.log(item)
      });
      console.log('\n');
      console.log('%c → validated params: ↵', 'color:#42b983')
      console.log(attrs);
      console.log('\n');
      console.log('%c → validated schema: ↵', 'color:#42b983')
      console.log(schema.default)
      console.groupEnd()
    }
  }
  /*保持与spritejs 接口统一 */
  attr(name, value) {
    if (name === undefined && value === undefined) { //获取全部属性 this.attr()
      return this[ attrs ];
    } else if (value === undefined && getType(name) === 'string') { //获取属性 this.attr('color')
      return this[ attrs ][ name ];
    } else if (getType(name) === 'object') { //对象属性赋值 this.attr({'color':'#f00'})
      this[ attrs ] = Object.assign({}, this[ attrs ], name);
    } else if (getType(name) === 'string' && value !== undefined) { //单一对象赋值 this.attr('color','#f00')
      this[ attrs ][ name ] = value;
    }
  }
  append(sprites) {
    if (getType(sprites) === 'array') {
      sprites.forEach(sprite => { this.container.append(sprite) });
    } else {
      this.container.append(sprites)
    }
  }
}
export { Base }