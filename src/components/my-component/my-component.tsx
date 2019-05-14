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
    this.sortTable = this.sortTable.bind(this);
  }

  @Listen('jenesaispas')
  bbb(ev:CustomEvent) {
    console.log('the body was scrolled', ev.detail);
  }

  @Event() jenesaispas: EventEmitter;

  jenesaispasHandler(todo: string) {
      this.jenesaispas.emit(todo);
  }

  onItemClick(event: Event) {
    const cell = event.currentTarget as HTMLTableCellElement;
    let tab = document.getElementById("toto") as HTMLTableElement;
    let currentRow  = cell.parentElement.rowIndex as number;
    let currentCell = cell.cellIndex as number;

    if (this.rowSelected == currentRow && this.cellSelected == currentCell){
      cell.style.color = (cell.style.color == 'blue') ? 'black' : 'blue';
    } else {
      cell.style.color = 'blue';
      if (this.cellSelected != -1) tab.rows[this.rowSelected].cells[this.cellSelected].style.color = 'black';
      this.rowSelected = cell.parentElement.rowIndex;
      this.cellSelected = cell.cellIndex;
    }
    this.jenesaispas.emit((cell.parentElement.innerText as string));
  }

  drawRow(res_json:any): JSX.Element[] {
    return ([<td onClick={this.onItemClick}>{res_json.sequence}</td>,<td onClick={this.onItemClick}>{res_json.occurences.length}</td>]);
  }
  sortTable(event: Event) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    let table = document.getElementById("toto") as HTMLTableElement;
    let cell = event.currentTarget as HTMLTableHeaderCellElement;
    let n = cell.dataset["col"] as unknown as number;

    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        console.log(`I : ${i}     Row : ${this.rowSelected}`)
        if (i == (this.rowSelected as number)){
          this.rowSelected = i-1;
        } else if (i+1 == (this.rowSelected as number)){
          this.rowSelected = i
        }

        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
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
       <table id="toto"> <th data-col="0" onClick={this.sortTable}> Sequences </th> <th data-col="1" onClick={this.sortTable}> Occurences </th>{rows.map((d) => <tr> {d} </tr>)} </table>
    ]);
  }
}
