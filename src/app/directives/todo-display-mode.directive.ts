import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { MODE } from '../components/todo/todo.component';
@Directive({
  selector: '[todoDisplayMode]',
})
export class TodoDisplayModeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set todoDisplayMode(mode: string) {
    if (mode === MODE.Display) {
      this.styleCard('#fafeff', '#fafeff 1px solid');
    } else if (mode === MODE.Edit) {
      this.styleCard('transparent', 'unset');
    }
  }

  private styleCard(color: string, border: string) {
    this.renderer.setProperty(
      this.el.nativeElement.style,
      'backgroundColor',
      color
    );

    this.renderer.setProperty(this.el.nativeElement.style, 'border', border);
  }
}
