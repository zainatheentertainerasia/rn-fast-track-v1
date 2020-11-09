import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import i18n, { isRTL, getFlipForRTLStyle } from '../../utils/localization/I18n';

import ProgressBar from '../Progress';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
} = CustomComponents;
const { AntDesign, Svg, Circle, G, Line,SvgText } = FastTrackLibs;

export default class index extends Component {
  private graphSection: React.RefObject<HTMLDivElement>;

  constructor(props: Port) {
    super(props);
    this.graphSection = React.createRef();
  }

  getNewPoint = (x: number, height: number) => {
    let newX = height - x;
    return newX;
  };

  getXpoints = (object: any) => {
    console.log(object, 'xPointsArrayxPointsArray object');
    const { valuesCount, width, gap } = object;

    const graphXrange = width - gap * 2;

    const distanceBetweenPoint = graphXrange / (valuesCount - 1);
    console.log('distanceBetweenPoint: ', distanceBetweenPoint);

    let xPointsArray = [];

    for (let i = 0; i < valuesCount; i++) {
      const xPoint = gap + distanceBetweenPoint * i;
      xPointsArray.push(xPoint);
    }

    return xPointsArray;
  };

  getYpoints = (object: any) => {
    const { height, gap, graphData } = object;

    const graphYrange = height - gap * 2;

    let min = graphData[0];
    let max = graphData[0];

    for (let i = 1; i < graphData.length; i++) {
      if (graphData[i] > max) {
        max = graphData[i];
      }

      if (graphData[i] < min) {
        min = graphData[i];
      }
    }

    const pointsRange = max - min;

    const factor = graphYrange / pointsRange;

    console.log('factor: ', factor);

    let yPointsArray: any[] = [];

    graphData.map((data: any) => {
      const value = data;

      let yPoint = gap + (value - min) * factor;
      yPoint = height - yPoint;
      yPointsArray.push(yPoint);
    });

    return yPointsArray;
  };

  calculateFactor = (graphRange: number, graphData: any[]) => {
    let min = graphData[0].value;
    let max = graphData[0].value;

    for (let i = 1; i < graphData.length; i++) {
      if (graphData[i].value > max) {
        max = graphData[i].value;
      }

      if (graphData[i].value < min) {
        min = graphData[i].value;
      }
    }

    const pointsRange = max - min;

    const factor = graphRange / pointsRange;

    return factor;
  };

  render() {
    if (!this.props.data.progressBar) {
      return <View></View>;
    }

    if (this.props.data.progressBar.length === 0) {
      return (
        <View>
          <Text>Empty</Text>
        </View>
      );
    }

    let progressBarHTML: any = [];
    let graphData = this.props.data.graph;
    let progessBarData = this.props.data.progressBar;
    const currency = this.props.data.currency;

    // let graphData = null;
    // let progessBarData = null;
    // const userSavingData = this.props.data.userSaving;
    //
    // if (this.props.activeTab === 0) {
    //   graphData = userSavingData.monthly.graph;
    //   progessBarData = userSavingData.monthly.progressBar;
    // } else if (this.props.activeTab === 1) {
    //   graphData = userSavingData.yearly.graph;
    //   progessBarData = userSavingData.yearly.progressBar;
    // }

    console.log('data: ', graphData);
    if (progessBarData && progessBarData.length !== 0) {
      progessBarData.map((progessBar: any) => {
        const year = progessBar.name;
        const saving = progessBar.savings;
        const percentage = (saving / progessBar.totalSavings) * 100;

        progressBarHTML.push(
          <ProgressBar
            progress={percentage}
            text={`${currency} ${saving}`}
            headText={year}
          />
        );
      });
    }

    const graphSectionWidth = Dimensions.get('window').width - 30;
    const graphWidth = graphSectionWidth - 20;
    const graphHeight = graphSectionWidth * 0.5;
    console.log('graphWidth: ', this.graphSection);
    console.log('graphWidth: ', graphWidth);
    console.log('graphHeight: ', graphHeight);
    const active: string = 'test';

    const p1x = 10;
    let p1y = 50;

    // p1y = this.getNewPoint(p1y,graphHeight)
    // console.log("p1y: ",p1y)
    let xPointsArray = [];
    let yPointsArray = [];
    let dotsHTML = [];
    let linesHTML = [];
    let textHTML = [];

    if (graphData && graphData.length > 1) {
      const xObject = {
        valuesCount: graphData.length,
        width: graphWidth,
        gap: 20,
      };

      xPointsArray = this.getXpoints(xObject);
      console.log(xPointsArray, 'xPointsArrayxPointsArray');
      const yObject = {
        graphData: graphData,
        height: graphHeight,
        gap: 20,
      };

      yPointsArray = this.getYpoints(yObject);

      const pointsCount = yPointsArray.length;

      //dots  & text html
      for (let i = 0; i < pointsCount; i++) {
        dotsHTML.push(
          <G>
            <Circle
              cx={xPointsArray[i]}
              cy={yPointsArray[i]}
              r='4'
              fill='#60BDA9'
            />
            {/* <text x={xPointsArray[i] - 10} y={yPointsArray[i] - 10} fill="red">{this.state.userSavingResult.graph_data[i].value}</text> */}
          </G>
        );

        if (i + 1 === pointsCount) {
          textHTML.push(
            <G>
              <SvgText
                x={xPointsArray[i] - 50}
                y={yPointsArray[i] - 10}
                fill='black'
                font-size='10'
                transform='translate(0,0)'
              >
                {currency} {graphData[i]}
              </SvgText>
            </G>
          );
        } else
          textHTML.push(
            <G>
              <SvgText
                x={xPointsArray[i] - 10}
                y={yPointsArray[i] - 10}
                fill='black'
                font-size='10'
                transform='translate(0,0)'
              >
                {currency} {graphData[i]}
              </SvgText>
            </G>
          );
      }

      for (let i = 0; i < pointsCount - 1; i++) {
        linesHTML.push(
          <Line
            x1={xPointsArray[i]}
            y1={yPointsArray[i]}
            x2={xPointsArray[i + 1]}
            y2={yPointsArray[i + 1]}
            style={{
              stroke: '#60BDA9',
              strokeWidth: 3,
              animation: 'move 3s linear',
            }}
          />
        );
      }

      console.log('line: ', dotsHTML);
    }

    console.log('xPointsArray: ', xPointsArray);
    console.log('yPointsArray: ', yPointsArray);
    console.log(SvgText,"SvgText hamza")
    return (
      <View>
        <View style={styles.graphContainer}>
          <Svg height={graphHeight} width={graphWidth}>
            {dotsHTML}

            {linesHTML}

            {textHTML}
          </Svg>

          <View
            style={{
              height: 5,
              overflow: 'hidden',
              backgroundColor: '#F0F0F0',
              marginBottom: 10,
              marginTop: 10,
            }}
          />

          {progressBarHTML}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  graphContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    height: 486,
    borderRadius: 5,
  },
});
