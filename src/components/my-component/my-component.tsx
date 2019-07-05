import { Component, Prop, State, Element, h } from '@stencil/core';
import "radial-rep";

@Component({
  tag: 'table-crispr',
  styleUrl: 'my-component.css',
  shadow: true
})

export class MyComponent {
// *************************** PROPERTY & CONSTRUCTOR ***************************
@Element() private element: HTMLElement;
// Data given by the results file
@Prop() complete_data: string;

// Complete data parsed
@State() complete_json: [];
// List of all sgRNA
@State() allSgrna = [];
// sgRNA displayed on interface
@State() displaySgrna = [];
// Dictionary of min and max occurences for each sgRNA
// Display occurences with this.displaySgrna as key
@State() allOcc = new Map();
@State() page = 1;
// Current data displayed, filtered by regex and minOccurences
@State() currentData = [];

constructor() {
  this.regexSearch = this.regexSearch.bind(this);
  this.calculTotalOcc = this.calculTotalOcc.bind(this);
  this.minOccSearch = this.minOccSearch.bind(this);
  this.regexOccSearch = this.regexOccSearch.bind(this);
}
// *************************** LISTEN & EMIT ***************************



// *************************** CLICK ***************************
/**
  * Filter data by regex and occurence
*/
regexOccSearch() {
  this.regexSearch();
  this.minOccSearch();
}


/**
  * Filter data by regex and reinitialize page to 1
*/
regexSearch() {
  let search = (this.element.shadowRoot.querySelector("#regexString")  as HTMLInputElement).value;
  this.page = 1;
  console.log("RECHERCHE : " + search);
  this.currentData = this.allSgrna.filter(a => RegExp(search).test(a));
}


/**
  * Filter data by occurences.Check if maxOcc is superior to occurence given by user
  and check if sgRNA is in current data which were filtered by regex
*/
minOccSearch() {
  let minOcc = (this.element.shadowRoot.querySelector("#minOcc")  as HTMLInputElement).value;
  console.log("MIN OCC : " + minOcc);
  let tmp = [];
  for (var [key, value] of this.allOcc) {
    // Check if maxOcc is > to occurences given by user and check if sgRNA is in current data
    // which were filtered by regex
    if (value[1] >= minOcc && this.currentData.includes(key)) tmp.push(key);
  }
  this.currentData = tmp;
}

// *************************** DISPLAY ***************************
/**
  * Find min and max occurences for each sgRNA summing occurences for each organism
*/
calculTotalOcc() {
  this.complete_json.forEach(sgrna => {
    let maxOcc = 0, minOcc = 10000;
    (sgrna['occurences'] as Array<string>).forEach(org => {
      let sumOcc = 0;
      // For each references, sum occurences. It will be total occurences for an organism
      org['all_ref'].forEach(ref => {
        sumOcc += ref['coords'].length;
      })
      // Compare if total occ is the min or the max for this sgRNA
      if (sumOcc > maxOcc) maxOcc = sumOcc;
      if (sumOcc < minOcc) minOcc = sumOcc;
    })
    this.allOcc.set(sgrna['sequence'], [minOcc, maxOcc]);
  })
}

fName(seq: string) {
  for (var dic in this.complete_json){
    if (this.complete_json[dic]["sequence"] == seq){
      console.log("TROUVE")
      console.log(dic)
      return JSON.stringify(this.complete_json[dic])
    }
  }
}

  render() {
    console.log("rendr called")

    let styleDisplay: string[];
    // Display a spinner if no data
    if (this.complete_data == undefined) {
      styleDisplay = ['block', 'none'];
    } else {
    // Parse data and initialize allSgrna and calcul occurences
      styleDisplay = ['none', 'block'];
      this.complete_json = JSON.parse(this.complete_data);
      if (this.allSgrna.length == 0) {
        this.complete_json.forEach(el => this.allSgrna.push(el['sequence']));
        this.calculTotalOcc();
        this.currentData = this.allSgrna;
      }
    }
    let displayLoad=styleDisplay[0], displayTableResult=styleDisplay[1];
    let maxPages = (Number.isInteger(this.currentData.length/5)) ? (this.currentData.length/5) :  (Math.trunc(this.currentData.length/5) + 1);

    if (displayTableResult == 'block') {
      this.displaySgrna = this.currentData.slice((this.page - 1) * 5, this.page * 5);
      // Color arrows for pagination
      let colorBg = (this.page == 1) ? "#f1f1f1" :  "#4cafa2";
      let colorArrow = (this.page == 1) ? "black" :  "white";
      (this.element.shadowRoot.querySelector(".previous") as HTMLElement).style.background =  colorBg;
      (this.element.shadowRoot.querySelector(".previous") as HTMLElement).style.color =  colorArrow;
      colorBg = (this.page == maxPages) ? "#f1f1f1" :  "#4cafa2";
      colorArrow = (this.page == maxPages) ? "black" :  "white";
      (this.element.shadowRoot.querySelector(".next") as HTMLElement).style.background =  colorBg;
      (this.element.shadowRoot.querySelector(".next") as HTMLElement).style.color =  colorArrow;
    }
    return ([
      // ***********************************************
      // ******************* SPINNER *******************
      // ***********************************************
      <div style={{display: displayLoad}}>
        <strong> Loading ... </strong>
        <div class="spinner-grow text-info" role="status"></div>
      </div>,
      // *********************************************
      // ******************* TABLE *******************
      // *********************************************
      <div class="main-table" style={{display: displayTableResult}}>
        {/******************** Search Bar ********************/}
        <div>
          <span class="tooltip">
            <input type="text" id="regexString" onKeyUp={this.regexOccSearch} placeholder="Search for sgRNA.."/>
            <span class="tooltiptext">Use Regex</span>
          </span>
          <input type="text" id="minOcc" onKeyUp={this.regexOccSearch} placeholder="Min occ..."/>
        </div>
        {/******************** Table ********************/}
        <table id="resultTab">
          {this.displaySgrna.map(seq => <tr>
            <td> <b>{seq}</b>
              <br/> Min : {this.allOcc.get(seq)[0]}
              <br/> Max : {this.allOcc.get(seq)[1]} </td>
            <td> <radial-crispr dic_sgrna={this.fName(seq)} max_occ={this.allOcc.get(seq)[1]} diagonal={200}> </radial-crispr> </td>
            </tr>)}
        </table>

        {/******************** Pagination ********************/}
        <div class="pagination">
          <a href="#" class="previous round" onClick={() => {if (this.page > 1) this.page -= 1}}>&#8249;</a>
          <a href="#" class="next round" onClick={() => {if (this.page < maxPages) this.page += 1}}>&#8250;</a>
        </div>
      </div>

      ]);
  }
}
