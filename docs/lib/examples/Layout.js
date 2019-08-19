import React from 'react';
import { Row, Col } from '@crude/ui';

export default class extends React.PureComponent {
  render() {
    return (
      <div>
        <style>
          {`
          .cr-row {
            margin-bottom: 20px;
            &:last-child {
              margin-bottom: 0;
            }
          }
          .cr-col {
            border-radius: 4px;
          }
          .bg-purple-dark {
            background: #99a9bf;
          }
          .bg-purple {
            background: #d3dce6;
          }
          .bg-purple-light {
            background: #e5e9f2;
          }
          .grid-content {
            border-radius: 4px;
            min-height: 36px;
          }
          .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
          }
        `}
        </style>
        <div className="row-part">
          <Row>
            <Col span={24}><div className="grid-content bg-purple-dark" /></Col>
          </Row>
          <Row>
            <Col span={12}><div className="grid-content bg-purple" /></Col>
            <Col span={12}><div className="grid-content bg-purple-light" /></Col>
          </Row>
          <Row>
            <Col span={8}><div className="grid-content bg-purple" /></Col>
            <Col span={8}><div className="grid-content bg-purple-light" /></Col>
            <Col span={8}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
          </Row>
          <Row>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple-light" /></Col>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple-light" /></Col>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple-light" /></Col>
          </Row>
        </div>
        <div className="row-part">
          <Row gutter={20}>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
        </div>
        <div className="row-part">
          <Row gutter={20}>
            <Col span={16}><div className="grid-content bg-purple" /></Col>
            <Col span={8}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row gutter={20}>
            <Col span={8}><div className="grid-content bg-purple" /></Col>
            <Col span={8}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row gutter={20}>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
            <Col span={16}><div className="grid-content bg-purple" /></Col>
            <Col span={4}><div className="grid-content bg-purple" /></Col>
          </Row>
        </div>
        <div className="row-part">
          <Row gutter={40}>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6} offset={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row gutter={20}>
            <Col span={6} offset={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6} offset={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row gutter={20}>
            <Col span={12} offset={6}><div className="grid-content bg-purple" /></Col>
          </Row>
        </div>
        <div className="row-part">
          <Row flex className="row-bg">
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row flex className="row-bg" justify="center">
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row flex className="row-bg" justify="end">
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row flex className="row-bg" justify="space-between">
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
          <Row flex className="row-bg" justify="space-around">
            <Col span={6}><div className="grid-content bg-purple" /></Col>
            <Col span={6}><div className="grid-content bg-purple-light" /></Col>
            <Col span={6}><div className="grid-content bg-purple" /></Col>
          </Row>
        </div>
      </div>
    );
  }
}
