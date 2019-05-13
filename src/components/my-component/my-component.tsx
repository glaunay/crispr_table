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

  onItemClick(event: Event) {
    const row = event.currentTarget as HTMLTableRowElement;

    console.log("Click row")
    console.log(`Current Selected : ${this.rowSelected}`);

    row.style.backgroundColor = (row.style.backgroundColor == 'rgb(204, 204, 204)') ? 'white' : '#ccc';
    let tab = document.getElementById("toto") as HTMLTableElement;
    tab.rows[this.rowSelected].style.backgroundColor = 'white';
    // tab.rows[this.rowSelected].cells[this.cellSelected].style.backgroundColor = 'white';
    this.rowSelected = row.rowIndex;
    console.log(tab.rows[this.rowSelected].cells)
    // this.cellSelected = event.currentTarget.cellIndex;
    // console.log(tab.rows[this.currentSelected])
  }

  drawRow(res_json:any): JSX.Element[] {
    return ([<td >{res_json.sequence}</td>,<td>{res_json.occurences.length}</td>]);
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
       <table id="toto"> <th> Sequences </th> <th> Occurences </th>{rows.map((d) => <tr onClick={this.onItemClick.bind(this)}> {d} </tr>)} </table>
    ]);
  }
}
