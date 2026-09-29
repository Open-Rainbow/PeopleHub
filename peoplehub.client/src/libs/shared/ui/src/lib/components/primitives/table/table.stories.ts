import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';
import { TableCellType } from '../../../models/table.model';
// import { TableComponent } from '../../../app/common-ui/feature-components/table/table.component';
// import { TableCellType } from '../../../app/common-ui/assests/view-models/tabel-view-model';



const meta: Meta<TableComponent> = {
  title: 'Feature Components/TableComponent',
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    tableData: [
      [
        {
          colName: 'Employee name',
          type: TableCellType.USER,
          value: { title: 'Ganesh', subtitle: 'dfg' },
          showValue: true,
          showColIcon: true,
          showHoverIcon: false,
          colIconName: 'arrow_up_outline',
          colIconName2: 'arrow_down_outline',
          tdProperties: { BGColor: 'blue', fontProperties: { fontSize: '20px', fontColor: 'yellow' } }
        },
        {
          colName: '1',
          type: TableCellType.TEXT,
          value: 'present',
          showValue: false,
          showIcon: true,
          iconName: 'check_circle_outline',
          iconColor: 'red',
          isLink: true,

          showHoverIcon: true,
          hoverIconName: 'home',
          tdProperties: {
            BGColor: 'Crimson',
            fontProperties: { fontWeight: '500', fontAlign: 'left' }
          }
        },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline', tdHidden: true },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline', tdHidden: true },
        {
          colName: '5',
          type: TableCellType.TEXT,
          value: 'present',
          showValue: false,
          showIcon: true,
          iconName: 'check_circle_outline',
          tdProperties: { BGColor: 'green', fontProperties: { fontWeight: '500', fontAlign: 'right' } }
        },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline', isLink: true },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: false, showIcon: true, iconName: 'check_circle_outline' },
        { colName: 'Leave', type: TableCellType.TEXT, value: '2days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },

        {
          colName: 'Details',
          type: TableCellType.ICON,
          value: {
            iconName: 'mdi:eye-outline',

          }

        },
        
        {
          colName: 'Panel Actions',
          type: TableCellType.ICON_PANEL,
          value: {
            iconName: 'mdi:eye-outline',
            
          }
        }
      ]
      ,

      [
        {
          colName: 'Employee name', type: TableCellType.IMAGE,
          value: { tabIcon: '//plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=735', tabName: 'chita', subTabName: 'software' }, showValue: true,
          tdProperties: { BGColor: 'blue', fontProperties: { fontWeight: '800', fontColor: 'yellow', } }
        },
        {
          colName: '1',
          type: TableCellType.TEXT,
          value: 'present',
          showValue: false,
          showIcon: true,
          iconName: 'check_circle_outline',
          isLink: true,

          tdProperties: {
            BGColor: 'Crimson',
            showEditIcon: true,
            showEditIconName: 'edit',
            fontProperties: {
              fontWeight: '500',
              fontAlign: 'left',
              fontColor: '#ffffff',
              fontSize: '14px'
            }
          }
        }
        ,
        {
          colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home',
          tdProperties: { BGColor: 'blue', fontProperties: { fontWeight: '700', fontColor: 'yellow', fontFamily: 'Monaco' } }
        },

        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'Absent', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'cross_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'cross_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'Absent', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'cross_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '2days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Venkat', showValue: true, tdProperties: { BGColor: 'gray', fontProperties: { fontSize: '20px', fontColor: 'red', fontFamily: 'Didot' } } },
        { colName: '1', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', tdRowSpan: 2 },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', tdColSpan: 3, tdProperties: { BGColor: 'gray', fontProperties: { fontAlign: 'center' } } },
        { colName: '5', type: TableCellType.TEXT, value: '', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', tdHidden: true },
        { colName: '6', type: TableCellType.TEXT, value: '', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', tdHidden: true },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '8days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Anji', showValue: true, tdProperties: { BGColor: 'gray', fontProperties: { fontSize: '20px', fontColor: 'aqua', fontFamily: 'Gill Sans' } } },
        { colName: '1', type: TableCellType.TEXT, value: '', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', tdHidden: true },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'Absent', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'cross_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '3days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Sankeerth', showValue: true, tdProperties: { BGColor: 'black', fontProperties: { fontSize: '20px', fontColor: 'white', fontFamily: 'Apple Chancery' } } },
        { colName: '1', type: TableCellType.TEXT, value: 'Half Day', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '2days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Manu', showValue: true, tdProperties: { BGColor: 'orange', fontProperties: { fontSize: '20px', fontColor: 'white', } } },
        { colName: '1', type: TableCellType.TEXT, value: 'Absent', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'Work form home', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'Half Day', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '2days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Vidhata', showValue: true, tdProperties: { BGColor: 'brown', fontProperties: { fontSize: '20px', fontColor: 'aqua', } } },
        { colName: '1', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '2', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'cross_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '1days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Sai', showValue: true, tdProperties: { BGColor: 'yellow', fontProperties: { fontSize: '20px', fontColor: 'royal', } } },
        { colName: '1', type: TableCellType.TEXT, value: 'Work form home', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '2', type: TableCellType.TEXT, value: 'Work form home', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'Work form home', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'Work form home', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '2days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
      [
        { colName: 'Employee name', type: TableCellType.TEXT, value: 'Kartikey', showValue: true, tdProperties: { BGColor: 'green', fontProperties: { fontSize: '20px', fontColor: 'cyan', } } },
        { colName: '1', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '2', type: TableCellType.TEXT, value: 'Half Day', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '3', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '4', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '5', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '6', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '7', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '8', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '9', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '10', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '11', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '12', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '13', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '14', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '15', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '16', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '17', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '18', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '19', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '20', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '21', type: TableCellType.TEXT, value: 'Leave', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '22', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '23', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'home', showIcon: false, hoverIconName: 'home', },
        { colName: '24', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '25', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '26', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '27', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '28', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '29', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '30', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: '31', type: TableCellType.TEXT, value: 'present', showValue: true, iconName: 'check_circle_outline', showIcon: false, hoverIconName: 'home', },
        { colName: 'Leave', type: TableCellType.TEXT, value: '4 days', showValue: true },
        { colName: 'Edit/Delete', type: TableCellType.TEXT, tdProperties: { showEditIcon: true, showDeleteIcon: true, showEditIconName: 'edit', showDeleteIconName: 'delete' } }
        , {
          colName: 'Action',
          type: TableCellType.VALUE_DROPDOWN,
          options: [
            { label: 'Pending', value: 'Pending', isDefault: false },
            { label: 'Approved', value: 'Approved', isDefault: true }, // This will be selected
            { label: 'Rejected', value: 'Rejected', isDefault: false }
          ],
          width: '180px'
        },
      ],
    ]
  },
};

export default meta;
type Tooltip = StoryObj<TableComponent>;

export const dot = new TableComponent();