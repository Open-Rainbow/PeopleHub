import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { OrgChartPerson } from '../../../models/component-models/org-chart-person.model';



@Component({
  selector: 'ui-org-chart',
  templateUrl: './org-chart.component.html',
  imports: [CommonModule]
})
export class OrgChartComponent {

  data: OrgChartPerson = {
    id: 'ceo',
    name: 'Mike Mason',
    title: 'President / CEO',
    color: 'blue',
    children: [
      {
        id: 'marketing',
        name: 'Elvira Peay',
        title: 'Head of Marketing',
        color: 'blue',
        children: [
          { id: 'c1', name: 'Curtis Hudson', title: 'Staff', color: 'blue' },
          { id: 'd1', name: 'Dawn Silva', title: 'Staff', color: 'blue' },
          { id: 'a1', name: 'Ava Gildon', title: 'Staff', color: 'blue' }
        ]
      },
      {
        id: 'tech',
        name: 'Hope Davis',
        title: 'Head of Technology',
        color: 'orange',
        children: [
          { id: 'c2', name: 'Clay Jordan', title: 'Staff', color: 'orange' },
          { id: 'w2', name: 'Warren Gray', title: 'Staff', color: 'orange' },
          { id: 'e2', name: 'Elmer Fraley', title: 'Staff', color: 'orange' }
        ]
      },
      {
        id: 'production',
        name: 'Jeffrey Lee',
        title: 'Head of Production',
        color: 'blue',
        children: [
          { id: 'c3', name: 'Clive Moore', title: 'Staff', color: 'blue' },
          { id: 'c4', name: 'Chris Hicks', title: 'Staff', color: 'blue' },
          { id: 'h4', name: 'Haven Lee', title: 'Staff', color: 'blue' }
        ]
      },
      {
        id: 'finance',
        name: 'Rita Garza',
        title: 'Head of Finance',
        color: 'orange',
        children: [
          { id: 'h1', name: 'Harper Snee', title: 'Staff', color: 'orange' },
          { id: 'e1', name: 'Emily McCoy', title: 'Staff', color: 'orange' },
          { id: 'a2', name: 'Alice Becker', title: 'Staff', color: 'orange' }
        ]
      }
    ]
  };
}
