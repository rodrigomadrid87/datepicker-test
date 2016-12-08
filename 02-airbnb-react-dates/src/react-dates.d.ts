declare module "react-dates"{
    export function SingleDatePicker(): ReactDates.SingleDatePicker
}
// declare module "react-dates"{
//   import SingleDatePicker = ReactDates.SingleDatePicker;
//      export = SingleDatePicker;
// }
//

declare namespace ReactDates{
interface TypePhrases{
   closeDatePicker: string;
   clearDate: string;
 }


  interface Props extends React.Props<SingleDatePicker>{
    id?:string;
date?:Date;
focused?: boolean;
disabled?: boolean;
required?: boolean;
showClearDate?: boolean;
reopenPickerOnClearDate?: boolean;
keepOpenOnDateSelect?: boolean;

navPrev?: any;
navNext?: any;

onDateChange?:(day: Date)=>any;
onFocusChange?:(focused:boolean)=>any;

isDayBlocked?:()=>any;
disabledDays?: Array<number>;
isOutsideRange?:()=>any;
enableOutsideDays?:boolean;
numberOfMonths?:number;
orientation?: string,
anchorDirection?: string,
horizontalMargin?:number;
withPortal?: boolean;
withFullScreenPortal?: boolean;
initialVisibleMonth?:number;

onPrevMonthClick?:(e: React.SyntheticEvent<{}>)=>any;
onNextMonthClick?:(e: React.SyntheticEvent<{}>)=>any;


displayFormat?:string
monthFormat?: string;
phrases?:TypePhrases;
  }

  class SingleDatePicker extends React.Component<Props, {}> {

      }

}
