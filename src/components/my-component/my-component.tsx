import { Component, Prop, Listen, EventEmitter, Event, Element } from '@stencil/core';
// import fs from 'fs';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: false
})

export class MyComponent {
// *************************** PROPERTY & CONSTRUCTOR ***************************
  private originTable:string;
  private rowSelected:number = -1;
  private cellSelected:number = -1;
  // private nameOrgBox: string;
  // private seqBox: string;

  @Prop({mutable: true}) file_name: string;
  @Prop({mutable: true}) str_json: string;


  @Element() private element: HTMLElement;
  constructor() {
    this.onItemClick = this.onItemClick.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.regexSearch = this.regexSearch.bind(this);
    this.showOcc = this.showOcc.bind(this);
    this.sortOrgOcc = this.sortOrgOcc.bind(this);
    // this.showCoord = this.showCoord.bind(this);
  }


// *************************** LISTEN & EMIT ***************************
  @Listen('jenesaispas')
  bbb(ev:CustomEvent) {
    console.log('the body was scrolled', ev.detail);
  }

  @Event() jenesaispas: EventEmitter;

  jenesaispasHandler(todo: string) {
      this.jenesaispas.emit(todo);
  }


// *************************** CLICK ***************************
  // showOcc(event: Event) {
  //   // let next = (event.currentTarget as HTMLTableCellElement).children[0] as HTMLSpanElement;
  //   let next = (event.currentTarget as HTMLTableCellElement).nextElementSibling as HTMLTableCellElement;
  //   next.style.display = (next.style.display == 'none') ? 'block' : 'none';
  // }

  // showCoord(event: Event) {
  //     let coordBox = this.element.querySelectorAll("#coordBox")[0] as HTMLDivElement;
  //     let occCell = event.currentTarget as HTMLTableCellElement;
  //     let parse_json = JSON.parse(this.str_json);
  //     let orgName = (occCell.parentElement.previousElementSibling as HTMLTableCellElement).innerText.split("\n")[0];
  //     let sequence = occCell.classList[1];
  //
  //     if (this.nameOrgBox != orgName || this.seqBox != sequence) {
  //       coordBox.style.display = 'block';
  //
  //       let allCoord = parse_json.find(a => {
  //         if (a.sequence == sequence) {
  //             let coords = a.occurences.find(b => {
  //               if (b.org == orgName) {
  //                 let coord = [];
  //                 for (var i in b.all_ref) {
  //                   let listCoord = (b.all_ref[i].coords.map((o) => <dd> {o} </dd>));
  //                   console.log(b.all_ref[i].coords.map(o => <dd> {o} </dd>));
  //                   coord.push(<dl> <dt>{b.all_ref[i].ref}</dt> {listCoord} </dl>);
  //                 }
  //                 console.log(coord);
  //                 return coord;
  //               }
  //             });
  //             console.log(coords);
  //             return coords;
  //         }
  //       });
  //       console.log(allCoord);
  //     coordBox.innerText = allCoord;
  //     this.nameOrgBox = orgName;
  //     this.seqBox = sequence;
  //   } else {
  //     coordBox.style.display = 'none';
  //
  //   }
  // }

  showOcc(event: Event) {
    let currentCell = event.currentTarget as HTMLTableCellElement
    let currentSequence = (currentCell.previousSibling as HTMLTableCellElement).innerText;
    // For each span with as tag the sequence
    Array.from(this.element.getElementsByClassName(currentSequence), e => {
      let cell = (e as HTMLTableCellElement);
      // Display or not span
      cell.style.display = (cell.style.display == 'none') ? 'block' : 'none';
    })
    // Put in bold the major organism and its occurence
    currentCell.style.fontWeight= (currentCell.style.fontWeight == 'normal') ? 'bold' : 'normal';
    let next = currentCell.nextSibling as HTMLTableCellElement;
    next.style.fontWeight= (next.style.fontWeight == 'normal') ? 'bold' : 'normal';
  }

