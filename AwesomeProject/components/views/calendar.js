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
import Prompt from 'react-native-prompt';
import Calendar from 'react-native-calendar-select';


export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            message:'No event for now',
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
            subColor: '#f0f0f0'
        };




        return (
            <View style={{ flex: 1}}>
                <View >
                    <Button title="Open Calendar" onPress={this.openCalendar}/>
                    <Calendar
                        i18n="en"
                        ref={(calendar) => {this.calendar = calendar;}}
                        customI18n={customI18n}
                        color={color}
                        format="YYYYMMDD"
                        minDate="20171101"
                        maxDate="20180312"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onConfirm={this.confirmDate}
                    />
                </View>

                <View style={{  height: 50}}>
                    <Button color="#841584" title="Add New Event" onPress={() => this.setState({ promptVisible: true })}/>


                </View>
                <View style={{ flex: 1, justifyContent: 'center',margin: 100 }}>
                    <Text style={{ fontSize: 20 }}>
                        {this.state.message}
                    </Text>
                </View>
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
}

const styles = StyleSheet.create({

    container13: {
       backgroundColor: 'white'                            // Take up all screen

    },
        textPrompt: {
        color: 'white'
    }



});

