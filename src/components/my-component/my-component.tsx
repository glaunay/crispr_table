import { Component, Prop, Listen, EventEmitter, Event } from '@stencil/core';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false
})

export class MyComponent {
  private rowSelected:number = -1;
  private cellSelected:number = -1;

  @Prop() str_json: string;

  constructor() {
    this.onItemClick = this.onItemClick.bind(this);
  }

  @Listen('window:scroll')
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }

  @Event() jenesaispas: EventEmitter;

  jenesaispasHandler(todo: string) {
      this.jenesaispas.emit(todo);
  }

  onItemClick(event: Event) {
    const cell = event.currentTarget as HTMLTableCellElement;

    cell.style.backgroundColor = (cell.style.backgroundColor == 'rgb(204, 204, 204)') ? 'white' : '#ccc';
    let tab = document.getElementById("toto") as HTMLTableElement;
    if (this.cellSelected != -1) tab.rows[this.rowSelected].cells[this.cellSelected].style.backgroundColor = 'white';
    this.rowSelected = cell.parentElement.rowIndex;
    this.cellSelected = cell.cellIndex;
  }

  drawRow(res_json:any): JSX.Element[] {
    console.log("DRAW ROW")
    console.log(this.rowSelected  );
    return ([<td onClick={this.onItemClick}>{res_json.sequence}</td>,<td onClick={this.onItemClick}>{res_json.occurences.length}</td>]);
  }

  render() {
    console.log("rendr called")
    console.log(this.rowSelected);
    let parse_json = JSON.parse(this.str_json);
    let rows = [];
    for (var i=0; i<parse_json.length; i++){
      rows.push(this.drawRow(parse_json[i]));
    }
    return ([
       <table id="toto"> <th> Sequences </th> <th> Occurences </th>{rows.map((d) => <tr> {d} </tr>)} </table>
    ]);
  }
}
