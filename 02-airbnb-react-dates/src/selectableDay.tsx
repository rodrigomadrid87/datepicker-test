import * as React from 'react';
import moment = require('moment');
import {SingleDatePicker} from 'react-dates';
require('../node_modules/react-dates/css/styles.scss')

interface Props extends React.Props<SelectableDay> {
}

interface State {
    date: Date;
    focused:boolean;
}
export class SelectableDay extends React.Component<Props, State> {

  constructor(props) {
     super(props);
     this.state = {
       focused: false,
       date: null,
     }
     this.onDateChange = this.onDateChange.bind(this);
     this.onFocusChange = this.onFocusChange.bind(this);
   }

  onDateChange(date:Date) {
      this.setState({ date } as State);
    }

    onFocusChange(focused:boolean) {
      this.setState({ focused } as State);
    }


    public render() {
       const { focused, date } = this.state;
        return (
          <div>
          <SingleDatePicker
            id="date_input"
                date={date}
                 focused={focused}
                 onDateChange={this.onDateChange}
                 onFocusChange={this.onFocusChange}
                  displayFormat="DD/MM/YYYY"
                            />

          </div>
        );
    }
}
