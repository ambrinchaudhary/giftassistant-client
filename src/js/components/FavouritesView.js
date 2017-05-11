import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Button, Text } from 'react-native-elements';
import Svg, { LinearGradient, Rect, Defs, Stop } from 'react-native-svg';

const FONT_SIZE_DEFAULT = 30;
const FONT_SIZE_SMALL = 20;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginTop: '5%',
    textAlign: 'center',
    fontSize: FONT_SIZE_DEFAULT
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 0
  },
  svg: { 
    position: 'absolute', 
    zIndex: 0, 
    left: 0, 
    top: 0, 
    width: '100%', 
    height: '100%' 
  }
});

export default class FavouritesView extends React.Component {

  renderRow (data, idx) {
    return (
      <ListItem
        roundAvatar
        key={idx}
        title={data.label}
        subtitle={data.formattedPrice}
        avatar={{uri:data.largeImageURL}}
        onPress={() => {
          this.props.onSelect(data, idx);
        }}
      />
    )
  }

  render() {
    
    return (
      <View>
        <Svg style={styles.svg}>
          <Defs> 
            <LinearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%" > 
              <Stop offset="0" stopColor="rgb(255, 255, 255)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgb(156, 199, 255)" stopOpacity="1" />
            </LinearGradient> 
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"/>
        </Svg>      
        <View style={styles.container}>
          <List containerStyle={{marginTop: 0 }}>
            {this.props.favourites.map((data, idx) => this.renderRow(data, idx))}
          </List>
        </View>
      </View>
    );
  }

}
