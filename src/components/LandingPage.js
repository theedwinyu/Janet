import React, { Component } from 'react';
import { Button, Row, Col, Card, Typography } from 'antd';
import { Redirect } from 'react-router';

const { Title, Paragraph } = Typography;

class LandingPage extends Component {
    render() {
        return (
          <div className="landing-page-background">
            <Card className="landing-page-intro-card">
              <Title>
                Take control of your financial future.
              </Title>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Paragraph>
              <Button onClick={() => <Redirect to="/Login" />}>
                Start
              </Button>
            </Card>
          </div>
        );
    }
}

export default LandingPage;
