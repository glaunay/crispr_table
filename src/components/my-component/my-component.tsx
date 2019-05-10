import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() str_json: string;

  /**
   * The middle name
   */
  @Prop({ mutable: true}) parse_json;


  render() {
    // let parse_json = JSON.parse(this.str_json)
    // var out = this.newMethod(parse_json);
    this.parse_json = JSON.parse(this.str_json)
    return ([
      // <div id="1"> Resultats : Il doit y avoir ce texte plus la string en Json</div>,
      // <div id="2"> Blabla </div>]
      // <div> {out} </div>
      <div> {this.parse_json[0].sequence} </div>
    );
  }

    private newMethod(obj) {
        var out = '';
        let i = 0;
        for (i = 0; i < obj.length; i++) {
            let line_seq = 0;
            let seq = obj[i].sequence;
            let number_genomes = obj[i].occurences.length;
            let j = 0;
            for (j = 0; j < number_genomes; j++) {
                let line_genome = 0;
                let org = obj[i].occurences[j].org;
                let org_split = org.split(' ');
                // let ref_org=org_split.pop()
                let number_ref = obj[i].occurences[j].all_ref.length;
                let k = 0;
                for (k = 0; k < number_ref; k++) {
                    let ref = obj[i].occurences[j].all_ref[k].ref;
                    let number_coords = obj[i].occurences[j].all_ref[k].coords.length;
                    line_genome += number_coords;
                    line_seq += number_coords;
                    let l = 0;
                    for (l = 0; l < number_coords; l++) {
                        let coord = obj[i].occurences[j].all_ref[k].coords[l];
                        let print_coord = '<td>' + coord + '</td></tr>';
                        out = print_coord + out;
                    }
                    let print_ref = '<td rowspan="' + number_coords + '">' + ref + '</td>';
                    out = print_ref + out;
                }
                let print_org = '<td rowspan="' + line_genome + '">' + org_split.join(' ') + '</td>';
                out = print_org + out;
            }
            let print_seq = '<td rowspan="' + line_seq + '" valign="top">' + seq + '</td>';
            out = print_seq + out;
        }
        var header = '<tr class = "w3-light-grey"> <th> sgRNA sequence </th> <th> Organism(s) </th> <th colspan=2> Coordinates </th> </tr>';
        out = header + out;
    }
}
