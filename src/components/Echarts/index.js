import React, {Component} from 'react';
import {WebView, View, StyleSheet,Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
let scalesPageToFitValue = (Platform.OS === 'android');
let source = (Platform.OS === 'ios') ? require('./tpl.html'): {'uri':'file:///android_asset/tpl.html'}
export default class App extends Component {
// 预防过渡渲染
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {}
        nextProps = nextProps || {}
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true
        }
        for (const key in nextProps) {
            if (JSON.stringify(thisProps[key]) != JSON.stringify(nextProps[key])) {
// console.log('props', key, thisProps[key], nextProps[key])
                return true
            }
        }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
// 解决数据改变时页面闪烁的问题
            this.refs.chart.injectJavaScript(renderChart(nextProps))
        }
    }

// webview背景透明，添加 backgroundColor: 'rgba(0,0,0,0)'
    render() {
        return (

            <WebView
                ref="chart"
                scrollEnabled={false}
                scalesPageToFit = {scalesPageToFitValue}
                injectedJavaScript={renderChart(this.props)}
                style={{
                    height: this.props.height || 400,
                    backgroundColor: 'rgba(0,0,0,0)'
                }}
                //source={require('./tpl.html')}
                source={source}
            />

        );
    }
}