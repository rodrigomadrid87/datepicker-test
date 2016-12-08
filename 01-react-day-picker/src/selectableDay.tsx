import * as React from 'react';
import DayPicker = require('react-day-picker');
import moment = require('moment');
import 'react-day-picker/lib/style.css';
require('./css/site.scss');


interface Props extends React.Props<SelectableDay> {
}

interface State {
    date: Date;
    inputValue: string;
    showOverlay: boolean
}
export class SelectableDay extends React.Component<Props, State> {
    daypicker = null;
    input = null;
    clickedInside = false;
    clickTimeout = null;

    format = "DD/MM/YYYY";
    constructor(props: Props) {
        super(props);
        // set initial state
        var date = new Date();
        this.state = { date: date, inputValue: moment(date).format(this.format), showOverlay: false };
    }

    componentWillUnmount() {
        clearTimeout(this.clickTimeout);
      }


    public showCurrentDate() {
        this.daypicker.showMonth(this.state.date);
    }


    public handleInputChange(e) {
        const { value } = e.target;
        if (moment(value, this.format).isValid()) {
            this.setState({ date: moment(value, this.format).toDate(), inputValue: value } as State, this.showCurrentDate);
        } else {
            this.setState({ date: null, inputValue: value } as State);
        }
    }

    public handleDayClick(e, day, { selected }) {
        var date = selected ? null : day;
        this.setState({
            date: date,
            inputValue: moment(date).format(this.format),
            showOverlay: false
        });
        this.input.blur();
    }

    handleInputFocus() {
        this.setState({
            showOverlay: true,
        } as State);
    }

    handleInputBlur() {
        const showOverlay = this.clickedInside;

        this.setState({
            showOverlay,
        } as State);

        // Force input's focus if blur event was caused by clicking on the calendar
        if (showOverlay) {
            this.input.focus();
        }
    }

    handleContainerMouseDown() {
        this.clickedInside = true;
        // The input's onBlur method is called from a queue right after onMouseDown event.
        // setTimeout adds another callback in the queue, but is called later than onBlur event
        this.clickTimeout = setTimeout(() => {
            this.clickedInside = false;
        }, 0);
    }

    public render() {
        return (
            <div onMouseDown={this.handleContainerMouseDown.bind(this)}>
                <p>
                    <input
                        ref={(el) => { this.input = el; } }
                        type="text"
                        value={this.state.inputValue}
                        placeholder={this.format}
                        onChange={this.handleInputChange.bind(this)}
                        onFocus={ this.handleInputFocus.bind(this) }
                        onBlur={ this.handleInputBlur.bind(this) }
                        />
                </p>
                 { this.state.showOverlay &&
                <div style={{ position: 'relative' }}>
                    <div className='overlayStyle'>
                        <DayPicker
                            ref={(el) => { this.daypicker = el; } }
                            selectedDays={day => DayPicker.DateUtils.isSameDay(this.state.date, day)}
                            onDayClick={this.handleDayClick.bind(this)
                            }
                            />
                    </div>
                </div>
              }
            </div>
        );
    }
}
