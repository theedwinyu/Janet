import React, { Component } from 'react';
import { Button, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import janetLogo from '../assets/janet_card.png';

const { Title, Paragraph } = Typography;

class LandingPage extends Component {
    render() {
        return (
          <div className="landing-page-background">
						
            <Card className="landing-page-intro-card box-shadow">
              <Title>
                Take control of your financial future.
              </Title>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Paragraph>
              <Link to="/Login">
                <Button>
                  Get Started!
                </Button>
              </Link>
            </Card>
          </div>
        );
    }
}

export default LandingPage;
