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
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

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
        fetchDishes: () => { dispatch(fetchDishes()) },
        fetchPromos: () => { dispatch(fetchPromos()) },
        fetchComments: () => { dispatch(fetchComments()) },
        resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
    });
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchComments();
    }

    render() {
        const HomePage = () => {
            const dishesState = this.props.dishes;

            const promosState = this.props.promotions;
            return (
                <Home dish={dishesState.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishesState.isLoading}
                    dishesErrMess={dishesState.errMess}
                    promotion={promosState.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={promosState.isLoading}
                    promosErrMess={promosState.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
            );
        }

        const DishWithId = ({ match }) => { //{match, location, history} but we ignore location and history
            const dishId = parseInt(match.params.dishId, 10);
            const dishesState = this.props.dishes;
            const commentsState = this.props.comments;
            return (
                <DishDetail dish={dishesState.dishes.filter((dish) => dish.id === dishId)[0]}
                    isLoading={dishesState.isLoading}
                    errMess={dishesState.errMess}
                    comments={commentsState.comments.filter((comment) => comment.dishId === dishId)}
                    commentsErrMess={commentsState.errMess}
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
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
