import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Button,

    ToastAndroid
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import Prompt from 'react-native-prompt';
import Calendar from 'react-native-calendar-select';
//import PropTypes from 'prop-types';


const utcDateToString = (momentInUTC: moment): string => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // console.warn(s);
    return s;
};

export default class App extends Component {
    state = { text: '' };
    constructor (props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            message: 'No scheduled event',
            openmodal: false
        };
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }
    showmodal (){
        this.setState({openmodal:true});

    }
// when confirm button is clicked, an object is conveyed to outer component
// contains following property:
// startDate [Date Object], endDate [Date Object]
// startMoment [Moment Object], endMoment [Moment Object]
    confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.setState({
            startDate,
            endDate,

        });


    }
    openCalendar() {
        this.calendar && this.calendar.open();
    }


// in render function
    render() {
        const eventTitle = 'Fourpaws Event';
        const nowUTC = moment.utc();



        // It's an optional property, I use this to show the structure of customI18n object.
        let customI18n = {
            'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'text': {
                'start': 'Check in',
                'end': 'Check out',
                'date': 'Date',
                'save': 'Confirm',
                'clear': 'Reset'
            },
            'date': 'DD / MM'  // date format
        };
        // optional property, too.
        let color = {
            subColor: 'white'
        };




        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <View>
                    <Button
                        color="#2095d2"
                        title="Open Calendar"
                        onPress={this.openCalendar}/>
                    <Calendar
                        theme={{calendarBackground: "#2095d2"}}
                        i18n="en"
                        ref={(calendar) => {this.calendar = calendar;}}
                        customI18n={customI18n}
                        color={color}
                        format="YYYYMMDD"
                        minDate="20180401"
                        maxDate="20190312"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onConfirm={this.confirmDate}
                    />
                </View>

                <View>
                    <Button
                        color="#BE3A31"
                        title="Add New Event"
                        onPress={() => this.setState({ promptVisible: true })}/>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View>
                        <Text style={{ fontSize: 16 }}>
                            {"Check in: "+ this.state.startDate.toDateString()}{"\n"}
                            {"Check out: "+this.state.endDate.toDateString()}
                        </Text>
                        <Text style={{ fontSize: 16 }}>Event title: {eventTitle}</Text>
                        <Text style={{ fontSize: 16 }}>Event details: {this.state.message}</Text>
                    </View>
                </View>

                    <Button
                        color="#2095d2"
                        onPress={() => {
                            App.addToCalendar(eventTitle, this.state.startDate.toDateString());
                        }}
                        title="Add to calendar"
                    />



                <Prompt style={styles.container13}
                    title="Add event"
                    placeholder="add a description"
                    //defaultValue="New Event"
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({ promptVisible: false, message: "No event for now" })}
                    onSubmit={(value) => this.setState({ promptVisible: false, message: `Event: "${value}"` })}/>
            </View>


        );
    }
    static addToCalendar = (title: string, startDateUTC: string) => {
        const eventConfig = {
            title,
            startDate: utcDateToString(startDateUTC),
            //endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
        };

        AddCalendarEvent.presentEventDialog(eventConfig)
            .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
                // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
                // These are two different identifiers on iOS.
                // On Android, where they are both equal and represent the event id, also strings.
                // when false is returned, the dialog was dismissed
                if (eventInfo) {
                    console.warn(JSON.stringify(eventInfo));
                } else {
                    console.warn('dismissed');
                }
            })
            .catch((error: string) => {
                // handle error such as when user rejected permissions
                console.warn(error);
            });
    };

    static editCalendarEventWithId = (eventId: string) => {
        const eventConfig = {
            eventId,
        };

        AddCalendarEvent.presentEventDialog(eventConfig)
            .then(eventId => {
                // eventId is always returned when editing events
                console.warn(eventId);
            })
            .catch((error: string) => {
                // handle error such as when user rejected permissions
                console.warn(error);
            });
    };



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    instructions: {
        textAlign: 'center',
        color: 'black',
        marginBottom: 5,
    },
    container13: {
       backgroundColor: 'white'                            // Take up all screen

    },
        textPrompt: {
        color: 'white'
    }



});

