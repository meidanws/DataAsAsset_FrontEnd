import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import * as StationListData from '../DorAlonStationsList.json'

const mapStyles = {
  width: '60%',
  height: '60%'
};

 

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };
    
      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  
  render() {
      var data = JSON.stringify(this.props.data);
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 32.085300,
            lng: 34.781769
          }
        }
      >

          {StationListData.Stations.map( mark => (
            <Marker key={mark.id} position={{lat:mark.Latitude,lng:mark.Longitude}} onClick={this.onMarkerClick} name={mark.StationName} Adress={mark.Adress} Phone={mark.Phone}
            icon={{
                url:'/static/Dor_Alon_Logo.svg',
                scaledSize: new window.google.maps.Size(40,40)
            }}/>
            ))}

      {/* <Marker
      position={{lat:32.07773,lng:34.77187}}
      onClick={this.onMarkerClick}
      name={'Kenyatta International Convention Centre'}
    /> */}

    <InfoWindow
      marker={this.state.activeMarker}
      visible={this.state.showingInfoWindow}
      onClose={this.onClose}
    >
      <div>
        <h3>{this.state.selectedPlace.name}</h3>
        <p>Adress: {this.state.selectedPlace.Adress} </p>
        <p>Phone: {this.state.selectedPlace.Phone} </p>
      </div>
    </InfoWindow>
    </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC4OTbJM8iedNCElO5Z2s16alZwanqV0QE'
  })(MapContainer);