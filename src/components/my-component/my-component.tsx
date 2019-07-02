import { Component, Prop, State, Element} from '@stencil/core';
// import fs from 'fs';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})

export class MyComponent {
// *************************** PROPERTY & CONSTRUCTOR ***************************
@Element() private element: HTMLElement;

@Prop() complete_data: string;

@State() allSgrna = [];
@State() displaySgrna = [];
//
constructor() {
  this.regexSearch = this.regexSearch.bind(this);
}
// *************************** LISTEN & EMIT ***************************



// *************************** CLICK ***************************
regexSearch() {
  let search = (this.element.shadowRoot.querySelector("#regexString")  as HTMLInputElement).value;
  this.displaySgrna = this.allSgrna.filter(a => RegExp(search).test(a)).slice(0, 5);
}

// *************************** DISPLAY ***************************
  render() {
    console.log("rendr called")

    let styleDisplay: string[], complete_data;
    if (this.complete_data == undefined) {
      styleDisplay = ['block', 'none'];
    } else {
      styleDisplay = ['none', 'block'];
      complete_data = JSON.parse(this.complete_data);
      if (this.allSgrna.length == 0) {
        complete_data.forEach(el => this.allSgrna.push(el.sequence))
        this.displaySgrna = this.allSgrna.slice(0, 5)
      }
    }
    let displayLoad=styleDisplay[0], displayTableResult=styleDisplay[1];


    return ([
      <div style={{display: displayLoad}}>
        <strong> Loading ... </strong>
        <div class="spinner-grow text-info" role="status"></div>
      </div>,

      <div class="main-table" style={{display: displayTableResult}}>
        <div class="tooltip">
          // @ts-ignore
          <input type="text" id="regexString" onkeyup={this.regexSearch} placeholder="Search for sgRNA.."/>
          <span class="tooltiptext">Use Regex</span>
        </div>

        <table id="resultTab">
          {this.displaySgrna.map(seq => <tr> {seq} </tr>)}

        </table>
      </div>,


      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>,
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>,
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
]);
  }
}
