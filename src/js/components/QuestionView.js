import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Grid, Row, Button, Text } from 'react-native-elements';
import Slider from 'react-native-slider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15,
    marginRight: 15,
  }
});

class SliderGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.onPress = this.onPress.bind(this);
  }

  render() {
    let { min, max } = this.props.values;
    let shownValue;
    min = parseInt(min);
    max = parseInt(max);
    shownValue = Math.round(this.state.value * (max - min) + min);
    return (
      <View style={styles.container}>
        <Slider value={this.state.value} 
                onValueChange={(value) => this.setState({value})} />
        <Text h4>{shownValue}</Text>
        <Button title="OK" onPress={this.onPress}/>
      </View>
    );
  }

  onPress() {
    this.props.onAnswer(Math.round(this.state.value));
  }

}

class SelectionGroup extends React.Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
    
  render() {
    
    const { values } = this.props;
    let selection = Object.keys(values).map((key) => {
      const value = values[key];
      return (
        <Button title={value} key={key} onPress={this.onPress.bind(this, key)}/>
      );
    });
    
    return (
      <View>{selection}</View>
    );
  };

  onPress(value) {
    this.props.onAnswer(value);
  }

}

class Choice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    
    const type = this.props.type;
    const values = this.props.values || {};

    if (type === 'slider') {
      return (
        <SliderGroup values={values} onAnswer={this.props.onAnswer} />
      );
    } else if (type === 'select') {
      return (
        <SelectionGroup values={values} onAnswer={this.props.onAnswer} />
      );
    } else {
      return (
        <Text>Please Wait...</Text>
      )
    }
  }

}

export default class QuestionView extends React.Component {

  constructor(props) {
    super(props);
    this.animValue = new Animated.Value(1);
    this.onAnswer = this.onAnswer.bind(this);
  }
  
  animate() {
    this.animValue.setValue(0);
    Animated.spring(
      this.animValue,
      {
        toValue: 1,
        friction: 7,
        tension: 50
      }
    ).start();
  }

  onAnswer() {
    if (!this.props.isLastQuestion) {
      this.animate();
    }
    if (this.props.onAnswer) {
      let args = Array.prototype.slice.call(arguments);
      this.props.onAnswer.apply(null, args);
    }
  }

  render() {
    if (!this.props || !this.props.input) {
      return null;
    }

    const marginLeft = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 0]
    });
    
    const opacity = this.animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    
    return (
      <Animated.View style={{ marginLeft, opacity }}>
        <Grid>
          <Row size={30}>
            <Text>{this.props.label}</Text>
          </Row>
          <Row size={70}>
            <Choice type={this.props.input} values={this.props.values} onAnswer={this.onAnswer}/>
          </Row>
        </Grid>
      </Animated.View>
    );
  }

}