  onItemClick(event: Event) {
    const cell = event.currentTarget as HTMLTableCellElement;
    let tab = this.element.querySelectorAll("#resultTab")[0] as HTMLTableElement;
    let currentRow  = (cell.parentElement as HTMLTableRowElement).rowIndex as number;
    let currentCell = cell.cellIndex as number;

    if (this.rowSelected == currentRow && this.cellSelected == currentCell){
      cell.style.color = (cell.style.color == 'blue') ? 'black' : 'blue';
    } else {
      cell.style.color = 'blue';
      if (this.cellSelected != -1) tab.rows[this.rowSelected].cells[this.cellSelected].style.color = 'black';
      this.rowSelected = (cell.parentElement as HTMLTableRowElement).rowIndex;
      this.cellSelected = cell.cellIndex;
    }
    this.jenesaispas.emit((cell.parentElement.innerText as string));
  }


// *************************** SORT & SEARCH ***************************
  sortTable(event: Event) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    let table = this.element.querySelectorAll("#resultTab")[0] as HTMLTableElement;
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
        if (i == (this.rowSelected as number)){
          this.rowSelected = i+1;
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

  regexSearch() {
    let l = 0;
    let tmp = [], sequences=[];
    let search = (this.element.querySelectorAll("#regexString")[0]  as HTMLInputElement).value;
    let parse_json = JSON.parse(this.originTable);

    for (var k in parse_json) sequences.push(parse_json[k].sequence);
    sequences = sequences.filter(a => RegExp(search).test(a));

    for (var j in parse_json) {
      if (sequences.includes(parse_json[j].sequence)){
        tmp[l] = parse_json[j];
        l++;
      }
    }
    this.str_json = JSON.stringify(tmp);
  }

// *************************** DISPLAY ***************************
  sortOrgOcc(res_json:any) {
  // Find the organism with the max occurence
  let name:string;
  let nbMax:number=0;
  res_json.occurences.forEach(a => {
    if (a.all_ref.length > nbMax){
      nbMax = a.all_ref.length;
      name = a.org;
    }
  })
  return [name, nbMax];
}

  drawRow(res_json:any): JSX.Element[] {
    const [name, nbOcc] = this.sortOrgOcc(res_json)
    let classTag = "occurences".concat(' ', res_json.sequence);
    // Empty span to create a space between major organism and all organism
    let orgName=[<span class={classTag}><br/></span>], occ=[<span class={classTag}><br/></span>];
    // Create the list of all organism and the occurence of sgRNA which are hidden
    for (var i in res_json.occurences) {
      orgName.push(<span class={classTag}> {res_json.occurences[i].org} </span>)
      occ.push(<span class={classTag} onClick={this.showCoord}> {res_json.occurences[i].all_ref.length}</span>)
    }
    // Return the table
    return ([<td onClick={this.onItemClick}>{res_json.sequence}</td>,
             <td onClick={this.showOcc} class='orgName'>{name}
                {orgName.map((o) => o)}
             </td>,
             <td>{nbOcc}
                {occ.map((o) => o)}
              </td>,
           ]);
  }

  render() {
    console.log("rendr called")
    // Keep the original data
    if (this.originTable == undefined) this.originTable = this.str_json;

    let parse_json = JSON.parse(this.str_json);
    let rows = [];
    // Create row for table
    for (var i=0; i<parse_json.length; i++){
      rows.push(this.drawRow(parse_json[i]));
    }

    return ([
        <div class="tooltip">
          <input type="text" id="regexString" onkeyup={this.regexSearch} placeholder="Search for sgRNA.."/>
          <span class="tooltiptext">Use Regex</span>
        </div>,

        <div id="box">

          <table id="resultTab">
            <th data-col="0" onClick={this.sortTable}> Sequences </th> <th data-col="1" onClick={this.sortTable}> Organism </th><th data-col="2" onClick={this.sortTable}> Occurences </th>
            {rows.map((d) => <tr> {d} </tr>)}
          </table>

          <div id="coordBox">
            blablabla
          </div>

        </div>
    ]);
  }
}
