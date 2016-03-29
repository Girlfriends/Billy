import PIXI from "./pixijs/pixi";

class ObjectNode extends PIXI.Container {
  constructor(width, height) {
    super();
    this.interactive = true;
    this.buttonMode = true;
    this
        // events for drag start
        .on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        // events for drag end
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        // events for drag move
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
    this.drawGraphics(width, height);
  }
  drawGraphics(width, height) {
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 0xFF0000, 0.8);
    graphics.beginFill(0xFF700B, 1);
    graphics.drawRect(0, 0, width, height);
    this.addChild(graphics);
  }
  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.localPos = this.data.getLocalPosition(this);
  }
  onDragEnd() {
    this.alpha = 1.0;
    this.dragging = false;
    this.data = null;
  }
  onDragMove() {
    if (this.dragging) {
      let newPos = this.data.getLocalPosition(this.parent);
      this.position.x = newPos.x - this.localPos.x;
      this.position.y = newPos.y - this.localPos.y;
    }
  }
}

export default ObjectNode;
