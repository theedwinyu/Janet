import React, { Component } from 'react';
import { Button, Card, Typography, PageHeader, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

class LandingPage extends Component {
    
    render() {
        return (
          <div className="landing-page-background">
						<PageHeader
              title="Janet"
            />
            <Card className="landing-page-intro-card box-shadow">
              <Title>
                Take control of your financial future.
              </Title>
              <Paragraph>
               Don't understand what credit is? Want to get a credit card but don't know how? 
               With <Text strong>Janet</Text>, our smart virtual assistant, learn about your financial health and gain the tools needed to see real world impact on your credit score
              </Paragraph>
              <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>Interactive courses</h3>
              </div>
              <div>
                <h3 style={contentStyle}>Engaging quizzes</h3>
              </div>
              <div>
                <h3 style={contentStyle}>Real world scenarios</h3>
              </div>
              <div>
                <h3 style={contentStyle}>Content for all backgrounds</h3>
              </div>
            </Carousel>
            <Text>Get your credit score <a href="https://creditwise.capitalone.com/home">here</a> and start your journey today!</Text>
            <br></br>
            <br></br>
            <Link to="/login">
              <Button icon={<PlayCircleOutlined />}>
                Get Started!
              </Button>
            </Link>
            </Card>
            <div>
            
            </div>
          </div>
        );
    }
}

export default LandingPage;
