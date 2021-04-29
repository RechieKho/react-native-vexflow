import React from 'react';
import { Vex } from 'vexflow/src/vex';
import { SVGContext } from 'vexflow/src/svgcontext';
import Svg, { Path, Rect, G } from 'react-native-svg';



export default class ReactNativeSVGContext extends SVGContext {

  static create(svgElementType, key = 'svg') {
    const props = {
      key: key++,
      style: {}
    };

    if (svgElementType === 'svg') {
      props['xmlns'] = 'http://www.w3.org/2000/svg';
    }

    return {
      get style() {
        return props.style;
      },
      setAttribute: function(propertyName, value) {
        if (propertyName === 'class') propertyName = 'className';

        this.props[propertyName] = value;
      },
      appendChild: function(elem) {
        this.children.push(elem);
      },
      children: [],
      svgElementType,
      props,
    };
  }  

  constructor (fontPack, {width, height}) {
    super(ReactNativeSVGContext.create('div'), 'div');
    this.svg.props.width = width;
    this.svg.props.height = height;
    this.fontPack = fontPack;
    this.key = 1; // react element key counter
  }

  create(svgElementType) {
    return ReactNativeSVGContext.create(svgElementType, this.key++);
  }

  applyAttributes(element, attributes) {
    for(const propertyName in attributes) {
      const _propertyName = propertyName.replace(
        /-([a-z])/g,
        function (g) { return g[1].toUpperCase(); }
      );

      element.props[_propertyName] = attributes[propertyName];
    }

    return element;
  }

  fillText(text, x, y) {
    const attributes = {};
    Vex.Merge(attributes, this.attributes);

    const path = this.create('path');
    const fontSize = this.getFontSize();
    const font = this.fontPack.getFont(attributes);
    const pathData = font.getPath(text, x, y, fontSize).toPathData();

    attributes.d = pathData;
    attributes.stroke = "none";
    attributes.x = x;
    attributes.y = y;

    this.applyAttributes(path, attributes);
    this.add(path);
  }

  add(element) {
    this.parent.children.push(element);
  }

  getFontSize() {
    let fontSize = Number(this.attributes['font-size'].replace(/[^.\d]+/g, ''));

    // Convert pt to px
    if (/pt$/.test(this.attributes['font-size'])) {
      fontSize = (fontSize * 4 / 3) | 0;
    }

    return fontSize;
  }

  measureText(text) {
    const fontSize = this.getFontSize();
    const font = this.fontPack.getFont(this.attributes);
    const path = font.getPath(text, 0, 0, fontSize);
    const bbox = path.getBoundingBox();
    bbox.width = bbox.x2 - bbox.x1;
    bbox.height = bbox.y2 - bbox.y1;

    return bbox;
  }

  createReactElement(element) {
    // Define constant
    const children = [];
    const svgClass = {
      svg: Svg,
      path: Path,
      rect: Rect,
      g: G,
    };

    for (let i = 0; i < element.children.length; i++) {
      children.push(this.createReactElement(element.children[i]));
    }

    if (element.svgElementType === 'path') {
      delete element.props['x'];
      delete element.props['y'];
    }

    return React.createElement(
      svgClass[element.svgElementType],
      element.props,
      children
    );
  }

  render() {
    return this.createReactElement(this.svg);
  }
}