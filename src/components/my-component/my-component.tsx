import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false
})

export class MyComponent {
  shadowData:any;
  private rowSelected:number = 0;
  // private cellSelected:number = 0;

  @Prop() str_json: string;

  constructor() {
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(event: Event) {
    const cell = event.currentTarget as HTMLTableCellElement;

    console.log("Click row")
    console.log(`Current Selected : ${this.rowSelected}`);

    cell.style.backgroundColor = (cell.style.backgroundColor == 'rgb(204, 204, 204)') ? 'white' : '#ccc';
    let tab = document.getElementById("toto") as HTMLTableElement;
    tab.rows[this.rowSelected].style.backgroundColor = 'white';
    console.log(`ROW : ${cell.parentElement.rowIndex}`)
    // tab.rows[this.rowSelected].cells[this.cellSelected].style.backgroundColor = 'white';
    this.rowSelected = cell.parentElement.rowIndex;
    // console.log(tab.rows[this.rowSelected].cells)
    // this.cellSelected = event.currentTarget.cellIndex;
    // console.log(tab.rows[this.currentSelected])
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
