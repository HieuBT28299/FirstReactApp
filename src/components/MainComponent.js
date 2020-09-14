import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishDetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
        fetchDishes: () => { dispatch(fetchDishes()) }
    });
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const HomePage = () => {
            const dishesState = this.props.dishes;
            return (
                <Home dish={dishesState.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishesState.isLoading}
                    dishesErrMess={dishesState.errMess}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
            );
        }

        const DishWithId = ({ match }) => { //{match, location, history} but we ignore location and history
            const dishId = parseInt(match.params.dishId, 10);
            const dishesState = this.props.dishes;
            return (
                <DishDetail dish={dishesState.dishes.filter((dish) => dish.id === dishId)[0]}
                    isLoading={dishesState.isLoading}
                    errMess={dishesState.errMess}
                    comments={this.props.comments.filter((comment) => comment.dishId === dishId)}
                    addComment={this.props.addComment}
                />
            );
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
